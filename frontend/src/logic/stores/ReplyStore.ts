import { create } from 'zustand';
import type { ReplyData, ThreadData } from '../../../../shared/types';
import api from '../api/api';

interface ReplyStore {
    boardId: string | null;
    threadId: number | null;
    list: Record<number, ReplyData>;
    order: number[];
    loading: boolean;
    error: string | null;
    setReplies: (list: ReplyData[]) => void;
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
    }
}))

export default useReplyStore;