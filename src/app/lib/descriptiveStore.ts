import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface GrammarCorrection {
  original: string;
  corrected: string;
  explanation: string;
}

export interface SentenceAnalysis {
  sentence: string;
  status: "Good" | "Improve" | "Error";
  feedback: string;
}

export interface DescriptiveReport {
  id: string;
  examId: string;
  examName: string;
  sectionId: string;
  sectionName: string;
  setId: string;
  setTitle: string;
  date: string;
  originalText: string;
  
  // Scores out of 100
  overallScore: number;
  expectedExamScore: string;
  contentScore: number;
  structureScore: number;
  grammarScore: number;
  vocabularyScore: number;
  formatScore: number;

  // Feedback Arrays
  strengths: string[];
  weaknesses: string[];
  corrections: GrammarCorrection[];
  sentenceAnalysis: SentenceAnalysis[];
  improvementPlan: string[];

  // Typing & Usage Stats
  wordCount: number;
  timeSpentSeconds: number;
  grossWpm: number;
  netWpm: number;
  accuracyPercent: number;
  backspaceCount: number;

  // Language Stats
  sentenceCount: number;
  paragraphCount: number;
  grammarErrorCount: number;
  spellingErrorCount: number;
  spellingErrorsList: string[];
  
  // Word Limit
  wordLimitFeedback: string;
}

interface DescriptiveState {
  reports: DescriptiveReport[];
  drafts: Record<string, string>; // examId_sectionId_setId -> content
  addReport: (report: DescriptiveReport) => void;
  saveDraft: (key: string, content: string) => void;
  deleteReport: (id: string) => void;
  clearAllReports: () => void;
}

export const useDescriptiveStore = create<DescriptiveState>()(
  persist(
    (set) => ({
      reports: [],
      drafts: {},
      addReport: (report) =>
        set((state) => ({ reports: [report, ...state.reports] })),
      saveDraft: (key, content) =>
        set((state) => ({ drafts: { ...state.drafts, [key]: content } })),
      deleteReport: (id) =>
        set((state) => ({ reports: state.reports.filter((r) => r.id !== id) })),
      clearAllReports: () => set({ reports: [] }),
    }),
    {
      name: "vandana-vibes-descriptive-v2", // changed name to ignore old schema!
    }
  )
);
