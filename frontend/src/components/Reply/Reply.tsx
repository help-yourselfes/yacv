import type React from 'react'
import './Reply.css'
import type { ReplyData } from '../../logic/api/types'

interface ReplyProps {
    reply: ReplyData;
}

const Reply: React.FC<ReplyProps> = ({ reply }) => {
    return (
        <div>
            <div>
                #{reply.id}
            </div>
            <div>
                {reply.text}
            </div>
        </div>
    )
}

export default Reply