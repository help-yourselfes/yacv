import { BoardData, ReplyData, SiteData, ThreadData } from '../../../shared/types';

export interface Adapter {
    site: SiteData;
    fetchBoards: () => Promise<BoardData[]>; // Fetches an array of BoardData
    fetchThreads: (boardId: string) => Promise<ThreadData[]>; // Fetches an array of ThreadData for a specific board
    fetchReplies: (boardId: string, threadId: number) => Promise<{
        thread: ThreadData; // Returns the thread data
        replies: ReplyData[]; // Returns an array of ReplyData
    }>;
}
