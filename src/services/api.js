/**
 * Client API Service communicating with the Express backend
 */

function getHeaders(token = null) {
  const headers = { 'Content-Type': 'application/json' };
  const authToken = token || localStorage.getItem('nexus_auth_token');
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }
  return headers;
}

export const api = {
  // Settings
  async getSettings() {
    const res = await fetch('/api/settings');
    if (!res.ok) throw new Error('Failed to load portfolio settings');
    return res.json();
  },
  async updateSettings(settingsData) {
    const res = await fetch('/api/settings', {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(settingsData)
    });
    if (!res.ok) throw new Error('Failed to update portfolio settings');
    return res.json();
  },

  // Projects
  async getProjects(params = {}) {
    const query = new URLSearchParams();
    if (params.category && params.category !== 'All') query.set('category', params.category);
    if (params.search) query.set('search', params.search);
    if (params.featured) query.set('featured', 'true');

    const res = await fetch(`/api/projects?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch projects');
    return res.json();
  },
  async createProject(project) {
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(project)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to create project');
    }
    return res.json();
  },
  async updateProject(id, project) {
    const res = await fetch(`/api/projects/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(project)
    });
    if (!res.ok) throw new Error('Failed to update project');
    return res.json();
  },
  async deleteProject(id) {
    const res = await fetch(`/api/projects/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    if (!res.ok) throw new Error('Failed to delete project');
    return res.json();
  },

  // Skills
  async getSkills() {
    const res = await fetch('/api/skills');
    if (!res.ok) throw new Error('Failed to fetch skills');
    return res.json();
  },
  async createSkill(skill) {
    const res = await fetch('/api/skills', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(skill)
    });
    if (!res.ok) throw new Error('Failed to create skill');
    return res.json();
  },
  async updateSkill(id, skill) {
    const res = await fetch(`/api/skills/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(skill)
    });
    if (!res.ok) throw new Error('Failed to update skill');
    return res.json();
  },
  async deleteSkill(id) {
    const res = await fetch(`/api/skills/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    if (!res.ok) throw new Error('Failed to delete skill');
    return res.json();
  },

  // Services
  async getServices() {
    const res = await fetch('/api/services');
    if (!res.ok) throw new Error('Failed to fetch services');
    return res.json();
  },
  async createService(service) {
    const res = await fetch('/api/services', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(service)
    });
    if (!res.ok) throw new Error('Failed to create service');
    return res.json();
  },
  async updateService(id, service) {
    const res = await fetch(`/api/services/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(service)
    });
    if (!res.ok) throw new Error('Failed to update service');
    return res.json();
  },
  async deleteService(id) {
    const res = await fetch(`/api/services/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    if (!res.ok) throw new Error('Failed to delete service');
    return res.json();
  },

  // Experience
  async getExperience() {
    const res = await fetch('/api/experience');
    if (!res.ok) throw new Error('Failed to fetch experience');
    return res.json();
  },
  async createExperience(exp) {
    const res = await fetch('/api/experience', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(exp)
    });
    if (!res.ok) throw new Error('Failed to create experience');
    return res.json();
  },
  async updateExperience(id, exp) {
    const res = await fetch(`/api/experience/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(exp)
    });
    if (!res.ok) throw new Error('Failed to update experience');
    return res.json();
  },
  async deleteExperience(id) {
    const res = await fetch(`/api/experience/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    if (!res.ok) throw new Error('Failed to delete experience');
    return res.json();
  },

  // Education
  async getEducation() {
    const res = await fetch('/api/education');
    if (!res.ok) throw new Error('Failed to fetch education');
    return res.json();
  },
  async createEducation(edu) {
    const res = await fetch('/api/education', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(edu)
    });
    if (!res.ok) throw new Error('Failed to create education');
    return res.json();
  },
  async deleteEducation(id) {
    const res = await fetch(`/api/education/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    if (!res.ok) throw new Error('Failed to delete education');
    return res.json();
  },

  // Testimonials
  async getTestimonials() {
    const res = await fetch('/api/testimonials');
    if (!res.ok) throw new Error('Failed to fetch testimonials');
    return res.json();
  },
  async createTestimonial(testimonial) {
    const res = await fetch('/api/testimonials', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(testimonial)
    });
    if (!res.ok) throw new Error('Failed to create testimonial');
    return res.json();
  },
  async deleteTestimonial(id) {
    const res = await fetch(`/api/testimonials/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    if (!res.ok) throw new Error('Failed to delete testimonial');
    return res.json();
  },

  // Contact
  async sendContactMessage(messageData) {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(messageData)
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Failed to submit contact message');
    }
    return data;
  },
  async getContactMessages() {
    const res = await fetch('/api/contact', {
      headers: getHeaders()
    });
    if (!res.ok) throw new Error('Failed to fetch contact messages');
    return res.json();
  },
  async updateMessageStatus(id, status) {
    const res = await fetch(`/api/contact/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({ status })
    });
    if (!res.ok) throw new Error('Failed to update message');
    return res.json();
  },
  async deleteContactMessage(id) {
    const res = await fetch(`/api/contact/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    if (!res.ok) throw new Error('Failed to delete message');
    return res.json();
  },

  // Admin Stats
  async getAdminStats() {
    const res = await fetch('/api/admin/stats', {
      headers: getHeaders()
    });
    if (!res.ok) throw new Error('Failed to fetch admin stats');
    return res.json();
  }
};
