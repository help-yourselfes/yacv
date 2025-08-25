import { create } from 'zustand';
import type { SiteData } from '../../../../shared/types';

interface SiteStore {
    list: Record<string, SiteData>;
    current: SiteData | null;
    order: string[];
    loading: boolean;
    error: string | null;
    setCurrent: (id: string) => void
    setList: (list: SiteData[]) => void
}

const useSiteStore = create<SiteStore>((set, get) => ({
    list: {},
    order: [],
    loading: false,
    error: null,
    current: null,
    setCurrent(id) {
        const site: SiteData = get().list[id];
        set({current: site})
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