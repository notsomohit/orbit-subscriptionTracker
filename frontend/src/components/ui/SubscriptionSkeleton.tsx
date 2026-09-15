import React from 'react';
import { Skeleton } from './Skeleton';
import { Card } from './Card';
import { Loader2 } from 'lucide-react';

export const SubscriptionSkeleton: React.FC = () => {
  // Skeleton row mockup items with varying widths for realistic feel
  const skeletonRows = [
    { nameWidth: 'w-36', catWidth: 'w-16', payWidth: 'w-24', priceWidth: 'w-14', statusColor: 'bg-green-100 border-green-700/40' },
    { nameWidth: 'w-44', catWidth: 'w-20', payWidth: 'w-28', priceWidth: 'w-16', statusColor: 'bg-green-100 border-green-700/40' },
    { nameWidth: 'w-28', catWidth: 'w-14', payWidth: 'w-20', priceWidth: 'w-12', statusColor: 'bg-red-100 border-red-700/40' },
    { nameWidth: 'w-40', catWidth: 'w-24', payWidth: 'w-32', priceWidth: 'w-16', statusColor: 'bg-green-100 border-green-700/40' },
    { nameWidth: 'w-32', catWidth: 'w-16', payWidth: 'w-20', priceWidth: 'w-14', statusColor: 'bg-neutral-200 border-neutral-700/40' },
  ];

  return (
    <div className="space-y-6 animate-fadeIn" data-testid="subscription-skeleton">
      
      {/* Live Sync Status Banner */}
      <div className="p-3 bg-[#F5D90A]/15 border-2 border-black shadow-[3px_3px_0px_#111] flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <Loader2 className="w-4 h-4 text-black animate-spin stroke-[2.5]" />
          <span className="font-mono text-xs font-black uppercase tracking-wider text-black">
            FETCHING SUBSCRIPTIONS FROM BACKEND...
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-neutral-600">
          <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-ping" />
          <span>SYNCING</span>
        </div>
      </div>

      {/* Filter and Search Bar Skeleton */}
      <Card variant="white" borderWidth={2} shadow="md" className="p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Bar Placeholder */}
        <div className="w-full md:w-80 h-9 bg-[#F7F5F0] border-2 border-black flex items-center px-3 gap-2">
          <Skeleton className="w-4 h-4 rounded-none" />
          <Skeleton className="w-48 h-3.5" />
        </div>

        {/* Filters Skeletons */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-1.5">
            <Skeleton className="w-14 h-4" />
            <Skeleton className="w-28 h-8 border-2 border-black" />
          </div>
          <div className="flex items-center gap-1.5">
            <Skeleton className="w-16 h-4" />
            <Skeleton className="w-32 h-8 border-2 border-black" />
          </div>
          <div className="flex items-center gap-1.5">
            <Skeleton className="w-16 h-4" />
            <Skeleton className="w-24 h-8 border-2 border-black" />
          </div>
        </div>
      </Card>

      {/* TanStack Table Skeleton */}
      <div className="border-3 border-black shadow-[6px_6px_0px_#111] bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            {/* Table Header */}
            <thead>
              <tr className="border-b-2 border-black bg-[#F5D90A]">
                <th className="px-5 py-3 text-xs font-display font-black uppercase tracking-wider text-black border-r-2 border-black">
                  Subscription
                </th>
                <th className="px-5 py-3 text-xs font-display font-black uppercase tracking-wider text-black border-r-2 border-black">
                  Price / Currency
                </th>
                <th className="px-5 py-3 text-xs font-display font-black uppercase tracking-wider text-black border-r-2 border-black">
                  Frequency
                </th>
                <th className="px-5 py-3 text-xs font-display font-black uppercase tracking-wider text-black border-r-2 border-black">
                  Status
                </th>
                <th className="px-5 py-3 text-xs font-display font-black uppercase tracking-wider text-black border-r-2 border-black">
                  Start Date
                </th>
                <th className="px-5 py-3 text-xs font-display font-black uppercase tracking-wider text-black border-r-2 border-black">
                  Renewal Date (Auto)
                </th>
                <th className="px-5 py-3 text-xs font-display font-black uppercase tracking-wider text-black text-right">
                  Actions
                </th>
              </tr>
            </thead>

            {/* Table Skeleton Rows */}
            <tbody className="divide-y-2 divide-black">
              {skeletonRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#FAF9F5]/60 transition-colors">
                  {/* Subscription Name & metadata */}
                  <td className="px-5 py-3.5 border-r border-black/20">
                    <div className="space-y-1.5">
                      <Skeleton className={`${row.nameWidth} h-4`} />
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <Skeleton className={`${row.catWidth} h-3 border border-black/40`} />
                        <span className="text-black/30 text-xs">•</span>
                        <Skeleton className={`${row.payWidth} h-3`} />
                      </div>
                    </div>
                  </td>

                  {/* Price / Currency */}
                  <td className="px-5 py-3.5 border-r border-black/20">
                    <div className="flex items-center gap-1.5">
                      <Skeleton className={`${row.priceWidth} h-4.5`} />
                      <Skeleton className="w-8 h-3" />
                    </div>
                  </td>

                  {/* Frequency */}
                  <td className="px-5 py-3.5 border-r border-black/20">
                    <Skeleton className="w-16 h-5 border-2 border-black" />
                  </td>

                  {/* Status */}
                  <td className="px-5 py-3.5 border-r border-black/20">
                    <Skeleton className={`w-16 h-5 border-2 ${row.statusColor}`} />
                  </td>

                  {/* Start Date */}
                  <td className="px-5 py-3.5 border-r border-black/20">
                    <Skeleton className="w-20 h-3.5" />
                  </td>

                  {/* Renewal Date */}
                  <td className="px-5 py-3.5 border-r border-black/20">
                    <div className="space-y-1">
                      <Skeleton className="w-20 h-3.5" />
                      <Skeleton className="w-28 h-2.5 bg-green-200/50" />
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Skeleton className="w-7 h-7 border-2 border-black shadow-[2px_2px_0px_#111]" />
                      <Skeleton className="w-7 h-7 border-2 border-black shadow-[2px_2px_0px_#111] bg-red-100" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar Skeleton */}
        <div className="p-4 border-t-2 border-black bg-[#EFECE6] flex items-center justify-between text-xs font-mono font-bold">
          <div className="flex items-center gap-2">
            <Skeleton className="w-28 h-4" />
            <Skeleton className="w-8 h-5 border border-black" />
            <Skeleton className="w-24 h-4" />
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="w-7 h-6 border-2 border-black shadow-[2px_2px_0px_#111]" />
            <Skeleton className="w-24 h-4" />
            <Skeleton className="w-7 h-6 border-2 border-black shadow-[2px_2px_0px_#111]" />
          </div>
        </div>
      </div>

    </div>
  );
};
