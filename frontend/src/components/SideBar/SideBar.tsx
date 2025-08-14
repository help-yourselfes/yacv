import { useEffect } from "react";
import useBoardStore from "../../logic/stores/BoardStore"
import BoardButton from "./BoardButton";
import api from "../../logic/api/api";



function SideBar() {

    const { list, order, currentId, error, loading, setCurrentId } = useBoardStore();

    useEffect(() => {
        if (!order) {
            api.fetchBoards();
        }
    }, [order])

    return (
        <ul>{
            order.map(boardId => {
                const board = list[boardId];
                return <BoardButton
                    key={board.id}
                    board={board}
                    selected={board.id === currentId}
                />})

        }</ul>
    )
}

export default SideBar;