import React, { useEffect, useState } from 'react'
import Spinner from '../components/spinner/spinner'
import Question from '../components/Question/question.component'
import { db } from '../utils/firebase'
import { Container } from '@material-ui/core';
import VerticalContainer from '../components/containers/vertical-container.component'
import CustomInput from '../components/CustomInput/custom_input.component'
import CustomButton from '../components/CustomButton/custom_button.component'
import './Letterbox.css'


const DisplayBox = ({ name }) => {

    const styles = {
        name: {
            fontFamily: 'Montserrat',
            letterSpacing: '20px',
            fontWeight: '100',
            fontSize: '80px',
            color: '#fff'
        }
    }

    return (
        <h1>
            <span style={styles.name}>{name.toUpperCase()}</span>
        </h1>
    )
}


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
                    props.history.push({
                        pathname: '/',
                        state: { error: `Box: ${boxId} cannot be found!` }
                    })
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

        if (newQuestion.trim() === '') return;

        const questionToAdd = {
            text: newQuestion,
            timestamp: + new Date(),
            upvotes: 0
        }

        db.collection('boxes')
            .doc(boxId)
            .collection('questions')
            .add(questionToAdd)
            .then(_ => setNewQuestion(''))
    }

    const sortingMethods = {
        byUpvotes: (a, b) => b.upvotes - a.upvotes,
        byMostRecent: (a, b) => b.timestamp - a.timestamp
    }

    useEffect(() => {
        getBox();
        getQuestions();
    }, [])

    return box
        ?
        (
            <div>
                <div className="hero-banner">
                    {
                        box &&
                        <DisplayBox name={box.metadata.createdBy} />
                    }
                </div>
                <Container maxWidth="md">
                    <div className="question-container header-animated">
                        <VerticalContainer style={{ marginBottom: '50px' }}>
                            <CustomInput label="Add a question" value={newQuestion} onChange={handleNewQuestion} />
                            <CustomButton color="primary" onClick={addQuestion}>Add a question</CustomButton>
                        </VerticalContainer>
                    </div>

                    <VerticalContainer>
                        {
                            questions.sort(sortingMethods.byMostRecent)
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