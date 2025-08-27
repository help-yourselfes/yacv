//  >>/b/12345/12345
type GlobalReply = {
    boardId: string;
    threadId: number;
    replyId: number;
}

//  >>12345678
type LocalReply = {
    replyId: number;
}

// external link
type ExtLink = {
    url: string;
}

// link to attached image
type MediaLink = {
    id: number;
    caption: string;
}

type PostPart = string | LocalReply | GlobalReply | ExtLink | MediaLink;

export interface PostContent {
    parts: PostPart[];

    // not-today implementation
}

export interface MediaData {
    id: number;
    previewUrl: string;
    fullUrl: string;
    name: string;
    timestamp: number;
    extention: string;
    dimensions: { w: number, h: number };
}

export interface ReplyData {
    id: number;
    author: string;
    date: string; // dd.mm.yyyy
    time: string; // hh:mm:ss
    text: string;
    media: MediaData[];
}

export interface ThreadData extends ReplyData {
    caption: string;
}

export interface BoardData {
    id: string; // name without '/'
    name: string;
    nsfw: boolean;
}

export interface SiteData {
    id: string;
    name: string;
    url: string;
    pictureUrl: string,
    description: string;
}
