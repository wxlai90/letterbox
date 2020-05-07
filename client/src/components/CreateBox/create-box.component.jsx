import React, { useState } from 'react'
import { db } from '../../utils/firebase'


const CreateBox = () => {

    const DEFAUT_STATE = {
        name: '',
        description: '',
        boxId: null
    }

    const [state, setState] = useState(DEFAUT_STATE)

    const handleSubmit = (e) => {
        e.preventDefault();

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
        <div>
            <h1>Create a new box</h1>
            <form onSubmit={handleSubmit}>
                Your name:
                <input type="text"
                    value={state.name}
                    name="name"
                    onChange={handleChange}
                />
                <button type="submit">Get a box!</button>
            </form>


            {
                state.boxId && (
                    <div>
                        Box created: {state.boxId}
                    </div>
                )
            }
        </div>
    )
}

export default CreateBox