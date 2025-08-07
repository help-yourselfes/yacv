import useMediaStore from "../../logic/stores/MediaStore";
import MediaView from "./MediaView";


export default function MediaOverlay() {
    const list = useMediaStore(state => state.mediaList);
    return (
        <div>
            {
                list.map(media => <MediaView
                    key={media.timestamp}
                    media={media}
                />)
            }
        </div>
    )
}