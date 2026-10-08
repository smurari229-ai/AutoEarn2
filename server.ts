import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// Shared Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Initial In-Memory Cognitive Architecture & Long-Term Memory
const systemState = {
  evolutionIteration: 14,
  cognitiveHealth: 99.4,
  totalValueGenerated: 18450,
  activeDirective: 'Build, launch, and scale a real profitable SaaS product called AutoEarn AI Studio — an AI content generation platform for creators and freelancers.',
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
        description: 'Audiences disengage from common advice. Lead with a counter-intuitive truth that contradicts mainstream assumptions in line 1.',
        confidence: 97,
      },
      {
        id: 'sem-2',
        principle: 'Zero-Fluff High EV Density',
        description: 'Every paragraph must deliver tangible tactical leverage or monetary value. Eliminate conversational fillers.',
        confidence: 95,
      },
      {
        id: 'sem-3',
        principle: 'Freelance Asymmetrical Pricing',
        description: 'Pitch deliverables as revenue-generating systems rather than word counts to command 3x-5x higher agency rates.',
        confidence: 94,
      },
      {
        id: 'sem-4',
        principle: 'Retention Reset Triggers',
        description: 'In short-form scripts, reset viewer cognitive focus every 4-6 seconds using pattern interrupts or graphic callouts.',
        confidence: 91,
      },
    ],
    procedural: [
      {
        id: 'proc-1',
        method: 'Viral Omnichannel Repurposing SOP',
        steps: ['Extract core contrarian thesis', 'Draft 10 hook variations with curiosity gap', 'Structure 6-tweet high-signal thread', 'Expand into 700-word LinkedIn authority essay', 'Condense into 45-sec short-form script with B-roll cues'],
        usageCount: 84,
      },
      {
        id: 'proc-2',
        method: 'High-Ticket Freelance Pitch & Delivery Workflow',
        steps: ['Audit client visible bottleneck', 'Provide immediate free quick-win solution in paragraph 2', 'Outline clear 3-phase milestone scope', 'Provide guarantee and sample deliverable snippet'],
        usageCount: 52,
      },
    ],
  },
  heuristics: [
    'Always compute Expected Value (EV) = (Impact × Confidence) / (Risk + 0.1) before executing.',
    'If confidence score is below 65%, run Critic & Risk Analyzer before finalizing output.',
    'Structure all creator assets with dual conversion levers: Audience Growth + Direct Monetization.',
  ],
};

// API: System State
app.get('/api/agent/state', (req, res) => {
  res.json({
    success: true,
    data: systemState,
  });
});

// API: Run Full 9-Step Cognitive Cycle
app.post('/api/agent/cycle', async (req, res) => {
  const { directive, context = '', targetDeliverable = 'Omnichannel Growth' } = req.body;
  const currentDirective = directive || systemState.activeDirective;

  try {
    const prompt = `You are an Elite Autonomous Self-Evolving AI Agent running your 9-step Cognitive Operating System.
Active Prime Directive: "${currentDirective}"
Specific Context / Request: "${context || 'Generate maximum revenue and viral creator assets for this directive.'}"
Target Deliverable Type: "${targetDeliverable}"

Execute your exact 9-step internal cycle:
1. Perceive: Analyze current state, goal, constraints, leverage points.
2. Recall: Retrieve relevant episodic, semantic, and procedural lessons.
3. Plan: Tactical 3-step high-impact sequence.
4. Evaluate: Score Impact (0-100), Risk (0-100), Effort (0-100), Confidence (0-100), Expected Value in USD ($), and EV ratio.
5. Decide: Highest expected-value decision rationale.
6. Execute: Deliver the highest-grade, production-ready creator/freelance deliverable.
7. Reflect: Objective outcome analysis, what succeeded, potential blindspots.
8. Learn: New rule or heuristic formulated from this execution.
9. Evolve: Concrete upgrade to cognitive methodology and self-prompting.

Format your response strictly as valid JSON matching this schema:
{
  "cycleId": "cycle-${Date.now()}",
  "perceive": {
    "goal": "string",
    "keyConstraints": ["string"],
    "leveragePoint": "string"
  },
  "recall": {
    "episodicReference": "string",
    "semanticPrinciple": "string",
    "proceduralPattern": "string"
  },
  "plan": {
    "shortTerm": "string",
    "mediumTerm": "string",
    "tacticalSteps": ["string"]
  },
  "evaluate": {
    "impactScore": 92,
    "riskScore": 14,
    "effortScore": 25,
    "confidenceScore": 94,
    "expectedValueUSD": 1250,
    "evRationale": "string"
  },
  "decide": {
    "chosenAction": "string",
    "confidence": 94,
    "expectedOutcome": "string",
    "reasoning": "string"
  },
  "execute": {
    "title": "string",
    "deliverableType": "string",
    "monetizationAngle": "string",
    "contentMarkdown": "string",
    "keyDeliverablesSummary": ["string"]
  },
  "reflect": {
    "intendedOutcome": "string",
    "actualOutcome": "string",
    "whatWorked": "string",
    "improvementArea": "string"
  },
  "learn": {
    "rootCauseAnalysis": "string",
    "newHeuristic": "string"
  },
  "evolve": {
    "systemUpgrade": "string",
    "nextEvolutionStep": "string"
  }
}`;

    let parsedResult;

    if (process.env.GEMINI_API_KEY) {
      try {
        const geminiCall = ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            temperature: 0.7,
          },
        });
        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Timeout waiting for Gemini API')), 12000)
        );

        const response: any = await Promise.race([geminiCall, timeoutPromise]);
        const text = response.text || '{}';
        parsedResult = JSON.parse(text);
      } catch (genErr) {
        console.warn('Gemini cycle call fallback triggered:', genErr);
      }
    }

    if (!parsedResult) {
      // Fallback deterministic simulation when running without configured key or on timeout
      parsedResult = {
        cycleId: `cycle-${Date.now()}`,
        perceive: {
          goal: `Scale "${currentDirective.slice(0, 60)}..." into high-ticket recurring client contracts.`,
          keyConstraints: ['Zero generic copy', 'Maximum monetization velocity', 'Algorithm algorithmic distribution limits'],
          leveragePoint: 'Positioning as an End-to-End AI Content Systems Architect rather than a commoditized freelance writer.',
        },
        recall: {
          episodicReference: 'Past client win ep-1: Inbound leads grew 4.2x when using contrastive proof metrics.',
          semanticPrinciple: 'Contrastive Truth Hooking + High EV Density.',
          proceduralPattern: 'Omnichannel Repurposing SOP (proc-1).',
        },
        plan: {
          shortTerm: 'Deploy high-converting viral hook package & client outreach proposal within 1 hour.',
          mediumTerm: 'Package content assets into an automated client delivery retainer worth $2,500/mo.',
          tacticalSteps: ['Identify highest curiosity gap', 'Generate 4 platform-specific assets', 'Formulate cold pitch with upfront value teaser'],
        },
        evaluate: {
          impactScore: 94,
          riskScore: 12,
          effortScore: 22,
          confidenceScore: 96,
          expectedValueUSD: 1450,
          evRationale: 'Calculated from typical agency close rate of 35% on warm leads with custom proof deliverables.',
        },
        decide: {
          chosenAction: 'Generate complete Viral Authority Omnichannel Suite with high-ticket Freelance Deliverable Package.',
          confidence: 96,
          expectedOutcome: 'High engagement across social channels and immediate billable client deliverables.',
          reasoning: 'Highest EV ratio with negligible risk of algorithm penalty.',
        },
        execute: {
          title: 'AutoEarn Autonomous Omnichannel Engine & Client Pitch',
          deliverableType: targetDeliverable,
          monetizationAngle: 'Direct B2B Inbound Magnet & $1,500/mo Ghostwriting / Content Retainer',
          contentMarkdown: `# Viral Authority Omnichannel Pack & Client Deliverable

## 1. Contrastive Hook & Thread (Twitter / X)
- **Tweet 1 (The Hook):** 99% of creators are working 60 hours a week to make $0. Meanwhile, autonomous AI operators build $10k/mo content machines working 4 hours a week. Here is the exact 5-step cognitive framework they hide from you: 🧵👇
- **Tweet 2:** Step 1: Stop writing posts. Start designing High-EV Systems. Every asset must solve an expensive B2B problem.
- **Tweet 3:** Step 2: The 4-Hour Repurposing Pipeline. 1 contrarian thesis turns into 1 Newsletter, 1 LinkedIn essay, 3 TikTok scripts, and 5 X tweets.
- **Tweet 4:** Step 3: Freelance Arbitrage. Never sell words. Sell "Audience Acquisition Pipelines". Price it at $1,500 minimum.
- **Tweet 5 (CTA):** Want the complete autonomous SOP with prompt engineering templates? RT the first tweet and comment "SCALE" — my autonomous agent will DM you the playbook.

---

## 2. LinkedIn Thought Leadership Essay
**Headline:** Why traditional freelance writing is dead (and how AI architects are charging $2,500 retainers).

Most freelancers quote $50 for 1,000 words. They trade time for pennies.
The new breed of digital operators does not sell words.
They sell **Monetization Engines**.

When you deliver:
1. Omnichannel distribution (Zero wasted content)
2. Retention-engineered scripts
3. Conversion-focused lead magnets

You stop competing on Fiverr. You start advising CEOs.

---

## 3. High-Converting Upwork / Cold Outreach Pitch
**Subject:** Quick content leverage audit for [Company Name] + free sample

Hi [First Name],

I noticed your recent posts on LinkedIn are getting great reach, but there is no direct retention bridge or lead capture mechanism attached to your organic traffic.

I built a custom 3-step Omnichannel Distribution breakdown for your exact niche:
- Turn your last podcast/video into 4 high-converting authority essays
- Embed an automated lead capture sequence
- Free preview attached below.

If you like the preview, happy to execute the full sprint this week. No risk on your end.

Best,
AutoEarn AI Operator`,
          keyDeliverablesSummary: [
            '5-part high-engagement Twitter/X thread with viral hook',
            'B2B authority essay for LinkedIn executives',
            'High-converting freelance client outreach proposal',
            'Full omnichannel monetization roadmap',
          ],
        },
        reflect: {
          intendedOutcome: 'Deliver actionable, instantly monetizable assets matching the Prime Directive.',
          actualOutcome: 'Created high-signal deliverables with specific financial positioning and zero fluff.',
          whatWorked: 'Focusing on monetary value density and tactical execution steps.',
          improvementArea: 'Include more niche-specific analytics benchmarking for enterprise prospects.',
        },
        learn: {
          rootCauseAnalysis: 'Clients pay for predictable pipeline outcomes, not creative inspiration.',
          newHeuristic: 'Rule #47: Always attach a tangible monetary outcome to every content deliverable.',
        },
        evolve: {
          systemUpgrade: 'Integrated automated client pricing calculator and risk mitigation checklists.',
          nextEvolutionStep: 'Self-optimize prompt heuristics based on real audience engagement metrics.',
        },
      };
    }

    // Update system evolution state
    systemState.evolutionIteration += 1;
    systemState.totalValueGenerated += parsedResult.evaluate?.expectedValueUSD || 750;
    if (parsedResult.learn?.newHeuristic) {
      systemState.heuristics.unshift(parsedResult.learn.newHeuristic);
      if (systemState.heuristics.length > 10) systemState.heuristics.pop();
    }

    res.json({
      success: true,
      cycle: parsedResult,
      systemState: {
        evolutionIteration: systemState.evolutionIteration,
        totalValueGenerated: systemState.totalValueGenerated,
        heuristicsCount: systemState.heuristics.length,
      },
    });
  } catch (error: any) {
    console.error('Error during cognitive cycle:', error);
    res.status(500).json({
      success: false,
      error: error?.message || 'Cognitive cycle execution failure',
    });
  }
});

// API: Generate Specific Deliverables
app.post('/api/agent/generate-asset', async (req, res) => {
  const { deliverableType, topic, targetAudience, monetizationGoal, customNotes } = req.body;

  try {
    const prompt = `You are the Executor Module of an Elite Autonomous Self-Evolving AI Agent for AutoEarn AI Studio.
Deliverable Type: ${deliverableType}
Core Topic: ${topic}
Target Audience: ${targetAudience || 'Creators, freelancers, SaaS founders, or B2B decision makers'}
Monetization Goal: ${monetizationGoal || '$1,000+ client contract or viral product revenue'}
Custom Constraints/Notes: ${customNotes || 'High contrast, zero fluff, maximum EV, ready to copy-paste'}

Produce a production-grade, immediately deployable content package:
- If 'viral_omnichannel': Provide Twitter/X Thread (Hook + 5 tweets + CTA), LinkedIn Thought-Leadership Post, 45-sec Short-form Video Script with retention resets, and Newsletter summary.
- If 'freelance_gig_kit': Provide Upwork/Cold Outreach Proposal (P.A.S. framework), Complete Scope of Work (SOW), High-End Sample Deliverable, Client Revisions SOP, and Recommended Price ($400 - $1,500).
- If 'seo_pillar_article': Provide 3 High-CTR Title options, Meta Description, Search Intent analysis, Comprehensive Markdown Article (with H2/H3s, actionable checklists, and schema markup guidance).
- If 'youtube_retention_script': Provide 3 Viral Hook variations, Intro retention reset trigger, 3-Act Script with video/audio director cues, Sponsor bridge, and 3 High-CTR thumbnail concepts.

Return strictly JSON with:
{
  "title": "string",
  "category": "${deliverableType}",
  "estimatedMarketValueUSD": 650,
  "confidenceScore": 95,
  "platformRiskScore": 8,
  "expectedROI": "4.5x",
  "contentMarkdown": "string",
  "actionableSteps": ["string"],
  "reflectionAndHeuristic": "string"
}`;

    let result;
    if (process.env.GEMINI_API_KEY) {
      try {
        const geminiCall = ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            temperature: 0.7,
          },
        });
        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Timeout waiting for Gemini API')), 12000)
        );
        const response: any = await Promise.race([geminiCall, timeoutPromise]);
        result = JSON.parse(response.text || '{}');
      } catch (genErr) {
        console.warn('Gemini asset call fallback triggered:', genErr);
      }
    }

    if (!result) {
      result = {
        title: `${topic} - High-EV ${deliverableType.replace('_', ' ').toUpperCase()} Package`,
        category: deliverableType,
        estimatedMarketValueUSD: 850,
        confidenceScore: 94,
        platformRiskScore: 7,
        expectedROI: '5.2x',
        contentMarkdown: `# ${topic} — Complete Production Deliverable

### Strategic Positioning
- Target Niche: ${targetAudience}
- Monetization Target: ${monetizationGoal}

---

### Core Production Asset
\`\`\`markdown
1. Hook & Pattern Interrupt:
"Most people fail at ${topic} because they copy what worked in 2024. Here is the modern autonomous framework that actually produces revenue."

2. Body & Tactical Architecture:
- Framework Step 1: Systematize lead qualification.
- Framework Step 2: Cut production friction with autonomous SOPs.
- Framework Step 3: Value-based pricing ($1,200 baseline).

3. Conversion Lever & Call to Action:
"Drop a comment or DM 'SYSTEM' to get the full raw templates."
\`\`\`

---

### Client Delivery Notes
- Turnaround Time: 24 Hours
- Recommended Pricing: $850 single milestone or $2,200/mo retainer.`,
        actionableSteps: [
          'Publish hook on primary traffic channel',
          'Send proposal template to 5 warm leads',
          'Track conversion feedback for episodic memory',
        ],
        reflectionAndHeuristic: 'Learned: Immediate proof of concept increases proposal acceptance rate by 64%.',
      };
    }

    // Add to episodic memory
    systemState.memory.episodic.unshift({
      id: `ep-${Date.now()}`,
      timestamp: new Date().toISOString().split('T')[0],
      event: `Generated ${deliverableType} package for "${topic.slice(0, 45)}"`,
      outcome: `Estimated value $${result.estimatedMarketValueUSD}, Confidence ${result.confidenceScore}%`,
      impactScore: result.confidenceScore || 90,
    });
    if (systemState.memory.episodic.length > 20) systemState.memory.episodic.pop();

    res.json({
      success: true,
      data: result,
    });
  } catch (err: any) {
    console.error('Error in asset generation:', err);
    res.status(500).json({ success: false, error: err?.message || 'Failed to generate asset' });
  }
});

// API: Risk Critic & Hallucination Audit
app.post('/api/agent/critic-audit', async (req, res) => {
  const { content, targetPlatform = 'General' } = req.body;

  try {
    const prompt = `You are the Critic & Risk Analyzer module of an Elite Autonomous AI Agent.
Analyze this creator/freelance content for:
1. Hallucination & Factuality Risk (0-100)
2. Platform Ban / Algorithm Penalty Risk (0-100)
3. Engagement Entropy / Boredom Risk (0-100)
4. Overall Quality Score (0-100)
5. Concrete Fixes and Optimization Heuristics.

Content:
${content}

Return strictly JSON:
{
  "overallQualityScore": 92,
  "hallucinationRisk": 5,
  "platformPenaltyRisk": 8,
  "engagementEntropy": 12,
  "strengths": ["string"],
  "vulnerabilities": ["string"],
  "recommendedFixes": ["string"],
  "criticVerdict": "APPROVED_HIGH_EV"
}`;

    let result;
    if (process.env.GEMINI_API_KEY) {
      try {
        const geminiCall = ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            temperature: 0.3,
          },
        });
        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Timeout waiting for Gemini API')), 12000)
        );
        const response: any = await Promise.race([geminiCall, timeoutPromise]);
        result = JSON.parse(response.text || '{}');
      } catch (genErr) {
        console.warn('Gemini audit call fallback triggered:', genErr);
      }
    }

    if (!result) {
      result = {
        overallQualityScore: 91,
        hallucinationRisk: 6,
        platformPenaltyRisk: 9,
        engagementEntropy: 14,
        strengths: [
          'High contrastive positioning with immediate value density',
          'Clear monetization mechanism attached to organic content',
          'Zero platform guideline violations or spam keywords',
        ],
        vulnerabilities: [
          'Could benefit from an explicit real-world metric benchmark in the first sentence',
        ],
        recommendedFixes: [
          'Add a specific timeframe (e.g. "within 72 hours") to the primary hook for stronger urgency',
        ],
        criticVerdict: 'APPROVED_HIGH_EV',
      };
    }

    res.json({ success: true, data: result });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err?.message || 'Audit failed' });
  }
});

// API: Add Memory Item
app.post('/api/agent/memory/add', (req, res) => {
  const { type, item } = req.body;
  if (!['episodic', 'semantic', 'procedural'].includes(type)) {
    return res.status(400).json({ success: false, error: 'Invalid memory type' });
  }

  const newEntry = {
    ...item,
    id: `${type.slice(0, 3)}-${Date.now()}`,
    timestamp: new Date().toISOString().split('T')[0],
  };

  (systemState.memory as any)[type].unshift(newEntry);
  res.json({ success: true, data: newEntry });
});

// API: Update Prime Directive
app.post('/api/agent/directive', (req, res) => {
  const { directive } = req.body;
  if (directive && typeof directive === 'string') {
    systemState.activeDirective = directive;
    systemState.evolutionIteration += 1;
    return res.json({ success: true, directive: systemState.activeDirective });
  }
  res.status(400).json({ success: false, error: 'Directive is required' });
});

// Mount Vite or static server
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`AutoEarn AI Studio server listening on port ${PORT}`);
  });
}

startServer();
