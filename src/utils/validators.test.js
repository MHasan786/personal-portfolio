import test from 'node:test';
import assert from 'node:assert/strict';
import { isValidEmail, validateContactForm, validateProjectData, slugify } from './validators.js';

test('email validation correctly accepts valid emails', () => {
  assert.equal(isValidEmail('developer@nexus.io'), true);
  assert.equal(isValidEmail('test.user+tag@domain.co.uk'), true);
});

test('email validation rejects invalid emails', () => {
  assert.equal(isValidEmail(''), false);
  assert.equal(isValidEmail('plainaddress'), false);
  assert.equal(isValidEmail('missing@tld'), false);
  assert.equal(isValidEmail('@nodomain.com'), false);
});

test('contact form validation rejects empty or too short submissions', () => {
  const result = validateContactForm({
    name: '',
    email: 'bad',
    subject: 'hi',
    message: 'short'
  });
  assert.equal(result.isValid, false);
  assert.ok(result.errors.name);
  assert.ok(result.errors.email);
  assert.ok(result.errors.subject);
  assert.ok(result.errors.message);
});

test('contact form validation approves well-formed submissions', () => {
  const result = validateContactForm({
    name: 'Alex Mercer',
    email: 'alex@example.com',
    subject: 'Collaboration on Next-Gen Web App',
    message: 'Hello, I would love to discuss an upcoming React & Node.js development project with you.'
  });
  assert.equal(result.isValid, true);
  assert.equal(Object.keys(result.errors).length, 0);
});

test('project validation requires title, description, category, and technologies', () => {
  const invalid = validateProjectData({});
  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.title);

  const valid = validateProjectData({
    title: 'Cloud Orchestration Platform',
    description: 'A scalable Kubernetes microservices orchestration dashboard.',
    category: 'Full-Stack Projects',
    technologies: ['React', 'Node.js', 'MongoDB', 'Docker']
  });
  assert.equal(valid.isValid, true);
});

test('slugify transforms title into url-friendly slug', () => {
  assert.equal(slugify('AI 3D Interactive Portfolio!'), 'ai-3d-interactive-portfolio');
  assert.equal(slugify('Next.js & Tailwind Dashboard'), 'nextjs-tailwind-dashboard');
});
