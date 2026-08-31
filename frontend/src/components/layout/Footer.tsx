import React from 'react';
import { OrbitLogo } from '../common/OrbitLogo';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#060911] text-slate-600 dark:text-slate-400 text-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          
          {/* Brand info */}
          <div className="col-span-2 space-y-3">
            <OrbitLogo size="md" />
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              Backend API and frontend dashboard for managing recurring subscriptions and automating renewal reminder emails using Upstash Workflow, Nodemailer, and MongoDB.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-400 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Open Source & Free to Use</span>
            </div>
          </div>

          {/* Core System Links */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              API & System
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li><a href="#architecture" className="hover:text-indigo-600 dark:hover:text-indigo-400">Architecture Pipeline</a></li>
              <li><a href="#workflows" className="hover:text-indigo-600 dark:hover:text-indigo-400">Upstash Workflow (7, 5, 2, 1d)</a></li>
              <li><a href="#api" className="hover:text-indigo-600 dark:hover:text-indigo-400">REST Route Endpoints</a></li>
              <li><Link to="/dashboard" className="hover:text-indigo-600 dark:hover:text-indigo-400">Web Console</Link></li>
            </ul>
          </div>

          {/* Navigation & Auth */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Account
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li><Link to="/login" className="hover:text-indigo-600 dark:hover:text-indigo-400">Log In</Link></li>
              <li><Link to="/signup" className="hover:text-indigo-600 dark:hover:text-indigo-400">Create Account</Link></li>
              <li><Link to="/dashboard/subscriptions" className="hover:text-indigo-600 dark:hover:text-indigo-400">Manage Subscriptions</Link></li>
              <li><a href="https://github.com/notsomohit/subscription-tracker" target="_blank" rel="noreferrer" className="hover:text-indigo-600 dark:hover:text-indigo-400">GitHub Repository</a></li>
            </ul>
          </div>

        </div>

        <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Orbit — Subscription Tracker API. Managed by <a href="https://github.com/notsomohit" target="_blank" rel="noreferrer" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">mohit</a>.
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <span>Node.js</span>
            <span>•</span>
            <span>Express</span>
            <span>•</span>
            <span>MongoDB</span>
            <span>•</span>
            <span>Upstash</span>
            <span>•</span>
            <span>Arcjet</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
