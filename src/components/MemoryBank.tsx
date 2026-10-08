import React, { useState } from 'react';
import {
  Database,
  Search,
  Plus,
  History,
  BookOpen,
  GitBranch,
  CheckCircle2,
  TrendingUp,
  X,
} from 'lucide-react';
import { SystemMemory, EpisodicMemory, SemanticMemory, ProceduralMemory } from '../types/agent';

interface MemoryBankProps {
  memory: SystemMemory;
  onAddMemory: (type: 'episodic' | 'semantic' | 'procedural', item: any) => Promise<void>;
}

export const MemoryBank: React.FC<MemoryBankProps> = ({ memory, onAddMemory }) => {
  const [activeTier, setActiveTier] = useState<'episodic' | 'semantic' | 'procedural'>('episodic');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states for adding new memory
  const [newType, setNewType] = useState<'episodic' | 'semantic' | 'procedural'>('episodic');
  const [episodicEvent, setEpisodicEvent] = useState('');
  const [episodicOutcome, setEpisodicOutcome] = useState('');
  const [episodicImpact, setEpisodicImpact] = useState(90);

  const [semanticPrinciple, setSemanticPrinciple] = useState('');
  const [semanticDescription, setSemanticDescription] = useState('');
  const [semanticConfidence, setSemanticConfidence] = useState(95);

  const [proceduralMethod, setProceduralMethod] = useState('');
  const [proceduralSteps, setProceduralSteps] = useState('');

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newType === 'episodic') {
      await onAddMemory('episodic', {
        event: episodicEvent,
        outcome: episodicOutcome,
        impactScore: Number(episodicImpact),
      });
      setEpisodicEvent('');
      setEpisodicOutcome('');
    } else if (newType === 'semantic') {
      await onAddMemory('semantic', {
        principle: semanticPrinciple,
        description: semanticDescription,
        confidence: Number(semanticConfidence),
      });
      setSemanticPrinciple('');
      setSemanticDescription('');
    } else {
      await onAddMemory('procedural', {
        method: proceduralMethod,
        steps: proceduralSteps.split('\n').filter((s) => s.trim().length > 0),
        usageCount: 1,
      });
      setProceduralMethod('');
      setProceduralSteps('');
    }
    setIsModalOpen(false);
  };

  const filteredEpisodic = memory.episodic.filter(
    (e) =>
      e.event.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.outcome.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSemantic = memory.semantic.filter(
    (s) =>
      s.principle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredProcedural = memory.procedural.filter(
    (p) =>
      p.method.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.steps.some((step) => step.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-purple-400" />
            <h3 className="text-base font-bold text-white tracking-tight">
              Long-Term Autonomous Memory System
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Persistent episodic events, semantic principles, and procedural SOPs driving all decisions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search memories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-lg pl-9 pr-3 py-2 w-52 focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs shadow-md shadow-purple-950/40 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Memory</span>
          </button>
        </div>
      </div>

      {/* Memory Tier Switcher Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <button
          onClick={() => setActiveTier('episodic')}
          className={`p-4 rounded-xl border text-left transition-all ${
            activeTier === 'episodic'
              ? 'border-cyan-500/50 bg-cyan-950/20 shadow-md'
              : 'border-slate-800 bg-slate-900/60 hover:bg-slate-900'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-semibold text-slate-200">Episodic Memory</span>
            </div>
            <span className="text-xs font-mono font-medium text-cyan-400">
              {memory.episodic.length} Records
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-snug">
            Specific past campaigns, client gig outcomes, and revenue realizations.
          </p>
        </button>

        <button
          onClick={() => setActiveTier('semantic')}
          className={`p-4 rounded-xl border text-left transition-all ${
            activeTier === 'semantic'
              ? 'border-purple-500/50 bg-purple-950/20 shadow-md'
              : 'border-slate-800 bg-slate-900/60 hover:bg-slate-900'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-semibold text-slate-200">Semantic Memory</span>
            </div>
            <span className="text-xs font-mono font-medium text-purple-400">
              {memory.semantic.length} Principles
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-snug">
            General laws, monetization rules, and audience psychology principles.
          </p>
        </button>

        <button
          onClick={() => setActiveTier('procedural')}
          className={`p-4 rounded-xl border text-left transition-all ${
            activeTier === 'procedural'
              ? 'border-emerald-500/50 bg-emerald-950/20 shadow-md'
              : 'border-slate-800 bg-slate-900/60 hover:bg-slate-900'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-semibold text-slate-200">Procedural Memory</span>
            </div>
            <span className="text-xs font-mono font-medium text-emerald-400">
              {memory.procedural.length} SOPs
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-snug">
            Battle-tested execution workflows, step-by-step formulas, and SOPs.
          </p>
        </button>
      </div>

      {/* Memory Cards Display */}
      <div className="space-y-3">
        {activeTier === 'episodic' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredEpisodic.map((item) => (
              <div
                key={item.id}
                className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span>{item.timestamp}</span>
                    <span className="font-mono text-cyan-400">Impact Score: {item.impactScore}/100</span>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-100 mb-1">{item.event}</h4>
                  <p className="text-xs text-emerald-300 font-sans mt-2 bg-emerald-950/30 p-2.5 rounded-lg border border-emerald-900/40">
                    <strong>Outcome:</strong> {item.outcome}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>ID: {item.id}</span>
                  <span className="text-slate-400">Verified Past Experience</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTier === 'semantic' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredSemantic.map((item) => (
              <div
                key={item.id}
                className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span className="font-mono text-purple-400">Principle</span>
                    <span className="font-mono text-cyan-400">Confidence: {item.confidence}%</span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1.5">{item.principle}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>
                </div>
                <div className="mt-4 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>ID: {item.id}</span>
                  <span className="text-emerald-400">Active High-EV Heuristic</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTier === 'procedural' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredProcedural.map((item) => (
              <div
                key={item.id}
                className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span className="font-mono text-emerald-400">Execution SOP</span>
                    <span className="text-slate-400">Run Count: {item.usageCount} times</span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-3">{item.method}</h4>
                  <div className="space-y-1.5">
                    {item.steps.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <span className="font-mono text-emerald-400 font-semibold">{idx + 1}.</span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-4 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>ID: {item.id}</span>
                  <span className="text-slate-400">Standard Operating Procedure</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Memory Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-lg w-full shadow-2xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-white mb-1">Add Memory to Long-Term Storage</h3>
            <p className="text-xs text-slate-400 mb-4">
              Directly feed verified heuristics and workflows into the autonomous agent's memory.
            </p>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Memory Tier:</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewType('episodic')}
                    className={`py-1.5 text-xs font-medium rounded-lg border ${
                      newType === 'episodic'
                        ? 'border-cyan-500 bg-cyan-950/40 text-cyan-300'
                        : 'border-slate-800 text-slate-400'
                    }`}
                  >
                    Episodic
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewType('semantic')}
                    className={`py-1.5 text-xs font-medium rounded-lg border ${
                      newType === 'semantic'
                        ? 'border-purple-500 bg-purple-950/40 text-purple-300'
                        : 'border-slate-800 text-slate-400'
                    }`}
                  >
                    Semantic
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewType('procedural')}
                    className={`py-1.5 text-xs font-medium rounded-lg border ${
                      newType === 'procedural'
                        ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300'
                        : 'border-slate-800 text-slate-400'
                    }`}
                  >
                    Procedural
                  </button>
                </div>
              </div>

              {newType === 'episodic' && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Event / Campaign Record:
                    </label>
                    <input
                      type="text"
                      value={episodicEvent}
                      onChange={(e) => setEpisodicEvent(e.target.value)}
                      placeholder="e.g. Sent 10 cold Loom pitches to SaaS founders"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Measured Outcome & ROI:
                    </label>
                    <input
                      type="text"
                      value={episodicOutcome}
                      onChange={(e) => setEpisodicOutcome(e.target.value)}
                      placeholder="e.g. Closed 3 clients at $1,800/mo retainer"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Impact Score (0-100):
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={episodicImpact}
                      onChange={(e) => setEpisodicImpact(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                    />
                  </div>
                </>
              )}

              {newType === 'semantic' && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Core Principle Name:
                    </label>
                    <input
                      type="text"
                      value={semanticPrinciple}
                      onChange={(e) => setSemanticPrinciple(e.target.value)}
                      placeholder="e.g. Asymmetrical Value Anchor"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-1 focus:ring-purple-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Operational Description:
                    </label>
                    <textarea
                      value={semanticDescription}
                      onChange={(e) => setSemanticDescription(e.target.value)}
                      rows={3}
                      placeholder="Explain how this principle generates leverage or prevents mistakes..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:ring-1 focus:ring-purple-500"
                      required
                    />
                  </div>
                </>
              )}

              {newType === 'procedural' && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      SOP Method Name:
                    </label>
                    <input
                      type="text"
                      value={proceduralMethod}
                      onChange={(e) => setProceduralMethod(e.target.value)}
                      placeholder="e.g. 15-Minute Viral Video Repurposing Pipeline"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Steps (One per line):
                    </label>
                    <textarea
                      value={proceduralSteps}
                      onChange={(e) => setProceduralSteps(e.target.value)}
                      rows={4}
                      placeholder="Step 1: Extract contrarian thesis&#10;Step 2: Generate 3 hook options&#10;Step 3: Insert retention reset at 0:15"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      required
                    />
                  </div>
                </>
              )}

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-2 text-xs text-slate-400 hover:text-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs rounded-xl shadow-md transition-colors"
                >
                  Save to Long-Term Memory
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
