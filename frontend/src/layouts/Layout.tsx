import React from "react";
import { useParams } from "react-router-dom";
import SideBar from "../components/SideBar/SideBar";
import MediaOverlay from "../components/Media/MediaOverlay";

const MemoizedSideBar = React.memo(SideBar);

function Layout({ children }: { children: React.ReactNode }) {
    const params = useParams();

    const showSideBar = params.threadId || params.boardId;

    return (
        <div className="app-wrapper">
            {showSideBar && <MemoizedSideBar />}
            <MediaOverlay />
            <main>{children}</main>
        </div>
    );
}

export default Layout;
