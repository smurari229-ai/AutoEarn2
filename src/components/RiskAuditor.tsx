import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  Zap,
  ArrowRight,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import { CriticAuditResult } from '../types/agent';

interface RiskAuditorProps {
  initialContent?: string;
  onAuditContent: (content: string) => Promise<CriticAuditResult | null>;
  isAuditing: boolean;
}

export const RiskAuditor: React.FC<RiskAuditorProps> = ({
  initialContent = '',
  onAuditContent,
  isAuditing,
}) => {
  const [content, setContent] = useState(
    initialContent ||
      `99% of creators are trading time for pennies on Fiverr.
Autonomous AI operators do not sell words — they sell High-EV Monetization Engines.

Step 1: Stop quoting hourly. Price based on revenue leverage ($1,500 baseline).
Step 2: Turn 1 core insight into 4 cross-platform assets with automated retention resets.
Step 3: Provide a free prototype snippet in your cold pitch to eliminate hiring friction.

DM "SYSTEM" to get the raw autonomous templates.`
  );
  const [auditResult, setAuditResult] = useState<CriticAuditResult | null>(null);

  const handleAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    const res = await onAuditContent(content);
    if (res) {
      setAuditResult(res);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-amber-400" />
          <h3 className="text-base font-bold text-white tracking-tight">
            Critic & Risk Analyzer Subsystem
          </h3>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Rigorous pre-flight sanity check for hallucination mitigation, algorithm penalty prevention, and engagement density.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Input Textarea */}
        <div className="lg:col-span-5 space-y-4">
          <form onSubmit={handleAudit} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-slate-300">
                  Content Asset for Audit:
                </label>
                <span className="text-[11px] text-slate-500 font-mono">
                  {content.length} characters
                </span>
              </div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={10}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 leading-relaxed"
                placeholder="Paste client copy, viral thread, script, or pitch here..."
                required
              />
            </div>

            <button
              type="submit"
              disabled={isAuditing}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-950/40 transition-all disabled:opacity-50"
            >
              {isAuditing ? (
                <>
                  <Zap className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Auditing with Critic Engine...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-slate-950" />
                  <span>Run Pre-Flight Critic Audit</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right: Audit Diagnostic Results */}
        <div className="lg:col-span-7">
          {auditResult ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
              {/* Top Verdict & Overall Score */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <span className="text-xs text-slate-400">Critic Verdict:</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-sm font-bold font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2.5 py-1 rounded-lg">
                      {auditResult.criticVerdict}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      Safe for Deployment
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs text-slate-400">Overall Quality Score</span>
                  <div className="text-2xl font-black font-mono text-cyan-400">
                    {auditResult.overallQualityScore}/100
                  </div>
                </div>
              </div>

              {/* Risk Gauges Bar */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-slate-400">Hallucination Risk</span>
                    <span className="text-xs font-mono font-bold text-emerald-400">
                      {auditResult.hallucinationRisk}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full rounded-full"
                      style={{ width: `${auditResult.hallucinationRisk}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1 block">Extremely Low</span>
                </div>

                <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-slate-400">Platform Ban Risk</span>
                    <span className="text-xs font-mono font-bold text-emerald-400">
                      {auditResult.platformPenaltyRisk}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full rounded-full"
                      style={{ width: `${auditResult.platformPenaltyRisk}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1 block">Policy Safe</span>
                </div>

                <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-slate-400">Engagement Entropy</span>
                    <span className="text-xs font-mono font-bold text-cyan-400">
                      {auditResult.engagementEntropy}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-cyan-500 h-full rounded-full"
                      style={{ width: `${auditResult.engagementEntropy}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1 block">High Retention</span>
                </div>
              </div>

              {/* Strengths & Vulnerabilities */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Detected Strengths
                  </span>
                  <div className="mt-2 space-y-1.5">
                    {auditResult.strengths?.map((s, i) => (
                      <p key={i} className="text-xs text-slate-300">
                        • {s}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wide flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" /> Areas for Fortification
                  </span>
                  <div className="mt-2 space-y-1.5">
                    {auditResult.vulnerabilities?.map((v, i) => (
                      <p key={i} className="text-xs text-slate-300">
                        • {v}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recommended Fixes */}
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wide flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> Actionable Critic Optimizations
                </span>
                <div className="mt-2 space-y-1.5">
                  {auditResult.recommendedFixes?.map((fix, i) => (
                    <div
                      key={i}
                      className="text-xs text-slate-200 bg-cyan-950/30 border border-cyan-900/40 p-2.5 rounded-lg font-sans"
                    >
                      {i + 1}. {fix}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900/50 border border-dashed border-slate-800 rounded-2xl p-12 text-center flex flex-col items-center justify-center h-full min-h-[380px]">
              <div className="w-12 h-12 rounded-2xl bg-slate-800/60 flex items-center justify-center text-slate-400 mb-3">
                <ShieldAlert className="w-6 h-6 text-amber-400" />
              </div>
              <h4 className="text-sm font-semibold text-slate-200 mb-1">
                Critic Engine Awaiting Input
              </h4>
              <p className="text-xs text-slate-400 max-w-sm mb-4">
                Run an audit on any client copy, thread, or proposal to verify factuality, platform safety, and retention velocity.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
