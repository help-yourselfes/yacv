import { useEffect } from "react";
import useSiteStore from "../logic/stores/SiteStore"
import api from "../logic/api/api";
import SiteButton from "../components/Site/SiteButton";
import { SiteIcon } from "../components/primitives/SiteIcon/SiteIcon";
import { Link } from "react-router-dom";


const WelcomePage = () => {
    const siteStore = useSiteStore();
    const site = siteStore.currentId ? siteStore.list[siteStore.currentId] : null;

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
                            <SiteButton site={site} key={site.id} />
                        )
                    })}
                </div>
                {site &&
                    <div>
                        <SiteIcon name={site.pictureUrl} />
                        <p>{site.name}</p>
                        <p>{site.description}</p>
                        <Link to={`view/${site.id}`}>Board list</Link>
                    </div>
                }
            </div>
        </div>
    )
}

export default WelcomePage