import { QuestionTypes } from './question.types'


export const setQuestionFocus = (questionId) => ({
    type: QuestionTypes.SET_QUESTION_FOCUS,
    payload: questionId
})

export const addUpvoted = (questionId) => ({
    type: QuestionTypes.ADD_UPVOTED,
    payload: questionId
})