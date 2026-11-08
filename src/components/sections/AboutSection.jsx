import React from 'react';
import { Code2, Server, Database, Sparkles, CheckCircle2, Award, Users, Briefcase, Zap } from 'lucide-react';

export default function AboutSection({ settings }) {
  const bio = settings?.biography || 'Motivated Bachelor of Science in Software Engineering undergraduate at The Islamia University of Bahawalpur seeking a software engineering or frontend development internship to translate academic foundations into real-world production software. Skilled in building responsive interfaces with HTML5, CSS3, JavaScript, React.js, and Next.js, alongside certified WordPress training through the Government of Pakistan\'s DigiSkills Training Program.';

  const stats = [
    { label: 'Academic Standing', value: 'Fresh BSSE', icon: Briefcase, color: 'text-purple-600 dark:text-purple-400', sub: 'IUB Bahawalpur' },
    { label: 'Completed Projects', value: '2+', icon: CheckCircle2, color: 'text-cyan-600 dark:text-cyan-400', sub: 'Calculator & Web Apps' },
    { label: 'Core Technologies', value: '8', icon: Zap, color: 'text-blue-600 dark:text-blue-400', sub: 'MERN & Modern Web' },
    { label: 'DigiSkills Certified', value: 'Govt. Verified', icon: Award, color: 'text-emerald-600 dark:text-emerald-400', sub: 'ID: YSRYZH9MK' }
  ];

  const pillars = [
    {
      title: 'Frontend Engineering',
      desc: 'Building clean, modular, and responsive interfaces with React.js, Next.js, JavaScript (ES6+), HTML5, CSS3, and Tailwind CSS.',
      icon: Code2
    },
    {
      title: 'Full-Stack JavaScript',
      desc: 'Developing Express.js REST API routes, connecting MongoDB Atlas databases, and configuring cloud deployment pipelines.',
      icon: Server
    },
    {
      title: 'Algorithmic Problem Solving',
      desc: 'Practicing Data Structures & Algorithms, Object-Oriented Programming (OOP), and clean software engineering architectures.',
      icon: Database
    }
  ];

  return (
    <section id="about" className="py-24 relative border-t border-slate-200 dark:border-slate-800/60 bg-white dark:bg-[#070A13] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-medium tracking-wide bg-purple-100 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/30 text-purple-700 dark:text-purple-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Academic & Professional Profile</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading tracking-tight text-slate-900 dark:text-white">
            About Me & Software Engineering Foundations
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-sm sm:text-base">
            Bachelor of Science in Software Engineering student at The Islamia University of Bahawalpur, building responsive web applications with modern frontend & full-stack technologies.
          </p>
        </div>

        {/* Main Grid: Profile Bio & Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          
          {/* Profile Card & User's Uploaded Photo Presentation */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl bg-slate-50 dark:bg-[#111C30] border border-slate-200 dark:border-slate-800 p-6 overflow-hidden shadow-lg transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
              
              {/* Profile Image Container */}
              <div className="relative aspect-[4/5] sm:aspect-square w-full rounded-2xl overflow-hidden mb-6 border border-slate-300 dark:border-slate-700 shadow-xl bg-slate-100 dark:bg-slate-900 group">
                <img
                  src="/assets/aistudio/WhatsApp_Image_2026-11-08_at_5.41.42_PM_536b4075.jpeg"
                  alt="Muhammad Hasan - Software Engineering Undergraduate"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-85" />
                
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-xl font-bold text-white font-heading">{settings?.fullName || 'MUHAMMAD HASAN'}</p>
                  <p className="text-xs font-mono text-cyan-300 font-semibold">{settings?.professionalTitle || 'Software Engineering Undergraduate & Frontend Web Developer'}</p>
                  <p className="text-xs text-slate-300 mt-0.5">{settings?.location || 'Mianwali / Bahawalpur, Punjab, Pakistan'}</p>
                </div>
              </div>

              {/* Quick Summary Badges */}
              <div className="grid grid-cols-2 gap-3 text-center text-xs font-mono mb-4">
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-xs">
                  <span className="block text-purple-600 dark:text-purple-400 font-bold text-sm">BS Software Eng.</span>
                  <span className="text-slate-600 dark:text-slate-400">IUB (2023 – 2027)</span>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-xs">
                  <span className="block text-cyan-600 dark:text-cyan-400 font-bold text-sm">DigiSkills Certified</span>
                  <span className="text-slate-600 dark:text-slate-400">WordPress Dev</span>
                </div>
              </div>

              {/* Document Download Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                <a
                  href="/Muhammad_Hasan_CV.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 px-3 rounded-xl text-center text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-95 shadow-sm transition-all flex items-center justify-center gap-1.5"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Download CV (PDF)</span>
                </a>
                <a
                  href="/DSTP_Certificate_WordPress.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 px-3 rounded-xl text-center text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Award className="w-3.5 h-3.5 text-emerald-500" />
                  <span>DigiSkills Cert (PDF)</span>
                </a>
              </div>

            </div>
          </div>

          {/* Biography Text & Principles */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-heading">
              Translating academic foundations into real-world software solutions.
            </h3>
            
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base">
              {bio}
            </p>

            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm sm:text-base">
              Currently pursuing my <strong className="text-slate-900 dark:text-white font-semibold">Bachelor of Science in Software Engineering (BSSE)</strong> at <strong className="text-slate-900 dark:text-white font-semibold">The Islamia University of Bahawalpur (IUB)</strong>. I am a fresh graduate/undergraduate candidate actively seeking software engineering and frontend development internships or entry-level roles.
            </p>

            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm sm:text-base">
              Alongside university coursework in algorithms, data structures, and software architecture, I completed the official <strong className="text-slate-900 dark:text-white font-semibold">DigiSkills Training Program</strong> (Government of Pakistan / Ignite / Virtual University) in WordPress Web Development, earning verified certification <span className="font-mono text-purple-600 dark:text-cyan-400 font-bold">#YSRYZH9MK</span>.
            </p>

            {/* 3 Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              {pillars.map((pillar, i) => {
                const Icon = pillar.icon;
                return (
                  <div key={i} className="p-4 rounded-2xl bg-slate-50 dark:bg-[#111C30]/50 border border-slate-200 dark:border-slate-800 shadow-xs">
                    <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-2">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">{pillar.title}</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{pillar.desc}</p>
                  </div>
                );
              })}
            </div>

          </div>

        </div>

        {/* Dynamic Statistics Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-[#111C30] border border-slate-200 dark:border-slate-800 text-center relative overflow-hidden group hover:border-purple-500/50 transition-all shadow-sm"
              >
                <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-slate-100 dark:bg-slate-900/80 flex items-center justify-center border border-slate-200 dark:border-slate-800 group-hover:scale-110 transition-transform">
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-slate-900 dark:text-white mb-1 tabular-nums">
                  {stat.value}
                </div>
                <div className="text-xs font-mono text-slate-600 dark:text-slate-300 font-semibold uppercase tracking-wider mb-0.5">
                  {stat.label}
                </div>
                <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  {stat.sub}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
