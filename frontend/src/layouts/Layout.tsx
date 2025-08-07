import type React from "react";
import { useLocation } from "react-router-dom";
import SideBar from "../components/SideBar/SideBar";
import MediaOverlay from "../components/Media/MediaOverlay";

function Layout({children} : {children: React.ReactNode}) {
    const location = useLocation();
    const showSideBar = !(
        location.pathname === '/' ||
        location.pathname.startsWith('/boards') ||
        location.pathname.startsWith('/error') ||
        false
    )

    return (
        <div className="app-wrapper">
            {showSideBar && <SideBar/>}
            <MediaOverlay />
            <main>{children}</main>
        </div>
    )
}

export default Layout;