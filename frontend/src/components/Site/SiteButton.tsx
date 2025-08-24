import type React from "react";
import type { SiteProps } from "./SiteProps";
import api from "../../logic/api/api";
import useSiteStore from "../../logic/stores/SiteStore";



const SiteButton: React.FC<SiteProps> = ({ site }) => {
    const selected = site.id === api.siteId;
    const siteStore = useSiteStore();
    const handleClick = () => {
        siteStore.setCurrent(site.id)
        api.updateSite(site.id)
    }

    return (
        <button className={`site-button ${selected ? 'selected' : ''}`} onClick={handleClick}>
            {site.name}
        </button>
    )
}

export default SiteButton