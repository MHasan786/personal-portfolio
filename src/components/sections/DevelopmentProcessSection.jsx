import React from 'react';
import { 
  FileSearch, Lightbulb, Compass, Code2, Server, Database, 
  CheckCircle, Rocket 
} from 'lucide-react';

const steps = [
  {
    step: '01',
    title: 'Requirement Analysis',
    desc: 'Deconstructing core business goals, target user personas, technical constraints, and defining high-level specifications.',
    icon: FileSearch
  },
  {
    step: '02',
    title: 'Research & Planning',
    desc: 'Auditing API schemas, selecting optimal tech stack dependencies, benchmarking latency budgets, and framing component trees.',
    icon: Lightbulb
  },
  {
    step: '03',
    title: 'UI/UX Design',
    desc: 'Wireframing responsive design tokens, high-fidelity spatial layouts, interactive micro-states, and accessible visual hierarchy.',
    icon: Compass
  },
  {
    step: '04',
    title: 'Frontend Engineering',
    desc: 'Building modular React components, integrating Three.js 3D WebGL scenes, fluid state transitions, and responsive CSS styling.',
    icon: Code2
  },
  {
    step: '05',
    title: 'Backend Architecture',
    desc: 'Developing scalable Express/Node.js RESTful API endpoints, secure JWT authentication pipelines, and rate-limiting middleware.',
    icon: Server
  },
  {
    step: '06',
    title: 'Database Modeling',
    desc: 'Structuring MongoDB schemas, indexing high-cardinality collections, data sanitization, and atomic transactional operations.',
    icon: Database
  },
  {
    step: '07',
    title: 'Testing & Hardening',
    desc: 'Executing unit tests with Node test runner, browser automated verification, WCAG accessibility checks, and security audits.',
    icon: CheckCircle
  },
  {
    step: '08',
    title: 'Deployment & CI/CD',
    desc: 'Containerizing services, configuring production environment secrets, automated deployment hooks, and real-time monitoring.',
    icon: Rocket
  }
];

export default function DevelopmentProcessSection() {
  return (
    <section id="process" className="py-24 relative border-t border-slate-200 dark:border-slate-800/60 bg-[#F8FAFC] dark:bg-[#070A13] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide bg-blue-100 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 text-blue-700 dark:text-blue-400">
            <Compass className="w-3.5 h-3.5" />
            <span>Methodology</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading tracking-tight text-slate-900 dark:text-white">
            Development Process & Lifecycle
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-sm sm:text-base">
            A disciplined, systematic 8-stage software engineering workflow that delivers resilient, production-grade web applications.
          </p>
        </div>

        {/* 8-Step Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="p-6 rounded-3xl bg-white dark:bg-[#111C30] border border-slate-200 dark:border-slate-800 shadow-sm relative group hover:border-cyan-500/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold font-mono text-purple-600 dark:text-cyan-400/90 group-hover:text-purple-700 dark:group-hover:text-cyan-300 transition-colors">
                      {item.step}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  <span>Phase {idx + 1} of 8</span>
                  <span className="text-purple-600 dark:text-cyan-400 font-semibold">Verified</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
