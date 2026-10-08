import React, { useState } from 'react';
import { Target, Edit3, Check, RefreshCw, Sparkles } from 'lucide-react';

interface DirectiveBannerProps {
  directive: string;
  onUpdateDirective: (newDirective: string) => Promise<void>;
}

const PRESETS = [
  {
    name: 'AutoEarn SaaS Launch',
    text: 'Build, launch, and scale a real profitable SaaS product called AutoEarn AI Studio — an AI content generation platform for creators and freelancers.',
  },
  {
    name: '$10k/Mo Ghostwriting Agency',
    text: 'Scale an autonomous high-ticket B2B ghostwriting & executive authority agency delivering 4 LinkedIn/X asset packages per week at $2,500/mo retainer.',
  },
  {
    name: 'Viral Affiliate Video Engine',
    text: 'Deploy viral short-form review scripts and pattern-interrupt hooks targeting TikTok Shop & YouTube Shorts to achieve $5,000/mo affiliate payouts.',
  },
  {
    name: 'High-Ticket Upwork & Pitch Pipeline',
    text: 'Systematically identify top 1% content engineering client gigs on Upwork and close $1,000+ custom milestone sprints with zero cold-outreach friction.',
  },
];

export const DirectiveBanner: React.FC<DirectiveBannerProps> = ({
  directive,
  onUpdateDirective,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [customText, setCustomText] = useState(directive);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!customText.trim()) return;
    setIsSaving(true);
    await onUpdateDirective(customText);
    setIsSaving(false);
    setIsEditing(false);
  };

  const handleSelectPreset = async (presetText: string) => {
    setCustomText(presetText);
    setIsSaving(true);
    await onUpdateDirective(presetText);
    setIsSaving(false);
  };

  return (
    <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 border border-slate-800 rounded-2xl p-5 mb-8 shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-cyan-950 border border-cyan-800/60 text-cyan-400">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold tracking-wide text-cyan-400 uppercase">
                Current Prime Directive
              </h2>
              <span className="text-slate-500 text-xs">·</span>
              <span className="text-xs text-emerald-400 font-mono">Autonomous Execution Active</span>
            </div>
            <p className="text-xs text-slate-400">
              The overarching autonomous goal guiding all 9 cognitive cycle stages and output generation.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!isEditing ? (
            <button
              onClick={() => {
                setCustomText(directive);
                setIsEditing(true);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 rounded-lg transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Modify Directive</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsEditing(false)}
                className="px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-slate-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors disabled:opacity-50"
              >
                {isSaving ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Check className="w-3.5 h-3.5" />
                )}
                <span>Save & Evolve</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {isEditing ? (
        <div className="space-y-3">
          <textarea
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            rows={3}
            className="w-full bg-slate-950/80 border border-cyan-800/80 rounded-xl p-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent font-sans"
            placeholder="Specify your prime directive clearly..."
          />
        </div>
      ) : (
        <div className="bg-slate-950/70 border border-slate-800/90 rounded-xl p-4">
          <p className="text-base font-medium text-slate-100 leading-relaxed font-sans">
            "{directive}"
          </p>
        </div>
      )}

      {/* Strategic Presets */}
      <div className="mt-4 pt-3 border-t border-slate-800/70 flex flex-wrap items-center gap-2 text-xs">
        <span className="text-slate-400 flex items-center gap-1 font-medium mr-1">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Quick Strategic Directives:
        </span>
        {PRESETS.map((preset) => (
          <button
            key={preset.name}
            onClick={() => handleSelectPreset(preset.text)}
            className="px-2.5 py-1 rounded-md bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 text-slate-300 hover:text-cyan-300 transition-colors text-left"
          >
            {preset.name}
          </button>
        ))}
      </div>
    </div>
  );
};
