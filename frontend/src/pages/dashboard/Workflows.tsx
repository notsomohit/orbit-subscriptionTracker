import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { Clock, Send, Check } from 'lucide-react';
import dayjs from 'dayjs';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

export const Workflows: React.FC = () => {
  const { data: workflows = [], isLoading } = useQuery({
    queryKey: ['activeWorkflows'],
    queryFn: () => api.getActiveWorkflows(),
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="pb-2 border-b-2 border-black">
        <h1 className="text-3xl sm:text-4xl font-display font-black text-black uppercase tracking-tight">
          UPSTASH WORKFLOW REMINDERS
        </h1>
        <p className="text-xs sm:text-sm font-medium text-neutral-700 mt-0.5">
          Live scheduled `context.sleepUntil()` triggers and automated Nodemailer email dispatches for active subscriptions.
        </p>
      </div>

      {/* Overview explanation banner */}
      <Card variant="yellow" borderWidth={2} shadow="md" className="p-5 text-black space-y-2">
        <div className="font-display font-black text-sm uppercase flex items-center gap-2">
          <Clock className="w-4 h-4 stroke-[3]" />
          <span>WORKFLOW EXECUTION LIFECYCLE (`POST /api/v1/workflows/subscription/reminder`)</span>
        </div>
        <p className="text-xs font-medium leading-relaxed">
          For each active subscription, Upstash workflow registers sleep steps at <strong>7, 5, 2, and 1 day</strong> before `renewalDate`. When the sleep duration expires, Nodemailer automatically dispatches the formatted HTML reminder template.
        </p>
      </Card>

      {/* Workflows List */}
      <div className="space-y-6">
        {workflows.map((wf) => (
          <Card
            key={wf.subscriptionId}
            variant="white"
            borderWidth={3}
            shadow="lg"
            className="p-6 space-y-4"
          >
            {/* Top Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b-2 border-black">
              <div>
                <h3 className="text-xl font-display font-black text-black uppercase">
                  {wf.subscriptionName}
                </h3>
                <div className="text-xs text-neutral-700 flex items-center gap-2 mt-1 font-mono font-bold">
                  <span>ID: {wf.subscriptionId}</span>
                  <span>•</span>
                  <span className="bg-[#EFECE6] px-1.5 py-0.5 border border-black">
                    RENEWS: {dayjs(wf.renewalDate).format('YYYY-MM-DD')}
                  </span>
                </div>
              </div>

              <div className="font-mono text-xs font-black bg-[#F5D90A] text-black px-3 py-1 border-2 border-black shadow-[2px_2px_0px_#111] self-start sm:self-auto">
                RUN: {wf.workflowRunId}
              </div>
            </div>

            {/* Timeline Steps (7d, 5d, 2d, 1d) */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              {wf.reminders.map((rem) => {
                const isSent = rem.status === 'sent';

                return (
                  <div
                    key={rem.daysBefore}
                    className={`
                      p-4 border-2 border-black text-xs space-y-2 transition-all
                      ${isSent ? 'bg-[#DCFCE7] shadow-[3px_3px_0px_#15803D]' : 'bg-[#FAF9F5] shadow-[3px_3px_0px_#111]'}
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display font-bold text-black flex items-center gap-1.5 uppercase">
                        <Clock className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>{rem.daysBefore}d Notice</span>
                      </span>

                      <Badge variant={isSent ? 'active' : 'outline'} size="sm">
                        {rem.status}
                      </Badge>
                    </div>

                    <div className="text-[11px] font-mono font-bold text-neutral-700 bg-white border border-black px-1.5 py-0.5">
                      TARGET: {rem.reminderDate}
                    </div>

                    <div className="text-xs font-bold text-black leading-snug">
                      {rem.subject}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        ))}
      </div>

    </div>
  );
};
