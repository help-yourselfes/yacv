import type React from 'react'
import './Thread.css'
import type { ThreadData } from '../../../../shared/types'
import { Link } from 'react-router-dom';
import MediaList from '../Media/MediaList';

interface ThreadProps {
    thread: ThreadData | null;
    link: string;
}

const Thread: React.FC<ThreadProps> = ({ thread, link }) => {
    if (thread) return (<div className='thread'>
        <div className='left'>

            {thread.media && <MediaList list={thread.media}/>}

        </div>
        <div className='center'>
            <h4>{thread.caption}</h4>
            {thread.text}
        </div>
        <div className='right'>
            <p>{thread.id}</p>
            <p>
            {link && <Link to={link}>Open thread</Link>}
            </p>
        </div>
    </div>)
    else return (<div>
        !!!
    </div>)
}

export default Thread