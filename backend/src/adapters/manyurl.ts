import { BoardData, MediaData, ReplyData, ThreadData } from "../../../shared/types";
import { Adapter } from "./types";
export default function manyUrlAdapter(url: string): Adapter {
    return {
        url,
        fetchBoards() {
            return new Promise(res => {
                res([{ id: 'a', name: '/a/', nsfw: false }, { id: 'b', name: '/b/', nsfw: true }])
            })
        },
        fetchReplies(boardId, threadId) {
            return new Promise(res => res({
                thread: {
                    caption: `Thread: ${threadId}`,
                    author: 'OP',
                    date: '01.02.2003',
                    time: '12:34:56',
                    id: threadId,
                    media: [], text: `Thread text to a ${boardId} board.`
                },
                replies: [
                    {
                        id: 0,
                        author: 'Anon',
                        date: '02.02.2003',
                        time: '12:34:56',
                        media: [], text: 'Reply'
                    }
                ]
            }))
        },
        fetchThreads(boardId) {
            return new Promise(res => res([
                {
                    caption: `Thread: 12345678`,
                    author: 'OP',
                    date: '01.02.2003',
                    time: '12:34:56',
                    id: 12345678,
                    media: [], text: `Thread text to a ${boardId} board.`
                }
            ]))
        },
    }
}