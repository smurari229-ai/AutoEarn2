import React from 'react';
import { Cpu, Zap, Activity, ShieldCheck, DollarSign } from 'lucide-react';

interface HeaderProps {
  activeTab: 'engine' | 'studio' | 'memory' | 'auditor' | 'monetization';
  setActiveTab: (tab: 'engine' | 'studio' | 'memory' | 'auditor' | 'monetization') => void;
  iteration: number;
  health: number;
  totalValue: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  iteration,
  health,
  totalValue,
}) => {
  return (
    <header className="border-b border-slate-800 bg-slate-950/95 sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-blue-600 to-emerald-500 flex items-center justify-center shadow-lg shadow-cyan-950/50">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-tight text-lg text-white">AutoEarn</span>
                <span className="font-mono text-xs font-semibold text-cyan-400 bg-cyan-950/70 border border-cyan-800/60 px-2 py-0.5 rounded">
                  AI STUDIO
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span>Autonomous Self-Evolving OS</span>
                <span aria-hidden="true">·</span>
                <span>Gemini 3.8 Flash</span>
              </div>
            </div>
          </div>

          {/* System Telemetry & Vitals */}
          <div className="hidden lg:flex items-center space-x-6 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span className="text-slate-400">Cognitive Health:</span>
              <span className="font-mono font-medium text-emerald-400">{health}%</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span className="text-slate-400">Evolution Cycle:</span>
              <span className="font-mono font-medium text-cyan-300">#{iteration}</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-amber-400" />
              <span className="text-slate-400">Total EV:</span>
              <span className="font-mono font-semibold text-emerald-400">
                ${totalValue.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Navigation Controls */}
          <nav className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('engine')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                activeTab === 'engine'
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              Cognitive Engine
            </button>
            <button
              onClick={() => setActiveTab('studio')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                activeTab === 'studio'
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              Content Studio
            </button>
            <button
              onClick={() => setActiveTab('memory')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                activeTab === 'memory'
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              Memory Bank
            </button>
            <button
              onClick={() => setActiveTab('auditor')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                activeTab === 'auditor'
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              Critic Auditor
            </button>
            <button
              onClick={() => setActiveTab('monetization')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                activeTab === 'monetization'
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              Monetization CRM
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
