import React from 'react'
import { lessThanNMinutesAgo, timestampToDate } from '../../utils/utils'
import './comment.styles.css'


const Comment = ({ comment }) => {

    const timeDisplay = () => {
        const nMinutes = lessThanNMinutesAgo(comment.timestamp);
        if (nMinutes === 0) {
            return "JUST NOW"
        }

        if (nMinutes < 30) {
            return nMinutes === 1 ? `${nMinutes} MINUTE AGO` : `${nMinutes} MINUTES AGO`
        }

        return timestampToDate(comment.timestamp)
    }

    return (
        <div className="comment-box">
            <p className="comment-item">{comment.text} <i className="comment__item--time">{timeDisplay()}</i></p>
        </div>
    )
}

export default Comment