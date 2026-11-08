import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import { 
  X, LayoutDashboard, FolderGit2, Cpu, MessageSquare, Settings, 
  LogOut, Plus, Trash2, Edit3, CheckCircle2, Shield, Eye, Star,
  Save, RefreshCw
} from 'lucide-react';

export default function AdminDashboardModal({ isOpen, onClose, onDataChanged }) {
  const { logout, admin } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [messages, setMessages] = useState([]);
  const [settingsForm, setSettingsForm] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  // Project Editor state
  const [editingProject, setEditingProject] = useState(null);
  const [isCreatingProject, setIsCreatingProject] = useState(false);

  // Skill Editor state
  const [newSkill, setNewSkill] = useState({ name: '', category: 'Frontend Development', proficiency: 90, icon: 'Code' });

  useEffect(() => {
    if (isOpen) {
      loadDashboardData();
    }
  }, [isOpen]);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [statsData, projectsData, skillsData, messagesData, settingsData] = await Promise.all([
        api.getAdminStats(),
        api.getProjects(),
        api.getSkills(),
        api.getContactMessages(),
        api.getSettings()
      ]);
      setStats(statsData);
      setProjects(projectsData);
      setSkills(skillsData);
      setMessages(messagesData);
      setSettingsForm(settingsData);
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  // --- PROJECT CRUD ---
  const handleSaveProject = async (e) => {
    e.preventDefault();
    try {
      if (editingProject.id) {
        await api.updateProject(editingProject.id, editingProject);
        showNotification('Project updated successfully');
      } else {
        await api.createProject(editingProject);
        showNotification('New project created successfully');
      }
      setEditingProject(null);
      setIsCreatingProject(false);
      loadDashboardData();
      onDataChanged?.();
    } catch (err) {
      alert(err.message || 'Error saving project');
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await api.deleteProject(id);
      showNotification('Project deleted');
      loadDashboardData();
      onDataChanged?.();
    } catch (err) {
      alert(err.message);
    }
  };

  const toggleFeaturedProject = async (project) => {
    try {
      await api.updateProject(project.id, { featured: !project.featured });
      loadDashboardData();
      onDataChanged?.();
    } catch (err) {
      alert(err.message);
    }
  };

  // --- SKILL CRUD ---
  const handleAddSkill = async (e) => {
    e.preventDefault();
    if (!newSkill.name.trim()) return;
    try {
      await api.createSkill(newSkill);
      setNewSkill({ name: '', category: 'Frontend Development', proficiency: 90, icon: 'Code' });
      showNotification('Skill added successfully');
      loadDashboardData();
      onDataChanged?.();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteSkill = async (id) => {
    try {
      await api.deleteSkill(id);
      showNotification('Skill removed');
      loadDashboardData();
      onDataChanged?.();
    } catch (err) {
      alert(err.message);
    }
  };

  // --- MESSAGE CRUD ---
  const handleToggleMessageRead = async (msg) => {
    const nextStatus = msg.status === 'read' ? 'unread' : 'read';
    try {
      await api.updateMessageStatus(msg.id, nextStatus);
      loadDashboardData();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteMessage = async (id) => {
    try {
      await api.deleteContactMessage(id);
      showNotification('Message deleted');
      loadDashboardData();
    } catch (err) {
      alert(err.message);
    }
  };

  // --- SETTINGS UPDATE ---
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    try {
      await api.updateSettings(settingsForm);
      showNotification('Portfolio configuration updated successfully');
      onDataChanged?.();
    } catch (err) {
      alert(err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/90 backdrop-blur-md overflow-hidden">
      <div className="bg-[#0B0F1A] border border-slate-700/80 rounded-3xl w-full max-w-6xl h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header bar */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between shrink-0 bg-[#070A13]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-heading">Nexus Control Console</h2>
              <p className="text-[11px] font-mono text-slate-400">Database-backed content management</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadDashboardData}
              className="p-2 rounded-xl text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={() => {
                logout();
                onClose();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-300 bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white"
              aria-label="Close Admin Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notification Toast */}
        {notification && (
          <div className="bg-emerald-500/15 border-b border-emerald-500/30 px-6 py-2 text-xs font-mono text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{notification}</span>
          </div>
        )}

        {/* Dashboard Shell: Sidebar + Content */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Navigation Sidebar */}
          <div className="w-56 border-r border-slate-800/80 p-4 shrink-0 flex flex-col justify-between bg-[#070A13]/60">
            <nav className="space-y-1.5">
              {[
                { id: 'overview', label: 'Overview', icon: LayoutDashboard },
                { id: 'projects', label: 'Projects', icon: FolderGit2, badge: stats?.totalProjects },
                { id: 'skills', label: 'Skills', icon: Cpu, badge: stats?.totalSkills },
                { id: 'messages', label: 'Messages', icon: MessageSquare, badge: stats?.unreadMessages },
                { id: 'settings', label: 'Settings', icon: Settings }
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setEditingProject(null);
                      setIsCreatingProject(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                      isActive
                        ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30 font-semibold'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge !== undefined && item.badge > 0 && (
                      <span className="px-1.5 py-0.5 rounded-md text-[10px] font-mono bg-purple-500/30 text-purple-200">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            <div className="p-3 rounded-2xl bg-slate-900/50 border border-slate-800 text-[11px] font-mono text-slate-400">
              <span className="block text-slate-300 font-semibold">MongoDB Store</span>
              <span className="text-[10px] text-emerald-400">● Connected & Synced</span>
            </div>
          </div>

          {/* Main Pane */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 bg-[#0B0F1A]">
            
            {/* 1. OVERVIEW TAB */}
            {activeTab === 'overview' && stats && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-white font-heading mb-1">Portfolio Metrics</h3>
                  <p className="text-xs text-slate-400">Real-time status of all collections in the MongoDB document store.</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-5 rounded-2xl bg-[#111C30] border border-slate-800">
                    <span className="text-xs font-mono text-slate-400 block mb-1">Total Projects</span>
                    <span className="text-3xl font-bold font-mono text-white tabular-nums">{stats.totalProjects}</span>
                    <span className="text-[11px] text-emerald-400 block mt-1">{stats.publishedProjects} Published</span>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#111C30] border border-slate-800">
                    <span className="text-xs font-mono text-slate-400 block mb-1">Featured Works</span>
                    <span className="text-3xl font-bold font-mono text-cyan-400 tabular-nums">{stats.featuredProjects}</span>
                    <span className="text-[11px] text-slate-400 block mt-1">Highlighted on Hero</span>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#111C30] border border-slate-800">
                    <span className="text-xs font-mono text-slate-400 block mb-1">Contact Inquiries</span>
                    <span className="text-3xl font-bold font-mono text-purple-400 tabular-nums">{stats.totalMessages}</span>
                    <span className="text-[11px] text-rose-400 block mt-1">{stats.unreadMessages} Unread messages</span>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#111C30] border border-slate-800">
                    <span className="text-xs font-mono text-slate-400 block mb-1">Active Skills</span>
                    <span className="text-3xl font-bold font-mono text-white tabular-nums">{stats.totalSkills}</span>
                    <span className="text-[11px] text-slate-400 block mt-1">{stats.totalServices} Services</span>
                  </div>
                </div>

                {/* Recent messages summary */}
                <div>
                  <h4 className="text-sm font-bold text-white font-heading mb-3">Recent Inbound Messages</h4>
                  <div className="space-y-2">
                    {messages.slice(0, 3).map((m) => (
                      <div key={m.id} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold text-white">{m.name} <span className="text-slate-400 font-normal">({m.email})</span></p>
                          <p className="text-xs text-cyan-400 font-mono mt-0.5">{m.subject}</p>
                        </div>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${m.status === 'unread' ? 'bg-purple-500/20 text-purple-300' : 'text-slate-500'}`}>
                          {m.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 2. PROJECTS TAB */}
            {activeTab === 'projects' && (
              <div>
                {!isCreatingProject && !editingProject ? (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-white font-heading">Project Management</h3>
                        <p className="text-xs text-slate-400">Add, edit, reorder or publish projects.</p>
                      </div>
                      <button
                        onClick={() => {
                          setEditingProject({
                            title: '',
                            slug: '',
                            description: '',
                            category: 'Full-Stack Projects',
                            image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
                            technologies: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
                            features: ['Scalable architecture', 'Real-time state'],
                            githubUrl: 'https://github.com',
                            liveUrl: 'https://demo.dev',
                            featured: false,
                            published: true
                          });
                          setIsCreatingProject(true);
                        }}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 shadow-md hover:opacity-95"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Create Project</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {projects.map((p) => (
                        <div
                          key={p.id}
                          className="p-4 rounded-2xl bg-[#111C30] border border-slate-800 flex items-center justify-between gap-4"
                        >
                          <div className="flex items-center gap-4">
                            <img
                              src={p.image}
                              alt={p.title}
                              className="w-16 h-12 rounded-lg object-cover bg-slate-900 shrink-0"
                            />
                            <div>
                              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                                <span>{p.title}</span>
                                {p.featured && (
                                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">
                                    Featured
                                  </span>
                                )}
                              </h4>
                              <p className="text-xs font-mono text-cyan-400">{p.category}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => toggleFeaturedProject(p)}
                              className={`p-2 rounded-lg border transition-colors ${
                                p.featured
                                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                              }`}
                              title={p.featured ? 'Unmark featured' : 'Mark as featured'}
                            >
                              <Star className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                setEditingProject(p);
                                setIsCreatingProject(true);
                              }}
                              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                              title="Edit Project"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteProject(p.id)}
                              className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
                              title="Delete Project"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  // Project Edit Form
                  <form onSubmit={handleSaveProject} className="space-y-4 max-w-2xl">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-bold text-white font-heading">
                        {editingProject.id ? 'Edit Project' : 'New Project'}
                      </h4>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingProject(null);
                          setIsCreatingProject(false);
                        }}
                        className="text-xs text-slate-400 hover:text-white"
                      >
                        Cancel
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-slate-400 mb-1">Title *</label>
                        <input
                          type="text"
                          required
                          value={editingProject.title}
                          onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl text-xs bg-slate-900 border border-slate-800 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-slate-400 mb-1">Category *</label>
                        <select
                          value={editingProject.category}
                          onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl text-xs bg-slate-900 border border-slate-800 text-white"
                        >
                          <option value="Full-Stack Projects">Full-Stack Projects</option>
                          <option value="Frontend Projects">Frontend Projects</option>
                          <option value="React Projects">React Projects</option>
                          <option value="E-commerce Projects">E-commerce Projects</option>
                          <option value="Web Applications">Web Applications</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">Description *</label>
                      <textarea
                        rows={3}
                        required
                        value={editingProject.description}
                        onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl text-xs bg-slate-900 border border-slate-800 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">Cover Image URL *</label>
                      <input
                        type="url"
                        required
                        value={editingProject.image}
                        onChange={(e) => setEditingProject({ ...editingProject, image: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl text-xs bg-slate-900 border border-slate-800 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">Technologies (comma separated) *</label>
                      <input
                        type="text"
                        value={Array.isArray(editingProject.technologies) ? editingProject.technologies.join(', ') : ''}
                        onChange={(e) => setEditingProject({
                          ...editingProject,
                          technologies: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                        })}
                        className="w-full px-3 py-2 rounded-xl text-xs bg-slate-900 border border-slate-800 text-white"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-slate-400 mb-1">GitHub URL</label>
                        <input
                          type="url"
                          value={editingProject.githubUrl || ''}
                          onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl text-xs bg-slate-900 border border-slate-800 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-slate-400 mb-1">Live Demo URL</label>
                        <input
                          type="url"
                          value={editingProject.liveUrl || ''}
                          onChange={(e) => setEditingProject({ ...editingProject, liveUrl: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl text-xs bg-slate-900 border border-slate-800 text-white"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-6 pt-2">
                      <label className="flex items-center gap-2 text-xs font-mono text-slate-300">
                        <input
                          type="checkbox"
                          checked={editingProject.featured || false}
                          onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                          className="rounded text-purple-600"
                        />
                        <span>Featured Project</span>
                      </label>
                      <label className="flex items-center gap-2 text-xs font-mono text-slate-300">
                        <input
                          type="checkbox"
                          checked={editingProject.published ?? true}
                          onChange={(e) => setEditingProject({ ...editingProject, published: e.target.checked })}
                          className="rounded text-purple-600"
                        />
                        <span>Published</span>
                      </label>
                    </div>

                    <div className="pt-4 flex items-center justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingProject(null);
                          setIsCreatingProject(false);
                        }}
                        className="px-4 py-2 text-xs text-slate-400"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600"
                      >
                        Save Project to Database
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* 3. SKILLS TAB */}
            {activeTab === 'skills' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-white font-heading mb-1">Technical Skills</h3>
                  <p className="text-xs text-slate-400">Manage stack competencies and proficiency bars.</p>
                </div>

                {/* Add new skill inline */}
                <form onSubmit={handleAddSkill} className="p-4 rounded-2xl bg-[#111C30] border border-slate-800 flex flex-wrap items-center gap-3">
                  <input
                    type="text"
                    placeholder="Skill name (e.g. Next.js)"
                    value={newSkill.name}
                    onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                    className="flex-1 min-w-[140px] px-3 py-2 rounded-xl text-xs bg-slate-900 border border-slate-700 text-white"
                  />
                  <select
                    value={newSkill.category}
                    onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                    className="px-3 py-2 rounded-xl text-xs bg-slate-900 border border-slate-700 text-white"
                  >
                    <option value="Frontend Development">Frontend Development</option>
                    <option value="Backend Development">Backend Development</option>
                    <option value="Database">Database</option>
                    <option value="Programming Concepts">Programming Concepts</option>
                    <option value="Tools & Platforms">Tools & Platforms</option>
                  </select>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-400">{newSkill.proficiency}%</span>
                    <input
                      type="range"
                      min="50"
                      max="100"
                      value={newSkill.proficiency}
                      onChange={(e) => setNewSkill({ ...newSkill, proficiency: Number(e.target.value) })}
                      className="w-24"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-cyan-500 shadow-md"
                  >
                    Add Skill
                  </button>
                </form>

                {/* Skills list */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {skills.map((skill) => (
                    <div
                      key={skill.id}
                      className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between"
                    >
                      <div>
                        <p className="text-xs font-bold text-white">{skill.name}</p>
                        <p className="text-[10px] text-slate-400">{skill.category} · {skill.proficiency}%</p>
                      </div>
                      <button
                        onClick={() => handleDeleteSkill(skill.id)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800"
                        title="Delete skill"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. MESSAGES TAB */}
            {activeTab === 'messages' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white font-heading mb-1">Inbound Transmissions</h3>
                  <p className="text-xs text-slate-400">All submissions sent from the public portfolio contact form.</p>
                </div>

                <div className="space-y-3">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-5 rounded-2xl border transition-all ${
                        msg.status === 'unread'
                          ? 'bg-[#111C30] border-purple-500/40'
                          : 'bg-slate-900/40 border-slate-800'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-white">{msg.name}</h4>
                            <span className="text-xs font-mono text-cyan-400">({msg.email})</span>
                            {msg.status === 'unread' && (
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-purple-500/30 text-purple-200">
                                Unread
                              </span>
                            )}
                          </div>
                          <p className="text-xs font-semibold text-slate-300 mt-0.5">{msg.subject}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleToggleMessageRead(msg)}
                            className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-slate-800 text-slate-300 hover:text-white"
                          >
                            Mark {msg.status === 'unread' ? 'Read' : 'Unread'}
                          </button>
                          <button
                            onClick={() => handleDeleteMessage(msg.id)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <p className="text-xs text-slate-400 leading-relaxed pt-2 border-t border-slate-800/80">
                        {msg.message}
                      </p>

                      <div className="mt-2 text-[10px] font-mono text-slate-500">
                        Received: {new Date(msg.createdAt).toLocaleString()}
                      </div>
                    </div>
                  ))}

                  {messages.length === 0 && (
                    <div className="py-12 text-center text-slate-400 font-mono text-xs">
                      No contact messages received yet.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 5. SETTINGS TAB */}
            {activeTab === 'settings' && settingsForm && (
              <form onSubmit={handleSaveSettings} className="space-y-6 max-w-2xl">
                <div>
                  <h3 className="text-xl font-bold text-white font-heading mb-1">Portfolio Identity & Configuration</h3>
                  <p className="text-xs text-slate-400">Edit your public developer name, title, bio, and social coordinates.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={settingsForm.fullName || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, fullName: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl text-xs bg-slate-900 border border-slate-800 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Professional Title</label>
                    <input
                      type="text"
                      value={settingsForm.professionalTitle || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, professionalTitle: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl text-xs bg-slate-900 border border-slate-800 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Biography</label>
                  <textarea
                    rows={4}
                    value={settingsForm.biography || ''}
                    onChange={(e) => setSettingsForm({ ...settingsForm, biography: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-slate-900 border border-slate-800 text-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Location Base</label>
                    <input
                      type="text"
                      value={settingsForm.location || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, location: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl text-xs bg-slate-900 border border-slate-800 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Public Email</label>
                    <input
                      type="email"
                      value={settingsForm.email || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl text-xs bg-slate-900 border border-slate-800 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Availability Status</label>
                  <input
                    type="text"
                    value={settingsForm.availability || ''}
                    onChange={(e) => setSettingsForm({ ...settingsForm, availability: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-slate-900 border border-slate-800 text-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">GitHub URL</label>
                    <input
                      type="url"
                      value={settingsForm.socialLinks?.github || ''}
                      onChange={(e) => setSettingsForm({
                        ...settingsForm,
                        socialLinks: { ...settingsForm.socialLinks, github: e.target.value }
                      })}
                      className="w-full px-3 py-2 rounded-xl text-xs bg-slate-900 border border-slate-800 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">LinkedIn URL</label>
                    <input
                      type="url"
                      value={settingsForm.socialLinks?.linkedin || ''}
                      onChange={(e) => setSettingsForm({
                        ...settingsForm,
                        socialLinks: { ...settingsForm.socialLinks, linkedin: e.target.value }
                      })}
                      className="w-full px-3 py-2 rounded-xl text-xs bg-slate-900 border border-slate-800 text-white"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 shadow-lg hover:opacity-95"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Changes to Database</span>
                  </button>
                </div>
              </form>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
