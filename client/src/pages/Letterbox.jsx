import React, { useEffect, useState } from 'react'
import Spinner from '../components/spinner/spinner'
import Question from '../components/Question/question.component'
import { db } from '../utils/firebase'
import { Container } from '@material-ui/core';
import VerticalContainer from '../components/containers/vertical-container.component'
import CustomInput from '../components/CustomInput/custom_input.component'
import CustomButton from '../components/CustomButton/custom_button.component'


const Letterbox = (props) => {

    const { match: { params: { boxId } } } = props;

    const [box, setBox] = useState(null)
    const [questions, setQuestions] = useState([])
    const [newQuestion, setNewQuestion] = useState('')


    const getBox = () => {
        db.collection('boxes')
            .doc(boxId)
            .get()
            .then(box => {
                setBox(box.data())
            })
    }

    const getQuestions = () => {
        db.collection('boxes')
            .doc(boxId)
            .get()
            .then(snapshot => {
                if (!snapshot.exists) {
                    props.history.push('/')
                } else {
                    db.collection('boxes')
                        .doc(boxId)
                        .collection('questions')
                        .onSnapshot(snapshot => {
                            const questions = [];
                            snapshot.forEach(doc => questions.push({ id: doc.id, ...doc.data() }))
                            setQuestions(questions)
                        })
                }
            })
    }

    const handleNewQuestion = (e) => {
        const { value } = e.target;
        setNewQuestion(value)
    }

    const addQuestion = () => {
        const questionToAdd = {
            text: newQuestion,
            timestamp: + new Date(),
            votes: 0
        }

        db.collection('boxes')
            .doc(boxId)
            .collection('questions')
            .add(questionToAdd)
            .then(_ => setNewQuestion(''))
    }

    useEffect(() => {
        getBox();
        getQuestions();
    }, [])

    return box
        ?
        (
            <div>
                <Container maxWidth="sm" style={{ border: '2px solid #ccc' }}>
                    <h1>Box for {box && box.metadata.createdBy}</h1>

                    <VerticalContainer style={{ marginBottom: '50px' }}>
                        <CustomInput label="Add a question" value={newQuestion} onChange={handleNewQuestion} />
                        <CustomButton color="primary" onClick={addQuestion}>Add a question</CustomButton>
                    </VerticalContainer>

                    <VerticalContainer>
                        {
                            questions.sort((a, b) => b.votes - a.votes)
                            .map(question => (
                                <Question question={question} key={question.id} boxId={boxId} />
                            ))
                        }
                    </VerticalContainer>
                </Container>
            </div>
        )
        : <Spinner />
}

export default Letterbox