import React, { useEffect, useState, useRef } from 'react'
import Spinner from '../components/spinner/spinner'
import Question from '../components/Question/question.component'
import { db } from '../utils/firebase'
import { Container } from '@material-ui/core';
import VerticalContainer from '../components/containers/vertical-container.component'
import CustomInput from '../components/CustomInput/custom_input.component'
import CustomButton from '../components/CustomButton/custom_button.component'
import './Letterbox.css'

import QRCode from 'qrcode'


const DisplayBox = ({ name, currentURL }) => {
    const INTIAL_CANVAS_SIZE = 50;

    const [canvasSize, setCanvasSize] = useState(INTIAL_CANVAS_SIZE)

    const canvasRef = useRef();

    const opts = {
        color: {
            light: '#00000000',
            dark: '#ffffff'
        },
        width: canvasSize
    }

    const resizeCanvas = () => {
        if (canvasSize === INTIAL_CANVAS_SIZE) {
            setCanvasSize(150)
        } else {
            setCanvasSize(INTIAL_CANVAS_SIZE)
        }
    }

    useEffect(() => {
        QRCode.toCanvas(canvasRef.current, currentURL, opts)
            .then(_ => { })
            .catch(error => console.log('error -->', error))
    }, [canvasSize])

    return (
        <div className="qr-code-container">
            <h1>
                <span>{name.toUpperCase()}</span>
            </h1>
            <canvas ref={canvasRef} className="qr-code-canvas" onClick={resizeCanvas}>
            </canvas>
        </div>
    )
}


const Letterbox = (props) => {

    const { match: { params: { boxId } } } = props;

    const currentURL = `${window.location.origin}/${boxId}`

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
                        <DisplayBox name={box.metadata.createdBy} currentURL={currentURL} />
                    }
                </div>
                <Container>
                    <div className="add-question-container header-animated">
                        <VerticalContainer>
                            <CustomInput label="Add a question" value={newQuestion} onChange={handleNewQuestion} />
                            <CustomButton color="primary" onClick={addQuestion}>Add a question</CustomButton>
                        </VerticalContainer>
                    </div>

                    <div className="questions-gallery">
                        {
                            questions.sort(sortingMethods.byMostRecent)
                                .map(question => (
                                    <Question question={question} key={question.id} boxId={boxId} />
                                ))
                        }
                    </div>
                </Container>
            </div>
        )
        : <Spinner />
}

export default Letterbox