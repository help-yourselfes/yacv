import type { MediaData } from "../../../../shared/types";
import MediaPreview from "./MediaPreview";

interface MediaListProps {
    list: MediaData[];
}

const MediaList: React.FC<MediaListProps> = ({ list }) => {

    return (<div>
        {list.map(media =>
            <MediaPreview key={media.timestamp} media={media} />
        )}
    </div>)
}

export default MediaList