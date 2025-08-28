//  >>/b/12345/12345
export type GlobalReply = {
    type: 'globalReply'
    boardId: string;
    threadId: number;
    replyId: number;
}

//  >>12345678
export type LocalReply = {
    type: 'localReply'
    replyId: number;
}

// external link
export type ExtLink = {
    type: 'extLink'
    url: string;
}

// link to attached image
export type MediaLink = {
    type: 'mediaLink'
    media: MediaData;
    caption: string;
}

export type PlainText = {
    type:'plainText'
    text: string;
}

type Reply = GlobalReply | LocalReply;


export type PostPart = PlainText | Reply | ExtLink | MediaLink;

export interface MediaData {
    id: number;
    previewUrl: string;
    fullUrl: string;
    name: string;
    timestamp: number;
    extention: string;
    dimensions: { w: number, h: number };
}

export interface PostData {
    media: MediaData[];
    caption?: string;
    content: PostPart[];
    meta: {
        id: number;     
        author: string; 
        date: string;   // dd.mm.yyyy
        time: string;   // hh:mm:ss
    },
    replies: LocalReply[];
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
