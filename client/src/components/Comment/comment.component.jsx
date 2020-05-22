import React from 'react'
import { lessThanNMinutesAgo, timestampToDate } from '../../utils/utils'
import './comment.styles.css'


const Comment = ({ comment }) => {

    const timeDisplay = () => {
        const nMinutes = lessThanNMinutesAgo(comment.timestamp);
        if(nMinutes === 0){
            return "Just now"
        }

        if (nMinutes < 30) {
            return nMinutes === 1 ? `${nMinutes} minute ago` : `${nMinutes} minutes ago`
        }

        return timestampToDate(comment.timestamp)
    }

    return (
        <p className="comment-item">{comment.text} <i>- {timeDisplay()}</i></p>
    )
}

export default Comment