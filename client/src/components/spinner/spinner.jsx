import React from 'react'
import styled from 'styled-components'


const SpinnerContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 250px;
`


const InnerSpinner = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 5px solid #ccc;
    border-right: 5px solid rgb(252, 64, 95);
    -webkit-animation: spin 0.9s linear infinite;
    animation: spin 0.9s linear infinite;

    @-webkit-keyframes spin {
        0% {
            -webkit-transform: rotate(0deg);
        }
    
        100% {
            -webkit-transform: rotate(360deg);
        }
    }

    @keyframes spin {
        0% {
            -webkit-transform: rotate(0deg);
        }
    
        100% {
            -webkit-transform: rotate(360deg);
        }
    }
`

const Spinner = () => (
    <SpinnerContainer>
        <InnerSpinner></InnerSpinner>
    </SpinnerContainer>
)

export default Spinner