import { BoardData, MediaData, ReplyData, ThreadData } from "../../../shared/types";
import { Adapter } from "./types";
export const offlineAdapter: Adapter = {
    url: 'offline',
    async fetchBoards() {
        return new Promise<BoardData[]>(resolve => {
            setTimeout(() => {
                resolve(['a', 'b', 'r', 't', 'asx'].map(id =>
                    generateBoard(id)
                ))
            }, 500
            )
        });
    },
    async fetchThreads(boardId) {
        return new Promise<ThreadData[]>(resolve =>
            setTimeout(() => {

                resolve(array(25).map(v => generateThread(boardId, v)))
            }, 500)
        )
    },
    async fetchReplies(boardId, threadId) {
        return new Promise(res =>
            setTimeout(() => {
                res({
                    thread: generateThread(boardId, threadId),
                    replies: array(45).map(v => generateReply(threadId, v))
                })
            }, 500)
        )
    }
}

function generateBoard(id: string): BoardData {
    return { id }
}

function generateThread(boardId: string, id: number): ThreadData {
    return {
        id,
        caption: `Thread number ${id}`,
        media: [1, 2, 3, 4].map(() => generateMedia()),
        text: generateText(12)
    }
}

function generateReply(threadId: number, id: number): ReplyData {
    return {
        id,
        text: generateText(12),
        media: array(4).map(_ => generateMedia())
    }
}

function generateText(length: number) {
    const pieces = ['A very long time ago, ', 'Hello everyoue', 'ADWADAWXADAWDASDWA', 'this week', 'generated text'];
    let result = '';
    array(length).forEach(v => result += choose(pieces) + ' ');
    return result;
}

function generateMedia(): MediaData {
    const ext = choose(['png', 'jpeg', 'bmp']);
    const name = choose(['cat', 'dog', 'image', 'picture', 'untitled']);

    return {
        dimensions: { w: 128, h: 256 },
        extention: ext,
        name,
        fullUrl: `/api/images/${name}.jpg`,
        previewUrl: `/api/images/${name}s.jpg`,
        timestamp: randInt(99999999)
    }
}

function randInt(to: number) {
    return Math.floor(Math.random() * to)
}

function choose(arr: Array<any>) {
    return arr[randInt(arr.length)]
}

function array(length: number) {
    const arr = new Array(randInt(length));
    for (let i = 0; i < arr.length; i++) {
        arr[i] = i;
    }
    return arr;
}