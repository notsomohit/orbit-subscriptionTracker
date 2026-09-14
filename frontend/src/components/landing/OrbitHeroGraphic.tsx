import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { Badge } from '../ui/Badge';
import { Mail, Bell } from 'lucide-react';

interface SubCardItem {
  id: string;
  name: string;
  price: string;
  frequency: string;
  category: string;
  status: 'active' | 'renewing' | 'cancelled' | 'expired';
  statusLabel: string;
  badgeVariant: 'active' | 'yellow' | 'cancelled' | 'expired';
  initials: string;
  bgBadge: string;
}

export const OrbitHeroGraphic: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const { data: subscriptions = [] } = useQuery({
    queryKey: ['subscriptions'],
    queryFn: () => api.getSubscriptions(),
  });

  const activeCount = subscriptions.filter((s) => s.status === 'active').length || 4;

  const items: SubCardItem[] = [
    {
      id: 'sub_1',
      name: 'GitHub Copilot',
      price: '$19.00',
      frequency: '/mo',
      category: 'DEV TOOL',
      status: 'active',
      statusLabel: 'ACTIVE',
      badgeVariant: 'active',
      initials: 'GH',
      bgBadge: 'bg-black text-white',
    },
    {
      id: 'sub_2',
      name: 'Spotify Family',
      price: '₹179.00',
      frequency: '/mo',
      category: 'STREAMING',
      status: 'renewing',
      statusLabel: 'RENEWS IN 2D',
      badgeVariant: 'yellow',
      initials: 'SP',
      bgBadge: 'bg-[#22C55E] text-black',
    },
    {
      id: 'sub_3',
      name: 'Upstash Workflow',
      price: '$320.00',
      frequency: '/yr',
      category: 'INFRA',
      status: 'active',
      statusLabel: 'ACTIVE',
      badgeVariant: 'active',
      initials: 'UP',
      bgBadge: 'bg-[#F5D90A] text-black',
    },
    {
      id: 'sub_4',
      name: 'Financial Times',
      price: '€39.00',
      frequency: '/mo',
      category: 'FINANCE',
      status: 'active',
      statusLabel: 'ACTIVE',
      badgeVariant: 'active',
      initials: 'FT',
      bgBadge: 'bg-[#DBEAFE] text-black',
    },
    {
      id: 'sub_5',
      name: 'Gym Pass Elite',
      price: '₹2,500.00',
      frequency: '/mo',
      category: 'LIFESTYLE',
      status: 'cancelled',
      statusLabel: 'CANCELLED',
      badgeVariant: 'cancelled',
      initials: 'GP',
      bgBadge: 'bg-[#EF4444] text-white',
    },
  ];

  return (
    <div className="relative w-full max-w-[500px] select-none">
      
      {/* Decorative Neo-Brutalist Frame Backdrop */}
      <div className="absolute -inset-2.5 bg-[#F5D90A] border-3 border-black shadow-[8px_8px_0px_#111] pointer-events-none" />

      {/* Main Container Card */}
      <div className="relative bg-white border-3 border-black p-5 sm:p-6 space-y-3.5 shadow-[4px_4px_0px_#111]">
        
        {/* Fake Email Reminder Toast (Slides in after 2s pure CSS) */}
        <div className="animate-toast-slide">
          <div className="p-2.5 bg-[#111111] text-white border-2 border-black shadow-[4px_4px_0px_#F5D90A] flex items-center justify-between gap-2.5">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-6 h-6 bg-[#F5D90A] text-black border border-black flex items-center justify-center shrink-0">
                <Mail className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <div className="min-w-0">
                <div className="font-mono text-[10px] font-bold text-[#F5D90A] uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#22C55E] inline-block" />
                  <span>UPSTASH DISPATCH · 2D NOTICE</span>
                </div>
                <div className="text-xs font-bold text-white truncate">
                  Spotify Family renews in 48h (₹179.00)
                </div>
              </div>
            </div>
            <span className="shrink-0 bg-white text-black font-mono font-black text-[9px] px-1.5 py-0.5 border border-black">
              SENT
            </span>
          </div>
        </div>

        {/* Subscription Tiles List with Staggered Fade-in Animation */}
        <div className="space-y-2.5">
          {items.map((sub, idx) => {
            const isHovered = hoveredId === sub.id;
            const isPulsing = sub.status === 'renewing';

            return (
              <div
                key={sub.id}
                style={{ animationDelay: `${idx * 120}ms` }}
                onMouseEnter={() => setHoveredId(sub.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`
                  animate-stagger-card p-3 border-2 border-black transition-all duration-100 cursor-pointer
                  ${isHovered 
                    ? 'bg-[#F5D90A] shadow-[2px_2px_0px_#111] translate-x-[2px] translate-y-[2px]' 
                    : 'bg-white shadow-[4px_4px_0px_#111] hover:bg-[#FAF9F5]'
                  }
                `}
              >
                <div className="flex items-center justify-between gap-3">
                  {/* Left: Icon Initials + Name */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div 
                      className={`
                        w-9 h-9 border-2 border-black flex items-center justify-center font-display font-black text-xs shrink-0
                        ${sub.bgBadge}
                      `}
                    >
                      {sub.initials}
                    </div>
                    <div className="min-w-0">
                      <div className="font-display font-bold text-sm text-black truncate">
                        {sub.name}
                      </div>
                      <div className="font-mono text-[10px] text-neutral-600 uppercase font-semibold">
                        {sub.category}
                      </div>
                    </div>
                  </div>

                  {/* Right: Price + Status Badge */}
                  <div className="text-right shrink-0 space-y-1">
                    <div className="font-mono font-black text-sm text-black">
                      {sub.price}
                      <span className="text-[10px] font-sans font-normal text-neutral-700">
                        {sub.frequency}
                      </span>
                    </div>
                    <div className={isPulsing ? 'animate-pulse' : ''}>
                      <Badge variant={sub.badgeVariant} size="sm">
                        {sub.statusLabel}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Info Box */}
        <div className="p-3 bg-[#EFECE6] border-2 border-black flex items-center justify-between font-mono text-[11px] font-bold">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#22C55E] border border-black inline-block animate-pulse" />
            <span>CRON RUNNER: UPSTASH ACTIVE</span>
          </div>
          <span className="bg-white px-2 py-0.5 border border-black">
            200 OK
          </span>
        </div>

      </div>
    </div>
  );
};
