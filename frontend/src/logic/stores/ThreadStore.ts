import { create } from 'zustand';
import type { PostData } from '../../../../shared/types';

interface ThreadStore {
    currentThread: PostData | null;
    list: Record<number, PostData>;
    order: number[];
    loading: boolean;
    error: string | null;
    setCurrentThread: (thread: PostData) => void
    setThreads: (list: PostData[]) => void;
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