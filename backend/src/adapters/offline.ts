import { BoardData, MediaData, PostData, PostPart } from "../../../shared/types";
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
        return new Promise<PostData[]>(resolve =>
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
    return { id, name: `/${id}/`, nsfw: Math.random() > 0.5 }
}

function generateThread(boardId: string, id: number): PostData {
    return { ...generateReply(id, id), caption: 'Caption' }
}

function generateReply(threadId: number, id: number): PostData {
    return {
        meta: {
            id, author: 'Anon', date: '01.02.2003', time: '12:34:56',

        },
        content: [generateText(100)],
        media: array(8).map(v => generateMedia(v)),
        replies: []
    }
}

function generateText(length: number): PostPart {
    const pieces = ['A very long time ago, ', 'Hello everyoue', 'ADWADAWXADAWDASDWA', 'this week', 'generated text'];
    let result = '';
    array(length).forEach(v => result += choose(pieces) + ' ');
    return { type: 'plainText', text: result };
}

function generateMedia(id: number): MediaData {
    return choose([
        {
            dimensions: {
                w: 7680,
                h: 4320
            },
            extention: 'jpg',
            fullUrl: '/images/full/example.jpg',
            id,
            name: 'example',
            previewUrl: '/images/preview/example.jpg',
            timestamp: randInt(99999999)
        },
        {
            dimensions: {
                w: 1000,
                h: 1000
            },
            extention: 'png',
            fullUrl: '/images/full/image placeholder.png',
            id,
            name: 'image placeholder',
            previewUrl: '/images/preview/image placeholder.jpg',
            timestamp: randInt(99999999)
        }
    ])
}

function randInt(to: number) {
    return Math.floor(Math.random() * to)
}

function choose<T>(arr: Array<T>) {
    return arr[randInt(arr.length)]
}

function array(length: number) {
    const arr = new Array(randInt(length - 1) + 1);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = i;
    }
    return arr;
}