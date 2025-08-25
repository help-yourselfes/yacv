import useMediaStore from "../../logic/stores/MediaStore";
import MediaView from "./MediaView";


export default function MediaOverlay() {
    const active = useMediaStore(state => state.activeMedia);
    const list = useMediaStore(state => state.mediaList);
    return (
        <div>
            {list.map(media => <MediaView
                key={media.timestamp}
                media={media}
                active={active === media}
                parentPos={{ x: 0, y: 0 }}
            />)}
        </div>
    )
}