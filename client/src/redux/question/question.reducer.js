import { QuestionTypes } from './question.types'


const INITIAL_STATE = {
    questionId: null,
    upvoted: []
}

const QuestionReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case QuestionTypes.SET_QUESTION_FOCUS:
            return {
                ...state,
                questionId: action.payload
            }
        case QuestionTypes.ADD_UPVOTED:
            return {
                ...state,
                upvoted: [...state.upvoted, action.payload]
            }
        default:
            return state
    }
}

export default QuestionReducer