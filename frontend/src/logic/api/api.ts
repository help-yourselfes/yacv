import boardStore from "../stores/BoardStore";
import replyStore from "../stores/ReplyStore";
import threadStore from "../stores/ThreadStore";
import type { BoardData, MediaData, ReplyData, ThreadData } from "./types";

export const api = {
    siteUrl: "4chan.org",
    updateSite(url: string) {
        this.siteUrl = url;
    },

    async fetchSites() {
        return {
            ok: true,
            data: [
                { url: '4chan.org', description: '4chan' }
            ]
        }
    },

    async fetchBoards() {
        const boards = [{ id: 'b' }, { id: 'a' }]
        boardStore.setState({
            list: Object.fromEntries(
                boards.map(b => [b.id, b])
            ),
            order: Array.from(
                boards.map(b => b.id)
            )
        });
    },

    async fetchThreads(boardId: string) {
        const threads = [0, 1, 2, 3, 4, 5].map(i => Thread(boardId, i));
        threadStore.setState({
            list: Object.fromEntries(
                threads.map(t => [t.id, t])
            ),
            order: Array.from(threads.map(t => t.id))
        });
    },

    async fetchReplies(boardId: string, threadId: number) {
        const replies: ReplyData[] = [
            {
                id: 0,
                text: `Hello world!
                this is ${boardId}-board and
                ${threadId}'s thread! :)`,
                media: []
            }
        ];
        replyStore.setState(state => ({
            boardId: boardId,
            threadId: threadId,
            list: Object.fromEntries(replies.map(r => [r.id, r])),
            order: Array.from(replies.map(r => r.id))
        }));
    },

    async fetchFile(url: string) {
        // ...
    },

    async update(boardId?: string, threadId?: number) {
        await this.fetchBoards();
        if (boardId) await this.fetchThreads(boardId);
        if (boardId && threadId) await this.fetchReplies(boardId, threadId);
    }
};

// ----------------------

function Thread(boardId: string, threadId: number): ThreadData {
    return {
        caption: `Thread #${threadId}`,
        id: threadId,
        media: [Image()],
        text: `This is a ${threadId}'s thread in this board! <br> Welcome to it!`
    };
}

function Image(): MediaData {
    return {
        dimensions: { w: 128, h: 128 },
        extention: 'png',
        fullUrl: '/image.png',
        name: 'image',
        previewUrl: '/preview/image.png',
        timestamp: 12345678
    };
}

export default api;
