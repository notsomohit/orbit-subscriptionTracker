import React, { useState } from 'react';
import { Terminal, Copy, Check, Send, Play } from 'lucide-react';
import { api } from '../../lib/api';

export const ApiSpecs: React.FC = () => {
  const [responseOutput, setResponseOutput] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTestGet = async () => {
    setLoading(true);
    try {
      const data = await api.getSubscriptions();
      setResponseOutput(JSON.stringify(data, null, 2));
    } catch (e: any) {
      setResponseOutput(JSON.stringify({ error: e.message }, null, 2));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          API Contracts & Live Tester
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Test real API endpoints against your local server (`http://localhost:5500/api/v1`).
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 items-start">
        
        {/* Endpoints List */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Registered Express Endpoints
          </h3>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#0e1424] border border-slate-200/80 dark:border-slate-800 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-200 dark:border-emerald-800">
                  GET
                </span>
                <span className="font-mono text-slate-800 dark:text-slate-200">/api/v1/subscription</span>
              </div>
              <button
                onClick={handleTestGet}
                disabled={loading}
                className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium flex items-center gap-1 shadow-sm transition-colors"
              >
                <Play className="w-3 h-3" />
                <span>{loading ? 'Fetching...' : 'Send Request'}</span>
              </button>
            </div>
            <p className="text-slate-500 text-[11px]">Fetches all subscriptions for authenticated user.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#0e1424] border border-slate-200/80 dark:border-slate-800 space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-mono px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-bold border border-indigo-200 dark:border-indigo-800">
                POST
              </span>
              <span className="font-mono text-slate-800 dark:text-slate-200">/api/v1/subscription</span>
            </div>
            <p className="text-slate-500 text-[11px]">Creates subscription & triggers Upstash workflow.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#0e1424] border border-slate-200/80 dark:border-slate-800 space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-mono px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 font-bold border border-amber-200 dark:border-amber-800">
                PUT
              </span>
              <span className="font-mono text-slate-800 dark:text-slate-200">/api/v1/subscription/:id</span>
            </div>
            <p className="text-slate-500 text-[11px]">Updates name, price, currency, frequency, category, paymentMethod.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#0e1424] border border-slate-200/80 dark:border-slate-800 space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-mono px-2 py-0.5 rounded bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400 font-bold border border-rose-200 dark:border-rose-800">
                DELETE
              </span>
              <span className="font-mono text-slate-800 dark:text-slate-200">/api/v1/subscription/:id</span>
            </div>
            <p className="text-slate-500 text-[11px]">Deletes subscription record from MongoDB.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#0e1424] border border-slate-200/80 dark:border-slate-800 space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-mono px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-bold border border-indigo-200 dark:border-indigo-800">
                POST
              </span>
              <span className="font-mono text-slate-800 dark:text-slate-200">/api/v1/workflows/subscription/reminder</span>
            </div>
            <p className="text-slate-500 text-[11px]">Upstash Workflow serve endpoint handling delayed sleepUntil executions.</p>
          </div>
        </div>

        {/* Live Response Panel */}
        <div className="rounded-2xl bg-[#090d18] border border-slate-800 shadow-xl overflow-hidden">
          <div className="p-3.5 bg-[#060911] border-b border-slate-800 flex items-center justify-between text-xs">
            <span className="font-mono text-slate-400">Response Window</span>
            <span className="text-[11px] font-mono text-slate-500">JSON</span>
          </div>

          <div className="p-5 font-mono text-xs text-slate-300 min-h-[300px] overflow-x-auto leading-relaxed">
            {responseOutput ? (
              <pre className="text-emerald-400 whitespace-pre">{responseOutput}</pre>
            ) : (
              <div className="text-slate-500 italic">
                Click "Send Request" on any endpoint to execute and inspect the real JSON response.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
