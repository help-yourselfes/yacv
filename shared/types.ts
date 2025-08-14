export interface MediaData {
    previewUrl: string;
    fullUrl: string;
    name: string;
    timestamp: number;
    extention: string;
    dimensions: { w: number, h: number };
}

export interface ReplyData {
    id: number;
    text: string;
    media: MediaData[];
}

export interface ThreadData extends ReplyData {
    caption: string;
}

export interface BoardData {
    id: string;
}

export interface SiteData {
    id: string;
    name: string;
    url: string;
    description: string;
}
