import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { DashboardSidebar } from './DashboardSidebar';
import { useAuth } from '../../context/AuthContext';
import { Menu, LayoutDashboard, CreditCard, Clock, Terminal } from 'lucide-react';

export const DashboardLayout: React.FC = () => {
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const mobileNavItems = [
    { name: 'Overview', to: '/dashboard', icon: LayoutDashboard, exact: true },
    { name: 'Subs', to: '/dashboard/subscriptions', icon: CreditCard },
    { name: 'Workflows', to: '/dashboard/workflows', icon: Clock },
    { name: 'API', to: '/dashboard/api-specs', icon: Terminal },
  ];

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-black flex flex-col">
      {/* Sidebar for Desktop */}
      <DashboardSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64 pb-16 lg:pb-0">
        
        {/* Top Header */}
        <header className="sticky top-0 z-30 h-16 bg-white border-b-2 border-black px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 bg-white border-2 border-black shadow-[2px_2px_0px_#111] hover:bg-[#F5D90A]"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5 stroke-[2.5]" />
            </button>
            <div className="flex items-center gap-2 text-xs font-mono font-bold">
              <span className="w-2.5 h-2.5 bg-[#22C55E] border border-black inline-block animate-pulse" />
              <span className="hidden sm:inline">ORBIT BACKEND LIVE (PORT 5500)</span>
              <span className="sm:hidden">PORT 5500</span>
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-[#F5D90A] border-2 border-black shadow-[2px_2px_0px_#111] flex items-center justify-center font-display font-black text-xs text-black">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-xs font-display font-bold text-black uppercase">{user?.name || 'User'}</div>
                <div className="text-[10px] text-neutral-600 font-mono uppercase font-bold">AUTHENTICATED</div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content Outlet */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

      {/* Mobile Fixed Bottom Navigation Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t-3 border-black grid grid-cols-4 shadow-[0_-4px_0px_#111]">
        {mobileNavItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.exact}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center py-2.5 text-[10px] font-display font-bold uppercase tracking-wider border-r border-black last:border-r-0 transition-colors ${
                  isActive ? 'bg-[#F5D90A] text-black font-black' : 'text-neutral-700 hover:bg-neutral-100'
                }`
              }
            >
              <Icon className="w-4 h-4 stroke-[2.5] mb-0.5" />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};
