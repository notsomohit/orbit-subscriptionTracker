import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X, ArrowRight, LayoutDashboard, Terminal, Workflow, LogIn } from 'lucide-react';
import { OrbitLogo } from '../common/OrbitLogo';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-[#080c14]/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left: Brand Logo & Navigation */}
        <div className="flex items-center gap-8">
          <OrbitLogo size="md" />

          {!isDashboard && (
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-600 dark:text-slate-300">
              <a href="#architecture" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                Architecture
              </a>
              <a href="#workflows" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                Workflow Reminders
              </a>
              <a href="#api" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                API Specs
              </a>
              <Link
                to="/dashboard"
                className="text-indigo-600 dark:text-indigo-400 flex items-center gap-1 hover:underline font-semibold"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                Console
              </Link>
            </nav>
          )}
        </div>

        {/* Right: Auth CTAs & Theme Switcher */}
        <div className="hidden md:flex items-center space-x-3">
          {/* Dark / Light Mode Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl transition-all shadow-md shadow-indigo-500/20"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Go to Dashboard</span>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-3.5 py-1.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors flex items-center gap-1"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Log In</span>
              </Link>

              <Link
                to="/signup"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl transition-all shadow-md shadow-indigo-500/20"
              >
                <span>Create Account</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center space-x-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b0f19] px-4 pt-2 pb-6 space-y-3">
          <nav className="flex flex-col space-y-3 text-sm font-medium text-slate-700 dark:text-slate-300">
            <a
              href="#architecture"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              Architecture
            </a>
            <a
              href="#workflows"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              Workflow Reminders
            </a>
            <a
              href="#api"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              API Specs
            </a>
            <Link
              to="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-indigo-600 dark:text-indigo-400 font-semibold"
            >
              Dashboard
            </Link>
          </nav>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2 text-center text-sm font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-xl"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2 text-center text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl"
            >
              Create Account
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
