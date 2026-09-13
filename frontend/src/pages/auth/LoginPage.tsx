import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../lib/api';
import { OrbitLogo } from '../../components/common/OrbitLogo';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Lock, Mail, ArrowRight, AlertCircle, Check, Zap } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await api.login({ email, password });
      login(response.token, response.user);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to authenticate. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await api.login({ email: 'developer@orbit.dev', password: 'password123' });
      login(response.token, { ...response.user, name: 'Mohit' });
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to authenticate.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] flex items-center justify-center p-4 sm:p-6 lg:p-12">
      <div className="w-full max-w-5xl grid lg:grid-cols-12 border-3 border-black shadow-[8px_8px_0px_#111] overflow-hidden bg-white">
        
        {/* Left Side: Brand & Feature Highlights (Yellow Panel) */}
        <div className="lg:col-span-5 bg-[#F5D90A] p-8 sm:p-10 border-b-3 lg:border-b-0 lg:border-r-3 border-black flex flex-col justify-between space-y-8">
          <div className="space-y-6">
            <OrbitLogo size="lg" />

            <div className="space-y-3 pt-4">
              <span className="bg-black text-[#F5D90A] font-mono font-black text-xs px-2 py-1 uppercase tracking-wider">
                ORBIT PLATFORM
              </span>
              <h1 className="text-3xl sm:text-4xl font-display font-black text-black leading-tight uppercase">
                CONTROL YOUR SUBSCRIPTIONS.
              </h1>
              <p className="text-sm font-medium text-black leading-relaxed">
                Log in to monitor upcoming renewals, trigger Upstash background alerts, and inspect automated email dispatches.
              </p>
            </div>

            {/* Feature Highlights */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2.5 text-xs font-mono font-bold text-black">
                <span className="w-5 h-5 bg-black text-[#F5D90A] flex items-center justify-center border border-black shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </span>
                <span>4-Stage Lifecycle Email Alerts</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-mono font-bold text-black">
                <span className="w-5 h-5 bg-black text-[#F5D90A] flex items-center justify-center border border-black shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </span>
                <span>Automatic Renewal Tracking</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-mono font-bold text-black">
                <span className="w-5 h-5 bg-black text-[#F5D90A] flex items-center justify-center border border-black shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </span>
                <span>Interactive Live API Console</span>
              </div>
            </div>
          </div>

          {/* Testimonial / Quick Quote */}
          <div className="p-4 bg-white border-2 border-black shadow-[3px_3px_0px_#111] text-xs font-mono">
            <div className="font-bold text-black">DEV READY // 2026</div>
            <div className="text-neutral-700 mt-1">
              "Never miss an unwanted auto-debit again."
            </div>
          </div>
        </div>

        {/* Right Side: Auth Form */}
        <div className="lg:col-span-7 p-8 sm:p-12 bg-white flex flex-col justify-center space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-display font-black text-black uppercase tracking-tight">
              LOG IN TO ORBIT
            </h2>
            <p className="text-sm font-medium text-neutral-600">
              Enter your credentials to access your billing control center.
            </p>
          </div>

          {error && (
            <div className="p-3 bg-[#FEE2E2] border-2 border-[#EF4444] text-[#B91C1C] text-xs font-mono font-bold flex items-center gap-2 shadow-[2px_2px_0px_#EF4444]">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                label="Email Address"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="developer@orbit.dev"
              />
            </div>

            <div>
              <Input
                label="Password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              disabled={loading}
              className="gap-2 text-base mt-2"
            >
              <span>{loading ? 'LOGGING IN...' : 'LOG IN'}</span>
              <ArrowRight className="w-5 h-5 stroke-[3]" />
            </Button>
          </form>

          {/* Quick Demo Access button */}
          <div className="pt-2">
            <Button
              type="button"
              variant="secondary"
              size="md"
              fullWidth
              onClick={handleDemoLogin}
              className="gap-2"
            >
              <Zap className="w-4 h-4 text-black fill-black" />
              <span>QUICK DEMO ONE-CLICK LOGIN</span>
            </Button>
          </div>

          <div className="pt-4 border-t-2 border-black flex items-center justify-between text-xs font-mono font-bold">
            <span className="text-neutral-700">Don't have an account?</span>
            <Link to="/signup" className="text-black bg-[#F5D90A] px-2 py-1 border border-black shadow-[1px_1px_0px_#111] hover:bg-black hover:text-white">
              SIGN UP →
            </Link>
          </div>

          <div className="text-center pt-2">
            <Link to="/" className="text-xs font-mono font-bold text-neutral-600 hover:text-black hover:underline">
              ← BACK TO HOME
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
