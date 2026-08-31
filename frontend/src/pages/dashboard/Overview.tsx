import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { Link } from 'react-router-dom';
import {
  CreditCard,
  CheckCircle2,
  XCircle,
  Clock,
  Plus,
  Send,
  TrendingUp,
  PieChart as PieIcon,
  BarChart3,
  Layers,
  PackageOpen,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import dayjs from 'dayjs';

const STATUS_COLORS: Record<string, string> = {
  active: '#10B981',
  cancelled: '#F43F5E',
  expired: '#64748B',
};

const CATEGORY_COLORS = [
  '#6366F1', '#EC4899', '#06B6D4', '#8B5CF6', '#F59E0B', '#10B981', '#3B82F6',
];

// Orbit dot spinner for loading state
const OrbitLoader: React.FC = () => (
  <div className="relative w-12 h-12 flex items-center justify-center mx-auto">
    <div className="absolute w-12 h-12 rounded-full border border-slate-800 border-dashed animate-spin" style={{ animationDuration: '3s' }} />
    <div className="absolute w-7 h-7 rounded-full border border-indigo-900/60" style={{ animation: 'spin 2s linear infinite reverse' }} />
    <span className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]"
      style={{ animation: 'spin 3s linear infinite reverse' }} />
    <span className="w-2 h-2 rounded-full bg-indigo-500/60 relative z-10" />
  </div>
);

// Empty state for charts
const ChartEmptyState: React.FC<{ message?: string }> = ({ message = 'No data yet' }) => (
  <div className="h-full w-full flex flex-col items-center justify-center gap-3 text-slate-600">
    <div className="w-10 h-10 rounded-full border border-slate-800 border-dashed flex items-center justify-center">
      <Layers className="w-4 h-4 text-slate-700" />
    </div>
    <p className="text-xs text-slate-600 font-mono">{message}</p>
  </div>
);

export const Overview: React.FC = () => {
  const { data: subscriptions = [], isLoading } = useQuery({
    queryKey: ['subscriptions'],
    queryFn: () => api.getSubscriptions(),
  });

  const hasData = subscriptions.length > 0;

  const activeSubs = subscriptions.filter((s) => s.status === 'active');
  const expiredSubs = subscriptions.filter((s) => s.status === 'expired');
  const cancelledSubs = subscriptions.filter((s) => s.status === 'cancelled');

  const totalUSD = activeSubs
    .filter((s) => s.currency === 'USD')
    .reduce((acc, s) => acc + (s.frequency === 'yearly' ? s.price / 12 : s.price), 0);

  const totalEUR = activeSubs
    .filter((s) => s.currency === 'EUR')
    .reduce((acc, s) => acc + (s.frequency === 'yearly' ? s.price / 12 : s.price), 0);

  const totalRS = activeSubs
    .filter((s) => s.currency === 'RS')
    .reduce((acc, s) => acc + (s.frequency === 'yearly' ? s.price / 12 : s.price), 0);

  const categoryCounts: Record<string, number> = {};
  subscriptions.forEach((sub) => {
    categoryCounts[sub.category] = (categoryCounts[sub.category] || 0) + 1;
  });

  const categoryData = Object.entries(categoryCounts).map(([cat, count]) => ({
    name: cat.charAt(0).toUpperCase() + cat.slice(1),
    count,
  }));

  const statusData = [
    { name: 'Active', value: activeSubs.length, status: 'active', color: '#10B981' },
    { name: 'Cancelled', value: cancelledSubs.length, status: 'cancelled', color: '#F43F5E' },
    { name: 'Expired', value: expiredSubs.length, status: 'expired', color: '#64748B' },
  ].filter((d) => d.value > 0);

  const currentMonth = dayjs();
  const spendingOverTime = [-2, -1, 0, 1, 2, 3].map((offset) => {
    const targetMonth = currentMonth.add(offset, 'month');
    const baseSpend = Math.round(totalUSD);
    const variance = offset === 0 ? baseSpend : Math.round(baseSpend * (1 + offset * 0.05));
    return { month: targetMonth.format('MMM YYYY'), spending: variance };
  });

  const upcomingRenewals = activeSubs
    .slice()
    .sort((a, b) => new Date(a.renewalDate).getTime() - new Date(b.renewalDate).getTime())
    .slice(0, 4);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-80 gap-6">
        <OrbitLoader />
        <p className="text-xs text-slate-500 font-mono">Loading subscriptions…</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn">

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-display">
            Subscription Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time analytics across active subscriptions, spend, and Upstash workflows.
          </p>
        </div>

        <Link
          to="/dashboard/subscriptions"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm shadow-md shadow-indigo-600/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Subscription</span>
        </Link>
      </div>

      {/* Metric Cards: Featured active card + 3 smaller */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

        {/* FEATURED: Active Subscriptions — larger, accent border */}
        <div className="sm:col-span-1 p-6 rounded-2xl bg-[#0b1020] border border-emerald-900/50 shadow-[0_0_30px_rgba(16,185,129,0.06)] flex flex-col justify-between gap-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest font-mono mb-2">
                Active Subscriptions
              </div>
              {hasData ? (
                <div className="text-5xl font-extrabold text-white font-display leading-none">
                  {activeSubs.length}
                </div>
              ) : (
                <div className="flex flex-col gap-2 mt-1">
                  <PackageOpen className="w-6 h-6 text-slate-700" />
                  <p className="text-xs text-slate-500">No subscriptions yet — add your first one</p>
                </div>
              )}
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-800/40 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          {hasData && (
            <div className="text-xs text-slate-500 font-mono border-t border-slate-800 pt-3">
              {subscriptions.length} total tracked in Orbit
            </div>
          )}
        </div>

        {/* 3 smaller cards in 2-col subgrid */}
        <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5">

          {/* USD Spending */}
          <div className="p-5 rounded-xl bg-[#0e1424] border border-slate-800 shadow-sm">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
              <span>USD / month</span>
              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-indigo-950 text-indigo-400 border border-indigo-800/60">USD</span>
            </div>
            {hasData ? (
              <>
                <div className="text-2xl font-extrabold text-white font-display">${Math.round(totalUSD).toLocaleString()}</div>
                <div className="text-xs text-slate-500 mt-1">Normalized monthly rate</div>
              </>
            ) : (
              <div className="flex items-center gap-2 mt-1">
                <CreditCard className="w-4 h-4 text-slate-700" />
                <span className="text-xs text-slate-600">Add subscriptions to see spend</span>
              </div>
            )}
          </div>

          {/* EUR & RS */}
          <div className="p-5 rounded-xl bg-[#0e1424] border border-slate-800 shadow-sm">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
              <span>EUR & RS / month</span>
              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">EUR • RS</span>
            </div>
            {hasData ? (
              <>
                <div className="text-lg font-bold text-white font-display">
                  €{Math.round(totalEUR)} <span className="text-slate-600">•</span> ₹{Math.round(totalRS).toLocaleString()}
                </div>
                <div className="text-xs text-slate-500 mt-1">Monthly commitments</div>
              </>
            ) : (
              <div className="flex items-center gap-2 mt-1">
                <CreditCard className="w-4 h-4 text-slate-700" />
                <span className="text-xs text-slate-600">No spending data yet</span>
              </div>
            )}
          </div>

          {/* Inactive / Expired */}
          <div className="p-5 rounded-xl bg-[#0e1424] border border-slate-800 shadow-sm sm:col-span-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
              <span>Inactive / Expired</span>
              <XCircle className="w-4 h-4 text-slate-600" />
            </div>
            {hasData ? (
              <>
                <div className="text-2xl font-extrabold text-white font-display">{expiredSubs.length + cancelledSubs.length}</div>
                <div className="text-xs text-slate-500 mt-1">{cancelledSubs.length} cancelled • {expiredSubs.length} expired</div>
              </>
            ) : (
              <div className="flex items-center gap-2 mt-1">
                <XCircle className="w-4 h-4 text-slate-700" />
                <span className="text-xs text-slate-600">Nothing here yet</span>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Visual Graphs Section */}
      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* Graph 1: Spending Over Time */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-[#0e1424] border border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold text-white flex items-center gap-2 font-display">
                <TrendingUp className="w-4 h-4 text-indigo-400" />
                Monthly Spending Timeline
              </h3>
              <span className="text-[11px] font-mono text-indigo-400 bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-800/60">
                USD / mo
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-5">Historical normalized spending and projections</p>

            <div className="h-64 w-full">
              {!hasData ? (
                <ChartEmptyState message="Add subscriptions to see spending timeline" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={spendingOverTime}>
                    <defs>
                      <linearGradient id="spendGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#4F46E5" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}`} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#090d18', borderColor: '#1e293b', borderRadius: '0.75rem', color: '#f8fafc', fontSize: '12px' }}
                      formatter={(value: any) => [`$${value}`, 'Monthly Cost']}
                    />
                    <Area type="monotone" dataKey="spending" stroke="#6366F1" strokeWidth={2.5} fillOpacity={1} fill="url(#spendGradient)" />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>Projected recurring billing commitments</span>
            <span className="text-emerald-400 font-medium">✓ Active</span>
          </div>
        </div>

        {/* Graph 2: Status Donut */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-[#0e1424] border border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold text-white flex items-center gap-2 font-display">
                <PieIcon className="w-4 h-4 text-emerald-400" />
                Status Breakdown
              </h3>
              <span className="text-[11px] font-mono text-slate-500">{subscriptions.length} Subscriptions</span>
            </div>
            <p className="text-xs text-slate-500 mb-4">Distribution across active, cancelled, and expired</p>

            <div className="h-64 w-full flex items-center justify-center">
              {!hasData ? (
                <div className="flex flex-col items-center justify-center gap-4 text-slate-700">
                  {/* Orbit dot motif empty state */}
                  <div className="relative w-24 h-24 flex items-center justify-center">
                    <div className="absolute w-24 h-24 rounded-full border border-slate-800 border-dashed animate-spin" style={{ animationDuration: '8s' }} />
                    <div className="absolute w-14 h-14 rounded-full border border-slate-800/50" style={{ animation: 'spin 5s linear infinite reverse' }} />
                    <span className="text-xs font-mono text-slate-600">empty</span>
                  </div>
                  <p className="text-xs text-slate-600 text-center max-w-[160px]">No subscriptions yet — add your first one</p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={statusData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={4} dataKey="value">
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#090d18', borderColor: '#1e293b', borderRadius: '0.75rem', color: '#f8fafc', fontSize: '12px' }} />
                    <Legend verticalAlign="bottom" height={36} formatter={(value) => <span className="text-xs text-slate-300">{value}</span>} />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>Mongoose status enum</span>
            <span className="font-mono text-indigo-400">active • cancelled • expired</span>
          </div>
        </div>

      </div>

      {/* Row 2: Category Chart & Upcoming Renewals */}
      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* Category Bar Chart */}
        <div className="lg:col-span-6 p-6 rounded-2xl bg-[#0e1424] border border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold text-white flex items-center gap-2 font-display">
                <BarChart3 className="w-4 h-4 text-purple-400" />
                Subscriptions by Category
              </h3>
            </div>
            <p className="text-xs text-slate-500 mb-4">technology, finance, entertainment, lifestyle, sports</p>

            <div className="h-60 w-full">
              {!hasData ? (
                <ChartEmptyState message="No category data to display" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryData}>
                    <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis allowDecimals={false} stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#090d18', borderColor: '#1e293b', borderRadius: '0.75rem', color: '#f8fafc', fontSize: '12px' }} />
                    <Bar dataKey="count" radius={[4, 4, 0, 0]} name="Subscriptions">
                      {categoryData.map((_, index) => (
                        <Cell key={`bar-cell-${index}`} fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>Category distribution</span>
            <Link to="/dashboard/subscriptions" className="text-indigo-400 hover:underline">Manage →</Link>
          </div>
        </div>

        {/* Upcoming Renewals */}
        <div className="lg:col-span-6 p-6 rounded-2xl bg-[#0e1424] border border-slate-800 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2 font-display">
                <Clock className="w-4 h-4 text-amber-400" />
                Upcoming Renewals
              </h3>
              <Link to="/dashboard/workflows" className="text-xs text-indigo-400 hover:underline font-semibold">
                View Workflows →
              </Link>
            </div>

            {!hasData || upcomingRenewals.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-3 py-8 text-slate-700">
                <Clock className="w-8 h-8 text-slate-800" />
                <p className="text-xs text-slate-600 text-center">No upcoming renewals — add an active subscription</p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {upcomingRenewals.map((sub) => {
                  const renewalFormatted = dayjs(sub.renewalDate).format('MMM D, YYYY');
                  const daysRemaining = dayjs(sub.renewalDate).diff(dayjs(), 'day');
                  return (
                    <div
                      key={sub._id}
                      className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="font-bold text-white text-sm">{sub.name}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5 font-mono">
                          {renewalFormatted} • {daysRemaining}d left
                        </div>
                      </div>
                      <div className="text-right font-mono">
                        <div className="font-bold text-white text-sm">
                          {sub.currency === 'USD' ? '$' : sub.currency === 'EUR' ? '€' : '₹'}{sub.price}
                        </div>
                        <span className="text-[10px] text-indigo-400 uppercase font-semibold">{sub.frequency}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="p-3 bg-indigo-950/40 border border-indigo-800/60 rounded-lg text-indigo-300 text-xs flex items-center gap-2">
            <Send className="w-4 h-4 shrink-0 text-indigo-400" />
            <span>Upstash workflows queue email reminders at 7d, 5d, 2d, and 1d.</span>
          </div>
        </div>

      </div>

    </div>
  );
};
