import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { Clock, CheckCircle2, AlertCircle, Mail, Send, Calendar, ExternalLink } from 'lucide-react';
import dayjs from 'dayjs';

export const Workflows: React.FC = () => {
  const { data: workflows = [], isLoading } = useQuery({
    queryKey: ['activeWorkflows'],
    queryFn: () => api.getActiveWorkflows(),
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Upstash Workflow Reminders
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Live scheduled `context.sleepUntil()` triggers and automated Nodemailer email reminders for active subscriptions.
        </p>
      </div>

      {/* Overview explanation banner */}
      <div className="p-4 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 text-xs space-y-1 text-indigo-900 dark:text-indigo-200">
        <div className="font-bold flex items-center gap-2">
          <Clock className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span>Workflow Execution Lifecycle (`POST /api/v1/workflows/subscription/reminder`)</span>
        </div>
        <p className="text-indigo-700 dark:text-indigo-300 leading-relaxed">
          For each active subscription, Upstash workflow registers sleep steps at <strong>7, 5, 2, and 1 day</strong> before `renewalDate`. When the sleep duration expires, Nodemailer dispatches the formatted HTML reminder.
        </p>
      </div>

      {/* Workflows List */}
      <div className="space-y-6">
        {workflows.map((wf) => (
          <div
            key={wf.subscriptionId}
            className="p-6 rounded-2xl bg-white dark:bg-[#0e1424] border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4"
          >
            {/* Top Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {wf.subscriptionName}
                </h3>
                <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-0.5 font-mono">
                  <span>ID: {wf.subscriptionId}</span>
                  <span>•</span>
                  <span>Renews: {dayjs(wf.renewalDate).format('MMMM D, YYYY')}</span>
                </div>
              </div>

              <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                Run: {wf.workflowRunId}
              </span>
            </div>

            {/* Timeline Steps (7d, 5d, 2d, 1d) */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
              {wf.reminders.map((rem) => {
                const isSent = rem.status === 'sent';
                const isScheduled = rem.status === 'scheduled';

                return (
                  <div
                    key={rem.daysBefore}
                    className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${
                      isSent
                        ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/60'
                        : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200/60 dark:border-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-indigo-500" />
                        <span>{rem.daysBefore} Days Notice</span>
                      </span>

                      <span
                        className={`text-[10px] font-mono font-semibold px-1.5 py-0.2 rounded uppercase ${
                          isSent
                            ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                            : 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400'
                        }`}
                      >
                        {rem.status}
                      </span>
                    </div>

                    <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                      Target: {rem.reminderDate}
                    </div>

                    <div className="text-[11px] text-slate-700 dark:text-slate-300 font-medium leading-tight">
                      {rem.subject}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
