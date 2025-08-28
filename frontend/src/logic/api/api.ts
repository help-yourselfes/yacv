import boardStore from "../stores/BoardStore";
import replyStore from "../stores/ReplyStore";
import threadStore from "../stores/ThreadStore";
import siteStore from "../stores/SiteStore"
import type { BoardData, PostData, SiteData} from "../../../../shared/types";

export const api = {
    siteId: "",
    apiFetch: '',
    updateSite(id: string) {
        const store = siteStore;
        console.log('update site')

        this.siteId = id;
        this.apiFetch = `/api/fetch/${this.siteId}`
        const site = store.getState().list[id];
        store.setState({ current: site })
        boardStore.getState().clear()
        threadStore.getState().clear()
        replyStore.getState().clear()
    },

    async fetchSites() {
        const store = siteStore;
        const url = '/api/sites';
        console.log('fetch sites. url: ', url)
        store.setState({ error: null, loading: true })
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            const data = await response.json();
            const sites: SiteData[] = data.sites;
            store.setState({
                list: Object.fromEntries(
                    sites.map(s => [s.id, s])
                ),
                order: Array.from(
                    sites.map(b => b.id)
                )
            })

        } catch (error) {
            console.error('Error fetching sites:', error);
            if (error instanceof Error) {
                store.setState({ error: error.message })

            }
        } finally {
            store.setState({ loading: false })
        }
    },
    async fetchBoards() {
        const store = boardStore;
        const url = this.apiFetch + '/boards';
        console.log('fetch boards. url: ', url)
        store.setState({ error: null, loading: true })

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }

            const data = await response.json();
            const boards: BoardData[] = data.boards;

            store.setState({
                list: Object.fromEntries(
                    boards.map(b => [b.id, b])
                ),
                order: Array.from(
                    boards.map(b => b.id)
                )
            });
        } catch (error) {
            console.error('Error fetching boards:', error);
            if (error instanceof Error) {
                store.setState({ error: error.message })
            }
        } finally {
            store.setState({ loading: false })
        }
    },

    async fetchThreads(boardId: string) {
        const store = threadStore;
        const url = `${this.apiFetch}/view/${boardId}`;
        console.log('fetch threads. url: ',url)
        store.setState({ error: null, loading: true })

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }

            const data = await response.json();
            const threads: PostData[] = data.threads;

            store.setState({
                list: Object.fromEntries(
                    threads.map(t => [t.meta.id, t])
                ),
                order: Array.from(threads.map(t => t.meta.id))
            });
        } catch (error) {
            console.error('Error fetching threads:', error);
            if (error instanceof Error) {
                store.setState({ error: error.message })
            }
        } finally {
            store.setState({ loading: false })
        }
    },


    async fetchReplies(boardId: string, threadId: number) {
        const store = replyStore;
        const url =`${this.apiFetch}/view/${boardId}/${threadId}`;
        console.log('fetch replies. url: ', url)
        store.setState({ error: null, loading: true })

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }

            const data = await response.json();
            const replies: PostData[] = data.replies;
            store.setState({
                boardId: boardId,
                threadId: threadId,
                list: Object.fromEntries(replies.map(r => [r.meta.id, r])),
                order: Array.from(replies.map(r => r.meta.id))
            });
        } catch (error) {
            console.error('Error fetching replies:', error);
            if (error instanceof Error) {
                store.setState({ error: error.message })
            }
        } finally {
            store.setState({ loading: false })
        }
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

export default api;
