import React from 'react'
import Button from '@material-ui/core/Button';


const CustomButton = ({ children, onClick, ...props }) => {
    return (
        <Button
            variant="contained"
            color="secondary"
            style={{ marginTop: '5px' }}
            onClick={onClick}
        >
            {children}
        </Button>
    )
}

export default CustomButton