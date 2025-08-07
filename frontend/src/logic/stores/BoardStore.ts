import { create } from 'zustand';
import type { BoardData } from '../api/types';

interface BoardStore {
    list: Record<string, BoardData>;
    order: string[];
    currentId: string | null;
    loading: boolean;
    error: string | null;

    setList: (list: BoardData[]) => void;
    setCurrentId: (id: string) => void;
}

const useBoardStore = create<BoardStore>((set) => ({
    list: {},
    order: [],
    currentId: null,
    loading: false,
    error: null,

    setList: (list) => {
        const map: Record<string, BoardData> = {};
        const order: string[] = [];
        list.forEach((board) => {
            map[board.id] = board;
            order.push(board.id);
        });
        set({ list: map, order });
    },

    setCurrentId: (id) => set({ currentId: id }),
}));

export default useBoardStore;
