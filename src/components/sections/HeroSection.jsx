import React, { useState, useEffect } from 'react';
import Hero3DCanvas from '../3d/Hero3DCanvas';
import { ArrowDown, Github, Linkedin, Mail, MessageSquare, Download, Sparkles, Terminal, ExternalLink } from 'lucide-react';

const titles = [
  'Software Engineering Undergraduate (IUB)',
  'Frontend Web Developer',
  'React.js & Next.js Developer',
  'DigiSkills Certified WordPress Specialist'
];

export default function HeroSection({ settings }) {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(70);

  useEffect(() => {
    const currentTitle = titles[titleIndex];
    let timer;

    if (!isDeleting && displayText === currentTitle) {
      timer = setTimeout(() => setIsDeleting(true), 2400);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setTitleIndex((prev) => (prev + 1) % titles.length);
      setTypingSpeed(80);
    } else {
      timer = setTimeout(() => {
        const nextText = isDeleting
          ? currentTitle.substring(0, displayText.length - 1)
          : currentTitle.substring(0, displayText.length + 1);
        setDisplayText(nextText);
        setTypingSpeed(isDeleting ? 40 : 70);
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, titleIndex, typingSpeed]);

  const name = settings?.fullName || 'MUHAMMAD HASAN';
  const availability = settings?.availability || 'Available for Software Engineering & Frontend Internships';

  return (
    <section id="hero" className="relative min-h-[92vh] pt-28 pb-16 flex items-center justify-center overflow-hidden bg-[#F8FAFC] dark:bg-[#070A13] transition-colors duration-300">
      {/* Background ambient lighting gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[450px] bg-gradient-to-tr from-purple-500/10 via-blue-500/5 to-cyan-500/10 dark:from-purple-600/15 dark:via-blue-600/10 dark:to-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-500/5 dark:bg-purple-700/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-cyan-500/5 dark:bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typographic Presentation */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            
            {/* Availability status badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium tracking-wide bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-400 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400" />
              <span>{availability}</span>
            </div>

            {/* Headline */}
            <div className="space-y-3">
              <p className="text-sm sm:text-base font-mono uppercase tracking-widest text-purple-600 dark:text-cyan-400 font-semibold">
                Hi, I'm {name}
              </p>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-heading tracking-tight text-slate-900 dark:text-white leading-[1.08]">
                MUHAMMAD <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">HASAN</span>
              </h1>
              <p className="text-lg sm:text-xl font-medium text-slate-700 dark:text-slate-300">
                Software Engineering Undergraduate & Frontend Web Developer
              </p>
            </div>

            {/* Animated Title Display */}
            <div className="h-10 sm:h-8 flex items-center">
              <p className="text-lg sm:text-xl font-medium text-slate-700 dark:text-slate-300 font-mono flex items-center">
                <span>{displayText}</span>
                <span className="w-2.5 h-5 ml-1 bg-purple-600 dark:bg-cyan-400 animate-pulse" />
              </p>
            </div>

            {/* Supporting Description */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
              BS Software Engineering student at The Islamia University of Bahawalpur (IUB). Building responsive, modular web applications with HTML5, CSS3, JavaScript, React.js, and Next.js, backed by certified DigiSkills WordPress training.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 hover:opacity-95 transition-all shadow-md active:scale-95"
              >
                <span>Explore Projects</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <a
                href="/Muhammad_Hasan_CV.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl font-semibold text-xs sm:text-sm text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/80 hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-all shadow-xs"
              >
                <Download className="w-4 h-4" />
                <span>Download CV</span>
              </a>

              <a
                href="/DSTP_Certificate_WordPress.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl font-semibold text-xs sm:text-sm text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-all shadow-xs"
              >
                <Sparkles className="w-4 h-4" />
                <span>DigiSkills Cert</span>
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl font-semibold text-xs sm:text-sm text-slate-700 dark:text-slate-200 bg-white dark:bg-[#111C30]/80 border border-slate-300 dark:border-slate-700/80 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-xs active:scale-95"
              >
                <MessageSquare className="w-4 h-4 text-purple-600 dark:text-cyan-400" />
                <span>Contact Me</span>
              </a>
            </div>

            {/* Social Links Bar */}
            <div className="pt-4 flex items-center gap-4 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800/80 w-full max-w-md">
              <span className="text-xs font-mono tracking-wider text-slate-500 dark:text-slate-400 uppercase">Connect:</span>
              <a
                href={settings?.socialLinks?.github || 'https://github.com/MHasan786'}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:text-purple-600 dark:hover:text-cyan-400 hover:scale-110 transition-all shadow-xs"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={settings?.socialLinks?.linkedin || 'https://linkedin.com'}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-110 transition-all shadow-xs"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${settings?.email || 'mhasan7062@gmail.com'}`}
                className="p-2 rounded-lg bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:text-purple-600 dark:hover:text-purple-400 hover:scale-110 transition-all shadow-xs"
                aria-label="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

          </div>

          {/* Right Column: Interactive 3D Canvas */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="w-full relative rounded-3xl bg-white dark:bg-[#111C30]/75 border border-slate-200 dark:border-slate-800 p-2 sm:p-4 shadow-xl dark:shadow-none">
              
              {/* Terminal badge header */}
              <div className="flex items-center justify-between px-3 py-2 border-b border-slate-200 dark:border-slate-800/80 text-xs font-mono text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-slate-600 dark:text-slate-400">nexus_core_3d.mesh</span>
                </div>
                <div className="flex items-center gap-1.5 text-purple-600 dark:text-cyan-400 font-medium">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Interactive 3D</span>
                </div>
              </div>

              {/* 3D Scene */}
              <Hero3DCanvas />

              {/* Interactive caption */}
              <div className="text-center pb-2 pt-1">
                <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1.5">
                  <Terminal className="w-3 h-3 text-purple-600 dark:text-cyan-400" />
                  <span>Move mouse / pointer to interact with 3D nodes</span>
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Subtle scroll down indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-400 text-xs font-mono pointer-events-none animate-bounce">
        <span>Scroll</span>
        <ArrowDown className="w-3.5 h-3.5" />
      </div>
    </section>
  );
}
