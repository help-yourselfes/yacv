import type React from "react";
import type { MediaProps } from "./MediaProps";
import useMediaStore from "../../logic/stores/MediaStore";



const MediaPreview: React.FC<MediaProps> = ({ media }) => {
    const store = useMediaStore();
    const handleClick = () => {
        store.show(media);
        console.log(media, 'open')
    }

    return (
        <img src={media.previewUrl} onClick={handleClick} />
    )
}

export default MediaPreview