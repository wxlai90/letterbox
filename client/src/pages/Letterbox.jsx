import React, { useEffect, useState } from 'react'
import ErrorDisplay from '../components/ErrorDisplay'
import Spinner from '../components/spinner/spinner'
import Question from '../components/Question/question.component'
import Comment from '../components/Comment/comment.component'


const Letterbox = ({ match: { params: { sessionId } } }) => {

    const [sessionData, setSessionData] = useState(null)

    useEffect(() => {
        fetch(`/api/session/${sessionId}`)
            .then(resp => resp.json())
            .then(resp => {
                // add in check for invalid session id and redirect accordingly
                setSessionData(resp)
            })
    }, [sessionId])

    return sessionData && sessionData.result.length === 0
        ?
        (
            <div>
                <h1>Letterbox - {sessionData.session.title}</h1>
                <hr />
                {
                    sessionData.session.questions.map(question =>
                        <Question question={question} key={question.id} />
                    )
                }
            </div>
        )
        :
        sessionData
            ?
            <ErrorDisplay>{sessionData && sessionData.result[0]}</ErrorDisplay>
            :
            <Spinner />
}

export default Letterbox