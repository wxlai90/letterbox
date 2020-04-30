import { sessionTypes } from './session.types'


export const setSessionId = (id) => ({
    type: sessionTypes.SET_SESSION_ID,
    payload: id
})