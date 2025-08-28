import { BoardData, MediaData, PostData } from "../../../shared/types";
import { Adapter } from "./types";
export default function manyUrlAdapter(url: string): Adapter {
    return {
        url,
        fetchBoards() {
            return new Promise(res => setTimeout(() => {
                res([{ id: 'a', name: '/a/', nsfw: false }, { id: 'b', name: '/b/', nsfw: true }])
            }, 500))
        },
        fetchReplies(boardId, threadId) {
            return new Promise(res => setTimeout(() => res({
                thread: {
                    caption: `Thread: ${threadId}`,
                    meta: {
                        author: 'OP',
                        date: '01.02.2003',
                        time: '12:34:56',
                        id: threadId,
                    },
                    content: [{ type: "plainText", text: `Thread text to a ${boardId} board.` }],
                    media: [],
                    replies: []
                },
                replies: [
                    {
                        meta: {
                            id: 0,
                            author: 'Anon',
                            date: '02.02.2003',
                            time: '12:34:56',
                        },

                        content: [{ type: "plainText", text: 'Reply' }],
                        replies: [],
                        media: []
                    }
                ]
            }), 500))
        },
        fetchThreads(boardId) {
            return new Promise(res => setTimeout(() => res([
                {
                    meta: {
                        author: 'OP',
                        date: '01.02.2003',
                        time: '12:34:56',
                        id: 12345678,
                    },
                    caption: `Thread: 12345678`,
                    content: [{ type: "plainText", text: `Thread text to a ${boardId} board.` }],
                    media: [], replies: []
                }
            ]), 500))
        },
    }
}