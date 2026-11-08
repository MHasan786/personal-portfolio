import React, { useState } from 'react';
import { Briefcase, GraduationCap, Calendar, Building, Sparkles, ExternalLink, Award, FileText } from 'lucide-react';

export default function ExperienceSection({ experience = [], education = [] }) {
  const [tab, setTab] = useState('education');

  return (
    <section id="experience" className="py-24 relative border-t border-slate-200 dark:border-slate-800/60 bg-white dark:bg-[#070A13] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-medium tracking-wide bg-cyan-100 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/30 text-cyan-800 dark:text-cyan-400">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Foundations & Practical Journey</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading tracking-tight text-slate-900 dark:text-white">
            Education & Practical Experience
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-sm sm:text-base">
            Software Engineering undergraduate at The Islamia University of Bahawalpur, verified DigiSkills WordPress certification, and hands-on open-source web projects.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setTab('education')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                tab === 'education'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Academic Education & Certifications</span>
            </button>
            <button
              onClick={() => setTab('experience')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                tab === 'experience'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Practical Projects & Open Source (Fresh)</span>
            </button>
          </div>
        </div>

        {/* Timeline Content */}
        <div className="max-w-4xl mx-auto">
          {tab === 'education' ? (
            <div className="relative pl-6 sm:pl-8 border-l border-slate-200 dark:border-slate-800 space-y-10">
              {education.map((item, idx) => (
                <div key={item.id || idx} className="relative group">
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-slate-900 border-2 border-cyan-500 dark:border-cyan-400 group-hover:bg-cyan-500 group-hover:scale-125 transition-all shadow-xs" />

                  <div className="p-6 sm:p-7 rounded-3xl bg-slate-50 dark:bg-[#111C30] border border-slate-200 dark:border-slate-800 shadow-sm group-hover:border-cyan-400 dark:group-hover:border-cyan-500/40 transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-heading">
                            {item.qualification}
                          </h3>
                          {item.certificateId && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30">
                              Verified
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-mono text-purple-600 dark:text-purple-400 flex items-center gap-1.5 mt-0.5">
                          <Building className="w-3.5 h-3.5" />
                          <span>{item.institution}</span>
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-600 dark:text-slate-400 px-3 py-1 rounded-lg bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 self-start sm:self-auto shadow-2xs">
                        <Calendar className="w-3 h-3 text-cyan-500" />
                        <span>{item.startDate} — {item.endDate}</span>
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {/* Certificate Action Links */}
                    {(item.certificateUrl || item.verifyUrl) && (
                      <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-200 dark:border-slate-800/80">
                        {item.certificateUrl && (
                          <a
                            href={item.certificateUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-95 transition-opacity"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>View Certificate (PDF)</span>
                          </a>
                        )}
                        {item.verifyUrl && (
                          <a
                            href={item.verifyUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                          >
                            <span>Verify Online (ID: {item.certificateId})</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="relative pl-6 sm:pl-8 border-l border-slate-200 dark:border-slate-800 space-y-10">
              {experience.map((item, idx) => (
                <div key={item.id || idx} className="relative group">
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-slate-900 border-2 border-purple-500 group-hover:bg-purple-500 group-hover:scale-125 transition-all shadow-xs" />

                  <div className="p-6 sm:p-7 rounded-3xl bg-slate-50 dark:bg-[#111C30] border border-slate-200 dark:border-slate-800 shadow-sm group-hover:border-purple-400 dark:group-hover:border-purple-500/40 transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-heading">
                          {item.position}
                        </h3>
                        <p className="text-xs font-mono text-purple-600 dark:text-cyan-400 flex items-center gap-1.5 mt-0.5">
                          <Building className="w-3.5 h-3.5" />
                          <span>{item.company}</span>
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-600 dark:text-slate-400 px-3 py-1 rounded-lg bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 self-start sm:self-auto shadow-2xs">
                        <Calendar className="w-3 h-3 text-purple-500" />
                        <span>{item.startDate} — {item.endDate || (item.current ? 'Present' : '')}</span>
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {Array.isArray(item.technologies) && item.technologies.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-slate-200 dark:border-slate-800/80 text-xs">
                        {item.technologies.map((tech, i) => (
                          <React.Fragment key={tech}>
                            <span className="font-mono text-[11px] text-slate-700 dark:text-slate-300 font-medium">{tech}</span>
                            {i < item.technologies.length - 1 && <span className="text-slate-400 dark:text-slate-600">·</span>}
                          </React.Fragment>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
