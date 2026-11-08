import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { Sun, Moon, Menu, X, Shield, Lock, ArrowRight } from 'lucide-react';

export default function Navbar({ onOpenAdmin, onOpenAdminLogin }) {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { label: 'Home', href: '#hero', id: 'hero' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Services', href: '#services', id: 'services' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Education', href: '#experience', id: 'experience' },
    { label: 'Certificates & CV', href: '#certifications', id: 'certifications' },
    { label: 'Contact', href: '#contact', id: 'contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sections = navLinks.map(l => document.getElementById(l.id)).filter(Boolean);
      const scrollPos = window.scrollY + 180;
      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec.offsetTop <= scrollPos) {
          setActiveSection(sec.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'py-3 bg-white/90 dark:bg-[#070A13]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/80 shadow-sm' 
        : 'py-5 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-8">
        
        {/* Zone 1: Brand Wordmark */}
        <a 
          href="#hero" 
          className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0 group"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 via-blue-600 to-cyan-500 flex items-center justify-center text-white font-mono text-sm font-bold shadow-md shadow-purple-500/20 group-hover:scale-105 transition-transform">
            M
          </div>
          <span className="font-heading text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            MUHAMMAD <span className="text-purple-600 dark:text-cyan-400">HASAN</span>
          </span>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600 dark:text-slate-300">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                  isActive
                    ? 'text-purple-600 dark:text-cyan-400 border-purple-600 dark:border-cyan-400 font-semibold'
                    : 'border-transparent text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Actions & Controls */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900/60 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500/40"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-purple-600" />}
          </button>

          {/* Admin Dashboard shortcut */}
          {isAuthenticated ? (
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-purple-100 text-purple-700 dark:bg-purple-600/30 dark:text-purple-300 border border-purple-200 dark:border-purple-500/40 hover:opacity-90 transition-opacity"
              title="Open Admin Dashboard"
            >
              <Shield className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span>Admin</span>
            </button>
          ) : (
            <button
              onClick={onOpenAdminLogin}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900/60 dark:hover:bg-slate-800 text-slate-600 hover:text-purple-600 dark:text-slate-400 dark:hover:text-purple-400 border border-slate-200 dark:border-slate-800 transition-colors"
              title="Admin Login"
              aria-label="Admin Login"
            >
              <Lock className="w-4 h-4" />
            </button>
          )}

          {/* CV Download button */}
          <a
            href="/Muhammad_Hasan_CV.pdf"
            target="_blank"
            rel="noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-semibold rounded-xl text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/80 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors shadow-2xs whitespace-nowrap"
            title="Download Muhammad Hasan CV"
          >
            <span>CV (PDF)</span>
          </a>

          {/* Contact link */}
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-all shadow-sm active:scale-95 whitespace-nowrap"
          >
            <span>Let's Talk</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile hamburger menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-white/95 dark:bg-[#070A13]/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 p-6 shadow-2xl transition-all">
          <nav className="flex flex-col gap-3 text-base font-medium">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 px-3 rounded-lg transition-colors ${
                  activeSection === link.id
                    ? 'text-purple-600 dark:text-cyan-400 bg-purple-50 dark:bg-slate-800/50 font-semibold'
                    : 'text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/30'
                }`}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-3">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-xl font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 shadow-md"
              >
                Get In Touch
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
