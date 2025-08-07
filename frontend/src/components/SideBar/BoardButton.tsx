import type React from "react";
import type { BoardData } from "../../logic/api/types";

interface BoardButtonProps {
    selected: boolean;
    board: BoardData;
}

const BoardButton: React.FC<BoardButtonProps> = ({selected, board}) => {
    return (
        <li>
            <a href={`/view/${board.id}`}>
            {board.id}
            </a>
        </li>
    )
}

export default BoardButton;