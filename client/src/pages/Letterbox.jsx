import React from 'react'

const Letterbox = ({ match: { params: { sessionId } } }) => {

    return (
        <div>
            <h1>Letterbox - {sessionId}</h1>
        </div>
    )
}

export default Letterbox