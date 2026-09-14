import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UpcomingExam {
  id: string;
  name: string;
  subject: string;
  date: string;
  daysRemaining: number;
  targetScore: string;
  syllabusCovered: number;
  totalChapters: number;
  completedChapters: number;
  subjectBadgeBg: string;
  subjectBadgeText: string;
  notes?: string;
  location?: string;
}

export interface PastExam {
  id: string;
  name: string;
  subject: string;
  date: string;
  targetScore: string;
  achievedScore: string;
  percentageScore: number;
  status: "exceeded" | "achieved" | "missed";
  notes?: string;
}

interface ExamStoreState {
  upcomingExams: UpcomingExam[];
  pastExams: PastExam[];
  setUpcomingExams: (exams: UpcomingExam[] | ((prev: UpcomingExam[]) => UpcomingExam[])) => void;
  setPastExams: (exams: PastExam[] | ((prev: PastExam[]) => PastExam[])) => void;
}

export const useExamStore = create<ExamStoreState>()(
  persist(
    (set) => ({
      upcomingExams: [
        {
          id: "1",
          name: "JEE Mains Session 1",
          subject: "PCM Combined",
          date: "2026-11-20",
          daysRemaining: 70,
          targetScore: "200+",
          syllabusCovered: 60,
          totalChapters: 90,
          completedChapters: 54,
          subjectBadgeBg: "bg-accent-yellow",
          subjectBadgeText: "text-amber-900",
          notes: "Focus on High weightage topics first."
        },
        {
          id: "2",
          name: "Pre-Boards Physics",
          subject: "Physics",
          date: "2026-12-05",
          daysRemaining: 85,
          targetScore: "95%",
          syllabusCovered: 40,
          totalChapters: 14,
          completedChapters: 6,
          subjectBadgeBg: "bg-surface-lavender",
          subjectBadgeText: "text-primary",
        },
        {
          id: "3",
          name: "Chemistry Term Test",
          subject: "Chemistry",
          date: "2026-10-01",
          daysRemaining: 20,
          targetScore: "50/50",
          syllabusCovered: 80,
          totalChapters: 10,
          completedChapters: 8,
          subjectBadgeBg: "bg-accent-blue",
          subjectBadgeText: "text-sky-800",
        }
      ],
      pastExams: [],
      setUpcomingExams: (updater) => set((state) => ({
        upcomingExams: typeof updater === 'function' ? updater(state.upcomingExams) : updater
      })),
      setPastExams: (updater) => set((state) => ({
        pastExams: typeof updater === 'function' ? updater(state.pastExams) : updater
      })),
    }),
    {
      name: 'vandana-vibes-exams',
    }
  )
);
