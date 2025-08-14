import { Link, useParams } from "react-router-dom";
import useThreadStore from "../logic/stores/ThreadStore";
import { useEffect } from "react";
import useBoardStore from "../logic/stores/BoardStore";
import Thread from "../components/Thread/Thread";
import api from "../logic/api/api";


function BoardPage() {
    const params = useParams();
    const boardId = params.boardId;
    const BoardStore = useBoardStore();
    const current = BoardStore.currentId ? BoardStore.list[BoardStore.currentId] : null;
    const threadStore = useThreadStore();

    useEffect(() => {
        if (!boardId) return
        if (!current) {
            api.fetchBoards().then(() => {
                BoardStore.setCurrentId(boardId);
            });

        };
        api.fetchThreads(boardId);
    }, [])

    if (threadStore.loading) return <p>Loading...</p>
    if (threadStore.error) return <p>Error: {threadStore.error}</p>

    return (
        <div>
            {current && <div>
                <h1>{current.id}</h1>
            </div>
            }
            {
                threadStore.order.map(id => {
                    const thread = threadStore.list[id]
                    return <Thread
                        key={id}
                        thread={thread}
                        link={`/view/${boardId}/${id}`}
                    />
                }

                )
            }
        </div>
    )
}

export default BoardPage;