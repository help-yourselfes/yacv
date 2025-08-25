import type React from "react";
import type { BoardData } from "../../../../shared/types";
import { Link } from "react-router-dom";

interface BoardButtonProps {
    siteId:string,
    selected: boolean;
    board: BoardData;
}

const BoardButton: React.FC<BoardButtonProps> = ({siteId,selected, board}) => {

    return (
        <li>
            <Link className={selected ? 'selected' : ''} to={`/view/${siteId}/${board.id}`}>
            {board.id}
            </Link>
        </li>
    )
}

export default BoardButton;