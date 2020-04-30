import React from 'react'
import { setSessionId } from '../redux/session/session.actions'
import { connect } from 'react-redux'


const LandingPage = ({ sessionId, setSessionId }) => (
    <div>
        LandingPage
        <hr />
        <input
            type="text"
            value={sessionId}
            onChange={e => setSessionId(e.target.value)}
            placeholder="session id"
        />
    </div>
)


const mapStateToProps = state => ({
    sessionId: state.session.sessionId
})

const mapDispatchToProps = dispatch => ({
    setSessionId: id => dispatch(setSessionId(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage)