import { useNavigate, useParams } from "react-router-dom";
import useReplyStore from "../logic/stores/ReplyStore";
import useThreadStore from "../logic/stores/ThreadStore";
import { useEffect } from "react";
import Reply from "../components/Reply/Reply";
import Thread from "../components/Thread/Thread";
import api from "../logic/api/api";



function ThreadPage() {
    const store = useReplyStore();
    const params = useParams();
    const boardId: string | undefined = params.boardId;
    const threadId: number = Number(params.threadId);

    const threadRef = useThreadStore().list[threadId];

    const navigate = useNavigate();

    useEffect(() => {
        if (!boardId || isNaN(threadId)) return;

        if (!store.threadId) {
            api.fetchReplies(boardId, threadId);
        }

    }, [])
    useEffect(() => {
        if (!boardId) return;
        if (!threadRef) {
            api.fetchThreads(boardId);
        }
    }, [])

    return (
        <div>
            This is thread page. <button onClick={() => navigate(-1)}>Back to <b>{boardId}</b></button>
            <br />
            {boardId} :: {threadId}
            <Thread thread={threadRef} link="" />

            {
                store.order.map(id => {
                    const reply = store.list[id];
                    return <Reply key={id} reply={reply} />
                })
            }
        </div>
    )
}

export default ThreadPage;