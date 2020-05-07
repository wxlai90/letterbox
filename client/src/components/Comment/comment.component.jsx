import React from 'react'


const Comment = ({ comment }) => {
    return (
        <p>{comment.text} - commented at {new Date(comment.timestamp).toLocaleTimeString("en-US") + ''}</p>
    )
}

export default Comment