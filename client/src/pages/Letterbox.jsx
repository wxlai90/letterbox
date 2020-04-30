import React, { useEffect, useState } from 'react'
import ErrorDisplay from '../components/ErrorDisplay'
import Spinner from '../components/spinner/spinner'


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
        sessionData
            ?
            <ErrorDisplay>{sessionData && sessionData.result[0]}</ErrorDisplay>
            :
            <Spinner />
}

export default Letterbox