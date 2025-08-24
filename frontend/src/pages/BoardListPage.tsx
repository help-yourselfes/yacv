import BoardButton from "../components/SideBar/BoardButton";
import api from "../logic/api/api";
import useBoardStore from "../logic/stores/BoardStore";
import { useEffect } from "react";
import useSiteStore from "../logic/stores/SiteStore";
import { useParams } from "react-router-dom";


function BoardListPage() {
    const params = useParams();
    const siteId: string | undefined = params.siteId;

    const boardStore = useBoardStore();
    const siteStore = useSiteStore();

    const site = siteId ? siteStore.list[siteId] : null;
    
    useEffect(() => {
        if (!siteStore.order.length) {
            api.fetchSites();
        }
    }, [])

    useEffect(() => {
        if (!boardStore.order.length) {
            api.fetchBoards();
        }
    }, [])


    return (
        <div>
            {site ? <>
                Select board:
                {
                    boardStore.order.map(id => {
                        const board = boardStore.list[id];
                        return <BoardButton key={board.id} siteId={site.id} board={board} selected={false} />
                    })
                }
            </> :
                <span>No site</span>}
        </div>
    )
}

export default BoardListPage;