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
    { name: 'Workflows', to: '/dashboard/workflows', icon: Clock },
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
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-64 bg-white text-black border-r-3 border-black flex flex-col justify-between transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Top Logo */}
          <div className="h-16 px-5 flex items-center justify-between border-b-2 border-black bg-[#F7F5F0]">
            <OrbitLogo size="sm" />
            <button
              onClick={() => setMobileOpen(false)}
              className="lg:hidden p-1.5 bg-white border-2 border-black shadow-[2px_2px_0px_#111] hover:bg-[#F5D90A]"
            >
              <X className="w-4 h-4 stroke-[3]" />
            </button>
          </div>

          {/* User Session Info */}
          <div className="px-5 py-3 border-b-2 border-black bg-[#EFECE6] flex items-center gap-3">
            <div className="w-8 h-8 bg-[#F5D90A] border-2 border-black shadow-[2px_2px_0px_#111] flex items-center justify-center font-display font-black text-xs text-black">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-display font-bold text-black truncate uppercase">{user?.name || 'Guest User'}</div>
              <div className="text-[10px] text-neutral-600 font-mono truncate">{user?.email || 'Not logged in'}</div>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.exact}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 text-xs font-display font-bold uppercase tracking-wider transition-all duration-100 ${
                      isActive
                        ? 'bg-[#F5D90A] text-black border-2 border-black shadow-[3px_3px_0px_#111] translate-x-[1px] translate-y-[1px]'
                        : 'bg-white text-neutral-800 border-2 border-transparent hover:border-black hover:bg-[#F7F5F0]'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 shrink-0 stroke-[2.5]" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t-2 border-black bg-[#F7F5F0] space-y-2">
          <Link
            to="/"
            className="flex items-center gap-2 px-3 py-2 bg-white border-2 border-black shadow-[2px_2px_0px_#111] hover:bg-[#F5D90A] text-xs font-display font-bold uppercase transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Public Home</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 bg-[#FEE2E2] border-2 border-black shadow-[2px_2px_0px_#111] hover:bg-[#EF4444] hover:text-white text-xs font-display font-bold uppercase transition-all text-left text-[#B91C1C]"
          >
            <LogOut className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};
