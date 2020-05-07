import { QuestionTypes } from './question.types'


export const setQuestionFocus = (questionId) => ({
    type: QuestionTypes.SET_QUESTION_FOCUS,
    payload: questionId
})