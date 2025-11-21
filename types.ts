export enum AnalysisType {
  CAREER = 'CAREER',
  BELIEF = 'BELIEF',
  RELATIONSHIP = 'RELATIONSHIP'
}

export interface SimulationData {
  year: number;
  steadyWealth: number;
  riskyWealth: number;
  steadyHappiness: number;
  riskyHappiness: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
  isAnalysis?: boolean;
}

export interface CognitiveBias {
  name: string;
  description: string;
  relevance: number; // 0-100
}

export interface AIAnalysisResult {
  rationalityScore: number;
  emotionalScore: number;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  identifiedBiases: string[];
  constructiveAdvice: string;
  realityCheck: string;
}
