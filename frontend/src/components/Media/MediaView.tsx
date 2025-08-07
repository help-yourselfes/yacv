import type React from "react";
import type { MediaProps } from "./MediaProps";
import type { MediaData } from "../../logic/api/types";
import useMediaStore from "../../logic/stores/MediaStore";



const MediaView: React.FC<MediaProps> = ({ media }) => {
    const store = useMediaStore();
    
    const handleClick = () => {
        store.hide(media);
    }

    return (<div>
        <img src={media.previewUrl} onClick={handleClick} />
    </div>)
}

export default MediaView