import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F7F5F0] flex flex-col items-center justify-center text-center px-6 select-none">
      
      {/* Massive 404 Graphic Badge */}
      <div className="relative mb-6">
        <div className="absolute -inset-2 bg-[#F5D90A] border-3 border-black shadow-[6px_6px_0px_#111]" />
        <div className="relative bg-white border-3 border-black px-8 py-4">
          <span className="text-7xl sm:text-9xl font-display font-black text-black tracking-tighter">
            404
          </span>
        </div>
      </div>

      {/* Copy */}
      <h1 className="text-3xl sm:text-5xl font-display font-black text-black uppercase tracking-tight mb-3">
        LOST IN ORBIT.
      </h1>
      
      <p className="text-neutral-800 text-sm sm:text-base max-w-sm leading-relaxed mb-8 font-medium">
        This page has drifted out of range. It doesn't exist, or it moved — either way, it's not here.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Link to="/">
          <Button variant="primary" size="lg">
            ← BACK TO LANDING
          </Button>
        </Link>
        <Link to="/dashboard">
          <Button variant="secondary" size="lg">
            OPEN DASHBOARD
          </Button>
        </Link>
      </div>
    </div>
  );
};
