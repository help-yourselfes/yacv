import { useEffect } from "react";
import useSiteStore from "../logic/stores/SiteStore"
import api from "../logic/api/api";
import SiteButton from "../components/Site/SiteButton";
import { SiteIcon } from "../components/Site/SiteIcon";
import { Link } from "react-router-dom";
import Spinner from "../components/primitives/Loader/Spinner";
import { ErrorBox } from "../components/primitives/ErrorBox/ErrorBox";


const WelcomePage = () => {
    const siteStore = useSiteStore();
    const site = useSiteStore(state => state.current);

    useEffect(() => {
        if (!siteStore.list.length) {
            api.fetchSites()
        }
    }, []);
    return (
        <div >
            Welcome to <b>YACV!</b> {
                (siteStore.loading &&
                    <div>
                        <Spinner />
                    </div>
                ) ||
                (siteStore.error &&
                    <ErrorBox msg={siteStore.error} />
                ) ||
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
            }

        </div>
    )
}

export default WelcomePage