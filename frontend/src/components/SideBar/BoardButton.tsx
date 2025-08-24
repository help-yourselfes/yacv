import type React from "react";
import type { BoardData } from "../../../../shared/types";

interface BoardButtonProps {
    siteId:string,
    selected: boolean;
    board: BoardData;
}

const BoardButton: React.FC<BoardButtonProps> = ({siteId,selected, board}) => {

    return (
        <li>
            <a className={selected ? 'selected' : ''} href={`/view/${siteId}/${board.id}`}>
            {board.id}
            </a>
        </li>
    )
}

export default BoardButton;