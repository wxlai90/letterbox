import React from 'react'
import Spinner from '../spinner/spinner'

export const withSpinner = Component => ({ isLoading, ...props }) => {
    return isLoading
        ?
        (
            <Spinner />
        )
        :
        (<Component {...props} />)
}