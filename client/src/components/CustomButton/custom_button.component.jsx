import React from 'react'
import styled from 'styled-components'


const StyledButton = styled.button`
    background-color: black;
    color: whitesmoke;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    cursor: pointer;
    &:hover {
        background-color: white;
        color: black;
        border: 1px solid black;
    }
`

const CustomButton = ({ children, ...props }) => (
    <StyledButton {...props}>
        {children}
    </StyledButton>
)

export default CustomButton