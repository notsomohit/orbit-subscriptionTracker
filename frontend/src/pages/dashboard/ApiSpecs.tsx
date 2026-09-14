import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { api } from '../../lib/api';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

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
      <div className="pb-2 border-b-2 border-black">
        <h1 className="text-3xl sm:text-4xl font-display font-black text-black uppercase tracking-tight">
          API CONTRACTS & LIVE TESTER
        </h1>
        <p className="text-xs sm:text-sm font-medium text-neutral-700 mt-0.5">
          Test real API endpoints against your local server (`http://localhost:5500/api/v1`).
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 items-start" id="api-reference">

        {/* Endpoints List */}
        <div className="space-y-3">
          <div className="text-xs font-mono font-black uppercase tracking-wider text-black flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-black inline-block" />
            <span>REGISTERED EXPRESS ENDPOINTS</span>
          </div>

          <Card variant="white" borderWidth={2} shadow="sm" className="p-4 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono px-2 py-0.5 bg-[#22C55E] text-black font-black border border-black shadow-[1px_1px_0px_#111]">
                  GET
                </span>
                <span className="font-mono font-bold text-black">/api/v1/subscription</span>
              </div>
              <button
                onClick={handleTestGet}
                disabled={loading}
                className="px-3 py-1 bg-[#F5D90A] border-2 border-black text-black font-display font-bold text-xs uppercase shadow-[2px_2px_0px_#111] hover:bg-[#e6ca00] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all flex items-center gap-1 cursor-pointer"
              >
                <Play className="w-3 h-3 stroke-[3]" />
                <span>{loading ? 'FETCHING...' : 'TEST'}</span>
              </button>
            </div>
            <p className="text-neutral-700 font-sans text-xs">Fetches all subscriptions for authenticated user.</p>
          </Card>

          <Card variant="white" borderWidth={2} shadow="sm" className="p-4 space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-mono px-2 py-0.5 bg-black text-[#F5D90A] font-black border border-black shadow-[1px_1px_0px_#111]">
                POST
              </span>
              <span className="font-mono font-bold text-black">/api/v1/subscription</span>
            </div>
            <p className="text-neutral-700 font-sans text-xs">Creates subscription & triggers Upstash workflow.</p>
          </Card>

          <Card variant="white" borderWidth={2} shadow="sm" className="p-4 space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-mono px-2 py-0.5 bg-[#F5D90A] text-black font-black border border-black shadow-[1px_1px_0px_#111]">
                PUT
              </span>
              <span className="font-mono font-bold text-black">/api/v1/subscription/:id</span>
            </div>
            <p className="text-neutral-700 font-sans text-xs">Updates name, price, currency, frequency, category, paymentMethod.</p>
          </Card>

          <Card variant="white" borderWidth={2} shadow="sm" className="p-4 space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-mono px-2 py-0.5 bg-[#EF4444] text-white font-black border border-black shadow-[1px_1px_0px_#111]">
                DELETE
              </span>
              <span className="font-mono font-bold text-black">/api/v1/subscription/:id</span>
            </div>
            <p className="text-neutral-700 font-sans text-xs">Deletes subscription record from MongoDB.</p>
          </Card>

          <Card variant="white" borderWidth={2} shadow="sm" className="p-4 space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-mono px-2 py-0.5 bg-black text-white font-black border border-black shadow-[1px_1px_0px_#111]">
                POST
              </span>
              <span className="font-mono font-bold text-black">/api/v1/workflows/subscription/reminder</span>
            </div>
            <p className="text-neutral-700 font-sans text-xs">Upstash Workflow serve endpoint handling delayed sleepUntil executions.</p>
          </Card>
        </div>

        {/* Live Response Panel */}
        <div className="bg-[#111111] border-3 border-black shadow-[6px_6px_0px_#111] text-white overflow-hidden">
          <div className="p-3 bg-black border-b-2 border-neutral-800 flex items-center justify-between text-xs font-mono font-bold">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#22C55E] border border-white inline-block" />
              <span>TERMINAL RESPONSE WINDOW</span>
            </div>
            <span className="text-[10px] bg-neutral-800 text-white px-2 py-0.5">FORMAT: JSON</span>
          </div>

          <div className="p-5 font-mono text-xs text-neutral-200 min-h-[320px] overflow-x-auto leading-relaxed">
            {responseOutput ? (
              <pre className="text-[#22C55E] whitespace-pre">{responseOutput}</pre>
            ) : (
              <div className="text-neutral-500 font-mono">
                Click "TEST" on any GET endpoint to execute and inspect the real JSON response.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
