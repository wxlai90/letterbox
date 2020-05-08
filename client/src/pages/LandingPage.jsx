import React, { useState } from 'react'

import CustomInput from '../components/CustomInput/custom_input.component'
import CustomButton from '../components/CustomButton/custom_button.component'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Container } from '@material-ui/core';
import VerticalContainer from '../components/containers/vertical-container.component'
import { Link } from 'react-router-dom'


const LandingPage = ({ history, location }) => {

    const [boxId, setBoxId] = useState("")

    return (
        <Container maxwidth="sm" style={{ maxWidth: "500px", marginTop: "10vh" }}>
            <Card>
                <CardContent>
                    <VerticalContainer>
                        {
                            location.state &&
                            location.state.error &&
                            <div>
                                {location.state.error} <Link to="/box/new" style={{ textDecoration: 'underline' }}>Create one instead?</Link>
                            </div>
                        }
                        <CustomInput
                            value={boxId}
                            onChange={e => setBoxId(e.target.value)}
                            label="Box Id"
                            required
                        />
                        <CustomButton onClick={() => history.push(`/${boxId}`)}>Go</CustomButton>
                    </VerticalContainer>
                </CardContent>
            </Card>
        </Container>
    )
}


export default LandingPage