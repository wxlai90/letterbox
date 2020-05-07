import React from 'react'
import Button from '@material-ui/core/Button';


const CustomButton = ({ children, onClick, ...props }) => {
    return (
        <Button
            variant="contained"
            color={`${props.color ? props.color : "secondary"}`}
            style={{ margin: '5px 0 10px 0' }}
            onClick={onClick}
        >
            {children}
        </Button>
    )
}

export default CustomButton