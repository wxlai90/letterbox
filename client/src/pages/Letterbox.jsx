import React, { useEffect, useState } from 'react'
import ErrorDisplay from '../components/ErrorDisplay'


const Letterbox = ({ match: { params: { sessionId } } }) => {

    const [sessionData, setSessionData] = useState(null)

    useEffect(() => {
        fetch('/api/isValidId')
            .then(resp => resp.json())
            .then(resp => {
                setSessionData(resp)
            })
    }, [])

    return sessionData && sessionData.result.length === 0
        ?
        (
            <div>
                <h1>Letterbox - {sessionId}</h1>
            </div>
        )
        :
        <ErrorDisplay>{sessionData && sessionData.result[0]}</ErrorDisplay> // refactor spinner
}

export default Letterbox