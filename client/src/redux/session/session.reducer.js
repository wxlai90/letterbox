import { sessionTypes } from './session.types'


const INITIAL_STATE = {
    sessionId: ''
}


const sessionReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case sessionTypes.SET_SESSION_ID:
            return {
                ...state,
                sessionId: action.payload
            }
        default:
            return state;
    }
}


export default sessionReducer