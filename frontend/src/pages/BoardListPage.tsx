import BoardButton from "../components/SideBar/BoardButton";
import api from "../logic/api/api";
import useBoardStore from "../logic/stores/BoardStore";
import { useEffect } from "react";


function BoardListPage() {
    const boardStore = useBoardStore();


    useEffect(() => {
        if (!boardStore.order.length) {
            api.fetchBoards();
        }
    }, [])

    return (
        <div>
            Select board:
            {
                boardStore.order.map(id => {
                    const board = boardStore.list[id];
                    return <BoardButton key={board.id} board={board} selected={false} />
                })
            }
        </div>
    )
}

export default BoardListPage;