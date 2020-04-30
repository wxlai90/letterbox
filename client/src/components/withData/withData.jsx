import React, { useState, useEffect } from 'react'

export const withData = params => Component => ({ children, ...props }) => {

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const returnAs = Object.keys(params)[0];
    const url = params[returnAs]

    useEffect(() => {
        (async () => {
            try {
                const resp = await fetch(url);
                const jsonResp = await resp.json();
                setData(jsonResp);
                setIsLoading(false);
            } catch (error) {
                setError(error.message);
                setIsLoading(false);
            }
        })()
    }, [])

    const fetchResult = {
        [returnAs]:
        {
            response: data,
            error,
            isLoading
        }
    }

    return isLoading
        ? (<div>Loading...</div>)
        : (<Component {...props} {...fetchResult}>{children}</Component>)
}