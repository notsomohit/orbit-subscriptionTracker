import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, LayoutDashboard, LogIn } from 'lucide-react';
import { OrbitLogo } from '../common/OrbitLogo';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';

export const Navbar: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <header className="sticky top-0 z-40 w-full border-b-2 border-black bg-[#F7F5F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left: Brand Logo & Navigation */}
        <div className="flex items-center gap-8">
          <OrbitLogo size="md" />

          {!isDashboard && (
            <nav className="hidden md:flex items-center space-x-6 text-sm font-display font-bold uppercase tracking-wider text-black">
              <a 
                href="#workflows" 
                className="px-2 py-1 hover:bg-[#F5D90A] border border-transparent hover:border-black transition-colors"
              >
                Workflows
              </a>
              <a 
                href="#api" 
                className="px-2 py-1 hover:bg-[#F5D90A] border border-transparent hover:border-black transition-colors"
              >
                API Reference
              </a>
              {isAuthenticated && (
                <Link
                  to="/dashboard"
                  className="px-2 py-1 bg-[#F5D90A] border-2 border-black shadow-[2px_2px_0px_#111] flex items-center gap-1.5"
                >
                  <LayoutDashboard className="w-4 h-4 stroke-[2.5]" />
                  <span>Dashboard</span>
                </Link>
              )}
            </nav>
          )}
        </div>

        {/* Right: Auth CTAs */}
        <div className="hidden md:flex items-center space-x-3">
          {isAuthenticated ? (
            <Link to="/dashboard">
              <Button variant="primary" size="sm" className="gap-2">
                <LayoutDashboard className="w-4 h-4 stroke-[2.5]" />
                <span>Go to Dashboard</span>
              </Button>
            </Link>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="secondary" size="sm" className="gap-1.5">
                  <LogIn className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Log In</span>
                </Button>
              </Link>

              <Link to="/signup">
                <Button variant="primary" size="sm" className="gap-1.5">
                  <span>Get Started</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center space-x-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 border-2 border-black bg-white shadow-[2px_2px_0px_#111] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 stroke-[2.5]" /> : <Menu className="w-5 h-5 stroke-[2.5]" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b-2 border-black bg-white p-5 space-y-4 shadow-[4px_4px_0px_#111]">
          <nav className="flex flex-col space-y-2 text-sm font-display font-bold uppercase tracking-wider text-black">
            <a
              href="#workflows"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 hover:bg-[#F5D90A] border-2 border-transparent hover:border-black"
            >
              Workflow Reminders
            </a>
            <a
              href="#api"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 hover:bg-[#F5D90A] border-2 border-transparent hover:border-black"
            >
              API Reference
            </a>
            {isAuthenticated && (
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 bg-[#F5D90A] border-2 border-black font-bold flex items-center gap-2"
              >
                <LayoutDashboard className="w-4 h-4 stroke-[2.5]" />
                <span>Dashboard</span>
              </Link>
            )}
          </nav>

          <div className="pt-3 border-t-2 border-black flex flex-col gap-2">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button variant="primary" fullWidth size="md">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button variant="secondary" fullWidth size="sm">
                    Log In
                  </Button>
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button variant="primary" fullWidth size="sm">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
