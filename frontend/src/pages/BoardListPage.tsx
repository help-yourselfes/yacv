import BoardButton from "../components/SideBar/BoardButton";
import api from "../logic/api/api";
import useBoardStore from "../logic/stores/BoardStore";
import { useEffect } from "react";
import useSiteStore from "../logic/stores/SiteStore";
import { Link } from "react-router-dom";
import { ErrorBox } from "../components/primitives/ErrorBox/ErrorBox";
import { SiteIcon } from "../components/Site/SiteIcon";
import { wordCounter as wC } from "../logic/etc/english";


function BoardListPage() {
    const boardStore = useBoardStore();
    const site = useSiteStore(state => state.current);

    useEffect(() => {
        if (!boardStore.order.length) {
            api.fetchBoards();
        }
    }, [])

    const boardCount = {
        total: boardStore.order.length,
        nswf: 0,
        swf: 0,
    };


    boardStore.order.forEach(id => { if (boardStore.list[id].nswf) boardCount.nswf++ });
    boardCount.swf = boardCount.total - boardCount.nswf;
    return (
        <div>
            {site ? <>
                <div className="site board-count">
                    <SiteIcon pictureUrl={site.pictureUrl} />
                    <div className="">
                        <p>There is {wC(boardCount.total, 'board')}</p>
                        <p>
                            <span className="swf count">{boardCount.swf}</span> SFW, {' '}
                            <span className="nswf count">{boardCount.nswf}</span> NSFW
                        </p>
                    </div>
                </div>

                Select board:
                {
                    boardStore.order.map(id => {
                        const board = boardStore.list[id];
                        return <BoardButton key={board.id} siteId={site.id} board={board} selected={false} />
                    })
                }
            </> : <>
                <ErrorBox msg={`There is no access to that site`} />
                <Link to='/'>Back to the main page</Link>
            </>
            }
        </div>
    )
}

export default BoardListPage;