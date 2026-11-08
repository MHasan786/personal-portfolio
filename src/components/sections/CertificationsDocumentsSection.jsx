import React from 'react';
import { Award, FileText, CheckCircle2, ExternalLink, Download, GraduationCap, ShieldCheck, Sparkles } from 'lucide-react';

export default function CertificationsDocumentsSection() {
  return (
    <section id="certifications" className="py-24 relative border-t border-slate-200 dark:border-slate-800/60 bg-[#F8FAFC] dark:bg-[#070A13] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-medium tracking-wide bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-400">
            <Award className="w-3.5 h-3.5" />
            <span>Credentials & Official Verification</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading tracking-tight text-slate-900 dark:text-white">
            Official Documents & Certifications
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-sm sm:text-base">
            Verified academic documents, government training certifications, and downloadable Curriculum Vitae (CV) of Muhammad Hasan.
          </p>
        </div>

        {/* 2-Column High-Impact Card Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* Card 1: Official CV (PDF) */}
          <div className="p-8 rounded-3xl bg-white dark:bg-[#111C30] border border-slate-200 dark:border-slate-800 shadow-md hover:border-purple-400/80 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/30 flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:scale-105 transition-transform">
                  <FileText className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                  Official Resume · PDF
                </span>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-heading mb-2">
                Muhammad Hasan — Curriculum Vitae (CV)
              </h3>
              <p className="text-xs font-mono text-purple-600 dark:text-cyan-400 font-semibold mb-4">
                Software Engineering Undergraduate & Frontend Web Developer
              </p>

              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                Complete resume detailing academic background at The Islamia University of Bahawalpur, technical competencies in HTML5, CSS3, JavaScript, React.js, Next.js, and WordPress, practical GitHub problem-solving repositories, and language proficiencies.
              </p>

              {/* Highlights Checklist */}
              <div className="space-y-2 mb-6 text-xs text-slate-700 dark:text-slate-300 font-mono">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>BS Software Engineering (2023 – 2027 In Progress)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Intermediate in Computer Science (ICS, 2020 – 2022)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>GitHub Portfolio: github.com/MHasan786</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Phone: +92 320 0965085 · Email: mhasan7062@gmail.com</span>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center gap-3">
              <a
                href="/Muhammad_Hasan_CV.pdf"
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 px-4 rounded-xl text-center text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-95 shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download CV (PDF)</span>
              </a>
              <a
                href="/Muhammad_Hasan_CV.pdf"
                target="_blank"
                rel="noreferrer"
                className="py-3 px-4 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>View Fullscreen</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card 2: DigiSkills WordPress Certificate */}
          <div className="p-8 rounded-3xl bg-white dark:bg-[#111C30] border border-slate-200 dark:border-slate-800 shadow-md hover:border-emerald-400/80 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-105 transition-transform">
                  <Award className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Verified DigiSkills · Govt. of Pakistan</span>
                </span>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-heading mb-2">
                WordPress Training Certification
              </h3>
              <p className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold mb-4">
                Ministry of IT & Telecom / Ignite & Virtual University of Pakistan
              </p>

              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                Official Government certificate completed under the DigiSkills Training Program (DSTP 3.0, Batch-02). Covers professional WordPress web development, theme configuration, responsive page construction, plugin integration, and production deployment.
              </p>

              {/* Certificate Verification Metadata */}
              <div className="space-y-2 mb-6 text-xs text-slate-700 dark:text-slate-300 font-mono">
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400">Recipient Name:</span>
                  <span className="font-bold text-slate-900 dark:text-white">MUHAMMAD HASAN</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400">Certificate ID:</span>
                  <span className="font-bold text-purple-600 dark:text-cyan-400 font-mono">YSRYZH9MK</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400">Course & Batch:</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">WordPress (Dec 2025 – Mar 2026)</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400">Issue Date:</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">14/03/2026</span>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center gap-3">
              <a
                href="/DSTP_Certificate_WordPress.pdf"
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 px-4 rounded-xl text-center text-xs font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-95 shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>View Certificate (PDF)</span>
              </a>
              <a
                href="https://digiskills.pk/verify"
                target="_blank"
                rel="noreferrer"
                className="py-3 px-4 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Verify at digiskills.pk/verify with ID YSRYZH9MK"
              >
                <span>Verify Online</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

        {/* Academic University Highlight Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#111C30] border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-purple-600 dark:text-cyan-400 font-semibold">Undergraduate Program</span>
              <h4 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-heading">
                Bachelor of Science in Software Engineering (BSSE)
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                The Islamia University of Bahawalpur (IUB) — Bahawalpur, Punjab, Pakistan | 2023 – 2027 (In Progress)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl text-xs font-mono font-medium text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800">
              Fresh Candidate · Seeking Internships
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
