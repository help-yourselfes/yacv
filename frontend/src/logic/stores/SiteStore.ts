import { create } from 'zustand';
import type { SiteData } from '../../../../shared/types';

interface SiteStore {
    list: Record<string, SiteData>;
    currentId: string | null;
    order: string[];
    loading: boolean;
    error: string | null;
    setCurrent: (id: string) => void
    setList: (list: SiteData[]) => void
}

const useSiteStore = create<SiteStore>((set) => ({
    list: {},
    order: [],
    loading: false,
    error: null,
    currentId: null,
    setCurrent(id) {
        set({currentId: id})
    },
    setList(list) {
        const map: Record<string, SiteData> = {};
        const order: string[] = [];
        list.forEach((site) => {
            map[site.id] = site;
            order.push(site.id);
        });
        set({ list: map, order });
    },
}))

export default useSiteStore;