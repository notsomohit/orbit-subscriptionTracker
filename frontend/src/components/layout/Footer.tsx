import React from 'react';
import { OrbitLogo } from '../common/OrbitLogo';
import { Link } from 'react-router-dom';
import { Badge } from '../ui/Badge';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t-3 border-black bg-[#F7F5F0] text-black text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand info */}
          <div className="col-span-2 space-y-4">
            <OrbitLogo size="md" />
            <p className="text-xs font-medium text-neutral-800 max-w-sm leading-relaxed">
              Backend API and frontend dashboard for managing recurring subscriptions and automating renewal reminder emails using Upstash Workflow, Nodemailer, and MongoDB.
            </p>
            <div>
              <Badge variant="active" size="md">
                OPEN SOURCE & FREE TO USE
              </Badge>
            </div>
          </div>

          {/* Core System Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-display font-black uppercase tracking-wider text-black">
              API & System
            </h4>
            <ul className="space-y-2 text-xs font-bold text-neutral-800">
              <li><a href="#architecture" className="hover:bg-[#F5D90A] px-1 py-0.5 border border-transparent hover:border-black inline-block">Architecture Pipeline</a></li>
              <li><a href="#workflows" className="hover:bg-[#F5D90A] px-1 py-0.5 border border-transparent hover:border-black inline-block">Upstash Workflow (7, 5, 2, 1d)</a></li>
              <li><a href="#api" className="hover:bg-[#F5D90A] px-1 py-0.5 border border-transparent hover:border-black inline-block">REST Route Endpoints</a></li>
              <li><Link to="/dashboard" className="hover:bg-[#F5D90A] px-1 py-0.5 border border-transparent hover:border-black inline-block">Web Console</Link></li>
            </ul>
          </div>

          {/* Navigation & Auth */}
          <div className="space-y-3">
            <h4 className="text-xs font-display font-black uppercase tracking-wider text-black">
              Account
            </h4>
            <ul className="space-y-2 text-xs font-bold text-neutral-800">
              <li><Link to="/login" className="hover:bg-[#F5D90A] px-1 py-0.5 border border-transparent hover:border-black inline-block">Log In</Link></li>
              <li><Link to="/signup" className="hover:bg-[#F5D90A] px-1 py-0.5 border border-transparent hover:border-black inline-block">Create Account</Link></li>
              <li><Link to="/dashboard/subscriptions" className="hover:bg-[#F5D90A] px-1 py-0.5 border border-transparent hover:border-black inline-block">Manage Subscriptions</Link></li>
              <li><a href="https://github.com/notsomohit/subscription-tracker" target="_blank" rel="noreferrer" className="hover:bg-[#F5D90A] px-1 py-0.5 border border-transparent hover:border-black inline-block">GitHub Repository</a></li>
            </ul>
          </div>

        </div>

        <div className="pt-6 border-t-2 border-black flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold">
          <div>
            © {new Date().getFullYear()} ORBIT — Subscription Tracker API. Managed by <a href="https://github.com/notsomohit" target="_blank" rel="noreferrer" className="bg-[#F5D90A] px-1 border border-black hover:bg-black hover:text-white">mohit</a>.
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono font-bold">
            <span className="bg-white border border-black px-1.5 py-0.5">Node.js</span>
            <span className="bg-white border border-black px-1.5 py-0.5">Express</span>
            <span className="bg-white border border-black px-1.5 py-0.5">MongoDB</span>
            <span className="bg-[#F5D90A] border border-black px-1.5 py-0.5">Upstash</span>
            <span className="bg-white border border-black px-1.5 py-0.5">Arcjet</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
