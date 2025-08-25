import { useEffect } from "react";
import useBoardStore from "../../logic/stores/BoardStore"
import BoardButton from "./BoardButton";
import api from "../../logic/api/api";
import Spinner from "../primitives/Loader/Spinner";
import useSiteStore from "../../logic/stores/SiteStore";
import { SiteIcon } from "../Site/SiteIcon";
import { Link } from "react-router-dom";


function SideBar() {
    const { list, order, currentId, error, loading } = useBoardStore();
    const site = useSiteStore(state => state.current);
    useEffect(() => {
        if (!order.length) {
            api.fetchBoards();
        }
    }, [])

    return (
        <div className="side-bar"> {site && <>

            <Link to='/'>
                <SiteIcon pictureUrl={site.pictureUrl} />
                <span>{site.name}</span>
            </Link>


            {
                (loading &&
                    <Spinner key="spinner" />
                ) ||
                (error &&
                    <span className="error">error</span>
                ) ||
                (order.length &&
                    <div key="boards">
                        {order.map(boardId => {
                            const board = list[boardId];
                            return (
                                <BoardButton
                                    siteId={site.id}
                                    key={board.id}
                                    board={board}
                                    selected={board.id === currentId}
                                />
                            );
                        })}
                    </div>
                ) ||
                <li key="no-boards">No boards available.</li>
            }
        </>} </div>
    );
}

export default SideBar;