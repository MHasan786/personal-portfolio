import React from 'react';
import { ArrowUp, Shield } from 'lucide-react';

export default function Footer({ onOpenAdminLogin, onOpenAdmin, isAuthenticated }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#070A13] text-slate-600 dark:text-slate-400 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand & Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-purple-600 to-cyan-400 flex items-center justify-center text-white font-mono text-xs font-bold shadow-md">
            M
          </div>
          <span className="text-sm font-semibold text-slate-900 dark:text-white font-heading">
            MUHAMMAD HASAN
          </span>
          <span className="hidden sm:inline text-slate-400 dark:text-slate-600">·</span>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            © {new Date().getFullYear()} MUHAMMAD HASAN. Built with React, Express, MongoDB & Three.js.
          </span>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center gap-4 text-xs font-mono">
          {isAuthenticated ? (
            <button
              onClick={onOpenAdmin}
              className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Panel</span>
            </button>
          ) : (
            <button
              onClick={onOpenAdminLogin}
              className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              Admin Access
            </button>
          )}

          <span className="text-slate-300 dark:text-slate-700">·</span>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 p-2 rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-pointer shadow-xs"
            title="Return to top"
            aria-label="Back to top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
