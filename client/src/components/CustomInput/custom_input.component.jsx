import React from 'react'
import { TextField } from '@material-ui/core';

const CustomInput = ({ children, label, placeholder, ...props }) => {
    return (
        <TextField
            label={label}
            variant="outlined"
            {...props}
        />
    )
}

export default CustomInput