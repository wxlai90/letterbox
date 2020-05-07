import { combineReducers } from 'redux'
import QuestionReducer from './question/question.reducer'


export default combineReducers({
    question: QuestionReducer
})