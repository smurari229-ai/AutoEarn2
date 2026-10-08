import React, { useState } from 'react';
import {
  Compass,
  Cpu,
  ShieldAlert,
  Database,
  RotateCcw,
  Play,
  Lightbulb,
  CheckCircle2,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Copy,
  Check,
  Zap,
} from 'lucide-react';
import { CognitiveCycleResult } from '../types/agent';

interface CognitiveCycleRunnerProps {
  directive: string;
  onExecuteCycle: (context: string, deliverable: string) => Promise<CognitiveCycleResult | null>;
  recentCycle: CognitiveCycleResult | null;
  isRunning: boolean;
}

const MODULES = [
  {
    name: 'Strategic Planner',
    role: 'Macro roadmapping, competitive niche positioning, high-leverage milestones.',
    icon: Compass,
    color: 'text-blue-400',
    borderColor: 'border-blue-900/50',
    bg: 'bg-blue-950/20',
  },
  {
    name: 'Decision Engine',
    role: 'Calculates EV = (Impact × Confidence) / Risk. Selects optimal action path.',
    icon: Zap,
    color: 'text-cyan-400',
    borderColor: 'border-cyan-900/50',
    bg: 'bg-cyan-950/20',
  },
  {
    name: 'Critic & Risk Analyzer',
    role: 'Proactive sanity checks, platform penalty mitigation, anti-hallucination audits.',
    icon: ShieldAlert,
    color: 'text-amber-400',
    borderColor: 'border-amber-900/50',
    bg: 'bg-amber-950/20',
  },
  {
    name: 'Long-Term Memory Manager',
    role: 'Synthesizes Episodic events, Semantic principles, and Procedural SOPs.',
    icon: Database,
    color: 'text-purple-400',
    borderColor: 'border-purple-900/50',
    bg: 'bg-purple-950/20',
  },
  {
    name: 'Reflector & Self-Improver',
    role: 'Post-execution root cause analysis, extracting durable heuristics.',
    icon: RotateCcw,
    color: 'text-emerald-400',
    borderColor: 'border-emerald-900/50',
    bg: 'bg-emerald-950/20',
  },
  {
    name: 'Executor',
    role: 'Powered by Gemini 3.8 Flash to synthesize high-velocity market deliverables.',
    icon: Cpu,
    color: 'text-pink-400',
    borderColor: 'border-pink-900/50',
    bg: 'bg-pink-950/20',
  },
  {
    name: 'Meta-Cognition Controller',
    role: 'Self-inspects cognitive biases, tuning reasoning depth and heuristics.',
    icon: Lightbulb,
    color: 'text-indigo-400',
    borderColor: 'border-indigo-900/50',
    bg: 'bg-indigo-950/20',
  },
];

const STAGES = [
  { id: 1, label: 'Perceive', desc: 'Scan constraints & leverage' },
  { id: 2, label: 'Recall', desc: 'Retrieve past lessons' },
  { id: 3, label: 'Plan', desc: 'Synthesize 3-tier sequence' },
  { id: 4, label: 'Evaluate', desc: 'Calculate Impact, Risk & EV' },
  { id: 5, label: 'Decide', desc: 'Select max expected value' },
  { id: 6, label: 'Execute', desc: 'Synthesize deliverables' },
  { id: 7, label: 'Reflect', desc: 'Diagnose outcome disparity' },
  { id: 8, label: 'Learn', desc: 'Formulate new heuristic' },
  { id: 9, label: 'Evolve', desc: 'Upgrade cognitive method' },
];

export const CognitiveCycleRunner: React.FC<CognitiveCycleRunnerProps> = ({
  directive,
  onExecuteCycle,
  recentCycle,
  isRunning,
}) => {
  const [contextInput, setContextInput] = useState('');
  const [targetDeliverable, setTargetDeliverable] = useState('Viral Omnichannel Suite');
  const [activeCycleTab, setActiveCycleTab] = useState<'all' | 'evaluate' | 'execute' | 'learning'>('all');
  const [copied, setCopied] = useState(false);

  const handleRun = async (e: React.FormEvent) => {
    e.preventDefault();
    await onExecuteCycle(contextInput, targetDeliverable);
  };

  const copyDeliverable = () => {
    if (!recentCycle?.execute?.contentMarkdown) return;
    navigator.clipboard.writeText(recentCycle.execute.contentMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Specialized Modules Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-semibold text-white tracking-tight">
              Cognitive Architecture Modules
            </h3>
            <p className="text-xs text-slate-400">
              7 specialized autonomous subsystems operating in synchrony.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>All 7 Subsystems Synchronized</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {MODULES.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={m.name}
                className={`p-3.5 rounded-xl border ${m.borderColor} ${m.bg} flex flex-col justify-between transition-all hover:border-slate-700`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <Icon className={`w-4 h-4 ${m.color}`} />
                    <span className="text-xs font-semibold text-slate-200">
                      {idx + 1}. {m.name}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug">{m.role}</p>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-500">
                  <span>Status: Active</span>
                  <span className="text-emerald-400 font-mono">100% EV ready</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 9-Step Operating Cycle Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <RotateCcw className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-semibold text-white tracking-wide uppercase">
              The 9-Cycle Operating Loop
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Mandatory Cognitive Execution Protocol
          </span>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-9 gap-2">
          {STAGES.map((stage) => {
            const isCompleted = !!recentCycle;
            return (
              <div
                key={stage.id}
                className={`p-2.5 rounded-xl border transition-all text-center flex flex-col items-center justify-center ${
                  isRunning
                    ? 'border-cyan-500/50 bg-cyan-950/30 animate-pulse'
                    : isCompleted
                    ? 'border-emerald-800/40 bg-emerald-950/20'
                    : 'border-slate-800 bg-slate-950/50'
                }`}
              >
                <span className="text-[10px] font-mono text-cyan-400 font-semibold mb-0.5">
                  0{stage.id}
                </span>
                <span className="text-xs font-semibold text-slate-200">{stage.label}</span>
                <span className="text-[9px] text-slate-400 leading-tight mt-0.5 line-clamp-1">
                  {stage.desc}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cycle Trigger Console */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-5 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-base font-semibold text-white">Execute Autonomous Cycle</h3>
            <p className="text-xs text-slate-400">
              Trigger the full 9-step sequence to perceive context, formulate high-EV strategy, and generate high-ticket assets.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs text-slate-400">Target Output:</label>
            <select
              value={targetDeliverable}
              onChange={(e) => setTargetDeliverable(e.target.value)}
              className="bg-slate-950 border border-slate-700 text-xs text-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            >
              <option value="Viral Omnichannel Suite">Viral Omnichannel Suite (X + LinkedIn + TikTok)</option>
              <option value="High-Ticket Freelance Pitch & Scope">High-Ticket Freelance Pitch & Scope ($1,200+)</option>
              <option value="SEO Pillar & Content Authority">SEO Pillar & Content Authority</option>
              <option value="YouTube Viral Script & Hook Pack">YouTube Viral Script & Hook Pack</option>
            </select>
          </div>
        </div>

        <form onSubmit={handleRun} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Specific Campaign Context or Client Objective (Optional):
            </label>
            <input
              type="text"
              value={contextInput}
              onChange={(e) => setContextInput(e.target.value)}
              placeholder="e.g. Target B2B SaaS founders struggling with organic LinkedIn reach; focus on $2,500 retainer..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="text-xs text-slate-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Uses Gemini 3.8 Flash server-side with structured cognitive evaluation</span>
            </div>
            <button
              type="submit"
              disabled={isRunning}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-semibold text-sm shadow-lg shadow-cyan-950/60 transition-all disabled:opacity-50"
            >
              {isRunning ? (
                <>
                  <Zap className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Processing Cognitive Cycle...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-slate-950 text-slate-950" />
                  <span>Initiate 9-Step Operating Cycle</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Cycle Results & Cognitive Telemetry */}
      {recentCycle && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/70 border border-cyan-800/60 px-2 py-0.5 rounded">
                  {recentCycle.cycleId}
                </span>
                <h3 className="text-base font-bold text-white">
                  Cognitive Synthesis Results
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Completed autonomous perception, expected-value evaluation, generation, and learning.
              </p>
            </div>

            {/* Segmented Filter */}
            <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800">
              <button
                onClick={() => setActiveCycleTab('all')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  activeCycleTab === 'all'
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                All 9 Stages
              </button>
              <button
                onClick={() => setActiveCycleTab('evaluate')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  activeCycleTab === 'evaluate'
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                EV Scores
              </button>
              <button
                onClick={() => setActiveCycleTab('execute')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  activeCycleTab === 'execute'
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Generated Deliverable
              </button>
              <button
                onClick={() => setActiveCycleTab('learning')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  activeCycleTab === 'learning'
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Learned Heuristics
              </button>
            </div>
          </div>

          {/* EV & Quantitative Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
              <div className="text-[11px] text-slate-400 mb-1">Expected Value</div>
              <div className="text-lg font-bold font-mono text-emerald-400">
                ${recentCycle.evaluate.expectedValueUSD.toLocaleString()}
              </div>
              <div className="text-[10px] text-slate-500">Market Potential</div>
            </div>
            <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
              <div className="text-[11px] text-slate-400 mb-1">Confidence Score</div>
              <div className="text-lg font-bold font-mono text-cyan-400">
                {recentCycle.evaluate.confidenceScore}%
              </div>
              <div className="text-[10px] text-slate-500">
                {recentCycle.evaluate.confidenceScore >= 65 ? 'High Conviction' : 'Low Confidence'}
              </div>
            </div>
            <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
              <div className="text-[11px] text-slate-400 mb-1">Impact Score</div>
              <div className="text-lg font-bold font-mono text-purple-400">
                {recentCycle.evaluate.impactScore}/100
              </div>
              <div className="text-[10px] text-slate-500">Strategic Leverage</div>
            </div>
            <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
              <div className="text-[11px] text-slate-400 mb-1">Risk Score</div>
              <div className="text-lg font-bold font-mono text-amber-400">
                {recentCycle.evaluate.riskScore}/100
              </div>
              <div className="text-[10px] text-slate-500">Mitigated Low Risk</div>
            </div>
            <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
              <div className="text-[11px] text-slate-400 mb-1">Effort Score</div>
              <div className="text-lg font-bold font-mono text-blue-400">
                {recentCycle.evaluate.effortScore}/100
              </div>
              <div className="text-[10px] text-slate-500">Execution Velocity</div>
            </div>
            <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
              <div className="text-[11px] text-slate-400 mb-1">EV Ratio</div>
              <div className="text-lg font-bold font-mono text-emerald-400">
                {(
                  (recentCycle.evaluate.impactScore * recentCycle.evaluate.confidenceScore) /
                  (recentCycle.evaluate.riskScore * 10 + 1)
                ).toFixed(1)}
                x
              </div>
              <div className="text-[10px] text-slate-500">Leverage Index</div>
            </div>
          </div>

          {/* Cycle Detail Breakdown */}
          {(activeCycleTab === 'all' || activeCycleTab === 'evaluate') && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Perception & Recall */}
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wide">
                  <span>1. Perceive & 2. Recall</span>
                </div>
                <div>
                  <span className="text-xs text-slate-400">Perceived Objective:</span>
                  <p className="text-xs text-slate-200 mt-0.5">{recentCycle.perceive.goal}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-400">Primary Leverage Point:</span>
                  <p className="text-xs text-cyan-300 mt-0.5">{recentCycle.perceive.leveragePoint}</p>
                </div>
                <div className="pt-2 border-t border-slate-800/80">
                  <span className="text-xs text-slate-400">Memory Recalled:</span>
                  <div className="text-xs text-slate-300 mt-1 space-y-1">
                    <p>• {recentCycle.recall.episodicReference}</p>
                    <p>• {recentCycle.recall.semanticPrinciple}</p>
                  </div>
                </div>
              </div>

              {/* Plan & Decide */}
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wide">
                  <span>3. Plan & 5. Decide</span>
                </div>
                <div>
                  <span className="text-xs text-slate-400">Chosen High-EV Action:</span>
                  <p className="text-xs font-medium text-emerald-300 mt-0.5">
                    {recentCycle.decide.chosenAction}
                  </p>
                </div>
                <div>
                  <span className="text-xs text-slate-400">Expected Outcome:</span>
                  <p className="text-xs text-slate-200 mt-0.5">{recentCycle.decide.expectedOutcome}</p>
                </div>
                <div className="pt-2 border-t border-slate-800/80">
                  <span className="text-xs text-slate-400">Tactical Steps:</span>
                  <div className="text-xs text-slate-300 mt-1 space-y-1">
                    {recentCycle.plan.tacticalSteps?.map((step, i) => (
                      <p key={i}>
                        {i + 1}. {step}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Generated Deliverable Output */}
          {(activeCycleTab === 'all' || activeCycleTab === 'execute') && (
            <div className="bg-slate-950/80 rounded-xl border border-slate-800 overflow-hidden">
              <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-purple-400 uppercase">
                      6. Execute
                    </span>
                    <span className="text-slate-600">·</span>
                    <h4 className="text-sm font-semibold text-white">
                      {recentCycle.execute.title}
                    </h4>
                  </div>
                  <span className="text-xs text-emerald-400">
                    Monetization Angle: {recentCycle.execute.monetizationAngle}
                  </span>
                </div>
                <button
                  onClick={copyDeliverable}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Content'}</span>
                </button>
              </div>
              <div className="p-5 font-mono text-xs text-slate-200 whitespace-pre-wrap leading-relaxed max-h-[500px] overflow-y-auto bg-slate-950/90 selection:bg-cyan-900 selection:text-white">
                {recentCycle.execute.contentMarkdown}
              </div>
            </div>
          )}

          {/* Reflection, Learning & Self-Evolution */}
          {(activeCycleTab === 'all' || activeCycleTab === 'learning') && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                <span className="text-xs font-semibold text-amber-400 uppercase">
                  7. Reflect
                </span>
                <div className="text-xs text-slate-300 mt-2 space-y-1.5">
                  <p>
                    <strong className="text-slate-400">Intended:</strong>{' '}
                    {recentCycle.reflect.intendedOutcome}
                  </p>
                  <p>
                    <strong className="text-slate-400">What Worked:</strong>{' '}
                    {recentCycle.reflect.whatWorked}
                  </p>
                  <p>
                    <strong className="text-slate-400">Area for Polish:</strong>{' '}
                    {recentCycle.reflect.improvementArea}
                  </p>
                </div>
              </div>

              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                <span className="text-xs font-semibold text-emerald-400 uppercase">
                  8. Learn (New Heuristic)
                </span>
                <div className="text-xs text-slate-300 mt-2 space-y-1.5">
                  <p>
                    <strong className="text-slate-400">Root Cause:</strong>{' '}
                    {recentCycle.learn.rootCauseAnalysis}
                  </p>
                  <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-900/50 text-emerald-300 font-sans mt-2">
                    💡 {recentCycle.learn.newHeuristic}
                  </div>
                </div>
              </div>

              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                <span className="text-xs font-semibold text-cyan-400 uppercase">
                  9. Evolve (Self-Upgrade)
                </span>
                <div className="text-xs text-slate-300 mt-2 space-y-1.5">
                  <p>
                    <strong className="text-slate-400">System Upgrade:</strong>{' '}
                    {recentCycle.evolve.systemUpgrade}
                  </p>
                  <p>
                    <strong className="text-slate-400">Next Evolution Step:</strong>{' '}
                    {recentCycle.evolve.nextEvolutionStep}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
