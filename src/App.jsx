import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { api } from './services/api';

import Navbar from './components/layout/Navbar';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import SkillsSection from './components/sections/SkillsSection';
import ServicesSection from './components/sections/ServicesSection';
import ProjectsSection from './components/sections/ProjectsSection';
import ExperienceSection from './components/sections/ExperienceSection';
import DevelopmentProcessSection from './components/sections/DevelopmentProcessSection';
import CertificationsDocumentsSection from './components/sections/CertificationsDocumentsSection';
import ContactSection from './components/sections/ContactSection';
import Footer from './components/layout/Footer';
import AdminLoginModal from './components/admin/AdminLoginModal';
import AdminDashboardModal from './components/admin/AdminDashboardModal';

function PortfolioApp() {
  const [settings, setSettings] = useState(null);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [services, setServices] = useState([]);
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  const [adminLoginOpen, setAdminLoginOpen] = useState(false);
  const [adminDashboardOpen, setAdminDashboardOpen] = useState(false);

  const loadData = async () => {
    try {
      const [
        settingsData,
        projectsData,
        skillsData,
        servicesData,
        experienceData,
        educationData,
        testimonialsData
      ] = await Promise.all([
        api.getSettings(),
        api.getProjects(),
        api.getSkills(),
        api.getServices(),
        api.getExperience(),
        api.getEducation(),
        api.getTestimonials()
      ]);

      setSettings(settingsData);
      setProjects(projectsData);
      setSkills(skillsData);
      setServices(servicesData);
      setExperience(experienceData);
      setEducation(educationData);
      setTestimonials(testimonialsData);
    } catch (err) {
      console.error('Failed to load initial portfolio data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#070A13] text-[#0F172A] dark:text-[#F8FAFC] transition-colors duration-300 relative selection:bg-purple-500/30 selection:text-purple-200">
      
      {/* Floating Header */}
      <Navbar
        onOpenAdminLogin={() => setAdminLoginOpen(true)}
        onOpenAdmin={() => setAdminDashboardOpen(true)}
      />

      <main>
        {/* Hero Section with 3D Core */}
        <HeroSection settings={settings} />

        {/* About & Engineering Mindset */}
        <AboutSection settings={settings} />

        {/* Technical Skills Showcase */}
        <SkillsSection skills={skills} />

        {/* Professional Services */}
        <ServicesSection services={services} />

        {/* Project Case Studies & Works */}
        <ProjectsSection projects={projects} />

        {/* Experience & Education */}
        <ExperienceSection experience={experience} education={education} />

        {/* 8-Stage Development Workflow */}
        <DevelopmentProcessSection />

        {/* Official Certifications & CV Documents */}
        <CertificationsDocumentsSection />

        {/* Functional Contact Form */}
        <ContactSection settings={settings} />
      </main>

      {/* Footer */}
      <Footer
        onOpenAdminLogin={() => setAdminLoginOpen(true)}
        onOpenAdmin={() => setAdminDashboardOpen(true)}
      />

      {/* Admin Modals */}
      <AdminLoginModal
        isOpen={adminLoginOpen}
        onClose={() => setAdminLoginOpen(false)}
        onSuccess={() => setAdminDashboardOpen(true)}
      />

      <AdminDashboardModal
        isOpen={adminDashboardOpen}
        onClose={() => setAdminDashboardOpen(false)}
        onDataChanged={loadData}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <PortfolioApp />
      </AuthProvider>
    </ThemeProvider>
  );
}
