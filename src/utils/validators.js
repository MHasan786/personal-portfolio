/**
 * Validation utilities for Portfolio forms and APIs
 */

export function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
}

export function validateContactForm(data) {
  const errors = {};
  
  if (!data?.name || data.name.trim().length < 2) {
    errors.name = 'Full name must be at least 2 characters.';
  }
  
  if (!data?.email || !isValidEmail(data.email)) {
    errors.email = 'Please provide a valid email address.';
  }
  
  if (!data?.subject || data.subject.trim().length < 3) {
    errors.subject = 'Subject must be at least 3 characters.';
  }
  
  if (!data?.message || data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validateProjectData(data) {
  const errors = {};

  if (!data?.title || data.title.trim().length < 3) {
    errors.title = 'Project title is required (min 3 chars).';
  }

  if (!data?.description || data.description.trim().length < 10) {
    errors.description = 'Description is required (min 10 chars).';
  }

  if (!data?.category) {
    errors.category = 'Project category is required.';
  }

  if (!Array.isArray(data?.technologies) || data.technologies.length === 0) {
    errors.technologies = 'At least one technology is required.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function slugify(text) {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}
