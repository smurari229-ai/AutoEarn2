export interface EpisodicMemory {
  id: string;
  timestamp: string;
  event: string;
  outcome: string;
  impactScore: number;
}

export interface SemanticMemory {
  id: string;
  principle: string;
  description: string;
  confidence: number;
}

export interface ProceduralMemory {
  id: string;
  method: string;
  steps: string[];
  usageCount: number;
}

export interface SystemMemory {
  episodic: EpisodicMemory[];
  semantic: SemanticMemory[];
  procedural: ProceduralMemory[];
}

export interface SystemState {
  evolutionIteration: number;
  cognitiveHealth: number;
  totalValueGenerated: number;
  activeDirective: string;
  memory: SystemMemory;
  heuristics: string[];
}

export interface CognitiveCycleResult {
  cycleId: string;
  perceive: {
    goal: string;
    keyConstraints: string[];
    leveragePoint: string;
  };
  recall: {
    episodicReference: string;
    semanticPrinciple: string;
    proceduralPattern: string;
  };
  plan: {
    shortTerm: string;
    mediumTerm: string;
    tacticalSteps: string[];
  };
  evaluate: {
    impactScore: number;
    riskScore: number;
    effortScore: number;
    confidenceScore: number;
    expectedValueUSD: number;
    evRationale: string;
  };
  decide: {
    chosenAction: string;
    confidence: number;
    expectedOutcome: string;
    reasoning: string;
  };
  execute: {
    title: string;
    deliverableType: string;
    monetizationAngle: string;
    contentMarkdown: string;
    keyDeliverablesSummary: string[];
  };
  reflect: {
    intendedOutcome: string;
    actualOutcome: string;
    whatWorked: string;
    improvementArea: string;
  };
  learn: {
    rootCauseAnalysis: string;
    newHeuristic: string;
  };
  evolve: {
    systemUpgrade: string;
    nextEvolutionStep: string;
  };
}

export interface DeliverableAsset {
  id: string;
  title: string;
  category: 'viral_omnichannel' | 'freelance_gig_kit' | 'seo_pillar_article' | 'youtube_retention_script';
  estimatedMarketValueUSD: number;
  confidenceScore: number;
  platformRiskScore: number;
  expectedROI: string;
  contentMarkdown: string;
  actionableSteps: string[];
  reflectionAndHeuristic: string;
  createdAt: string;
}

export interface CriticAuditResult {
  overallQualityScore: number;
  hallucinationRisk: number;
  platformPenaltyRisk: number;
  engagementEntropy: number;
  strengths: string[];
  vulnerabilities: string[];
  recommendedFixes: string[];
  criticVerdict: 'APPROVED_HIGH_EV' | 'NEEDS_REVISION' | 'FLAGGED_HIGH_RISK';
}
