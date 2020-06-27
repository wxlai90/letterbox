import React, { useState, useEffect } from 'react'
import Comment from '../Comment/comment.component'
import { connect } from 'react-redux'
import { setQuestionFocus, addUpvoted } from '../../redux/question/question.actions'
import { db } from '../../utils/firebase'
import firebase from 'firebase'
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import HorizontalContainer from '../../components/containers/horizontal-container.component'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import './question.styles.css'
import VerticalContainer from '../containers/vertical-container.component'
import Divider from '@material-ui/core/Divider';
import CustomInput from '../../components/CustomInput/custom_input.component'
import CustomButton from '../../components/CustomButton/custom_button.component'
import { Container } from '@material-ui/core'
import { firstLetterToUpper, addQuestionMark } from '../../utils/utils'



const Question = ({ setQuestionFocus, focusedQuestionId, boxId, upvoted, addUpvoted, ...props }) => {


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
        const questionId = props.question.id;
        if (upvoted.indexOf(questionId) !== -1) return;

        addUpvoted(questionId)

        db.collection(`boxes/${boxId}/questions`)
            .doc(questionId)
            .update({
                upvotes: firebase.firestore.FieldValue.increment(1)
            })
    }

    const handleSubmit = () => {
        if (newComment.trim().length === 0) return;

        db.collection(`boxes/${boxId}/questions/${props.question.id}/comments`)
            .add({
                text: newComment,
                timestamp: + new Date()
            })
            .then(_ => setNewComment(''))
    }

    const formatQuestion = (s) => {
        return addQuestionMark(firstLetterToUpper(s))
    }

    useEffect(getComments, [])

    return (
        <Container className="question-container" onClick={() => showCommentsForThisQuestion(props.question.id)}>
            <VerticalContainer>
                <h4 style={{ fontFamily: 'Ubuntu' }}>{formatQuestion(props.question.text)}</h4>
                <Divider style={{ margin: '10px 0' }} />
                <HorizontalContainer onClick={upvoteQuestion} style={{ cursor: 'pointer' }}>
                    {props.question.upvotes} Votes
                    <KeyboardArrowUpIcon />
                </HorizontalContainer>
                <Divider style={{ margin: '10px 0' }} />
            </VerticalContainer>

            <h4>Comments: </h4>
            {
                focusedQuestionId === props.question.id &&
                comments.sort((a, b) => a.timestamp - b.timestamp).map(comment => (
                    <Comment comment={comment} />
                ))
            }
            <VerticalContainer>
                <CustomInput label="Add a comment" value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                <CustomButton onClick={handleSubmit}>Add</CustomButton>
            </VerticalContainer>


            <span>
                {
                    <Badge badgeContent={comments.length} color="secondary" style={{ cursor: 'pointer', marginTop: '10px' }}>
                        <MailIcon />
                    </Badge>
                }
            </span>
        </Container>
    )
}


const mapStateToProps = state => ({
    focusedQuestionId: state.question.questionId,
    upvoted: state.question.upvoted
})

const mapDispatchToProps = dispatch => ({
    setQuestionFocus: (questionId) => dispatch(setQuestionFocus(questionId)),
    addUpvoted: (questionId) => dispatch(addUpvoted(questionId))
})


export default connect(mapStateToProps, mapDispatchToProps)(Question)