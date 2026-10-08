import React, { useState } from 'react';
import {
  DollarSign,
  Briefcase,
  TrendingUp,
  Clock,
  Download,
  Copy,
  Check,
  Calculator,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { DeliverableAsset } from '../types/agent';

interface MonetizationHubProps {
  pipeline: DeliverableAsset[];
  totalValue: number;
}

export const MonetizationHub: React.FC<MonetizationHubProps> = ({
  pipeline,
  totalValue,
}) => {
  const [selectedAsset, setSelectedAsset] = useState<DeliverableAsset | null>(
    pipeline[0] || null
  );
  const [copied, setCopied] = useState(false);

  // Freelance Rate Calculator state
  const [clientType, setClientType] = useState<'smb' | 'funded_startup' | 'enterprise'>('funded_startup');
  const [assetVolume, setAssetVolume] = useState(4);
  const [turnaroundDays, setTurnaroundDays] = useState(3);

  const calculateRecommendedQuote = () => {
    let baseMultiplier = 350;
    if (clientType === 'funded_startup') baseMultiplier = 650;
    if (clientType === 'enterprise') baseMultiplier = 1200;

    const volumeTotal = assetVolume * baseMultiplier;
    const speedPremium = turnaroundDays <= 2 ? 1.3 : 1.0;
    return Math.round(volumeTotal * speedPremium);
  };

  const handleCopy = () => {
    if (!selectedAsset) return;
    navigator.clipboard.writeText(selectedAsset.contentMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!selectedAsset) return;
    const blob = new Blob([selectedAsset.contentMarkdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedAsset.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Total Value Realized</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black font-mono text-emerald-400">
            ${totalValue.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Expected Market Value</div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Shipped Assets in CRM</span>
            <Briefcase className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black font-mono text-cyan-400">
            {pipeline.length}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">High-Ticket Deliverables</div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Avg. Contract SOW</span>
            <TrendingUp className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black font-mono text-purple-400">
            $
            {pipeline.length > 0
              ? Math.round(
                  pipeline.reduce((acc, a) => acc + a.estimatedMarketValueUSD, 0) /
                    pipeline.length
                ).toLocaleString()
              : '850'}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Milestone Value</div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Execution Hours Saved</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black font-mono text-amber-400">
            {(pipeline.length * 4.5).toFixed(1)}h
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Autonomous Leverage</div>
        </div>
      </div>

      {/* Main Section: Rate Calculator & Deliverables CRM */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Value-Based Pricing Calculator */}
        <div className="lg:col-span-4 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="pb-3 border-b border-slate-800 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Calculator className="w-4 h-4 text-emerald-400" />
                <h4 className="text-sm font-semibold text-white">Value Pricing Calculator</h4>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Price deliverables by revenue leverage, not hours.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Client Profile / Tier:
              </label>
              <select
                value={clientType}
                onChange={(e) => setClientType(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option value="smb">Solopreneur / Local SMB ($350/package base)</option>
                <option value="funded_startup">Funded Series A Startup ($650/package base)</option>
                <option value="enterprise">B2B Enterprise / Agency ($1,200/package base)</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Asset Volume (Weekly):</span>
                <span className="font-mono text-emerald-400">{assetVolume} packages</span>
              </div>
              <input
                type="range"
                min="1"
                max="12"
                value={assetVolume}
                onChange={(e) => setAssetVolume(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Turnaround SLA:</span>
                <span className="font-mono text-cyan-400">{turnaroundDays} Days</span>
              </div>
              <input
                type="range"
                min="1"
                max="7"
                value={turnaroundDays}
                onChange={(e) => setTurnaroundDays(Number(e.target.value))}
                className="w-full accent-cyan-500"
              />
            </div>

            {/* Recommended Quote Result Box */}
            <div className="bg-slate-950 border border-emerald-900/50 p-4 rounded-xl text-center">
              <span className="text-[11px] text-slate-400 uppercase tracking-wide block">
                Recommended Client Quote
              </span>
              <div className="text-2xl font-black font-mono text-emerald-400 my-1">
                ${calculateRecommendedQuote().toLocaleString()}
              </div>
              <span className="text-[10px] text-slate-500 block">
                Estimated Client ROI: 3.8x - 6.2x
              </span>
            </div>
          </div>
        </div>

        {/* Right: Deliverables Pipeline List & Inspector */}
        <div className="lg:col-span-8 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="pb-3 border-b border-slate-800 flex items-center justify-between mb-4">
              <div>
                <h4 className="text-sm font-semibold text-white">Client Deliverable Pipeline</h4>
                <p className="text-xs text-slate-400">
                  Shipped assets ready for client handoff or publication.
                </p>
              </div>
              <span className="text-xs font-mono text-slate-400">
                {pipeline.length} items logged
              </span>
            </div>

            {/* List */}
            <div className="space-y-2 mb-6">
              {pipeline.map((asset) => {
                const isSelected = selectedAsset?.id === asset.id;
                return (
                  <button
                    key={asset.id}
                    onClick={() => setSelectedAsset(asset)}
                    className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-cyan-500/60 bg-cyan-950/30 shadow-md'
                        : 'border-slate-800/80 bg-slate-950/60 hover:bg-slate-950 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white line-clamp-1">
                          {asset.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1">
                        <span>{asset.category.replace(/_/g, ' ').toUpperCase()}</span>
                        <span>·</span>
                        <span>{asset.createdAt}</span>
                      </div>
                    </div>

                    <div className="text-right flex items-center gap-3">
                      <div>
                        <span className="text-xs font-bold font-mono text-emerald-400 block">
                          ${asset.estimatedMarketValueUSD}
                        </span>
                        <span className="text-[10px] text-slate-500">
                          {asset.confidenceScore}% conf
                        </span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-500" />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Deliverable Quick Viewer */}
            {selectedAsset && (
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <h5 className="text-xs font-bold text-white">{selectedAsset.title}</h5>
                    <span className="text-[10px] text-slate-500">
                      ID: {selectedAsset.id} · Value: ${selectedAsset.estimatedMarketValueUSD}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopy}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                      title="Copy content"
                    >
                      {copied ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <button
                      onClick={handleDownload}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                      title="Download Markdown"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="mt-3 font-mono text-[11px] text-slate-300 max-h-48 overflow-y-auto whitespace-pre-wrap leading-relaxed">
                  {selectedAsset.contentMarkdown}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
