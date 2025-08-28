import type React from "react";
import type { MediaData, PostData, PostPart } from "../../../../shared/types";
import MediaList from "../Media/MediaList";
import { ExtLink, GlobalReply, LocalReply, MediaLink } from '../primitives/PostParts/PostParts';
interface Props {
    post: PostData;
}

const Post: React.FC<Props> = ({ post }) => {
    return (
        <div className='post post'>
            {post.media.length ?
                <div className='post-media-list'>
                    <MediaList list={post.media} />
                </div> : <></>
            }
            <div className='post-content'>
                {post.caption && <div className='post-caption'>{post.caption}</div>}
                <div className='post-text'>
                    {post.content.map(part => {
                        switch (part.type) {
                            case 'plainText':
                                return part.text
                            case 'localReply':
                                return <LocalReply data={part} />
                            case 'mediaLink':
                                return <MediaLink data={part} />
                            case 'extLink':
                                return <ExtLink data={part} />
                            case 'globalReply':
                                return <GlobalReply data={part} />
                            default:
                                return '???'
                        }
                    })}
                </div>
            </div>
            <div className='post-bar'>
                <div className='meta'>
                    {post.meta.id} <br />
                    {post.meta.author} <br />
                    {post.meta.date}<br />
                    {post.meta.time}<br /></div>
                <div className='replies'>
                    {/* {link && <Link to={link}>Open post</Link>} */}
                </div>
            </div>
        </div>
    )
}

export default Post;