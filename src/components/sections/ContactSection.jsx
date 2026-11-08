import React, { useState } from 'react';
import { Mail, MapPin, Send, Github, Linkedin, CheckCircle, AlertCircle, Phone, ArrowUpRight } from 'lucide-react';
import { api } from '../../services/api';
import { validateContactForm } from '../../utils/validators';

export default function ContactSection({ settings }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null);

    // Validate
    const validation = validateContactForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setLoading(true);
    try {
      await api.sendContactMessage(formData);
      setSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSuccess(false), 8000);
    } catch (err) {
      setApiError(err.message || 'An error occurred while submitting your message.');
    } finally {
      setLoading(false);
    }
  };

  const email = settings?.email || 'mhasan7062@gmail.com';
  const location = settings?.location || 'Available Worldwide & Remote';
  const github = settings?.socialLinks?.github || 'https://github.com';
  const linkedin = settings?.socialLinks?.linkedin || 'https://linkedin.com';
  const whatsapp = settings?.socialLinks?.whatsapp || '+923200965085';
  const phoneSecondary = settings?.socialLinks?.phoneSecondary || '+923153865085';

  return (
    <section id="contact" className="py-24 relative border-t border-slate-200 dark:border-slate-800/60 bg-[#F8FAFC] dark:bg-[#070A13] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide bg-cyan-100 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/30 text-cyan-800 dark:text-cyan-400">
            <Send className="w-3.5 h-3.5" />
            <span>Initiate Transmission</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading tracking-tight text-slate-900 dark:text-white">
            Let's Build Something Exceptional
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-xl text-sm sm:text-base">
            Have a project in mind, an engineering leadership role, or a contract proposal? Submit a message directly to my backend inbox.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Info & Social Connections */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-white dark:bg-[#111C30] border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-heading">
                Contact Information
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                I am actively considering senior full-stack and frontend architectural roles, select client contracts, and technical advisory opportunities.
              </p>

              {/* Direct Channels */}
              <div className="space-y-3.5 pt-2">
                {/* Email Channel */}
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-purple-400/60 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="block text-[11px] font-mono text-slate-500 dark:text-slate-400">Direct Email</span>
                    <span className="text-sm font-semibold text-slate-900 dark:text-white truncate block">
                      {email}
                    </span>
                  </div>
                </a>

                {/* Primary WhatsApp / Phone */}
                <a
                  href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-emerald-400/60 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-mono text-slate-500 dark:text-slate-400">Mobile (Primary) & WhatsApp</span>
                    <span className="text-sm font-semibold text-slate-900 dark:text-white font-mono">
                      {whatsapp}
                    </span>
                  </div>
                </a>

                {/* Secondary Phone */}
                <a
                  href={`tel:${phoneSecondary}`}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-cyan-400/60 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-cyan-100 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-mono text-slate-500 dark:text-slate-400">Mobile (Secondary)</span>
                    <span className="text-sm font-semibold text-slate-900 dark:text-white font-mono">
                      {phoneSecondary}
                    </span>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-mono text-slate-500 dark:text-slate-400">Location Base</span>
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">
                      {location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                <span className="block text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                  Developer Profiles
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href={github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-white hover:border-slate-400 transition-colors cursor-pointer"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-slate-400 transition-colors cursor-pointer"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Functional Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#111C30] border border-slate-200 dark:border-slate-800 shadow-sm relative">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-heading mb-2">
                Send a Message
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-6">
                All inquiries are validated and stored securely in MongoDB database records.
              </p>

              {/* Success Notification */}
              {success && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-300 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-sm flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  <span>Your message has been dispatched successfully! I will review and reply within 24 hours.</span>
                </div>
              )}

              {/* API Error Notification */}
              {apiError && (
                <div className="mb-6 p-4 rounded-2xl bg-rose-50 dark:bg-rose-500/10 border border-rose-300 dark:border-rose-500/30 text-rose-800 dark:text-rose-300 text-sm flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 shrink-0 text-rose-600 dark:text-rose-400" />
                  <span>{apiError}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-mono text-slate-700 dark:text-slate-300 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      className={`w-full px-4 py-3 rounded-xl text-sm bg-slate-50 dark:bg-slate-900/80 border ${
                        errors.name ? 'border-rose-500' : 'border-slate-300 dark:border-slate-800'
                      } text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all`}
                    />
                    {errors.name && <p className="text-xs text-rose-600 dark:text-rose-400 mt-1">{errors.name}</p>}
                  </div>

                  {/* Email Address */}
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-mono text-slate-700 dark:text-slate-300 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jane@company.com"
                      className={`w-full px-4 py-3 rounded-xl text-sm bg-slate-50 dark:bg-slate-900/80 border ${
                        errors.email ? 'border-rose-500' : 'border-slate-300 dark:border-slate-800'
                      } text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all`}
                    />
                    {errors.email && <p className="text-xs text-rose-600 dark:text-rose-400 mt-1">{errors.email}</p>}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="contact-subject" className="block text-xs font-mono text-slate-700 dark:text-slate-300 mb-1.5">
                    Subject *
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Full-Stack Engineering Contract / Project Proposal"
                    className={`w-full px-4 py-3 rounded-xl text-sm bg-slate-50 dark:bg-slate-900/80 border ${
                      errors.subject ? 'border-rose-500' : 'border-slate-300 dark:border-slate-800'
                    } text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all`}
                  />
                  {errors.subject && <p className="text-xs text-rose-600 dark:text-rose-400 mt-1">{errors.subject}</p>}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className="block text-xs font-mono text-slate-700 dark:text-slate-300 mb-1.5">
                    Message Details *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Please outline the project scope, technical requirements, timeline, or position details..."
                    className={`w-full px-4 py-3 rounded-xl text-sm bg-slate-50 dark:bg-slate-900/80 border ${
                      errors.message ? 'border-rose-500' : 'border-slate-300 dark:border-slate-800'
                    } text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all resize-none`}
                  />
                  {errors.message && <p className="text-xs text-rose-600 dark:text-rose-400 mt-1">{errors.message}</p>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 hover:opacity-95 transition-opacity shadow-lg shadow-purple-600/20 flex items-center justify-center gap-2 disabled:opacity-50 active:scale-[0.99] cursor-pointer"
                >
                  {loading ? (
                    <span>Dispatched to API...</span>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
