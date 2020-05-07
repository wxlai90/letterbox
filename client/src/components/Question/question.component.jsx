import React, { useState, useEffect } from 'react'
import Comment from '../Comment/comment.component'
import { connect } from 'react-redux'
import { setQuestionFocus } from '../../redux/question/question.actions'
import { db } from '../../utils/firebase'
import firebase from 'firebase'
import './question.styles.css'


const Question = ({ setQuestionFocus, focusedQuestionId, boxId, ...props }) => {


    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState('')

    const getComments = () => {
        db.collection(`boxes/${boxId}/questions/${props.question.id}/comments`)
            .onSnapshot(snapshot => {
                const comments = [];
                snapshot.forEach(doc => comments.push({ id: doc.id, ...doc.data() }))
                setComments(comments)
            })
    }

    const showCommentsForThisQuestion = (questionId) => {
        setQuestionFocus(questionId)
    }


    const upvoteQuestion = () => {
        db.collection(`boxes/${boxId}/questions`)
            .doc(props.question.id)
            .update({
                votes: firebase.firestore.FieldValue.increment(1)
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (newComment.trim().length === 0) return;

        db.collection(`boxes/${boxId}/questions/${props.question.id}/comments`)
            .add({
                text: newComment,
                timestamp: + new Date()
            })
            .then(_ => setNewComment(''))
    }

    useEffect(getComments, [])

    return (
        <div className="question-container" onClick={() => showCommentsForThisQuestion(props.question.id)}>
            <h3>{props.question.text} - {props.question.votes} Votes</h3>
            <button onClick={upvoteQuestion}>Upvote</button>
            {
                focusedQuestionId === props.question.id &&
                comments.sort((a, b) => a.timestamp - b.timestamp).map(comment => (
                    <Comment comment={comment} />
                ))
            }
            <form onSubmit={handleSubmit}>
                <textarea placeholder="add a comment" value={newComment} onChange={(e) => setNewComment(e.target.value)}></textarea>
                <button>Add Comment</button>
            </form>
            <span>
                {
                    `${comments.length} ${comments.length === 1 ? 'comment' : 'comments'}`
                }
            </span>
        </div>
    )
}


const mapStateToProps = state => ({
    focusedQuestionId: state.question.questionId
})

const mapDispatchToProps = dispatch => ({
    setQuestionFocus: (questionId) => dispatch(setQuestionFocus(questionId))
})


export default connect(mapStateToProps, mapDispatchToProps)(Question)