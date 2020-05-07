import { QuestionTypes } from './question.types'


const INITIAL_STATE = {
    questionId: null
}

const QuestionReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case QuestionTypes.SET_QUESTION_FOCUS:
            return {
                ...state,
                questionId: action.payload
            }
        default:
            return state
    }
}

export default QuestionReducer