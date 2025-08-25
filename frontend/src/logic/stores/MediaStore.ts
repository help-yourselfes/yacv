import { create } from "zustand";
import type { MediaData } from "../../../../shared/types";

interface MediaStore {
    mediaList: MediaData[];
    activeMedia: MediaData | null;
    show: (media: MediaData) => void;
    hide: (media: MediaData) => void;
    setActiveMedia: (media: MediaData) => void;
    clear: () => void;
}

const useMediaStore = create<MediaStore>((set) => ({
    mediaList: [],
    activeMedia: null,
    show: (media) => set((state) => {
        if (state.mediaList.find(m => m.timestamp === media.timestamp)) return state;
        return { mediaList: [...state.mediaList, media] };
    })
    ,
    hide: (media) => set((state) => ({
        mediaList: state.mediaList.filter(m => m !== media),
        activeMediaId: state.activeMedia === media ? null : state.activeMedia,
    }))
    ,
    setActiveMedia: (media) => set({
        activeMedia: media
    })
    ,
    clear: () => set({
        mediaList: [],
        activeMedia: null
    })
    ,
}));

export default useMediaStore