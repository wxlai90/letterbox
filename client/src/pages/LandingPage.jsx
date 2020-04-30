import React from 'react'
import { setSessionId } from '../redux/session/session.actions'
import { connect } from 'react-redux'

import styled from 'styled-components'
import CustomInput from '../components/CustomInput/custom_input.component'
import CustomButton from '../components/CustomButton/custom_button.component'


const Container = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    flex-wrap: wrap;
    margin: 50px 100px;
`

const FormContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 100px;
`

// fix styling at the end
const LandingPage = ({ sessionId, setSessionId, history }) => (
    <Container>
        <FormContainer>
            <CustomInput
                type="text"
                value={sessionId}
                onChange={e => setSessionId(e.target.value)}
                placeholder="session id"
                label="Session Id"
            />
            <CustomButton onClick={() => history.push(`/${sessionId}`)}>Go</CustomButton>
        </FormContainer>
    </Container>
)


const mapStateToProps = state => ({
    sessionId: state.session.sessionId
})

const mapDispatchToProps = dispatch => ({
    setSessionId: id => dispatch(setSessionId(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage)