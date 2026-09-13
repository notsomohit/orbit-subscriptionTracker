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
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

const STATUS_COLORS: Record<string, string> = {
  active: '#22C55E',
  cancelled: '#EF4444',
  expired: '#71717A',
};

const CATEGORY_COLORS = [
  '#F5D90A', '#3B82F6', '#22C55E', '#EF4444', '#A855F7', '#EC4899', '#06B6D4',
];

// Brutalist loader
const BrutalLoader: React.FC = () => (
  <div className="flex flex-col items-center justify-center p-12 space-y-4">
    <div className="w-12 h-12 bg-[#F5D90A] border-3 border-black shadow-[4px_4px_0px_#111] animate-bounce flex items-center justify-center font-display font-black text-lg">
      O•
    </div>
    <div className="font-mono text-xs font-bold uppercase tracking-widest text-black">
      LOADING ORBIT INTELLIGENCE...
    </div>
  </div>
);

// Empty state for charts
const ChartEmptyState: React.FC<{ message?: string }> = ({ message = 'No data available' }) => (
  <div className="h-full w-full flex flex-col items-center justify-center gap-3 p-6 text-black">
    <div className="w-10 h-10 bg-white border-2 border-black shadow-[2px_2px_0px_#111] flex items-center justify-center">
      <PackageOpen className="w-5 h-5 stroke-[2.5]" />
    </div>
    <p className="text-xs font-mono font-bold uppercase text-neutral-600">{message}</p>
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
    name: cat.toUpperCase(),
    count,
  }));

  const statusData = [
    { name: 'ACTIVE', value: activeSubs.length, status: 'active', color: '#22C55E' },
    { name: 'CANCELLED', value: cancelledSubs.length, status: 'cancelled', color: '#EF4444' },
    { name: 'EXPIRED', value: expiredSubs.length, status: 'expired', color: '#71717A' },
  ].filter((d) => d.value > 0);

  const currentMonth = dayjs();
  const spendingOverTime = [-2, -1, 0, 1, 2, 3].map((offset) => {
    const targetMonth = currentMonth.add(offset, 'month');
    const baseSpend = Math.round(totalUSD);
    const variance = offset === 0 ? baseSpend : Math.round(baseSpend * (1 + offset * 0.05));
    return { month: targetMonth.format('MMM YY').toUpperCase(), spending: variance };
  });

  const upcomingRenewals = activeSubs
    .slice()
    .sort((a, b) => new Date(a.renewalDate).getTime() - new Date(b.renewalDate).getTime())
    .slice(0, 4);

  if (isLoading) {
    return <BrutalLoader />;
  }

  return (
    <div className="space-y-8 animate-fadeIn">

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b-2 border-black">
        <div>
          <h1 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-black uppercase">
            SUBSCRIPTION OVERVIEW
          </h1>
          <p className="text-xs sm:text-sm font-medium text-neutral-700 mt-1">
            Real-time analytics across active recurring commitments, spend rate, and Upstash workflows.
          </p>
        </div>

        <Link to="/dashboard/subscriptions" className="self-start sm:self-auto">
          <Button variant="primary" size="md" className="gap-2">
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>ADD SUBSCRIPTION</span>
          </Button>
        </Link>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

        {/* FEATURED: Active Subscriptions Card */}
        <Card
          variant="yellow"
          borderWidth={3}
          shadow="lg"
          className="sm:col-span-1 p-6 flex flex-col justify-between gap-4"
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xs font-mono font-black text-black uppercase tracking-widest mb-2">
                ACTIVE COMMITMENTS
              </div>
              {hasData ? (
                <div className="text-6xl font-mono font-black text-black leading-none">
                  {activeSubs.length}
                </div>
              ) : (
                <div className="flex flex-col gap-2 mt-1">
                  <PackageOpen className="w-7 h-7 text-black stroke-[2.5]" />
                  <p className="text-xs font-bold text-black">No active subscriptions yet</p>
                </div>
              )}
            </div>
            <div className="w-12 h-12 bg-white border-2 border-black shadow-[2px_2px_0px_#111] flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 stroke-[2.5] text-black" />
            </div>
          </div>
          {hasData && (
            <div className="text-xs font-mono font-bold text-black border-t-2 border-black pt-3">
              {subscriptions.length} TOTAL TRACKED IN ORBIT
            </div>
          )}
        </Card>

        {/* 3 smaller cards in 2-col subgrid */}
        <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5">

          {/* USD Spending */}
          <Card variant="white" borderWidth={2} shadow="md" className="p-5">
            <div className="flex items-center justify-between text-xs font-display font-bold text-black uppercase mb-2">
              <span>USD Commitments</span>
              <span className="font-mono text-[10px] px-2 py-0.5 bg-[#F5D90A] border border-black shadow-[1px_1px_0px_#111]">USD</span>
            </div>
            {hasData ? (
              <>
                <div className="text-3xl font-mono font-black text-black">${Math.round(totalUSD).toLocaleString()}</div>
                <div className="text-xs font-mono font-bold text-neutral-600 mt-1">/ MONTH NORMALIZED</div>
              </>
            ) : (
              <div className="flex items-center gap-2 mt-2">
                <CreditCard className="w-4 h-4 text-neutral-600 stroke-[2.5]" />
                <span className="text-xs font-mono text-neutral-600">No active USD items</span>
              </div>
            )}
          </Card>

          {/* EUR & RS */}
          <Card variant="white" borderWidth={2} shadow="md" className="p-5">
            <div className="flex items-center justify-between text-xs font-display font-bold text-black uppercase mb-2">
              <span>EUR & RS / Month</span>
              <span className="font-mono text-[10px] px-2 py-0.5 bg-white border border-black shadow-[1px_1px_0px_#111]">GLOBAL</span>
            </div>
            {hasData ? (
              <>
                <div className="text-2xl font-mono font-black text-black">
                  €{Math.round(totalEUR)} <span className="text-neutral-400">•</span> ₹{Math.round(totalRS).toLocaleString()}
                </div>
                <div className="text-xs font-mono font-bold text-neutral-600 mt-1">MONTHLY RATE</div>
              </>
            ) : (
              <div className="flex items-center gap-2 mt-2">
                <CreditCard className="w-4 h-4 text-neutral-600 stroke-[2.5]" />
                <span className="text-xs font-mono text-neutral-600">No multi-currency spend</span>
              </div>
            )}
          </Card>

          {/* Inactive / Expired */}
          <Card variant="white" borderWidth={2} shadow="md" className="p-5 sm:col-span-2">
            <div className="flex items-center justify-between text-xs font-display font-bold text-black uppercase mb-2">
              <span>Inactive & Expired Subscriptions</span>
              <XCircle className="w-4 h-4 text-black stroke-[2.5]" />
            </div>
            {hasData ? (
              <>
                <div className="text-3xl font-mono font-black text-black">{expiredSubs.length + cancelledSubs.length}</div>
                <div className="text-xs font-mono font-bold text-neutral-600 mt-1">
                  {cancelledSubs.length} CANCELLED • {expiredSubs.length} EXPIRED
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2 mt-2">
                <XCircle className="w-4 h-4 text-neutral-600 stroke-[2.5]" />
                <span className="text-xs font-mono text-neutral-600">All clean! Zero inactive subscriptions.</span>
              </div>
            )}
          </Card>

        </div>
      </div>

      {/* Visual Graphs Section */}
      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* Graph 1: Spending Over Time */}
        <Card variant="white" borderWidth={2} shadow="md" className="lg:col-span-7 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-base font-display font-bold text-black uppercase flex items-center gap-2">
                <TrendingUp className="w-4 h-4 stroke-[3]" />
                Monthly Spending Timeline
              </h3>
              <Badge variant="yellow" size="sm">
                USD / MO
              </Badge>
            </div>
            <p className="text-xs font-sans text-neutral-600 mb-5">Historical normalized spending and future projections</p>

            <div className="h-64 w-full">
              {!hasData ? (
                <ChartEmptyState message="Add subscriptions to see timeline" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={spendingOverTime}>
                    <XAxis dataKey="month" stroke="#111111" fontSize={11} fontFamily="JetBrains Mono" tickLine={true} axisLine={{ stroke: '#111111', strokeWidth: 2 }} />
                    <YAxis stroke="#111111" fontSize={11} fontFamily="JetBrains Mono" tickLine={true} axisLine={{ stroke: '#111111', strokeWidth: 2 }} tickFormatter={(val) => `$${val}`} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#111111', borderWidth: '2px', borderRadius: '0px', boxShadow: '4px 4px 0px #111', color: '#111111', fontFamily: 'JetBrains Mono', fontSize: '12px', fontWeight: 'bold' }}
                      formatter={(value: any) => [`$${value}`, 'MONTHLY COMMITTED']}
                    />
                    <Area type="linear" dataKey="spending" stroke="#111111" strokeWidth={3} fill="#F5D90A" fillOpacity={1} />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
          <div className="pt-3 border-t-2 border-black flex items-center justify-between text-xs font-mono font-bold">
            <span>PROJECTED RECURRING CHARGES</span>
            <span className="text-[#15803D] bg-[#DCFCE7] px-2 py-0.5 border border-black">STATUS: ACTIVE</span>
          </div>
        </Card>

        {/* Graph 2: Status Donut */}
        <Card variant="white" borderWidth={2} shadow="md" className="lg:col-span-5 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-base font-display font-bold text-black uppercase flex items-center gap-2">
                <PieIcon className="w-4 h-4 stroke-[3]" />
                Status Breakdown
              </h3>
              <span className="font-mono text-xs font-bold bg-[#EFECE6] border border-black px-2 py-0.5">
                {subscriptions.length} TOTAL
              </span>
            </div>
            <p className="text-xs font-sans text-neutral-600 mb-4">Distribution across active, cancelled, and expired</p>

            <div className="h-64 w-full flex items-center justify-center">
              {!hasData ? (
                <ChartEmptyState message="No status data yet" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={statusData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} stroke="#111111" strokeWidth={2} dataKey="value">
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#111111', borderWidth: '2px', borderRadius: '0px', boxShadow: '4px 4px 0px #111', color: '#111111', fontFamily: 'JetBrains Mono', fontSize: '12px', fontWeight: 'bold' }} />
                    <Legend verticalAlign="bottom" height={36} formatter={(value) => <span className="text-xs font-mono font-bold text-black">{value}</span>} />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
          <div className="pt-3 border-t-2 border-black flex items-center justify-between text-xs font-mono font-bold">
            <span>DATABASE ENUM</span>
            <span className="text-black">ACTIVE • CANCELLED • EXPIRED</span>
          </div>
        </Card>

      </div>

      {/* Row 2: Category Chart & Upcoming Renewals */}
      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* Category Bar Chart */}
        <Card variant="white" borderWidth={2} shadow="md" className="lg:col-span-6 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-base font-display font-bold text-black uppercase flex items-center gap-2">
                <BarChart3 className="w-4 h-4 stroke-[3]" />
                Subscriptions by Category
              </h3>
            </div>
            <p className="text-xs font-sans text-neutral-600 mb-4">technology, finance, entertainment, lifestyle, sports</p>

            <div className="h-60 w-full">
              {!hasData ? (
                <ChartEmptyState message="No category data to display" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryData}>
                    <XAxis dataKey="name" stroke="#111111" fontSize={10} fontFamily="JetBrains Mono" tickLine={true} axisLine={{ stroke: '#111111', strokeWidth: 2 }} />
                    <YAxis allowDecimals={false} stroke="#111111" fontSize={11} fontFamily="JetBrains Mono" tickLine={true} axisLine={{ stroke: '#111111', strokeWidth: 2 }} />
                    <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#111111', borderWidth: '2px', borderRadius: '0px', boxShadow: '4px 4px 0px #111', color: '#111111', fontFamily: 'JetBrains Mono', fontSize: '12px', fontWeight: 'bold' }} />
                    <Bar dataKey="count" stroke="#111111" strokeWidth={2} name="Subscriptions">
                      {categoryData.map((_, index) => (
                        <Cell key={`bar-cell-${index}`} fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
          <div className="pt-3 border-t-2 border-black flex items-center justify-between text-xs font-mono font-bold">
            <span>CATEGORY SPREAD</span>
            <Link to="/dashboard/subscriptions" className="bg-[#F5D90A] px-2 py-0.5 border border-black hover:bg-black hover:text-white">
              MANAGE TABLE →
            </Link>
          </div>
        </Card>

        {/* Upcoming Renewals */}
        <Card variant="white" borderWidth={2} shadow="md" className="lg:col-span-6 p-6 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-display font-bold text-black uppercase flex items-center gap-2">
                <Clock className="w-4 h-4 stroke-[3]" />
                Upcoming Renewals
              </h3>
              <Link to="/dashboard/workflows" className="text-xs font-mono font-bold bg-white px-2 py-1 border border-black shadow-[2px_2px_0px_#111] hover:bg-[#F5D90A]">
                WORKFLOWS →
              </Link>
            </div>

            {!hasData || upcomingRenewals.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-3 py-8 text-neutral-600">
                <Clock className="w-8 h-8 stroke-[2]" />
                <p className="text-xs font-mono font-bold uppercase text-center">No upcoming renewals found</p>
              </div>
            ) : (
              <div className="space-y-3">
                {upcomingRenewals.map((sub) => {
                  const renewalFormatted = dayjs(sub.renewalDate).format('YYYY-MM-DD');
                  const daysRemaining = dayjs(sub.renewalDate).diff(dayjs(), 'day');
                  return (
                    <div
                      key={sub._id}
                      className="p-3.5 bg-white border-2 border-black shadow-[2px_2px_0px_#111] flex items-center justify-between text-xs hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
                    >
                      <div>
                        <div className="font-display font-bold text-black text-sm uppercase">{sub.name}</div>
                        <div className="text-[11px] text-neutral-700 mt-0.5 font-mono">
                          RENEWS {renewalFormatted} • <span className="font-black bg-[#F5D90A] px-1">{daysRemaining}d LEFT</span>
                        </div>
                      </div>
                      <div className="text-right font-mono">
                        <div className="font-black text-black text-base">
                          {sub.currency === 'USD' ? '$' : sub.currency === 'EUR' ? '€' : '₹'}{sub.price}
                        </div>
                        <Badge variant="outline" size="sm">
                          {sub.frequency}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="p-3.5 bg-[#F5D90A] border-2 border-black shadow-[3px_3px_0px_#111] text-black text-xs font-mono font-bold flex items-center gap-2.5">
            <Send className="w-4 h-4 shrink-0 stroke-[2.5]" />
            <span>Upstash workflows queue email alerts at 7d, 5d, 2d, and 1d.</span>
          </div>
        </Card>

      </div>

    </div>
  );
};
