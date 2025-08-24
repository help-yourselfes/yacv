import { useEffect } from "react";
import useBoardStore from "../../logic/stores/BoardStore"
import BoardButton from "./BoardButton";
import api from "../../logic/api/api";
import Spinner from "../primitives/Loader/Spinner";
import useSiteStore from "../../logic/stores/SiteStore";
import { useParams } from "react-router-dom";


function SideBar() {
    const params = useParams();
    const siteId: string | undefined = params.siteId;
    const { list, order, currentId, error, loading } = useBoardStore();
    const site = siteId ? useSiteStore().list[siteId] : null;

    useEffect(() => {
        if (!order.length) {
            api.fetchBoards();
        }
    }, [order.length])

    return (
        <div className="side-bar"> {siteId && site && <>

            <div>
                <img src={site.pictureUrl} />
                <span>{site.name}</span>
            </div>


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
                                    siteId={siteId}
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