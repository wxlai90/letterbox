import React, { useState } from 'react'
import { db } from '../../utils/firebase'

import CustomInput from '../../components/CustomInput/custom_input.component'
import CustomButton from '../../components/CustomButton/custom_button.component'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Container, TextField } from '@material-ui/core';
import VerticalContainer from '../../components/containers/vertical-container.component'
import { Link } from 'react-router-dom'


const CreateBox = (props) => {
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
                                <h4>
                                    Share this link:
                                </h4>
                                <TextField
                                    inputProps={{
                                        readOnly: true
                                    }}
                                    defaultValue={
                                        `${window.location.origin}/${state.boxId}`
                                    }
                                ></TextField>
                                <Link to={`/${state.boxId}`}>
                                    Go to box now!
                                </Link>
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