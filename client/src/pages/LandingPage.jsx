import React, { useState } from 'react'

import styled from 'styled-components'
import CustomInput from '../components/CustomInput/custom_input.component'
import CustomButton from '../components/CustomButton/custom_button.component'


const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex-wrap: wrap;
    margin: 50px 100px;
    line-height: 2;
`

const FormContainer = styled.div`
    width: 100px;
`

// fix styling at the end
const LandingPage = ({ history }) => {

    const [boxId, setBoxId] = useState("")
    
    return (
        <Container>
            <FormContainer>
                <CustomInput
                    type="text"
                    value={boxId}
                    onChange={e => setBoxId(e.target.value)}
                    placeholder="Box Id"
                    label="Box Id:"
                />
                <CustomButton onClick={() => history.push(`/${boxId}`)}>Go</CustomButton>
            </FormContainer>
        </Container>
    )
}


export default LandingPage