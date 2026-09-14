import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface MockSection {
  id: string;
  name: string; // Reasoning, Quant, English, etc.
  totalQs: number;
  attempted: number;
  correct: number;
  wrong: number;
  unattempted: number;
  timeTaken: number; // minutes
}

export interface MockTest {
  id: string;
  type: string; // Full Mock, Sectional
  platform: string; // Testbook, Gradeup, etc.
  name: string;
  totalMarks: number;
  obtainedMarks: number;
  totalQs: number;
  attempted: number;
  correct: number;
  wrong: number;
  unattempted: number;
  timeAllowed: number;
  timeTaken: number;
  date: number; // timestamp
  sections: MockSection[];
}

interface MockStore {
  mocks: MockTest[];
  addMock: (mock: MockTest) => void;
  deleteMock: (id: string) => void;
}

export const useMockStore = create<MockStore>()(
  persist(
    (set) => ({
      mocks: [],
      addMock: (mock) => set((state) => ({ mocks: [mock, ...state.mocks] })),
      deleteMock: (id) => set((state) => ({ mocks: state.mocks.filter(m => m.id !== id) })),
    }),
    {
      name: 'vandana-vibes-mocks',
    }
  )
);
