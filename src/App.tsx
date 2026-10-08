import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { DirectiveBanner } from './components/DirectiveBanner';
import { CognitiveCycleRunner } from './components/CognitiveCycleRunner';
import { ContentStudio } from './components/ContentStudio';
import { MemoryBank } from './components/MemoryBank';
import { RiskAuditor } from './components/RiskAuditor';
import { MonetizationHub } from './components/MonetizationHub';
import {
  SystemState,
  CognitiveCycleResult,
  DeliverableAsset,
  CriticAuditResult,
} from './types/agent';

const INITIAL_PIPELINE: DeliverableAsset[] = [
  {
    id: 'pipe-1',
    title: 'B2B Executive Thought Leadership Pack (LinkedIn + X)',
    category: 'viral_omnichannel',
    estimatedMarketValueUSD: 1450,
    confidenceScore: 96,
    platformRiskScore: 6,
    expectedROI: '5.4x',
    contentMarkdown: `# B2B Executive Thought Leadership Pack

## LinkedIn Lead Essay
Headline: Why 90% of SaaS founders waste $50k on agency retainers with 0 customer pipeline.

Most marketing agencies sell vanity views.
When building for true enterprise scale, you don't need "impressions" — you need qualified buying intent.

Here is the exact 3-step autonomous pipeline we deployed to add $180k ARR in 90 days:
1. Contrarian positioning against legacy incumbent software.
2. Direct problem-agitate breakdown with workflow screenshots.
3. Automated friction-free calendar booking link.

---

## High-Converting Twitter / X Thread
1/ Most founders write content like a corporate press release. That's why nobody reads it.
2/ If you want B2B pipeline, write about the expensive problem you spent 3 years solving.
3/ Break down your exact customer numbers, conversion rates, and mistakes.
4/ The market rewards transparency, not perfection.
5/ DM "PIPELINE" for our raw 14-page growth breakdown.`,
    actionableSteps: [
      'Schedule post for Tuesday 8:30 AM EST',
      'Deploy direct message autoresponder for keyword PIPELINE',
    ],
    reflectionAndHeuristic: 'High specificity on revenue numbers drove 3.8x higher inbound response rate.',
    createdAt: '2026-10-06',
  },
  {
    id: 'pipe-2',
    title: 'High-Ticket Upwork & Cold Outreach Proposal Sprint',
    category: 'freelance_gig_kit',
    estimatedMarketValueUSD: 1200,
    confidenceScore: 94,
    platformRiskScore: 5,
    expectedROI: '4.8x',
    contentMarkdown: `# High-Ticket Freelance Client Proposal

**Subject:** Quick content leverage audit for [Brand] + free sample

Hi [Client Name],

I audited your recent organic distribution and spotted a key bottleneck: you are getting solid reach, but there is zero conversion bridge guiding traffic to your core product.

I put together a complete 3-step Content Systems sprint:
1. Omnichannel Repurposing (1 podcast episode -> 4 authority articles + 6 short-form scripts)
2. Retention Resets engineered for 68%+ watch-through rates
3. Direct conversion CTA to capture qualified email leads

Attached is a free custom sample script built specifically for your target audience.
Happy to handle the entire sprint this week for $1,200 milestone guarantee.

Best,
AutoEarn AI Operator`,
    actionableSteps: [
      'Send to 5 targeted prospects on LinkedIn and Upwork',
      'Attach custom prototype snippet',
    ],
    reflectionAndHeuristic: 'Free prototype snippet in cold outreach closes 64% faster.',
    createdAt: '2026-10-07',
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<
    'engine' | 'studio' | 'memory' | 'auditor' | 'monetization'
  >('engine');

  const [systemState, setSystemState] = useState<SystemState>({
    evolutionIteration: 14,
    cognitiveHealth: 99.4,
    totalValueGenerated: 18450,
    activeDirective:
      'Build, launch, and scale a real profitable SaaS product called AutoEarn AI Studio — an AI content generation platform for creators and freelancers.',
    memory: {
      episodic: [
        {
          id: 'ep-1',
          timestamp: '2026-09-28',
          event: 'Generated 5-part LinkedIn B2B AI playbook for SaaS founder',
          outcome: 'Generated 142k impressions, 18 inbound client leads, $3,400 contract won.',
          impactScore: 92,
        },
        {
          id: 'ep-2',
          timestamp: '2026-10-02',
          event: 'Drafted 3 TikTok viral hooks for productivity tool affiliate campaign',
          outcome: 'Hook #2 scored 2.1M views, 480 affiliate signups, $1,920 commissions in 72 hours.',
          impactScore: 96,
        },
        {
          id: 'ep-3',
          timestamp: '2026-10-06',
          event: 'Upwork proposal sent for AI Content Systems Engineer role',
          outcome: 'Selected from 47 applicants within 2 hours; closed at $1,200 milestone package.',
          impactScore: 89,
        },
      ],
      semantic: [
        {
          id: 'sem-1',
          principle: 'Contrastive Truth Hooking',
          description:
            'Audiences disengage from common advice. Lead with a counter-intuitive truth that contradicts mainstream assumptions in line 1.',
          confidence: 97,
        },
        {
          id: 'sem-2',
          principle: 'Zero-Fluff High EV Density',
          description:
            'Every paragraph must deliver tangible tactical leverage or monetary value. Eliminate conversational fillers.',
          confidence: 95,
        },
        {
          id: 'sem-3',
          principle: 'Freelance Asymmetrical Pricing',
          description:
            'Pitch deliverables as revenue-generating systems rather than word counts to command 3x-5x higher agency rates.',
          confidence: 94,
        },
        {
          id: 'sem-4',
          principle: 'Retention Reset Triggers',
          description:
            'In short-form scripts, reset viewer cognitive focus every 4-6 seconds using pattern interrupts or graphic callouts.',
          confidence: 91,
        },
      ],
      procedural: [
        {
          id: 'proc-1',
          method: 'Viral Omnichannel Repurposing SOP',
          steps: [
            'Extract core contrarian thesis',
            'Draft 10 hook variations with curiosity gap',
            'Structure 6-tweet high-signal thread',
            'Expand into 700-word LinkedIn authority essay',
            'Condense into 45-sec short-form script with B-roll cues',
          ],
          usageCount: 84,
        },
        {
          id: 'proc-2',
          method: 'High-Ticket Freelance Pitch & Delivery Workflow',
          steps: [
            'Audit client visible bottleneck',
            'Provide immediate free quick-win solution in paragraph 2',
            'Outline clear 3-phase milestone scope',
            'Provide guarantee and sample deliverable snippet',
          ],
          usageCount: 52,
        },
      ],
    },
    heuristics: [
      'Always compute Expected Value (EV) = (Impact × Confidence) / (Risk + 0.1) before executing.',
      'If confidence score is below 65%, run Critic & Risk Analyzer before finalizing output.',
      'Structure all creator assets with dual conversion levers: Audience Growth + Direct Monetization.',
    ],
  });

  const [recentCycle, setRecentCycle] = useState<CognitiveCycleResult | null>(null);
  const [latestAsset, setLatestAsset] = useState<DeliverableAsset | null>(null);
  const [pipeline, setPipeline] = useState<DeliverableAsset[]>(INITIAL_PIPELINE);
  const [auditorDraft, setAuditorDraft] = useState<string>('');

  const [isRunningCycle, setIsRunningCycle] = useState(false);
  const [isGeneratingAsset, setIsGeneratingAsset] = useState(false);
  const [isAuditing, setIsAuditing] = useState(false);

  // Fetch initial system state from backend
  useEffect(() => {
    fetch('/api/agent/state')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setSystemState(data.data);
        }
      })
      .catch((err) => {
        console.warn('Backend state fetch note:', err);
      });
  }, []);

  // Update Directive
  const handleUpdateDirective = async (newDirective: string) => {
    try {
      const res = await fetch('/api/agent/directive', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ directive: newDirective }),
      });
      const data = await res.json();
      if (data.success) {
        setSystemState((prev) => ({
          ...prev,
          activeDirective: newDirective,
          evolutionIteration: prev.evolutionIteration + 1,
        }));
      }
    } catch (err) {
      setSystemState((prev) => ({
        ...prev,
        activeDirective: newDirective,
        evolutionIteration: prev.evolutionIteration + 1,
      }));
    }
  };

  // Run 9-Step Cognitive Cycle
  const handleExecuteCycle = async (context: string, deliverable: string) => {
    setIsRunningCycle(true);
    try {
      const res = await fetch('/api/agent/cycle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          directive: systemState.activeDirective,
          context,
          targetDeliverable: deliverable,
        }),
      });
      const data = await res.json();
      if (data.success && data.cycle) {
        setRecentCycle(data.cycle);
        if (data.systemState) {
          setSystemState((prev) => ({
            ...prev,
            evolutionIteration: data.systemState.evolutionIteration,
            totalValueGenerated: data.systemState.totalValueGenerated,
          }));
        }
        return data.cycle;
      }
    } catch (err) {
      console.error('Cycle run error:', err);
    } finally {
      setIsRunningCycle(false);
    }
    return null;
  };

  // Generate Specific Content Deliverable
  const handleGenerateAsset = async (params: {
    deliverableType: string;
    topic: string;
    targetAudience: string;
    monetizationGoal: string;
    customNotes: string;
  }) => {
    setIsGeneratingAsset(true);
    try {
      const res = await fetch('/api/agent/generate-asset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      const data = await res.json();
      if (data.success && data.data) {
        const newAsset: DeliverableAsset = {
          ...data.data,
          id: `asset-${Date.now()}`,
          createdAt: new Date().toISOString().split('T')[0],
        };
        setLatestAsset(newAsset);
        setSystemState((prev) => ({
          ...prev,
          totalValueGenerated: prev.totalValueGenerated + (newAsset.estimatedMarketValueUSD || 650),
        }));
        return newAsset;
      }
    } catch (err) {
      console.error('Asset gen error:', err);
    } finally {
      setIsGeneratingAsset(false);
    }
    return null;
  };

  // Add Memory to Storage
  const handleAddMemory = async (
    type: 'episodic' | 'semantic' | 'procedural',
    item: any
  ) => {
    try {
      const res = await fetch('/api/agent/memory/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, item }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setSystemState((prev) => ({
          ...prev,
          memory: {
            ...prev.memory,
            [type]: [data.data, ...prev.memory[type]],
          },
        }));
      }
    } catch (err) {
      console.error('Add memory error:', err);
    }
  };

  // Run Critic Audit
  const handleAuditContent = async (content: string): Promise<CriticAuditResult | null> => {
    setIsAuditing(true);
    try {
      const res = await fetch('/api/agent/critic-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        return data.data;
      }
    } catch (err) {
      console.error('Audit error:', err);
    } finally {
      setIsAuditing(false);
    }
    return null;
  };

  // Save Asset to Pipeline
  const handleSaveToPipeline = (asset: DeliverableAsset) => {
    setPipeline((prev) => [asset, ...prev]);
  };

  // Forward Asset Content to Auditor Tab
  const handleSendToAuditor = (content: string) => {
    setAuditorDraft(content);
    setActiveTab('auditor');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-900 selection:text-white">
      {/* Global Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        iteration={systemState.evolutionIteration}
        health={systemState.cognitiveHealth}
        totalValue={systemState.totalValueGenerated}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Prime Directive Banner */}
        <DirectiveBanner
          directive={systemState.activeDirective}
          onUpdateDirective={handleUpdateDirective}
        />

        {/* Tab Views */}
        {activeTab === 'engine' && (
          <CognitiveCycleRunner
            directive={systemState.activeDirective}
            onExecuteCycle={handleExecuteCycle}
            recentCycle={recentCycle}
            isRunning={isRunningCycle}
          />
        )}

        {activeTab === 'studio' && (
          <ContentStudio
            onGenerateAsset={handleGenerateAsset}
            onSendToAuditor={handleSendToAuditor}
            onSaveToPipeline={handleSaveToPipeline}
            isGenerating={isGeneratingAsset}
            latestAsset={latestAsset}
          />
        )}

        {activeTab === 'memory' && (
          <MemoryBank
            memory={systemState.memory}
            onAddMemory={handleAddMemory}
          />
        )}

        {activeTab === 'auditor' && (
          <RiskAuditor
            initialContent={auditorDraft}
            onAuditContent={handleAuditContent}
            isAuditing={isAuditing}
          />
        )}

        {activeTab === 'monetization' && (
          <MonetizationHub
            pipeline={pipeline}
            totalValue={systemState.totalValueGenerated}
          />
        )}
      </main>

      {/* Bottom Status Bar */}
      <footer className="border-t border-slate-800 bg-slate-950/80 py-4 px-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-slate-400">Autonomous Cognitive Architecture Online</span>
            <span aria-hidden="true">·</span>
            <span>All 7 Modules Synchronized</span>
          </div>
          <div className="flex items-center gap-3 text-slate-400">
            <span>Server-Side Gemini 3.8 Flash</span>
            <span aria-hidden="true">·</span>
            <span>Self-Evolving Heuristics Playbook</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
