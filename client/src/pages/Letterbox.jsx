import React, { useEffect, useState } from 'react'
import ErrorDisplay from '../components/ErrorDisplay'
import Spinner from '../components/spinner/spinner'
import Question from '../components/Question/question.component'
import { db } from '../utils/firebase'
import firebase from 'firebase'


const Letterbox = ({ match: { params: { boxId } } }) => {

    const [box, setBox] = useState(null)
    const [questions, setQuestions] = useState([])
    const [newQuestion, setNewQuestion] = useState('')

    const schema = {
        metadata: {
            createdBy: 'Someone'
        },
        questions: [
            {
                id: 1,
                text: 'Question1 Text',
                timestamp: 1588849877196,
                comments: [
                    {
                        id: 1,
                        text: 'Comment Text',
                        timestamp: 1588849677196,
                        by: 'name/anonymous'
                    }
                ]
            },
            {
                id: 2,
                text: 'Question2 Text',
                timestamp: 1588849877196,
                comments: [
                    {
                        id: 2,
                        text: 'Comment Text',
                        timestamp: 1588849677196,
                        by: 'name/anonymous'
                    }
                ]
            }
        ]
    }

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
            .collection('questions')
            .onSnapshot(snapshot => {
                const questions = [];
                snapshot.forEach(doc => questions.push({ id: doc.id, ...doc.data() }))
                setQuestions(questions)
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

    return (
        <div>
            <h1>Box for {box && box.metadata.createdBy}</h1>
            <div>
                <h3>Add a question</h3>
                <textarea onChange={handleNewQuestion} value={newQuestion}></textarea>
                <button onClick={addQuestion}>Add Question</button>
            </div>
            {
                questions.map(question => (
                    <Question question={question} key={question.id} boxId={boxId} />
                ))
            }
        </div>
    )
}

export default Letterbox