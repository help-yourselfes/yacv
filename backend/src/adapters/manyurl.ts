import { BoardData, MediaData, ReplyData, ThreadData } from "../../../shared/types";
import { Adapter } from "./types";
export default function manyUrlAdapter(url: string): Adapter {
    return {
        url,
        fetchBoards() {
            return new Promise(res => {
                res([{ id: 'a' }, { id: 'b' }])
            })
        },
        fetchReplies(boardId, threadId) {
            return new Promise(res => res({
                thread: {
                    caption: `Thread: ${threadId}`,
                    id: threadId,
                    media: [], text: `Thread text to a ${boardId} board.`
                }, 
                replies: [
                    {id: 0,media:[],text: 'Reply'}
                ]
            }))
        },
        fetchThreads(boardId) {
            return new Promise(res => res([
                {caption: 'Thread', id:0, media:[], text:'Text'}
            ]))
        },
    }
}