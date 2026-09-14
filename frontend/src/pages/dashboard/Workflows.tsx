import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { useAuth } from '../../context/AuthContext';
import { Clock, AlertCircle, RefreshCw, PackageOpen } from 'lucide-react';
import dayjs from 'dayjs';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

export const Workflows: React.FC = () => {
  const { user } = useAuth();
  const userId = user?._id || '';

  const {
    data: workflows = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['activeWorkflows', userId],
    queryFn: () => api.getActiveWorkflows(),
    enabled: !!userId,
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

      {/* Error Alert */}
      {isError && (
        <Card variant="yellow" borderWidth={3} shadow="md" className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-[#EF4444] bg-[#FEE2E2]">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-[#B91C1C] stroke-[2.5] shrink-0" />
            <div>
              <div className="font-display font-black text-sm uppercase text-[#B91C1C]">
                FAILED TO LOAD WORKFLOW REMINDERS
              </div>
              <div className="text-xs font-mono text-neutral-800">
                {(error as Error)?.message || 'Could not communicate with the backend server.'}
              </div>
            </div>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => refetch()}
            className="gap-1.5 shrink-0 self-start sm:self-auto"
          >
            <RefreshCw className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>RETRY</span>
          </Button>
        </Card>
      )}

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

      {/* Loading State */}
      {isLoading ? (
        <div className="p-16 border-3 border-black shadow-[6px_6px_0px_#111] bg-white flex flex-col items-center justify-center gap-4">
          <div className="w-10 h-10 border-4 border-black border-t-[#F5D90A] rounded-full animate-spin" />
          <div className="font-mono text-xs font-bold uppercase tracking-widest text-black">
            LOADING ACTIVE WORKFLOWS...
          </div>
        </div>
      ) : !isError && workflows.length === 0 ? (
        /* Empty State */
        <div className="p-14 border-3 border-black shadow-[6px_6px_0px_#111] bg-white flex flex-col items-center justify-center text-center space-y-3">
          <div className="w-14 h-14 bg-[#F5D90A] border-2 border-black shadow-[3px_3px_0px_#111] flex items-center justify-center">
            <PackageOpen className="w-7 h-7 stroke-[2.5]" />
          </div>
          <div className="space-y-1 max-w-md">
            <h3 className="font-display font-black text-lg uppercase text-black">
              NO ACTIVE WORKFLOW REMINDERS
            </h3>
            <p className="text-xs font-mono text-neutral-600">
              There are no active subscriptions scheduled for reminder triggers. Add an active subscription to schedule email reminders.
            </p>
          </div>
        </div>
      ) : (
        /* Workflows List */
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
      )}

    </div>
  );
};
