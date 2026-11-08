import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createServer as createViteServer } from 'vite';
import { db } from './server/db.js';
import { validateContactForm, validateProjectData } from './src/utils/validators.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'nexus-super-secret-jwt-key-2026';

// Parsers & security
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Security Headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// Authentication middleware
function authenticateAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  let token = null;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  } else if (req.headers.cookie) {
    const cookies = req.headers.cookie.split(';').map(c => c.trim());
    const authCookie = cookies.find(c => c.startsWith('token='));
    if (authCookie) {
      token = authCookie.split('=')[1];
    }
  }

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized. Authentication token is missing.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired authentication token.' });
  }
}

// Simple in-memory rate limiter for contact & login
const rateLimits = new Map();
function rateLimiter(limit = 10, windowMs = 60000) {
  return (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress || 'client';
    const now = Date.now();
    const clientData = rateLimits.get(ip) || { count: 0, resetTime: now + windowMs };

    if (now > clientData.resetTime) {
      clientData.count = 0;
      clientData.resetTime = now + windowMs;
    }

    clientData.count++;
    rateLimits.set(ip, clientData);

    if (clientData.count > limit) {
      return res.status(429).json({ error: 'Too many requests. Please wait a moment and try again.' });
    }
    next();
  };
}

// ---------------- REST API ROUTES ----------------

// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    database: 'persistent-document-store'
  });
});

// 2. Authentication
app.post('/api/auth/login', rateLimiter(15, 60000), (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  const admin = db.findById('admin', 'admin_1');
  if (!admin || admin.email.toLowerCase() !== email.trim().toLowerCase()) {
    return res.status(401).json({ error: 'Invalid email credentials.' });
  }

  const isMatch = bcrypt.compareSync(password, admin.passwordHash);
  if (!isMatch) {
    return res.status(401).json({ error: 'Invalid password.' });
  }

  const token = jwt.sign(
    { id: admin.id, email: admin.email, role: admin.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; SameSite=Lax; Max-Age=${7 * 24 * 3600}`);

  res.json({
    message: 'Authentication successful',
    token,
    admin: {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      role: admin.role
    }
  });
});

app.post('/api/auth/logout', (req, res) => {
  res.setHeader('Set-Cookie', 'token=; HttpOnly; Path=/; Max-Age=0');
  res.json({ message: 'Logged out successfully' });
});

app.get('/api/auth/me', authenticateAdmin, (req, res) => {
  const admin = db.findById('admin', 'admin_1');
  res.json({
    id: admin.id,
    name: admin.name,
    email: admin.email,
    role: admin.role
  });
});

// 3. Projects
app.get('/api/projects', (req, res) => {
  const { category, search, featured } = req.query;
  let list = db.get('projects');

  if (category && category !== 'All') {
    list = list.filter(p => p.category === category);
  }
  if (featured === 'true') {
    list = list.filter(p => p.featured === true);
  }
  if (search) {
    const q = search.toLowerCase();
    list = list.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      (p.technologies && p.technologies.some(t => t.toLowerCase().includes(q)))
    );
  }

  res.json(list);
});

app.get('/api/projects/:id', (req, res) => {
  const project = db.findById('projects', req.params.id);
  if (!project) return res.status(404).json({ error: 'Project not found.' });
  res.json(project);
});

app.post('/api/projects', authenticateAdmin, (req, res) => {
  const validation = validateProjectData(req.body);
  if (!validation.isValid) {
    return res.status(400).json({ error: 'Validation failed', details: validation.errors });
  }
  const created = db.create('projects', req.body);
  res.status(201).json(created);
});

app.put('/api/projects/:id', authenticateAdmin, (req, res) => {
  const updated = db.update('projects', req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'Project not found.' });
  res.json(updated);
});

app.delete('/api/projects/:id', authenticateAdmin, (req, res) => {
  const success = db.delete('projects', req.params.id);
  if (!success) return res.status(404).json({ error: 'Project not found.' });
  res.json({ message: 'Project deleted successfully' });
});

// 4. Skills
app.get('/api/skills', (req, res) => {
  const skills = db.get('skills');
  res.json(skills);
});

app.post('/api/skills', authenticateAdmin, (req, res) => {
  const { name, category, proficiency, icon } = req.body;
  if (!name || !category) {
    return res.status(400).json({ error: 'Name and category are required.' });
  }
  const created = db.create('skills', {
    name,
    category,
    proficiency: Number(proficiency) || 80,
    icon: icon || 'Code'
  });
  res.status(201).json(created);
});

app.put('/api/skills/:id', authenticateAdmin, (req, res) => {
  const updated = db.update('skills', req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'Skill not found.' });
  res.json(updated);
});

app.delete('/api/skills/:id', authenticateAdmin, (req, res) => {
  const success = db.delete('skills', req.params.id);
  if (!success) return res.status(404).json({ error: 'Skill not found.' });
  res.json({ message: 'Skill deleted successfully' });
});

// 5. Services
app.get('/api/services', (req, res) => {
  const services = db.get('services');
  res.json(services);
});

app.post('/api/services', authenticateAdmin, (req, res) => {
  const { title, description, icon, technologies } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required.' });
  }
  const created = db.create('services', {
    title,
    description,
    icon: icon || 'Layout',
    technologies: Array.isArray(technologies) ? technologies : [],
    active: true
  });
  res.status(201).json(created);
});

app.put('/api/services/:id', authenticateAdmin, (req, res) => {
  const updated = db.update('services', req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'Service not found.' });
  res.json(updated);
});

app.delete('/api/services/:id', authenticateAdmin, (req, res) => {
  const success = db.delete('services', req.params.id);
  if (!success) return res.status(404).json({ error: 'Service not found.' });
  res.json({ message: 'Service deleted successfully' });
});

// 6. Experience
app.get('/api/experience', (req, res) => {
  res.json(db.get('experience'));
});

app.post('/api/experience', authenticateAdmin, (req, res) => {
  const { position, company, startDate, endDate, description } = req.body;
  if (!position || !company) {
    return res.status(400).json({ error: 'Position and company are required.' });
  }
  const created = db.create('experience', req.body);
  res.status(201).json(created);
});

app.put('/api/experience/:id', authenticateAdmin, (req, res) => {
  const updated = db.update('experience', req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'Experience item not found.' });
  res.json(updated);
});

app.delete('/api/experience/:id', authenticateAdmin, (req, res) => {
  const success = db.delete('experience', req.params.id);
  if (!success) return res.status(404).json({ error: 'Experience item not found.' });
  res.json({ message: 'Experience item deleted successfully' });
});

// 7. Education
app.get('/api/education', (req, res) => {
  res.json(db.get('education'));
});

app.post('/api/education', authenticateAdmin, (req, res) => {
  const { qualification, institution } = req.body;
  if (!qualification || !institution) {
    return res.status(400).json({ error: 'Qualification and institution are required.' });
  }
  const created = db.create('education', req.body);
  res.status(201).json(created);
});

app.put('/api/education/:id', authenticateAdmin, (req, res) => {
  const updated = db.update('education', req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'Education item not found.' });
  res.json(updated);
});

app.delete('/api/education/:id', authenticateAdmin, (req, res) => {
  const success = db.delete('education', req.params.id);
  if (!success) return res.status(404).json({ error: 'Education item not found.' });
  res.json({ message: 'Education item deleted successfully' });
});

// 8. Testimonials
app.get('/api/testimonials', (req, res) => {
  res.json(db.get('testimonials'));
});

app.post('/api/testimonials', authenticateAdmin, (req, res) => {
  const { clientName, message } = req.body;
  if (!clientName || !message) {
    return res.status(400).json({ error: 'Client name and message are required.' });
  }
  const created = db.create('testimonials', req.body);
  res.status(201).json(created);
});

app.put('/api/testimonials/:id', authenticateAdmin, (req, res) => {
  const updated = db.update('testimonials', req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'Testimonial not found.' });
  res.json(updated);
});

app.delete('/api/testimonials/:id', authenticateAdmin, (req, res) => {
  const success = db.delete('testimonials', req.params.id);
  if (!success) return res.status(404).json({ error: 'Testimonial not found.' });
  res.json({ message: 'Testimonial deleted successfully' });
});

// 9. Contact messages
app.post('/api/contact', rateLimiter(10, 60000), (req, res) => {
  const validation = validateContactForm(req.body);
  if (!validation.isValid) {
    return res.status(400).json({ error: 'Form validation failed', details: validation.errors });
  }

  const { name, email, subject, message } = req.body;
  const created = db.create('contactMessages', {
    name: name.trim(),
    email: email.trim(),
    subject: subject.trim(),
    message: message.trim(),
    status: 'unread'
  });

  console.log(`[Contact Submission] Received from ${name} (${email}): "${subject}"`);

  res.status(201).json({
    success: true,
    message: 'Thank you! Your message has been received securely.',
    contactId: created.id
  });
});

app.get('/api/contact', authenticateAdmin, (req, res) => {
  res.json(db.get('contactMessages'));
});

app.put('/api/contact/:id', authenticateAdmin, (req, res) => {
  const { status } = req.body;
  const updated = db.update('contactMessages', req.params.id, { status });
  if (!updated) return res.status(404).json({ error: 'Message not found.' });
  res.json(updated);
});

app.delete('/api/contact/:id', authenticateAdmin, (req, res) => {
  const success = db.delete('contactMessages', req.params.id);
  if (!success) return res.status(404).json({ error: 'Message not found.' });
  res.json({ message: 'Message deleted successfully' });
});

// 10. Portfolio Settings
app.get('/api/settings', (req, res) => {
  const settings = db.findById('settings', 'settings_1');
  res.json(settings);
});

app.put('/api/settings', authenticateAdmin, (req, res) => {
  const updated = db.update('settings', 'settings_1', req.body);
  res.json(updated);
});

// 11. Admin dashboard metrics
app.get('/api/admin/stats', authenticateAdmin, (req, res) => {
  const projects = db.get('projects');
  const messages = db.get('contactMessages');
  const skills = db.get('skills');
  const services = db.get('services');

  res.json({
    totalProjects: projects.length,
    publishedProjects: projects.filter(p => p.published).length,
    featuredProjects: projects.filter(p => p.featured).length,
    totalMessages: messages.length,
    unreadMessages: messages.filter(m => m.status === 'unread').length,
    totalSkills: skills.length,
    totalServices: services.length
  });
});

// ---------------- VITE MIDDLEWARE OR STATIC SERVING ----------------
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
} else {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa'
  });
  app.use(vite.middlewares);
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[Nexus Server] Running at http://0.0.0.0:${PORT}`);
});
