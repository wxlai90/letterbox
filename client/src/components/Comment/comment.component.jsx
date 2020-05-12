import React from 'react'
import './comment.styles.css'


const Comment = ({ comment }) => {
    return (
        <p className="comment-item">{comment.text} - commented at {new Date(comment.timestamp).toLocaleTimeString("en-US") + ''}</p>
    )
}

export default Comment