import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { Link } from 'react-router-dom';
import {
  CreditCard,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Clock,
  Plus,
  ArrowRight,
  Send,
  Calendar,
  Layers,
  Sparkles,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import dayjs from 'dayjs';

export const Overview: React.FC = () => {
  const { data: subscriptions = [], isLoading } = useQuery({
    queryKey: ['subscriptions'],
    queryFn: () => api.getSubscriptions(),
  });

  const { data: workflows = [] } = useQuery({
    queryKey: ['activeWorkflows'],
    queryFn: () => api.getActiveWorkflows(),
  });

  // Calculate real metrics directly from subscriptions list
  const activeSubs = subscriptions.filter((s) => s.status === 'active');
  const expiredSubs = subscriptions.filter((s) => s.status === 'expired');
  const cancelledSubs = subscriptions.filter((s) => s.status === 'cancelled');

  // Sum spending by currency
  const totalUSD = activeSubs
    .filter((s) => s.currency === 'USD')
    .reduce((acc, s) => acc + (s.frequency === 'yearly' ? s.price / 12 : s.price), 0);

  const totalEUR = activeSubs
    .filter((s) => s.currency === 'EUR')
    .reduce((acc, s) => acc + (s.frequency === 'yearly' ? s.price / 12 : s.price), 0);

  const totalRS = activeSubs
    .filter((s) => s.currency === 'RS')
    .reduce((acc, s) => acc + (s.frequency === 'yearly' ? s.price / 12 : s.price), 0);

  // Group by category for chart
  const categoriesList = [
    'technology',
    'entertainment',
    'finance',
    'lifestyle',
    'sports',
    'news',
    'politics',
  ] as const;

  const categoryData = categoriesList.map((cat) => {
    const count = activeSubs.filter((s) => s.category === cat).length;
    return {
      category: cat.charAt(0).toUpperCase() + cat.slice(1),
      count,
    };
  }).filter((d) => d.count > 0);

  // Upcoming renewals in next 14 days
  const upcomingRenewals = activeSubs
    .slice()
    .sort((a, b) => new Date(a.renewalDate).getTime() - new Date(b.renewalDate).getTime())
    .slice(0, 4);

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Subscription Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real-time status of your active recurring subscriptions and scheduled Upstash reminder workflows.
          </p>
        </div>

        <Link
          to="/dashboard/subscriptions"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold text-xs sm:text-sm shadow-md shadow-indigo-600/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Subscription</span>
        </Link>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Active Subs */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#0e1424] border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span>Active Subscriptions</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white mt-2">
            {activeSubs.length}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Tracking in MongoDB
          </div>
        </div>

        {/* Monthly USD */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#0e1424] border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span>USD Spending / mo</span>
            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">USD</span>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white mt-2">
            ${Math.round(totalUSD).toLocaleString()}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Normalized monthly cost
          </div>
        </div>

        {/* Multi-Currency Commitment */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#0e1424] border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span>Other Currencies</span>
            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">EUR & RS</span>
          </div>
          <div className="text-xl font-bold text-slate-900 dark:text-white mt-2">
            €{Math.round(totalEUR)} • ₹{Math.round(totalRS).toLocaleString()}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            EUR & Indian Rupee (RS)
          </div>
        </div>

        {/* Inactive & Expired */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#0e1424] border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span>Inactive / Expired</span>
            <XCircle className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white mt-2">
            {expiredSubs.length + cancelledSubs.length}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {expiredSubs.length} expired, {cancelledSubs.length} cancelled
          </div>
        </div>

      </div>

      {/* Main Grid: Category Distribution & Upcoming Renewals */}
      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* Left: Category Breakdown (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-white dark:bg-[#0e1424] border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Active Subscriptions by Category
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Real counts grouped by Mongoose schema category enum
            </p>

            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData}>
                  <XAxis dataKey="category" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis allowDecimals={false} stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderColor: '#334155',
                      borderRadius: '0.75rem',
                      color: '#f8fafc',
                      fontSize: '12px',
                    }}
                  />
                  <Bar dataKey="count" fill="#4F46E5" radius={[6, 6, 0, 0]} name="Active Count" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>Enums: sports, news, entertainment, lifestyle, technology, finance, politics</span>
          </div>
        </div>

        {/* Right: Upcoming Renewal Alerts & Workflow Trigger (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-white dark:bg-[#0e1424] border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-500" />
                <span>Upcoming Renewals</span>
              </h3>
              <Link
                to="/dashboard/workflows"
                className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
              >
                View Workflows →
              </Link>
            </div>

            <div className="space-y-2.5">
              {upcomingRenewals.map((sub) => {
                const renewalFormatted = dayjs(sub.renewalDate).format('MMM D, YYYY');
                const daysRemaining = dayjs(sub.renewalDate).diff(dayjs(), 'day');

                return (
                  <div
                    key={sub._id}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">{sub.name}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        Renews on {renewalFormatted} ({daysRemaining}d left)
                      </div>
                    </div>

                    <div className="text-right font-mono">
                      <div className="font-bold text-slate-900 dark:text-white">
                        {sub.currency === 'USD' ? '$' : sub.currency === 'EUR' ? '€' : '₹'}
                        {sub.price}
                      </div>
                      <span className="text-[10px] text-indigo-500 uppercase font-semibold">
                        {sub.frequency}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 rounded-xl text-indigo-700 dark:text-indigo-300 text-xs flex items-center gap-2">
            <Send className="w-4 h-4 shrink-0 text-indigo-500" />
            <span>Automated emails scheduled 7d, 5d, 2d, and 1d prior to renewal date.</span>
          </div>
        </div>

      </div>

    </div>
  );
};
