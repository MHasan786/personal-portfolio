import React, { useState } from 'react';
import { 
  ExternalLink, Github, Search, FolderGit2, Sparkles, X, CheckCircle2, 
  Play, Code2, CloudSun, ShoppingBag, Home, Calculator, Thermometer, Wind, Droplets, Check, Plus, Minus
} from 'lucide-react';

export default function ProjectsSection({ projects = [] }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalProject, setActiveModalProject] = useState(null);
  const [modalTab, setModalTab] = useState('overview'); // 'overview' | 'demo'

  // Interactive Demo State: Calculator
  const [calcDisplay, setCalcDisplay] = useState('0');
  const [calcPrev, setCalcPrev] = useState('');
  const [calcOp, setCalcOp] = useState(null);

  // Interactive Demo State: Weather App
  const weatherCities = [
    { city: 'New York', temp: 22, condition: 'Partly Cloudy', humidity: 58, wind: '14 km/h', icon: 'cloud-sun' },
    { city: 'Tokyo', temp: 19, condition: 'Light Rain', humidity: 76, wind: '18 km/h', icon: 'cloud-rain' },
    { city: 'London', temp: 15, condition: 'Overcast', humidity: 82, wind: '12 km/h', icon: 'cloud' },
    { city: 'Dubai', temp: 34, condition: 'Sunny & Clear', humidity: 35, wind: '9 km/h', icon: 'sun' }
  ];
  const [selectedCityIndex, setSelectedCityIndex] = useState(0);

  // Interactive Demo State: Cloth Store
  const [selectedClothSize, setSelectedClothSize] = useState('M');
  const [selectedClothColor, setSelectedClothColor] = useState('Obsidian Black');
  const [cartCount, setCartCount] = useState(1);
  const [cartAddedToast, setCartAddedToast] = useState(false);

  // Interactive Demo State: Real Estate
  const realEstateListings = [
    { name: 'Azure Coast Minimalist Villa', price: '$1,450,000', beds: 4, baths: 3.5, sqft: '3,850 sq ft', loc: 'Malibu Coast' },
    { name: 'The Skyline Glass Penthouse', price: '$2,850,000', beds: 3, baths: 3, sqft: '2,920 sq ft', loc: 'Downtown Metropolis' },
    { name: 'Serenity Ridge Modernist Estate', price: '$1,920,000', beds: 5, baths: 4, sqft: '4,400 sq ft', loc: 'Aspen Hills' }
  ];
  const [selectedEstate, setSelectedEstate] = useState(0);
  const [bookedTour, setBookedTour] = useState(false);

  // Calculator logic
  const handleCalcNumber = (num) => {
    setCalcDisplay((prev) => (prev === '0' ? String(num) : prev + num));
  };

  const handleCalcOp = (op) => {
    setCalcPrev(calcDisplay);
    setCalcOp(op);
    setCalcDisplay('0');
  };

  const handleCalcEqual = () => {
    const a = parseFloat(calcPrev);
    const b = parseFloat(calcDisplay);
    if (isNaN(a) || isNaN(b) || !calcOp) return;
    let res = 0;
    if (calcOp === '+') res = a + b;
    if (calcOp === '-') res = a - b;
    if (calcOp === '×') res = a * b;
    if (calcOp === '÷') res = b !== 0 ? a / b : 'Error';
    setCalcDisplay(String(res));
    setCalcPrev('');
    setCalcOp(null);
  };

  const handleCalcClear = () => {
    setCalcDisplay('0');
    setCalcPrev('');
    setCalcOp(null);
  };

  const categories = [
    'All',
    'Web Applications',
    'Frontend Projects',
    'E-commerce Projects',
    'Full-Stack Projects'
  ];

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.technologies && project.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  const openProjectModal = (proj, tab = 'overview') => {
    setActiveModalProject(proj);
    setModalTab(tab);
    setBookedTour(false);
    setCartAddedToast(false);
  };

  return (
    <section id="projects" className="py-24 relative border-t border-slate-200 dark:border-slate-800/60 bg-[#F8FAFC] dark:bg-[#070A13] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide bg-purple-100 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/30 text-purple-700 dark:text-purple-400">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Featured Case Studies</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading tracking-tight text-slate-900 dark:text-white">
            Featured Projects & Software Works
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-sm sm:text-base">
            Engineered with modern frontend libraries, responsive design, RESTful APIs, and MongoDB persistence. Click on any project to explore its case study or try the interactive live demo.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 w-full md:w-auto overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-sm font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search calculator, weather, store..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40 shadow-xs"
            />
          </div>
        </div>

        {/* Projects Grid: 2x2 Clean Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="rounded-3xl bg-white dark:bg-[#111C30] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden group hover:border-purple-400 dark:hover:border-cyan-500/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image Showcase */}
                <div 
                  onClick={() => openProjectModal(project, 'overview')}
                  className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-900 cursor-pointer"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60" />

                  {/* Featured badge */}
                  {project.featured && (
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-mono font-semibold bg-purple-600/90 text-white backdrop-blur-md shadow-md flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-300" />
                      <span>Featured</span>
                    </div>
                  )}

                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg text-[10px] font-mono bg-black/75 text-slate-200 backdrop-blur-md">
                    {project.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-7">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-purple-600 dark:text-cyan-400 font-semibold">
                      {project.slug.split('-')[0].toUpperCase()} PROJECT
                    </span>
                    <button
                      onClick={() => openProjectModal(project, 'demo')}
                      className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 px-2 py-0.5 rounded-md hover:scale-105 transition-transform cursor-pointer"
                    >
                      <Play className="w-3 h-3 fill-emerald-600 dark:fill-emerald-400" />
                      <span>Live Demo</span>
                    </button>
                  </div>

                  <h3 
                    onClick={() => openProjectModal(project, 'overview')}
                    className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-heading mb-2 hover:text-purple-600 dark:hover:text-cyan-400 transition-colors cursor-pointer"
                  >
                    {project.title}
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 mb-5 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technology metadata */}
                  {Array.isArray(project.technologies) && (
                    <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-2">
                      {project.technologies.map((tech, i) => (
                        <React.Fragment key={tech}>
                          <span className="font-mono text-[11px] text-purple-700 dark:text-cyan-400 font-medium">{tech}</span>
                          {i < project.technologies.length - 1 && <span className="text-slate-400 dark:text-slate-600">·</span>}
                        </React.Fragment>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="px-6 sm:px-7 pb-6 pt-3 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => openProjectModal(project, 'overview')}
                    className="text-xs font-semibold text-purple-600 dark:text-cyan-400 hover:text-purple-700 dark:hover:text-cyan-300 transition-colors cursor-pointer"
                  >
                    View Case Study
                  </button>
                  <span className="text-slate-300 dark:text-slate-700">·</span>
                  <button
                    onClick={() => openProjectModal(project, 'demo')}
                    className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Play className="w-3 h-3" />
                    <span>Try Demo</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-900/60 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer shadow-xs"
                      title="View GitHub Repository"
                      aria-label="View GitHub Repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 bg-slate-100 dark:bg-slate-900/60 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer shadow-xs"
                      title="View Live Application"
                      aria-label="View Live Application"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="py-16 text-center text-slate-500 dark:text-slate-400 font-mono text-sm">
            No projects found matching the filter criteria.
          </div>
        )}

      </div>

      {/* Comprehensive Project Detail & Interactive Live Demo Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-md overflow-y-auto">
          <div className="bg-white dark:bg-[#101728] border border-slate-200 dark:border-slate-700 rounded-3xl max-w-3xl w-full my-6 overflow-hidden shadow-2xl relative">
            
            {/* Modal Close Button */}
            <button
              onClick={() => setActiveModalProject(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-xl text-slate-200 hover:text-white bg-black/60 backdrop-blur-md cursor-pointer transition-colors"
              aria-label="Close project modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header Media & Banner */}
            <div className="relative aspect-video sm:aspect-[21/9] w-full overflow-hidden bg-slate-900">
              <img
                src={activeModalProject.image}
                alt={activeModalProject.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90" />
              <div className="absolute bottom-4 left-6 right-6">
                <span className="text-xs font-mono text-cyan-300 uppercase tracking-widest">{activeModalProject.category}</span>
                <h3 className="text-xl sm:text-3xl font-bold text-white font-heading mt-0.5">{activeModalProject.title}</h3>
              </div>
            </div>

            {/* Modal Navigation Tabs: Overview vs Live Interactive Demo */}
            <div className="flex items-center px-6 pt-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
              <button
                onClick={() => setModalTab('overview')}
                className={`flex items-center gap-2 py-3 px-4 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
                  modalTab === 'overview'
                    ? 'border-purple-600 text-purple-600 dark:border-cyan-400 dark:text-cyan-400'
                    : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Code2 className="w-4 h-4" />
                <span>Architecture & Overview</span>
              </button>
              <button
                onClick={() => setModalTab('demo')}
                className={`flex items-center gap-2 py-3 px-4 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
                  modalTab === 'demo'
                    ? 'border-emerald-500 text-emerald-600 dark:border-emerald-400 dark:text-emerald-400'
                    : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Play className="w-4 h-4" />
                <span>Interactive Live Demo</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto space-y-6">
              
              {/* TAB 1: OVERVIEW & ARCHITECTURE */}
              {modalTab === 'overview' && (
                <>
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Description & Scope</h4>
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {activeModalProject.description}
                    </p>
                  </div>

                  {/* Technology Stack Badges */}
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">Implemented Technologies</h4>
                    <div className="flex flex-wrap items-center gap-2">
                      {activeModalProject.technologies?.map((tech) => (
                        <span key={tech} className="px-3 py-1 rounded-lg text-xs font-mono bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-purple-700 dark:text-cyan-300 font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key Engineering Features */}
                  {Array.isArray(activeModalProject.features) && activeModalProject.features.length > 0 && (
                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">Engineering Specifications</h4>
                      <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
                        {activeModalProject.features.map((feat, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )}

              {/* TAB 2: INTERACTIVE LIVE DEMO */}
              {modalTab === 'demo' && (
                <div className="space-y-4">
                  {/* DEMO 1: CALCULATOR */}
                  {activeModalProject.slug.includes('calculator') && (
                    <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 max-w-sm mx-auto shadow-sm">
                      <div className="flex items-center justify-between mb-3 text-xs font-mono text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
                          <Calculator className="w-4 h-4 text-purple-600 dark:text-cyan-400" />
                          <span>NeoCalc Engine</span>
                        </span>
                        <span>{calcPrev ? `${calcPrev} ${calcOp || ''}` : 'Ready'}</span>
                      </div>

                      {/* Display Screen */}
                      <div className="mb-4 p-4 rounded-xl bg-slate-900 text-right text-2xl font-mono font-bold text-cyan-400 tracking-wider shadow-inner overflow-hidden">
                        {calcDisplay}
                      </div>

                      {/* Keypad */}
                      <div className="grid grid-cols-4 gap-2 text-sm font-mono font-bold">
                        <button onClick={handleCalcClear} className="p-3 rounded-xl bg-rose-500/20 text-rose-600 dark:text-rose-400 hover:bg-rose-500/30 cursor-pointer">C</button>
                        <button onClick={() => setCalcDisplay((prev) => String(parseFloat(prev) * -1))} className="p-3 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:opacity-80 cursor-pointer">±</button>
                        <button onClick={() => setCalcDisplay((prev) => String(Math.sqrt(parseFloat(prev))))} className="p-3 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:opacity-80 cursor-pointer">√</button>
                        <button onClick={() => handleCalcOp('÷')} className="p-3 rounded-xl bg-purple-600 text-white hover:bg-purple-700 cursor-pointer">÷</button>

                        <button onClick={() => handleCalcNumber('7')} className="p-3 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 hover:opacity-80 cursor-pointer">7</button>
                        <button onClick={() => handleCalcNumber('8')} className="p-3 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 hover:opacity-80 cursor-pointer">8</button>
                        <button onClick={() => handleCalcNumber('9')} className="p-3 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 hover:opacity-80 cursor-pointer">9</button>
                        <button onClick={() => handleCalcOp('×')} className="p-3 rounded-xl bg-purple-600 text-white hover:bg-purple-700 cursor-pointer">×</button>

                        <button onClick={() => handleCalcNumber('4')} className="p-3 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 hover:opacity-80 cursor-pointer">4</button>
                        <button onClick={() => handleCalcNumber('5')} className="p-3 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 hover:opacity-80 cursor-pointer">5</button>
                        <button onClick={() => handleCalcNumber('6')} className="p-3 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 hover:opacity-80 cursor-pointer">6</button>
                        <button onClick={() => handleCalcOp('-')} className="p-3 rounded-xl bg-purple-600 text-white hover:bg-purple-700 cursor-pointer">-</button>

                        <button onClick={() => handleCalcNumber('1')} className="p-3 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 hover:opacity-80 cursor-pointer">1</button>
                        <button onClick={() => handleCalcNumber('2')} className="p-3 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 hover:opacity-80 cursor-pointer">2</button>
                        <button onClick={() => handleCalcNumber('3')} className="p-3 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 hover:opacity-80 cursor-pointer">3</button>
                        <button onClick={() => handleCalcOp('+')} className="p-3 rounded-xl bg-purple-600 text-white hover:bg-purple-700 cursor-pointer">+</button>

                        <button onClick={() => handleCalcNumber('0')} className="col-span-2 p-3 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 hover:opacity-80 cursor-pointer">0</button>
                        <button onClick={() => !calcDisplay.includes('.') && handleCalcNumber('.')} className="p-3 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 hover:opacity-80 cursor-pointer">.</button>
                        <button onClick={handleCalcEqual} className="p-3 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 cursor-pointer">=</button>
                      </div>
                    </div>
                  )}

                  {/* DEMO 2: WEATHER WEB APP */}
                  {activeModalProject.slug.includes('weather') && (
                    <div className="p-6 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white shadow-lg space-y-5">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs uppercase font-mono tracking-widest text-blue-100">Live Atmospheric Feed</p>
                          <h4 className="text-2xl font-bold font-heading">{weatherCities[selectedCityIndex].city}</h4>
                        </div>
                        <CloudSun className="w-12 h-12 text-amber-200" />
                      </div>

                      <div className="flex items-baseline gap-3">
                        <span className="text-5xl font-extrabold font-mono tracking-tight">{weatherCities[selectedCityIndex].temp}°C</span>
                        <span className="text-sm font-medium text-blue-100">{weatherCities[selectedCityIndex].condition}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/20 text-xs font-mono">
                        <div className="flex items-center gap-2">
                          <Droplets className="w-4 h-4 text-cyan-200" />
                          <span>Humidity: {weatherCities[selectedCityIndex].humidity}%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Wind className="w-4 h-4 text-cyan-200" />
                          <span>Wind: {weatherCities[selectedCityIndex].wind}</span>
                        </div>
                      </div>

                      {/* City Selector Buttons */}
                      <div className="pt-2 flex flex-wrap gap-2">
                        {weatherCities.map((c, idx) => (
                          <button
                            key={c.city}
                            onClick={() => setSelectedCityIndex(idx)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                              selectedCityIndex === idx ? 'bg-white text-blue-900 font-bold shadow-xs' : 'bg-white/20 text-white hover:bg-white/30'
                            }`}
                          >
                            {c.city}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* DEMO 3: CLOTH STORE */}
                  {activeModalProject.slug.includes('cloth') && (
                    <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xs font-mono uppercase tracking-wider text-purple-600 dark:text-cyan-400 font-semibold">Essential Apparel</span>
                          <h4 className="text-xl font-bold text-slate-900 dark:text-white font-heading">Heavyweight Organic Cotton Hoodie</h4>
                          <p className="text-base font-bold text-slate-900 dark:text-slate-100 font-mono mt-0.5">$78.00 USD</p>
                        </div>
                        <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-cyan-400">
                          <ShoppingBag className="w-6 h-6" />
                        </div>
                      </div>

                      {/* Size Selector */}
                      <div>
                        <span className="text-xs font-mono text-slate-500 dark:text-slate-400 block mb-1.5">Select Size:</span>
                        <div className="flex items-center gap-2">
                          {['S', 'M', 'L', 'XL'].map((s) => (
                            <button
                              key={s}
                              onClick={() => setSelectedClothSize(s)}
                              className={`w-9 h-9 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                                selectedClothSize === s
                                  ? 'bg-purple-600 text-white shadow-xs'
                                  : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-purple-400'
                              }`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Color Swatch */}
                      <div>
                        <span className="text-xs font-mono text-slate-500 dark:text-slate-400 block mb-1.5">Color: {selectedClothColor}</span>
                        <div className="flex items-center gap-2">
                          {[
                            { name: 'Obsidian Black', bg: 'bg-neutral-900' },
                            { name: 'Forest Olive', bg: 'bg-emerald-800' },
                            { name: 'Heather Stone', bg: 'bg-stone-400' }
                          ].map((col) => (
                            <button
                              key={col.name}
                              onClick={() => setSelectedClothColor(col.name)}
                              className={`w-6 h-6 rounded-full ${col.bg} border-2 transition-transform cursor-pointer ${
                                selectedClothColor === col.name ? 'border-purple-600 scale-125' : 'border-transparent'
                              }`}
                              title={col.name}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Add to Cart Simulation */}
                      <div className="pt-2 flex items-center gap-3">
                        <button
                          onClick={() => {
                            setCartCount((c) => c + 1);
                            setCartAddedToast(true);
                            setTimeout(() => setCartAddedToast(false), 3000);
                          }}
                          className="flex-1 py-3 px-4 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-95 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <ShoppingBag className="w-4 h-4" />
                          <span>Add to Bag ({selectedClothSize} · {selectedClothColor})</span>
                        </button>
                        <span className="px-3 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-700 dark:text-slate-300 font-bold">
                          Cart: {cartCount}
                        </span>
                      </div>

                      {cartAddedToast && (
                        <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2">
                          <Check className="w-4 h-4" />
                          <span>Added to cart! Instant inventory balance synchronized.</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* DEMO 4: REAL ESTATE */}
                  {activeModalProject.slug.includes('estate') && (
                    <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono uppercase tracking-wider text-purple-600 dark:text-cyan-400 font-semibold">Haven Estate Listings</span>
                        <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold">Verified MLS Exclusive</span>
                      </div>

                      <div className="space-y-2">
                        {realEstateListings.map((prop, idx) => (
                          <div
                            key={prop.name}
                            onClick={() => {
                              setSelectedEstate(idx);
                              setBookedTour(false);
                            }}
                            className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                              selectedEstate === idx
                                ? 'bg-white dark:bg-slate-800 border-purple-500 shadow-xs'
                                : 'bg-transparent border-slate-200 dark:border-slate-800 hover:border-slate-300'
                            }`}
                          >
                            <div>
                              <h5 className="text-sm font-bold text-slate-900 dark:text-white font-heading">{prop.name}</h5>
                              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">{prop.beds} Beds · {prop.baths} Baths · {prop.sqft} · {prop.loc}</p>
                            </div>
                            <span className="text-sm font-mono font-bold text-purple-600 dark:text-cyan-400">{prop.price}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 flex items-center justify-between">
                        <button
                          onClick={() => setBookedTour(true)}
                          className="py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-cyan-500 shadow-md hover:opacity-95 cursor-pointer"
                        >
                          Schedule Private Showing
                        </button>
                        {bookedTour && (
                          <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-medium">
                            Tour requested for {realEstateListings[selectedEstate].name}!
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                </div>
              )}

              {/* Footer Actions */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                >
                  Close
                </button>

                <div className="flex items-center gap-3">
                  {activeModalProject.githubUrl && (
                    <a
                      href={activeModalProject.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                    >
                      <Github className="w-4 h-4" />
                      <span>Source Code</span>
                    </a>
                  )}

                  {activeModalProject.liveUrl && (
                    <a
                      href={activeModalProject.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-cyan-500 shadow-md hover:opacity-95 transition-opacity"
                    >
                      <span>Live Preview</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
}
