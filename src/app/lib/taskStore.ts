import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { usePlannerStore, useStudySessionStore, useTimerStore } from './store';

export type Priority = "Hard" | "Medium" | "Low";
export type Recurrence = "None" | "Daily" | "Weekly" | "Alternate" | "Specific";

export interface Subject {
  id: string;
  name: string;
  color: string;
}

export interface Topic {
  id: string;
  subjectId: string;
  name: string;
}

export interface TaskItem {
  id: string;
  topicId: string;
  name: string;
  priority: Priority;
  recurrence: Recurrence;
  specificDate?: string;
  estimatedMinutes: number;
  completed: boolean;
  createdAt: number;
  completedAt?: number;
}

interface TaskStoreState {
  subjects: Subject[];
  topics: Topic[];
  tasks: TaskItem[];

  addSubject: (name: string, color: string) => void;
  updateSubject: (id: string, name: string, color: string) => void;
  deleteSubject: (id: string) => void;

  addTopic: (subjectId: string, name: string) => void;
  updateTopic: (id: string, name: string) => void;
  deleteTopic: (id: string) => void;

  addTask: (topicId: string, task: Omit<TaskItem, "id" | "createdAt" | "completed">) => void;
  updateTask: (id: string, updates: Partial<TaskItem>) => void;
  deleteTask: (id: string) => void;
  toggleTaskCompletion: (id: string) => void;
  clearAll: () => void;
}

export const useTaskStore = create<TaskStoreState>()(
  persist(
    (set, get) => ({
      subjects: [],
      topics: [],
      tasks: [],

      addSubject: (name, color) => set((state) => ({
        subjects: [...state.subjects, { id: `subj-${Date.now()}`, name, color }]
      })),

      updateSubject: (id, name, color) => set((state) => ({
        subjects: state.subjects.map(s => s.id === id ? { ...s, name, color } : s)
      })),

      deleteSubject: (id) => {
        const deletedTaskIds = get().tasks
          .filter((task) => {
            const topic = get().topics.find((item) => item.id === task.topicId);
            return task.topicId === id || topic?.subjectId === id;
          })
          .map((task) => task.id);
        useStudySessionStore.getState().deleteSessionsBySubject(id);
        deletedTaskIds.forEach((taskId) => useStudySessionStore.getState().deleteSessionsByTask(taskId));
        usePlannerStore.getState().setBlocks((blocks) =>
          blocks.filter((block) => !block.taskId || !deletedTaskIds.includes(block.taskId))
        );
        set((state) => ({
          subjects: state.subjects.filter(s => s.id !== id),
          topics: state.topics.filter(t => t.subjectId !== id),
          tasks: state.tasks.filter(task => {
            const topic = state.topics.find(t => t.id === task.topicId);
            return topic?.subjectId !== id && task.topicId !== id;
          })
        }));
      },

      addTopic: (subjectId, name) => set((state) => ({
        topics: [...state.topics, { id: `topic-${Date.now()}`, subjectId, name }]
      })),

      updateTopic: (id, name) => set((state) => ({
        topics: state.topics.map(t => t.id === id ? { ...t, name } : t)
      })),

      deleteTopic: (id) => {
        const deletedTaskIds = get().tasks
          .filter((task) => task.topicId === id)
          .map((task) => task.id);
        deletedTaskIds.forEach((taskId) => useStudySessionStore.getState().deleteSessionsByTask(taskId));
        usePlannerStore.getState().setBlocks((blocks) =>
          blocks.filter((block) => !block.taskId || !deletedTaskIds.includes(block.taskId))
        );
        set((state) => ({
          topics: state.topics.filter(t => t.id !== id),
          tasks: state.tasks.filter(task => task.topicId !== id)
        }));
      },

      addTask: (topicId, task) => set((state) => ({
        tasks: [
          ...state.tasks, 
          { 
            ...task, 
            id: `task-${Date.now()}`, 
            topicId, 
            createdAt: Date.now(), 
            completed: false 
          }
        ]
      })),

      updateTask: (id, updates) => set((state) => ({
        tasks: state.tasks.map(t => t.id === id ? { ...t, ...updates } : t)
      })),

      deleteTask: (id) => {
        useStudySessionStore.getState().deleteSessionsByTask(id);
        usePlannerStore.getState().setBlocks((blocks) =>
          blocks.filter((block) => block.taskId !== id)
        );
        set((state) => ({
          tasks: state.tasks.filter(t => t.id !== id)
        }));
      },

      toggleTaskCompletion: (id) => set((state) => {
        const task = state.tasks.find(t => t.id === id);
        if (!task) return state;

        // Auto-stop global timer if completing the active task
        if (!task.completed) {
          const { taskId: activeTaskId, finishTimer } = useTimerStore.getState();
          if (activeTaskId === id) {
            finishTimer();
          }
        }

        if (task.recurrence === "Daily" && !task.completed) {
            // Keep the task for tomorrow, but mark it complete for today.
            // A better way is to update a 'lastCompletedAt' field, but since that doesn't exist,
            // we will just complete it.
            // Wait, to keep it daily, we just mark it complete, and the UI will reset it next day.
            // Actually, the UI usually resets daily tasks if completedAt is from a previous day.
        }
        return {
          tasks: state.tasks.map(t => 
            t.id === id ? { ...t, completed: !t.completed, completedAt: !t.completed ? Date.now() : undefined } : t
          )
        };
      }),

      clearAll: () => set({ subjects: [], topics: [], tasks: [] }),
    }),
    {
      name: 'vandana-vibes-tasks-v2',
    }
  )
);
