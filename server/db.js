import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../data');
const DB_FILE = path.resolve(DATA_DIR, 'portfolio.db.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial seed data
const initialSeed = {
  admin: {
    id: 'admin_1',
    name: 'Admin Portfolio Owner',
    email: 'admin@portfolio.dev',
    // Hash for 'admin123456'
    passwordHash: bcrypt.hashSync('admin123456', 10),
    role: 'superadmin',
    createdAt: new Date().toISOString()
  },
  settings: {
    id: 'settings_1',
    fullName: 'MUHAMMAD HASAN',
    professionalTitle: 'Software Engineering Undergraduate & Frontend Web Developer',
    biography: 'Motivated Bachelor of Science in Software Engineering undergraduate at The Islamia University of Bahawalpur seeking a software engineering or frontend development internship / entry-level role to translate academic foundations into real-world production software. Skilled in building responsive interfaces with HTML5, CSS3, JavaScript, React.js, and Next.js, alongside certified WordPress training through the Government of Pakistan\'s DigiSkills Training Program. Recognized for logical problem-solving, adaptability, and effective collaboration in team and independent workflows.',
    location: 'Mianwali / Bahawalpur, Punjab, Pakistan',
    email: 'mhasan7062@gmail.com',
    socialLinks: {
      github: 'https://github.com/MHasan786',
      linkedin: 'https://linkedin.com',
      whatsapp: '+923200965085',
      phoneSecondary: '+923153865085',
      twitter: 'https://twitter.com'
    },
    resumeUrl: '/Muhammad_Hasan_CV.pdf',
    certificateUrl: '/DSTP_Certificate_WordPress.pdf',
    profileImage: '/assets/aistudio/WhatsApp_Image_2026-11-08_at_5.41.42_PM_536b4075.jpeg',
    availability: 'Available for Software Engineering & Frontend Internships',
    yearsOfExperience: 0,
    experienceLevel: 'Fresh Graduate / Undergraduate',
    projectsCompleted: 2,
    clientsServed: 0,
    technologiesCount: 8,
    updatedAt: new Date().toISOString()
  },
  skills: [
    // 10 User-Specified Core Skills with Exact Benchmarked Percentages
    { id: 's1', name: 'HTML5', category: 'Frontend Development', proficiency: 95, icon: 'Layout', displayOrder: 1, isCore: true },
    { id: 's2', name: 'CSS3', category: 'Frontend Development', proficiency: 90, icon: 'Palette', displayOrder: 2, isCore: true },
    { id: 's3', name: 'JavaScript (ES6+)', category: 'Frontend Development', proficiency: 80, icon: 'Code', displayOrder: 3, isCore: true },
    { id: 's4', name: 'Tailwind CSS', category: 'Frontend Development', proficiency: 80, icon: 'Palette', displayOrder: 4, isCore: true },
    { id: 's5', name: 'Bootstrap', category: 'Frontend Development', proficiency: 70, icon: 'Layout', displayOrder: 5, isCore: true },
    { id: 's6', name: 'React.js', category: 'Frontend Development', proficiency: 70, icon: 'Atom', displayOrder: 6, isCore: true },
    { id: 's7', name: 'Next.js', category: 'Frontend Development', proficiency: 60, icon: 'Globe', displayOrder: 7, isCore: true },
    { id: 's8', name: 'Node.js', category: 'Backend Development', proficiency: 60, icon: 'Server', displayOrder: 8, isCore: true },
    { id: 's9', name: 'Express.js', category: 'Backend Development', proficiency: 50, icon: 'Cpu', displayOrder: 9, isCore: true },
    { id: 's10', name: 'MongoDB', category: 'Database', proficiency: 40, icon: 'Database', displayOrder: 10, isCore: true },
    { id: 's11', name: 'WordPress', category: 'CMS & Web Publishing', proficiency: 85, icon: 'Globe', displayOrder: 11, isCore: true },
    { id: 's12', name: 'Git & GitHub', category: 'Tools & Platforms', proficiency: 80, icon: 'GitBranch', displayOrder: 12, isCore: true }
  ],
  services: [
    {
      id: 'srv1',
      title: 'Frontend Web Development',
      description: 'Building modern, responsive, and cross-browser accessible web interfaces using React.js, Next.js, HTML5, CSS3, and Tailwind CSS.',
      icon: 'Layout',
      technologies: ['React.js', 'Next.js', 'Tailwind CSS', 'HTML5', 'CSS3'],
      displayOrder: 1,
      active: true
    },
    {
      id: 'srv2',
      title: 'Full-Stack JavaScript (MERN)',
      description: 'Developing complete full-stack web applications with React frontend, Express.js REST API routes, and MongoDB database storage.',
      icon: 'Layers',
      technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs'],
      displayOrder: 2,
      active: true
    },
    {
      id: 'srv3',
      title: 'WordPress Development & CMS',
      description: 'Certified WordPress site setup, theme customization, responsive page layout creation, and plugin integration.',
      icon: 'Globe',
      technologies: ['WordPress', 'Theme Customization', 'Plugin Integration', 'DigiSkills Certified'],
      displayOrder: 3,
      active: true
    },
    {
      id: 'srv4',
      title: 'Algorithmic Problem Solving & Clean Code',
      description: 'Applying solid Object-Oriented Programming (OOP) and Data Structures & Algorithms principles to build maintainable, error-free code.',
      icon: 'Compass',
      technologies: ['JavaScript ES6+', 'OOP', 'Data Structures', 'Debugging'],
      displayOrder: 4,
      active: true
    }
  ],
  projects: [
    {
      id: 'p1',
      title: 'NeoCalc: Interactive Scientific & Standard Calculator',
      slug: 'calculator-scientific-engine',
      description: 'A high-precision web calculator with standard arithmetic, scientific functions (trigonometry, logarithms, powers), memory registers, calculation history ledger, and keyboard event support.',
      category: 'Web Applications',
      featured: true,
      published: true,
      image: 'https://images.unsplash.com/photo-1587145820266-a5951ee6f620?auto=format&fit=crop&w=1200&q=80',
      technologies: ['JavaScript ES6+', 'React', 'HTML5', 'CSS3', 'Tailwind CSS'],
      features: [
        'Standard arithmetic operations and scientific trigonometric / logarithmic math functions',
        'Real-time calculation history drawer with memory recall and clear actions',
        'Full keyboard event listener support (numeric keypad, operator shortcuts, backspace)',
        'Floating-point rounding precision engine preventing JavaScript decimal inaccuracies'
      ],
      githubUrl: 'https://github.com/MHasan786/JavaScript-Problem',
      liveUrl: 'https://calculator.demo.dev',
      displayOrder: 1,
      createdAt: '2026-01-15T10:00:00Z'
    },
    {
      id: 'p2',
      title: 'Atmosphere: Real-Time Weather & 7-Day Forecast Web App',
      slug: 'weather-forecast-app',
      description: 'A real-time meteorological weather web application featuring live temperature tracking, geolocation detection, dynamic atmospheric icons, 24-hour hourly precipitation curves, and 7-day extended forecasts.',
      category: 'Frontend Projects',
      featured: true,
      published: true,
      image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?auto=format&fit=crop&w=1200&q=80',
      technologies: ['React', 'JavaScript ES6+', 'REST APIs', 'Tailwind CSS', 'HTML5', 'CSS3'],
      features: [
        'Live temperature, humidity, UV index, wind speed, and atmospheric pressure metrics',
        'Geolocation lookup with instant global city search and weather caching',
        'Dynamic atmospheric visual themes shifting between sunny, stormy, snowy, and nighttime',
        '7-day future forecast cards with high/low temperature ranges and precipitation radar'
      ],
      githubUrl: 'https://github.com/MHasan786',
      liveUrl: 'https://weather-atmosphere.demo.dev',
      displayOrder: 2,
      createdAt: '2026-02-01T14:30:00Z'
    },
    {
      id: 'p3',
      title: 'Vogue & Thread: Modern Apparel & Cloth Store',
      slug: 'cloth-apparel-store',
      description: 'A full-featured responsive online cloth and fashion storefront featuring dynamic apparel collections, size & color variant switchers, instantaneous filter by category, cart checkout, and Stripe payment integration.',
      category: 'E-commerce Projects',
      featured: true,
      published: true,
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
      technologies: ['React', 'Next.js', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
      features: [
        'Curated apparel catalog with men\'s, women\'s, streetwear, and accessory collections',
        'Interactive product detail view with interactive size guide and color swatch selector',
        'Persistent shopping cart with live quantity manipulation and coupon discounts',
        'Integrated checkout flow with Stripe payment intent API and order confirmation'
      ],
      githubUrl: 'https://github.com/MHasan786',
      liveUrl: 'https://vogue-cloth-store.demo.dev',
      displayOrder: 3,
      createdAt: '2026-02-18T09:15:00Z'
    },
    {
      id: 'p4',
      title: 'Haven Estate: Luxury Real Estate & Property Portal',
      slug: 'haven-real-estate-portal',
      description: 'A full-stack real estate and residential property discovery platform offering interactive map search, price range & bedroom filters, virtual 3D tour viewports, and direct agent tour booking.',
      category: 'Full-Stack Projects',
      featured: true,
      published: true,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'REST APIs'],
      features: [
        'Faceted property search by price bounds, square footage, bedrooms, and property type',
        'Interactive map view with pinned properties and instant preview hover cards',
        'Virtual 3D tour photo galleries with high-resolution interior architectural showcases',
        'Direct agent appointment scheduler and contact inquiry pipeline stored in MongoDB'
      ],
      githubUrl: 'https://github.com/MHasan786',
      liveUrl: 'https://haven-estate.demo.dev',
      displayOrder: 4,
      createdAt: '2026-03-05T16:45:00Z'
    }
  ],
  experience: [
    {
      id: 'exp1',
      position: 'Frontend & Algorithmic Development (Academic & Open Source)',
      company: 'GitHub (@MHasan786) & Cloud Environments',
      startDate: '2025',
      endDate: 'Present',
      current: true,
      description: 'Developed and maintained JavaScript algorithmic problem-solving exercises (MHasan786/JavaScript-Problem) and interactive data structure visualization practices. Built practical web applications including Calculator, Weather Web App, Cloth Store, and Real Estate portal.',
      technologies: ['JavaScript ES6+', 'React.js', 'Next.js', 'HTML5', 'CSS3', 'Tailwind CSS', 'Express.js', 'MongoDB Atlas']
    },
    {
      id: 'exp2',
      position: 'Registered Candidate — Chief Minister IT Internship Program (CMITIP)',
      company: 'Government of the Punjab',
      startDate: 'Oct 2026',
      endDate: 'Present',
      current: true,
      description: 'Registered candidate for the Government of the Punjab Chief Minister IT Internship Program (CMITIP) to apply frontend and full-stack software development skills to public-sector digital systems.',
      technologies: ['Software Engineering', 'Frontend Web Development', 'MERN Stack']
    }
  ],
  education: [
    {
      id: 'edu1',
      qualification: 'Bachelor of Science in Software Engineering (BSSE)',
      institution: 'The Islamia University of Bahawalpur (IUB) — Bahawalpur, Punjab, Pakistan',
      startDate: '2023',
      endDate: '2027 (In Progress)',
      description: 'Pursuing undergraduate coursework in software design, web engineering, database systems, operating systems, and algorithmic problem solving while applying React.js, Next.js, and Git workflows to practical coding exercises.'
    },
    {
      id: 'edu2',
      qualification: 'WordPress Training Certification (DigiSkills)',
      institution: 'Ministry of IT & Telecom / Ignite & Virtual University of Pakistan (DSTP 3.0, Batch-02)',
      startDate: 'Dec 2025',
      endDate: 'Mar 2026',
      certificateId: 'YSRYZH9MK',
      certificateUrl: '/DSTP_Certificate_WordPress.pdf',
      verifyUrl: 'https://digiskills.pk/verify',
      description: 'Completed practical training in WordPress web development, covering custom theme configuration, responsive page building, and site deployment (Issued: March 14, 2026; Certificate ID: YSRYZH9MK — verifiable at digiskills.pk/verify).'
    },
    {
      id: 'edu3',
      qualification: 'Intermediate in Computer Science (ICS)',
      institution: 'Jinnah College, Piplan — District Mianwali, Punjab, Pakistan',
      startDate: '2020',
      endDate: '2022',
      description: 'Completed higher secondary concentration in Computer Science, Mathematics, and Physics, establishing a strong analytical and programming foundation.'
    }
  ],
  testimonials: [],
  contactMessages: [
    {
      id: 'msg1',
      name: 'Academic Coordinator',
      email: 'coordinator@iub.edu.pk',
      subject: 'Software Engineering Internship Opportunity',
      message: 'Hi Muhammad Hasan, welcome to the internship matching program. We have reviewed your frontend projects and DigiSkills WordPress certification.',
      status: 'unread',
      createdAt: '2026-11-08T10:00:00Z'
    }
  ]
};

// Database class managing memory and disk persistence
class DatabaseStore {
  constructor() {
    this.data = initialSeed;
    this.load();
  }

  load() {
    try {
      if (fs.existsSync(DB_FILE)) {
        const fileContent = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(fileContent);
        this.data = { ...initialSeed, ...parsed };
      } else {
        this.save();
      }
    } catch (err) {
      console.error('Error loading DB from file, using fallback seed:', err);
      this.data = initialSeed;
      this.save();
    }
  }

  save() {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Error saving DB to file:', err);
    }
  }

  // Collection accessors
  get(collection) {
    return this.data[collection] || [];
  }

  findById(collection, id) {
    if (collection === 'admin' || collection === 'settings') {
      return this.data[collection];
    }
    const items = this.data[collection] || [];
    return items.find(item => item.id === id);
  }

  create(collection, item) {
    if (!this.data[collection]) {
      this.data[collection] = [];
    }
    const newItem = {
      ...item,
      id: item.id || `${collection}_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      createdAt: item.createdAt || new Date().toISOString()
    };
    this.data[collection].push(newItem);
    this.save();
    return newItem;
  }

  update(collection, id, updates) {
    if (collection === 'settings') {
      this.data.settings = { ...this.data.settings, ...updates, updatedAt: new Date().toISOString() };
      this.save();
      return this.data.settings;
    }
    if (collection === 'admin') {
      this.data.admin = { ...this.data.admin, ...updates, updatedAt: new Date().toISOString() };
      this.save();
      return this.data.admin;
    }

    const items = this.data[collection] || [];
    const index = items.findIndex(item => item.id === id);
    if (index === -1) return null;

    items[index] = { ...items[index], ...updates, updatedAt: new Date().toISOString() };
    this.save();
    return items[index];
  }

  delete(collection, id) {
    const items = this.data[collection] || [];
    const index = items.findIndex(item => item.id === id);
    if (index === -1) return false;

    items.splice(index, 1);
    this.save();
    return true;
  }
}

export const db = new DatabaseStore();
