import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ============================================================
// USER STORE
// ============================================================

interface UserState {
  gender: "boy" | "girl";
  theme: "light" | "dark" | "eye";
  dailyGoalHours: number;
  allowedApps: string[];
  setGender: (gender: "boy" | "girl") => void;
  setTheme: (theme: "light" | "dark" | "eye") => void;
  setDailyGoalHours: (hours: number) => void;
  setAllowedApps: (apps: string[]) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      gender: "girl",
      theme: "light",
      dailyGoalHours: 6,
        allowedApps: [],
      setGender: (gender) => set({ gender }),
      setTheme: (theme) => set({ theme }),
      setDailyGoalHours: (hours) => set({ dailyGoalHours: hours }),
        setAllowedApps: (apps) => set({ allowedApps: apps }),
    }),
    {
      name: 'vandana-vibes-user',
    }
  )
);

// ============================================================
// STUDY SESSION HISTORY
// ============================================================

export interface StudySession {
  id: string;
  taskId: string;
  taskName: string;
  subjectId: string;
  startedAt: number;      // epoch ms — real wall-clock start
  endedAt: number;        // epoch ms — real wall-clock end
  actualSeconds: number;  // real study seconds (excluding pauses)
  date: string;           // "YYYY-MM-DD"
}

interface StudySessionState {
  sessions: StudySession[];
  addSession: (session: StudySession) => void;
  getTodaySessions: () => StudySession[];
  getTodayActualSeconds: () => number;
  deleteSessionsByTask: (taskId: string) => void;
  deleteSessionsBySubject: (subjectId: string) => void;
  deleteSession: (id: string) => void;
  getTotalSecondsByTask: (taskId: string) => number;
  getTotalSecondsBySubject: (subjectId: string) => number;
}

const getTodayDateStr = (): string => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

export const useStudySessionStore = create<StudySessionState>()(
  persist(
    (set, get) => ({
      sessions: [],

      addSession: (session) => set((state) => ({
        sessions: [...state.sessions, session]
      })),

      getTodaySessions: () => {
        const today = getTodayDateStr();
        return get().sessions.filter(s => s.date === today);
      },

      getTodayActualSeconds: () => {
        const today = getTodayDateStr();
        return get().sessions
          .filter(s => s.date === today)
          .reduce((acc, s) => acc + s.actualSeconds, 0);
      },

      deleteSessionsByTask: (taskId) => set((state) => ({
        sessions: state.sessions.filter(s => s.taskId !== taskId)
      })),

      deleteSessionsBySubject: (subjectId) => set((state) => ({
        sessions: state.sessions.filter(s => s.subjectId !== subjectId)
      })),
      deleteSession: (id) => set((state) => ({
        sessions: state.sessions.filter(s => s.id !== id)
      })),

      getTotalSecondsByTask: (taskId) => {
        return get().sessions
          .filter(s => s.taskId === taskId)
          .reduce((acc, s) => acc + s.actualSeconds, 0);
      },

      getTotalSecondsBySubject: (subjectId) => {
        return get().sessions
          .filter(s => s.subjectId === subjectId)
          .reduce((acc, s) => acc + s.actualSeconds, 0);
      },
    }),
    {
      name: 'vandana-vibes-study-sessions',
    }
  )
);

// ============================================================
// TIMER STORE (Enhanced — Single Source of Truth)
// ============================================================

interface TimerState {
  isActive: boolean;        // stopwatch is currently counting
  isPaused: boolean;        // stopwatch was started then paused
  startTime: number | null; // epoch ms when current active segment began
  accumulatedTime: number;  // seconds accumulated from previous segments (before pauses)
  subjectId: string | null;
  taskId: string | null;
  taskName: string | null;
  sessionStartedAt: number | null; // epoch ms when the overall session first started

  startTimer: (taskId: string, taskName: string, subjectId?: string) => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
  finishTimer: () => number; // returns actual seconds studied
  getElapsedSeconds: () => number;
}

export const useTimerStore = create<TimerState>()(
  persist(
    (set, get) => ({
      isActive: false,
      isPaused: false,
      startTime: null,
      accumulatedTime: 0,
      subjectId: null,
      taskId: null,
      taskName: null,
      sessionStartedAt: null,

      startTimer: (taskId, taskName, subjectId) => {
        const state = get();
        // If already active with a different task, auto-finish the current one
        if ((state.isActive || state.isPaused) && state.taskId && state.taskId !== taskId) {
          let totalSeconds = state.accumulatedTime;
          if (state.isActive && state.startTime) {
            totalSeconds += Math.floor((Date.now() - state.startTime) / 1000);
          }
          // Save the previous session
          if (totalSeconds > 0) {
            useStudySessionStore.getState().addSession({
              id: `session-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
              taskId: state.taskId,
              taskName: state.taskName || '',
              subjectId: state.subjectId || '',
              startedAt: state.sessionStartedAt || Date.now(),
              endedAt: Date.now(),
              actualSeconds: totalSeconds,
              date: getTodayDateStr(),
            });
          }
        }

        // If already active with the SAME task, do nothing
        if (state.isActive && state.taskId === taskId) return;

        // If paused with the SAME task, resume instead
        if (state.isPaused && state.taskId === taskId) {
          set({
            isActive: true,
            isPaused: false,
            startTime: Date.now(),
          });
          return;
        }

        set({
          isActive: true,
          isPaused: false,
          startTime: Date.now(),
          accumulatedTime: 0,
          subjectId: subjectId || null,
          taskId,
          taskName,
          sessionStartedAt: Date.now(),
        });
      },

      pauseTimer: () => {
        const state = get();
        if (!state.isActive || !state.startTime) return;

        const elapsed = Math.floor((Date.now() - state.startTime) / 1000);
        set({
          isActive: false,
          isPaused: true,
          startTime: null,
          accumulatedTime: state.accumulatedTime + elapsed,
        });
      },

      resumeTimer: () => {
        const state = get();
        if (!state.isPaused) return;

        set({
          isActive: true,
          isPaused: false,
          startTime: Date.now(),
        });
      },

      finishTimer: () => {
        const state = get();
        let totalSeconds = state.accumulatedTime;

        if (state.isActive && state.startTime) {
          totalSeconds += Math.floor((Date.now() - state.startTime) / 1000);
        }

        // Save the session to history
        if (totalSeconds > 0 && state.taskId) {
          useStudySessionStore.getState().addSession({
            id: `session-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
            taskId: state.taskId,
            taskName: state.taskName || '',
            subjectId: state.subjectId || '',
            startedAt: state.sessionStartedAt || Date.now(),
            endedAt: Date.now(),
            actualSeconds: totalSeconds,
            date: getTodayDateStr(),
          });
        }

        // Reset everything
        set({
          isActive: false,
          isPaused: false,
          startTime: null,
          accumulatedTime: 0,
          subjectId: null,
          taskId: null,
          taskName: null,
          sessionStartedAt: null,
        });

        return totalSeconds;
      },

      getElapsedSeconds: () => {
        const state = get();
        if (state.isActive && state.startTime) {
          return state.accumulatedTime + Math.floor((Date.now() - state.startTime) / 1000);
        }
        return state.accumulatedTime;
      },
    }),
    {
      name: 'vandana-vibes-timer',
    }
  )
);

// ============================================================
// JOURNAL STORE
// ============================================================

export interface JournalEntry {
  id: string;
  date: string;
  content: string;
  mood: "great" | "good" | "okay" | "sad" | "stressed" | null;
  tags: string[];
}

interface JournalState {
  entries: JournalEntry[];
  addEntry: (entry: Omit<JournalEntry, "id" | "date">) => void;
  updateEntry: (id: string, updatedData: Partial<JournalEntry>) => void;
  deleteEntry: (id: string) => void;
}

export const useJournalStore = create<JournalState>()(
  persist(
    (set) => ({
      entries: [],
      
      addEntry: (entry) => set((state) => ({
        entries: [
          {
            ...entry,
            id: Date.now().toString(),
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          },
          ...state.entries
        ]
      })),

      updateEntry: (id, updatedData) => set((state) => ({
        entries: state.entries.map(entry => 
          entry.id === id ? { ...entry, ...updatedData } : entry
        )
      })),

      deleteEntry: (id) => set((state) => ({
        entries: state.entries.filter(entry => entry.id !== id)
      })),
    }),
    {
      name: 'vandana-vibes-journal',
    }
  )
);

// ============================================================
// CHANTING STORE
// ============================================================

export type Chant = {
  id: string;
  title: string;
  type: string;
  videoId: string;
  playCount: number;
  durationStr: string;
};

interface ChantingState {
  library: Chant[];
  nowPlayingId: string | null;
  addChant: (chant: Chant) => void;
  deleteChant: (id: string) => void;
  incrementPlayCount: (id: string) => void;
  setNowPlayingId: (id: string | null) => void;
}

export const useChantingStore = create<ChantingState>()(
  persist(
    (set) => ({
      library: [],
      nowPlayingId: null,
      addChant: (chant) => set((state) => ({
        library: [chant, ...state.library]
      })),
      deleteChant: (id) => set((state) => ({
        library: state.library.filter(c => c.id !== id),
        nowPlayingId: state.nowPlayingId === id ? null : state.nowPlayingId
      })),
      incrementPlayCount: (id) => set((state) => ({
        library: state.library.map(c => 
          c.id === id ? { ...c, playCount: c.playCount + 1 } : c
        )
      })),
      setNowPlayingId: (id) => set({ nowPlayingId: id })
    }),
    {
      name: 'vandana-vibes-chanting',
    }
  )
);

// ============================================================
// PLANNER STORE (Visual Timetable Blocks)
// ============================================================

export type BlockColor = "purple" | "orange" | "green" | "pink" | "blue" | "yellow";
export type SessionStatus = "complete" | "half" | "nothing" | "none";

export interface StudyBlock {
  id: string;
  taskId?: string;
  title: string;
  topic: string;
  day: string;
  dayShort: string;
  startHour: number;
  endHour: number;
  color: BlockColor;
  completed?: boolean;
  sessionStatus?: SessionStatus;
  startedAt?: number; 
  lastStartedAt?: number | null;
  totalStudiedMs?: number;
  breakCount?: number;
}

interface PlannerState {
  blocks: StudyBlock[];
  setBlocks: (blocks: StudyBlock[] | ((prev: StudyBlock[]) => StudyBlock[])) => void;
}

export const usePlannerStore = create<PlannerState>()(
  persist(
    (set) => ({
      blocks: [],
      setBlocks: (updater) => set((state) => ({
        blocks: typeof updater === "function" ? updater(state.blocks) : updater
      })),
    }),
    {
      name: 'vandana-vibes-planner-v2',
    }
  )
);

export const formatDurationFriendly = (minutes: number, isOpenAllowed = false): string => {
  if (isOpenAllowed && minutes === 0) return 'Open';
  if (minutes === 0) return '0m';
  const totalSecs = Math.round(minutes * 60);
  return formatSecondsFriendly(totalSecs);
};

export const formatSecondsFriendly = (totalSecs: number): string => {
  if (totalSecs === 0) return '0s';
  const h = Math.floor(totalSecs / 3600);
  const m = Math.floor((totalSecs % 3600) / 60);
  const s = totalSecs % 60;
  
  const parts = [];
  if (h > 0) parts.push(h + 'h');
  if (m > 0) parts.push(m + 'm');
  if (s > 0 || parts.length === 0) parts.push(s + 's');
  
  return parts.join(' ');
};

