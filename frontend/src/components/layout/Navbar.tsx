import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { OrbitLogo } from '../common/OrbitLogo';
import { Button } from '../ui/Button';
import { useAuth } from '../../context/AuthContext';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();

  const isDashboard = location.pathname.startsWith('/dashboard');
  const targetDestination = isAuthenticated ? '/dashboard' : '/signup';

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Thick Yellow Scroll-Progress Bar */}
      {!isDashboard && (
        <div className="fixed top-0 left-0 right-0 z-50 h-1.5 bg-black">
          <div
            className="h-full bg-[#F5D90A] border-r-2 border-black transition-all duration-75 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      )}

      <header className="sticky top-0 z-40 w-full border-b-2 border-black bg-[#F7F5F0]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Left: Brand Logo & Navigation */}
          <div className="flex items-center gap-8">
            <OrbitLogo size="md" />

            {!isDashboard && (
              <nav className="hidden md:flex items-center space-x-6 text-xs font-display font-black uppercase tracking-wider text-black">
                <a 
                  href="#how-it-works" 
                  className="px-2 py-1 hover:bg-[#F5D90A] border border-transparent hover:border-black transition-colors"
                >
                  WORKFLOWS
                </a>
                {isAuthenticated ? (
                  <Link 
                    to="/dashboard/api-specs#api-reference" 
                    className="px-2 py-1 hover:bg-[#F5D90A] border border-transparent hover:border-black transition-colors"
                  >
                    API REFERENCE
                  </Link>
                ) : (
                  <a 
                    href="#api-reference" 
                    className="px-2 py-1 hover:bg-[#F5D90A] border border-transparent hover:border-black transition-colors"
                  >
                    API REFERENCE
                  </a>
                )}
                <Link 
                  to={targetDestination} 
                  className="px-2 py-1 hover:bg-[#F5D90A] border border-transparent hover:border-black transition-colors"
                >
                  DASHBOARD
                </Link>
              </nav>
            )}
          </div>

          {/* Right: Auth Status & Single Canonical CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated && user?.name && (
              <div className="px-2.5 py-1 bg-[#F5D90A] border-2 border-black font-mono font-black text-xs uppercase shadow-[2px_2px_0px_#111]">
                WELCOME BACK, {user.name}!
              </div>
            )}

            <Link to={targetDestination}>
              <Button variant="primary" size="sm" className="gap-2">
                <span>OPEN DASHBOARD</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
              </Button>
            </Link>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center gap-2">
            {isAuthenticated && user?.name && (
              <div className="px-2 py-0.5 bg-[#F5D90A] border-2 border-black font-mono font-black text-[10px] uppercase shadow-[1px_1px_0px_#111] truncate max-w-[120px]">
                {user.name}
              </div>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 border-2 border-black bg-white shadow-[2px_2px_0px_#111] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 stroke-[2.5]" /> : <Menu className="w-5 h-5 stroke-[2.5]" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown (390px friendly) */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b-2 border-black bg-white p-5 space-y-4 shadow-[4px_4px_0px_#111]">
            {isAuthenticated && user?.name && (
              <div className="p-2.5 bg-[#F5D90A] border-2 border-black font-mono font-black text-xs uppercase shadow-[2px_2px_0px_#111] text-center">
                LOGGED IN AS: {user.name} ({user.email})
              </div>
            )}

            <nav className="flex flex-col space-y-2 text-xs font-display font-black uppercase tracking-wider text-black">
              <a
                href="#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 hover:bg-[#F5D90A] border-2 border-transparent hover:border-black"
              >
                WORKFLOWS
              </a>
              {isAuthenticated ? (
                <Link
                  to="/dashboard/api-specs#api-reference"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 px-3 hover:bg-[#F5D90A] border-2 border-transparent hover:border-black"
                >
                  API REFERENCE
                </Link>
              ) : (
                <a
                  href="#api-reference"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 px-3 hover:bg-[#F5D90A] border-2 border-transparent hover:border-black"
                >
                  API REFERENCE
                </a>
              )}
              <Link
                to={targetDestination}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 hover:bg-[#F5D90A] border-2 border-transparent hover:border-black"
              >
                DASHBOARD
              </Link>
            </nav>

            <div className="pt-3 border-t-2 border-black">
              <Link
                to={targetDestination}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button variant="primary" fullWidth size="md" className="gap-2">
                  <span>OPEN DASHBOARD</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
