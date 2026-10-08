import React, { useState } from 'react';
import {
  Share2,
  Briefcase,
  FileText,
  Video,
  DollarSign,
  ShieldCheck,
  Check,
  Copy,
  Download,
  Send,
  Sparkles,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { DeliverableAsset } from '../types/agent';

interface ContentStudioProps {
  onGenerateAsset: (params: {
    deliverableType: string;
    topic: string;
    targetAudience: string;
    monetizationGoal: string;
    customNotes: string;
  }) => Promise<DeliverableAsset | null>;
  onSendToAuditor: (content: string) => void;
  onSaveToPipeline: (asset: DeliverableAsset) => void;
  isGenerating: boolean;
  latestAsset: DeliverableAsset | null;
}

const ENGINES = [
  {
    id: 'viral_omnichannel',
    title: 'Viral Omnichannel Suite',
    description: 'Twitter/X 6-tweet thread + LinkedIn authority essay + TikTok 45s script + Newsletter issue.',
    icon: Share2,
    badge: 'Audience & Growth',
    avgValue: '$450 - $900',
    color: 'border-cyan-500/40 bg-cyan-950/20 text-cyan-400',
  },
  {
    id: 'freelance_gig_kit',
    title: 'High-Ticket Freelance Pitch & Scope',
    description: 'Upwork/Cold Outreach P.A.S. proposal, full SOW, sample deliverable, and $1,200+ pricing strategy.',
    icon: Briefcase,
    badge: 'Direct Client Revenue',
    avgValue: '$1,000 - $3,500',
    color: 'border-emerald-500/40 bg-emerald-950/20 text-emerald-400',
  },
  {
    id: 'seo_pillar_article',
    title: 'SEO Authority Pillar Article',
    description: 'High-intent search keyword target, 1,500+ word markdown guide, FAQ schema, and lead capture hooks.',
    icon: FileText,
    badge: 'Passive Traffic & Retainers',
    avgValue: '$600 - $1,500',
    color: 'border-purple-500/40 bg-purple-950/20 text-purple-400',
  },
  {
    id: 'youtube_retention_script',
    title: 'YouTube Retention Script & Hook Pack',
    description: '3 Viral Hook variations, pattern interrupts at 0:15, 3-act pacing, director cues, sponsor bridge.',
    icon: Video,
    badge: 'High-Engagement Video',
    avgValue: '$500 - $1,200',
    color: 'border-amber-500/40 bg-amber-950/20 text-amber-400',
  },
];

export const ContentStudio: React.FC<ContentStudioProps> = ({
  onGenerateAsset,
  onSendToAuditor,
  onSaveToPipeline,
  isGenerating,
  latestAsset,
}) => {
  const [selectedEngine, setSelectedEngine] = useState('viral_omnichannel');
  const [topic, setTopic] = useState('How Autonomous AI Agents Are Replacing Traditional Freelancers');
  const [targetAudience, setTargetAudience] = useState('Freelancers, creators, and agency owners seeking leverage');
  const [monetizationGoal, setMonetizationGoal] = useState('$1,500 client milestone sprint or 100k views inbound');
  const [customNotes, setCustomNotes] = useState('High contrast, contrarian truth in line 1, clear CTA for templates');
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(false);
    await onGenerateAsset({
      deliverableType: selectedEngine,
      topic,
      targetAudience,
      monetizationGoal,
      customNotes,
    });
  };

  const handleCopy = () => {
    if (!latestAsset?.contentMarkdown) return;
    navigator.clipboard.writeText(latestAsset.contentMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (format: 'md' | 'txt' | 'json') => {
    if (!latestAsset) return;
    let text = latestAsset.contentMarkdown;
    let mime = 'text/markdown';
    let filename = `${latestAsset.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.${format}`;

    if (format === 'json') {
      text = JSON.stringify(latestAsset, null, 2);
      mime = 'application/json';
    }

    const blob = new Blob([text], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSavePipeline = () => {
    if (!latestAsset) return;
    onSaveToPipeline(latestAsset);
    setSaved(true);
  };

  return (
    <div className="space-y-8">
      {/* Engine Selector */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-semibold text-white">Executor Modules & Deliverable Engines</h3>
            <p className="text-xs text-slate-400">
              Select the monetization engine to synthesize client-ready, high-ticket digital assets.
            </p>
          </div>
          <span className="text-xs text-cyan-400 font-mono">Real-Time Gemini 3.8 Flash</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {ENGINES.map((engine) => {
            const Icon = engine.icon;
            const isSelected = selectedEngine === engine.id;
            return (
              <button
                key={engine.id}
                type="button"
                onClick={() => setSelectedEngine(engine.id)}
                className={`p-4 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                  isSelected
                    ? `${engine.color} shadow-lg ring-1 ring-cyan-500/30`
                    : 'border-slate-800 bg-slate-900/60 hover:bg-slate-900 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Icon className="w-5 h-5" />
                    <span className="text-[10px] font-medium text-slate-400">
                      {engine.badge}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-100 mb-1">{engine.title}</h4>
                  <p className="text-xs text-slate-400 leading-snug">{engine.description}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Market Rate:</span>
                  <span className="font-mono font-medium text-emerald-400">{engine.avgValue}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Input Configuration & Action Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form: Parameters */}
        <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="pb-3 border-b border-slate-800">
            <h4 className="text-sm font-semibold text-white">Campaign & Client Parameters</h4>
            <p className="text-xs text-slate-400">
              Provide context for the AI Agent's cognitive executor.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Core Topic / Client Asset Theme:
              </label>
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                rows={2}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="What is the core subject or offer?"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Target Audience & Client Niche:
              </label>
              <input
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Who is this content or pitch targeted to?"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Monetization Target / Price Anchor:
              </label>
              <input
                type="text"
                value={monetizationGoal}
                onChange={(e) => setMonetizationGoal(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="e.g. $1,200 milestone pitch or 1,000 newsletter signups"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Custom Constraints & Tone:
              </label>
              <input
                type="text"
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="e.g. Contrarian tone, no fluff, include cold outreach guarantee"
              />
            </div>

            <button
              type="submit"
              disabled={isGenerating}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-950/40 transition-all disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Synthesizing Production Asset...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>Execute Deliverable Generation</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Output: Deliverable Preview & Actions */}
        <div className="lg:col-span-7 space-y-4">
          {latestAsset ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col justify-between h-full">
              <div>
                {/* Header with Title and Valuations */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                  <div>
                    <h3 className="text-base font-bold text-white leading-snug">
                      {latestAsset.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                      <span>Engine: {latestAsset.category.replace(/_/g, ' ').toUpperCase()}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-emerald-400 font-mono font-medium">
                        Expected ROI: {latestAsset.expectedROI}
                      </span>
                    </div>
                  </div>

                  {/* Market Rate & Confidence */}
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 uppercase tracking-wide block">
                        Estimated Value
                      </span>
                      <span className="text-base font-bold font-mono text-emerald-400">
                        ${latestAsset.estimatedMarketValueUSD}
                      </span>
                    </div>
                    <div className="text-right pl-3 border-l border-slate-800">
                      <span className="text-[10px] text-slate-400 uppercase tracking-wide block">
                        Confidence
                      </span>
                      <span className="text-base font-bold font-mono text-cyan-400">
                        {latestAsset.confidenceScore}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Markdown Content Area */}
                <div className="mt-4 bg-slate-950/90 rounded-xl border border-slate-800/80 p-4 font-mono text-xs text-slate-200 whitespace-pre-wrap leading-relaxed max-h-[460px] overflow-y-auto selection:bg-cyan-900 selection:text-white">
                  {latestAsset.contentMarkdown}
                </div>

                {/* Reflection & Heuristic Footnote */}
                {latestAsset.reflectionAndHeuristic && (
                  <div className="mt-3 p-3 rounded-lg bg-emerald-950/20 border border-emerald-900/40 text-xs text-emerald-300">
                    💡 <strong>Agent Heuristic:</strong> {latestAsset.reflectionAndHeuristic}
                  </div>
                )}
              </div>

              {/* Action Toolbar */}
              <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                  <button
                    onClick={() => handleDownload('md')}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download .MD</span>
                  </button>
                  <button
                    onClick={() => handleDownload('json')}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-slate-200 bg-slate-950 hover:bg-slate-800 rounded-lg transition-colors border border-slate-800"
                  >
                    <span>JSON</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSendToAuditor(latestAsset.contentMarkdown)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-amber-300 hover:text-amber-200 bg-amber-950/40 hover:bg-amber-950/80 border border-amber-900/50 rounded-lg transition-colors"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                    <span>Audit with Critic</span>
                  </button>
                  <button
                    onClick={handleSavePipeline}
                    disabled={saved}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors disabled:opacity-60"
                  >
                    {saved ? <Check className="w-3.5 h-3.5" /> : <Send className="w-3.5 h-3.5" />}
                    <span>{saved ? 'Saved to CRM' : 'Save to Client CRM'}</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900/50 border border-dashed border-slate-800 rounded-2xl p-12 text-center flex flex-col items-center justify-center h-full min-h-[380px]">
              <div className="w-12 h-12 rounded-2xl bg-slate-800/60 flex items-center justify-center text-slate-400 mb-3">
                <Sparkles className="w-6 h-6 text-cyan-400" />
              </div>
              <h4 className="text-sm font-semibold text-slate-200 mb-1">
                Executor Ready for Dispatch
              </h4>
              <p className="text-xs text-slate-400 max-w-sm mb-4">
                Configure your campaign parameters on the left and trigger generation to produce high-ticket creator assets.
              </p>
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span>Direct Gemini 3.8 Flash</span>
                <span>·</span>
                <span>Automated Market Valuation</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
