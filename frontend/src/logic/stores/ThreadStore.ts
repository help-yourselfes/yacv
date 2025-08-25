import { create } from 'zustand';
import type { ThreadData } from '../../../../shared/types';

interface ThreadStore {
    currentThread: ThreadData | null;
    list: Record<number, ThreadData>;
    order: number[];
    loading: boolean;
    error: string | null;
    setCurrentThread: (thread: ThreadData) => void
    setThreads: (list: ThreadData[]) => void;
    clear: () => void
}

const useThreadStore = create<ThreadStore>((set, get) => ({
    currentThread: null,
    list: {},
    order: [],
    loading: false,
    error: null,
    setCurrentThread(thread) {
        set({ currentThread: thread })
    },
    setThreads: (list) => {
        set({list})
    },
     clear: () => {
        set({list: {}, order: [], currentThread: null})
    }
}))

export default useThreadStore;