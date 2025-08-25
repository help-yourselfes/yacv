import BoardButton from "../components/SideBar/BoardButton";
import api from "../logic/api/api";
import useBoardStore from "../logic/stores/BoardStore";
import { useEffect } from "react";
import useSiteStore from "../logic/stores/SiteStore";
import { Link, useParams } from "react-router-dom";
import { ErrorBox } from "../components/primitives/ErrorBox/ErrorBox";


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
            </> : <>
                <ErrorBox msg={`There is no acces to that site`} />
                <Link to='/'>Back to main page</Link>
            </>
            }
        </div>
    )
}

export default BoardListPage;