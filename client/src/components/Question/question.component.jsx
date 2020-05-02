import React from 'react'
import Comment from '../Comment/comment.component'


const Question = ({ question: { text, comments } }) => {
    return (
        <div>
            <h2>{text}</h2>
            {
                comments.length > 0
                    ?
                    comments.map((comment, idx) =>
                        (
                            <Comment comment={comment} key={idx} />
                        )
                    )
                    :
                    <p>No comments yet</p>
            }
        </div>
    )
}

export default Question