import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { DashboardSidebar } from './DashboardSidebar';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import {
  Menu,
  Sun,
  Moon,
  Search,
  Plus,
  ShieldCheck,
} from 'lucide-react';

export const DashboardLayout: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-[#070a12] text-slate-900 dark:text-slate-100 flex transition-colors">
      {/* Sidebar */}
      <DashboardSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        
        {/* Top Header */}
        <header className="sticky top-0 z-30 h-16 bg-white/90 dark:bg-[#0b0f19]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-colors">
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Subscription Tracker API Online (Port 5500)</span>
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
              <div className="w-8 h-8 rounded-full bg-indigo-600/20 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center font-bold text-xs">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-xs font-bold text-slate-900 dark:text-white">{user?.name || 'User'}</div>
                <div className="text-[10px] text-slate-400">Authenticated</div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content Outlet */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
