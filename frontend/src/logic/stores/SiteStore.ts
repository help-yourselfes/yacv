import { create } from 'zustand';
import api from '../api/api';
import type { SiteData } from '../api/types';

interface SiteStore {
    sites: SiteData[];
    currentSite: SiteData | null;
    loading: boolean;
    error: string | null;
    setCurrentSite: (site: SiteData) => void
    update: () => Promise<void>
}

const useSiteStore = create<SiteStore>((set) => ({
    sites: [],
    currentSite: null,
    loading: false,
    error: null,
    setCurrentSite(site) {
        set({ currentSite: site })
    },
    update: async () => {
        set({ loading: true, error: null });

        try {
            const res = await api.fetchSites()
            if (!res.ok) throw new Error('Failed to fetch boards')
            const sites: SiteData[] = res.data;

            set({
                sites,
                loading: false,
                error: null
            })
        } catch (err) {
            set({
                sites: [],
                loading: false,
                error: (err as Error).message
            })
        }
    }
}))

export default useSiteStore;