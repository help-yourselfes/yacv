import { create } from 'zustand';
import type { ThreadData } from '../api/types';
import api from '../api/api';

interface ThreadStore {
    currentThread: ThreadData | null;
    list: Record<number, ThreadData>;
    order: number[];
    loading: boolean;
    error: string | null;
    setCurrentThread: (thread: ThreadData) => void
    setThreads: (list: ThreadData[]) => void;
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
    }
}))

export default useThreadStore;