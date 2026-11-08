import React, { useState } from 'react';
import { 
  Code, Atom, Globe, Box, Palette, Layout, Sparkles, Server, Cpu, 
  Network, ShieldCheck, Layers, Database, Zap, Compass, Binary, 
  RefreshCw, Container, GitBranch, Terminal, Figma, Search, Star 
} from 'lucide-react';

const iconMap = {
  Atom: Atom,
  Globe: Globe,
  Box: Box,
  Palette: Palette,
  Code: Code,
  Layout: Layout,
  Sparkles: Sparkles,
  Server: Server,
  Cpu: Cpu,
  Network: Network,
  ShieldCheck: ShieldCheck,
  Layers: Layers,
  Database: Database,
  Zap: Zap,
  Compass: Compass,
  Binary: Binary,
  RefreshCw: RefreshCw,
  Container: Container,
  GitBranch: GitBranch,
  Terminal: Terminal,
  Figma: Figma
};

export default function SkillsSection({ skills = [] }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // 10 Core Skills explicitly requested by user with exact percentages
  const coreHighlights = [
    { name: 'HTML5', proficiency: 95, category: 'Markup & Semantics', desc: 'Semantic HTML, SEO markup, DOM APIs & Canvas', icon: Layout, color: 'from-orange-500 to-amber-500' },
    { name: 'CSS3', proficiency: 90, category: 'Styling & Motion', desc: 'CSS Grid, Flexbox, Keyframes, Responsive Layouts', icon: Palette, color: 'from-blue-500 to-cyan-500' },
    { name: 'JavaScript', proficiency: 80, category: 'Core Language', desc: 'ES6+, Async/Await, Closures, DOM & Event Loop', icon: Code, color: 'from-yellow-400 to-amber-500' },
    { name: 'Tailwind CSS', proficiency: 80, category: 'CSS Framework', desc: 'Utility-first architecture, responsive design, dark mode', icon: Sparkles, color: 'from-cyan-400 to-teal-500' },
    { name: 'Bootstrap', proficiency: 70, category: 'CSS Framework', desc: 'Component grid system, utility classes, themes', icon: Box, color: 'from-purple-600 to-indigo-600' },
    { name: 'React.js', proficiency: 70, category: 'Frontend Library', desc: 'Hooks, Component Lifecycle, State Management', icon: Atom, color: 'from-cyan-400 to-blue-500' },
    { name: 'Next.js', proficiency: 60, category: 'Full-Stack React', desc: 'App Router, SSR, SSG, API Endpoints & SEO', icon: Globe, color: 'from-indigo-500 to-purple-600' },
    { name: 'Node.js', proficiency: 60, category: 'Runtime Environment', desc: 'Event-driven asynchronous I/O, NPM ecosystem', icon: Server, color: 'from-emerald-500 to-green-600' },
    { name: 'Express.js', proficiency: 50, category: 'Backend Framework', desc: 'RESTful routing, middleware pipelines, JWT auth', icon: Cpu, color: 'from-slate-600 to-slate-800 dark:from-slate-400 dark:to-slate-200' },
    { name: 'MongoDB', proficiency: 40, category: 'NoSQL Database', desc: 'Document modeling, BSON schema design, aggregations', icon: Database, color: 'from-green-600 to-emerald-700' }
  ];

  const categories = [
    'All',
    'Frontend Development',
    'Backend Development',
    'Database',
    'Programming Concepts',
    'Tools & Platforms'
  ];

  const filteredSkills = skills.filter((skill) => {
    const matchesCategory = selectedCategory === 'All' || skill.category === selectedCategory;
    const matchesSearch = searchQuery === '' || skill.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="skills" className="py-24 relative border-t border-slate-200 dark:border-slate-800/60 bg-[#F8FAFC] dark:bg-[#070A13] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-medium tracking-wide bg-cyan-100 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/30 text-cyan-800 dark:text-cyan-300">
            <Cpu className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>Technical Mastery</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading tracking-tight text-slate-900 dark:text-white">
            My Skills & Core Proficiencies
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-sm sm:text-base">
            Verified competencies across modern web standards, modern frontend libraries, backend REST APIs, and database architecture.
          </p>
        </div>

        {/* PRIMARY CORE FOCUS: 10 Core Skills Cards */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-purple-600 dark:text-purple-400 fill-purple-600 dark:fill-purple-400" />
              <h3 className="text-sm font-mono uppercase tracking-wider font-semibold text-slate-900 dark:text-slate-200">
                Core Stack Proficiencies (10 Core Technologies)
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              Evaluated & Benchmark Verified
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {coreHighlights.map((core) => {
              const Icon = core.icon;
              return (
                <div
                  key={core.name}
                  className="p-5 rounded-2xl bg-white dark:bg-[#111C30] border border-slate-200 dark:border-slate-800 shadow-sm hover:border-purple-400 dark:hover:border-purple-500/60 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-purple-600 dark:text-cyan-400 shadow-xs group-hover:scale-105 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="text-right">
                        <span className="text-base font-bold font-mono text-purple-700 dark:text-cyan-400 tabular-nums">
                          {core.proficiency}%
                        </span>
                      </div>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 dark:text-white font-heading mb-0.5">
                      {core.name}
                    </h4>
                    <p className="text-[11px] font-mono text-purple-600 dark:text-purple-400 font-medium mb-2">
                      {core.category}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                      {core.desc}
                    </p>
                  </div>

                  {/* Meter with visual percentage bar */}
                  <div>
                    <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${core.color} transition-all duration-1000`}
                        style={{ width: `${core.proficiency}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 w-full md:w-auto overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-sm font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search technology..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40 shadow-xs"
            />
          </div>
        </div>

        {/* Complete Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredSkills.map((skill) => {
            const Icon = iconMap[skill.icon] || Code;
            return (
              <div
                key={skill.id}
                className="p-5 rounded-2xl bg-white dark:bg-[#111C30] border border-slate-200 dark:border-slate-800 shadow-xs hover:border-purple-400 dark:hover:border-cyan-500/40 hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-purple-600 dark:text-cyan-400 shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white font-heading">
                        {skill.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {skill.category}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-semibold text-purple-700 dark:text-cyan-400 tabular-nums">
                    {skill.proficiency}%
                  </span>
                </div>

                {/* Animated Proficiency Bar */}
                <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 transition-all duration-1000"
                    style={{ width: `${skill.proficiency}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {filteredSkills.length === 0 && (
          <div className="py-12 text-center text-slate-500 dark:text-slate-400 text-sm font-mono">
            No technical skills found matching your query.
          </div>
        )}

      </div>
    </section>
  );
}
