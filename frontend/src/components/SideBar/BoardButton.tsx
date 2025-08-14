import type React from "react";
import type { BoardData } from "../../../../shared/types";

interface BoardButtonProps {
    selected: boolean;
    board: BoardData;
}

const BoardButton: React.FC<BoardButtonProps> = ({selected, board}) => {

    return (
        <li>
            <a className={selected ? 'selected' : ''} href={`/view/${board.id}`}>
            {board.id}
            </a>
        </li>
    )
}

export default BoardButton;