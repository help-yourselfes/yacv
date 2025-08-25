import type { MediaData } from "../../../../shared/types";
import MediaPreview from "./MediaPreview";

interface MediaListProps {
    list: MediaData[];
}

const ListLess: React.FC<MediaListProps> = ({ list }) => {
    return (
    <div >
        {
            list.map(media =>
                <MediaPreview key={media.timestamp} media={media} />
            )
        }
    </div>
    )
}

const List4: React.FC<MediaListProps> = ({ list }) => {
    return (<div>
        {
            list.map(media =>
                <MediaPreview key={media.timestamp} media={media} />
            )
        }
    </div>)
}

const ListMore: React.FC<MediaListProps> = ({ list }) => {
    const handleClick = () => {

    }
    return (
        <div className="mx-auto flex max-w-sm items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
            {
                [...list].splice(0, 3).map(media =>
                    <MediaPreview key={media.timestamp} media={media} />
                )
            }
            <button onClick={handleClick}>
                {list.length - 3 > 10 ? '+9' : list.length - 3}
            </button>
        </div>)
}

const MediaList: React.FC<MediaListProps> = ({ list }) => {
    if (list.length < 4) return <ListLess list={list} />
    if (list.length === 4) return <List4 list={list} />
    return <ListMore list={list} />
}

export default MediaList