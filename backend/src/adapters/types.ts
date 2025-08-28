import { BoardData, PostData } from '../../../shared/types';

export interface Adapter {
    url: string,
    fetchBoards: () => Promise<BoardData[]>; // Fetches an array of BoardData
    fetchThreads: (boardId: string) => Promise<PostData[]>; // Fetches an array of ThreadData for a specific board
    fetchReplies: (boardId: string, threadId: number) => Promise<{
        thread: PostData; // Returns the thread data
        replies: PostData[]; // Returns an array of ReplyData
    }>;
}
