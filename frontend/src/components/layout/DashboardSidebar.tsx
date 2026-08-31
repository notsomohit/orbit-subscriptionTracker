import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  CreditCard,
  Clock,
  Terminal,
  LogOut,
  ArrowLeft,
  X,
  ExternalLink,
  ShieldCheck,
  User as UserIcon,
} from 'lucide-react';
import { OrbitLogo } from '../common/OrbitLogo';
import { useAuth } from '../../context/AuthContext';

interface DashboardSidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  mobileOpen,
  setMobileOpen,
}) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Overview', to: '/dashboard', icon: LayoutDashboard, exact: true },
    { name: 'Subscriptions', to: '/dashboard/subscriptions', icon: CreditCard },
    { name: 'Upstash Workflows', to: '/dashboard/workflows', icon: Clock },
    { name: 'API Reference', to: '/dashboard/api-specs', icon: Terminal },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-64 bg-slate-900 text-slate-300 border-r border-slate-800 flex flex-col justify-between transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Top Logo */}
          <div className="h-16 px-6 flex items-center justify-between border-b border-slate-800">
            <OrbitLogo size="sm" />
            <button
              onClick={() => setMobileOpen(false)}
              className="lg:hidden p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Session Info */}
          <div className="px-5 py-3 border-b border-slate-800 bg-slate-950/50 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-600/30 border border-indigo-500/50 flex items-center justify-center text-indigo-300 font-bold text-xs">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-white truncate">{user?.name || 'Guest User'}</div>
              <div className="text-[11px] text-slate-400 font-mono truncate">{user?.email || 'Not logged in'}</div>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="px-3 py-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.exact}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link
            to="/"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Public Landing Page</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 transition-colors text-left"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log Out (/auth/log-out)</span>
          </button>
        </div>
      </aside>
    </>
  );
};
