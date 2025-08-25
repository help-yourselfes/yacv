import type React from "react";
import type { FloatingMediaProps } from "./MediaProps";
import useMediaStore from "../../logic/stores/MediaStore";

const MediaView: React.FC<FloatingMediaProps> = ({ media, active, parentPos }) => {

    const { hide } = useMediaStore();

    const handleClick = () => {
        hide(media);
    }

    const isActive = active ? 'active' : '';

    return (
        <div>
            <img
                src={media.previewUrl}
                onClick={handleClick}
                className={`media-view ${isActive}`}
                style={{ '--x': parentPos.x, '--y': parentPos.y } as React.CSSProperties}
            />
        </div>
    )
}

export default MediaView