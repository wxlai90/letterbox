import React, { useState } from 'react'
import { db } from '../../utils/firebase'

import CustomInput from '../../components/CustomInput/custom_input.component'
import CustomButton from '../../components/CustomButton/custom_button.component'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Container } from '@material-ui/core';
import VerticalContainer from '../../components/containers/vertical-container.component'


const CreateBox = () => {

    const DEFAUT_STATE = {
        name: '',
        description: '',
        boxId: null
    }

    const [state, setState] = useState(DEFAUT_STATE)

    const handleSubmit = () => {

        if (state.name.trim().length === 0) return;

        db.collection('boxes')
            .add({
                metadata: {
                    createdBy: state.name
                },
            })
            .then(_ => {
                setState({ ...DEFAUT_STATE, boxId: _.id })
            })
    }

    const handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        setState(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }


    return (
        <Container maxwidth="sm" style={{ maxWidth: "500px", marginTop: "30vh" }}>
            {
                state.boxId && (
                    <Card>
                        <CardContent>
                            <VerticalContainer>
                                Box created: {state.boxId}
                            </VerticalContainer>
                        </CardContent>
                    </Card>
                )
            }
            <Card>
                <CardContent>
                    <VerticalContainer>
                        <CustomInput
                            value={state.name}
                            onChange={handleChange}
                            name="name"
                            label="Name"
                            required
                        />
                        <CustomButton onClick={handleSubmit}>Get me a Box!</CustomButton>
                    </VerticalContainer>
                </CardContent>
            </Card>
        </Container>
    )
}

export default CreateBox