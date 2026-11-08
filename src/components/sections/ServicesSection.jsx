import React, { useState } from 'react';
import { Layout, Layers, Box, Server, Database, Zap, ArrowRight, CheckCircle, X } from 'lucide-react';

const iconMap = {
  Layout: Layout,
  Layers: Layers,
  Box: Box,
  Server: Server,
  Database: Database,
  Zap: Zap
};

export default function ServicesSection({ services = [] }) {
  const [activeModalService, setActiveModalService] = useState(null);

  return (
    <section id="services" className="py-24 relative border-t border-slate-200 dark:border-slate-800/60 bg-white dark:bg-[#070A13] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide bg-blue-100 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 text-blue-700 dark:text-blue-400">
            <Layers className="w-3.5 h-3.5" />
            <span>Solutions & Offerings</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading tracking-tight text-slate-900 dark:text-white">
            Professional Engineering Services
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-sm sm:text-base">
            End-to-end full stack execution, custom 3D web visualizations, and scalable API systems built for production reliability.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => {
            const Icon = iconMap[service.icon] || Layout;
            return (
              <div
                key={service.id || idx}
                className="p-7 rounded-3xl bg-slate-50 dark:bg-[#111C30] border border-slate-200 dark:border-slate-800 group hover:border-purple-400 dark:hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-100 to-cyan-100 dark:from-purple-600/20 dark:to-cyan-500/20 border border-purple-200 dark:border-purple-500/30 flex items-center justify-center text-purple-600 dark:text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 font-heading">
                    {service.title}
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                <div>
                  {/* Clean unboxed technology metadata with typographic separator */}
                  {Array.isArray(service.technologies) && service.technologies.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-6 pt-4 border-t border-slate-200 dark:border-slate-800/80">
                      {service.technologies.map((tech, i) => (
                        <React.Fragment key={tech}>
                          <span className="text-slate-700 dark:text-slate-300 font-mono text-[11px]">{tech}</span>
                          {i < service.technologies.length - 1 && <span className="text-slate-400 dark:text-slate-600 font-mono">·</span>}
                        </React.Fragment>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setActiveModalService(service)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-600 dark:text-cyan-400 hover:text-purple-700 dark:hover:text-cyan-300 transition-colors cursor-pointer"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <a
                      href="#contact"
                      className="text-xs font-mono text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                    >
                      Inquire →
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Detail Modal */}
      {activeModalService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#101728] border border-slate-200 dark:border-slate-700 rounded-3xl p-6 sm:p-8 max-w-lg w-full relative shadow-2xl">
            <button
              onClick={() => setActiveModalService(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800/50 cursor-pointer"
              aria-label="Close service details"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-cyan-100 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 mb-4">
              {React.createElement(iconMap[activeModalService.icon] || Layout, { className: 'w-6 h-6' })}
            </div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-heading mb-2">
              {activeModalService.title}
            </h3>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              {activeModalService.description}
            </p>

            <div className="space-y-3 mb-6">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">What is included:</h4>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
                  <span>Production-ready codebase with clean architecture and modular separation.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
                  <span>Responsive layout optimized across desktop, tablet, and mobile devices.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
                  <span>Comprehensive security hardening and input validation.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
                  <span>Automated test coverage and Core Web Vitals optimization.</span>
                </li>
              </ul>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setActiveModalService(null)}
                className="px-4 py-2 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
              >
                Close
              </button>
              <a
                href="#contact"
                onClick={() => setActiveModalService(null)}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 shadow-md cursor-pointer"
              >
                Book This Service
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
