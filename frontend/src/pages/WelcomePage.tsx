import { useEffect } from "react";
import useSiteStore from "../logic/stores/SiteStore"
import api from "../logic/api/api";
import SiteButton from "../components/Site/SiteButton";


const WelcomePage = () => {
    const siteStore = useSiteStore();
    useEffect(() => {
        api.fetchSites()
    }, []);
    return (
        <div>
            Welcome to <b>YACV!</b>
            <div>
                <div>
                    {siteStore.order.map(id => {
                        const site = siteStore.list[id]
                        return (
                            <SiteButton site={site} key={site.id}/>
                        )
                    })}
                </div>
                <a href="/boards/">Список борд</a>
            </div>
        </div>
    )
}

export default WelcomePage