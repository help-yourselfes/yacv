import boardStore from "../stores/BoardStore";
import replyStore from "../stores/ReplyStore";
import threadStore from "../stores/ThreadStore";
import siteStore from "../stores/SiteStore"
import type { BoardData, ReplyData, SiteData, ThreadData } from "../../../../shared/types";

export const api = {
    siteId: "offline",
    apiFetch: '/api/fetch/offline',
    updateSite(id: string) {
        console.log('update site')
        this.siteId = id;
        this.apiFetch = `/api/fetch/${this.siteId}`
    },

    async fetchSites() {
        const store = siteStore;
        console.log('fetch sites')
        store.setState({ error: null, loading: true })
        try {
            const response = await fetch('/api/sites');
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            const data = await response.json();
            const sites: SiteData[] = data.sites;
            console.log(sites)
            store.setState({
                list: Object.fromEntries(
                    sites.map(s => [s.id, s])
                ),
                order: Array.from(
                    sites.map(b => b.id)
                ),
                currentId: sites[0].id
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
        console.log('fetch boards')
        try {
            const response = await fetch(this.apiFetch + '/boards');
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
        console.log('fetch threads')
        try {
            const response = await fetch(`${this.apiFetch}/view/${boardId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }

            const data = await response.json();
            const threads: ThreadData[] = data.threads;

            store.setState({
                list: Object.fromEntries(
                    threads.map(t => [t.id, t])
                ),
                order: Array.from(threads.map(t => t.id))
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
        console.log('fetch replies')
        try {
            const response = await fetch(`${this.apiFetch}/view/${boardId}/${threadId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }

            const data = await response.json();
            const replies: ReplyData[] = data.replies;
            store.setState(state => ({
                boardId: boardId,
                threadId: threadId,
                list: Object.fromEntries(replies.map(r => [r.id, r])),
                order: Array.from(replies.map(r => r.id))
            }));
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
