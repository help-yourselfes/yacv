import { create } from 'zustand';
import type { ReplyData, ThreadData } from '../../../../shared/types';

interface ReplyStore {
    boardId: string | null;
    threadId: number | null;
    list: Record<number, ReplyData>;
    order: number[];
    loading: boolean;
    error: string | null;
    setReplies: (list: ReplyData[]) => void;
    clear: () => void;
}

const useReplyStore = create<ReplyStore>((set) => ({
    boardId: null,
    threadId: null,
    list: {},
    order: [],
    loading: false,
    error: null,

    setReplies: (list) => {
        set({list: list})
    },

    clear: () => {
        set({list: {}, order: [], threadId: null, boardId: null})
    }
}))

export default useReplyStore;