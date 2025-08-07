import type React from "react";
import type { MediaProps } from "./MediaProps";
import type { MediaData } from "../../logic/api/types";
import useMediaStore from "../../logic/stores/MediaStore";



const MediaPreview: React.FC<MediaProps> = ({ media }) => {
    const store = useMediaStore();
    const handleClick = () => {
        store.show(media);
        console.log(media, 'open')
    }

    return (<div>
        <img src={media.previewUrl} onClick={handleClick} />
        <div>
            <p>{media.name}</p>
            <p>{media.dimensions.w}x{media.dimensions.h}</p>
        </div>
    </div>)
}

export default MediaPreview