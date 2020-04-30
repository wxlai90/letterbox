import React from 'react'


const ErrorDisplay = ({ children }) => {
    return (
        <div>
            <h1>Unexpected Error</h1>
            {
                children
            }
        </div>
    )
}

export default ErrorDisplay