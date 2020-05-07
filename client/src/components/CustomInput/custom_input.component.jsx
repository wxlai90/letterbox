import React from 'react'
import { TextField } from '@material-ui/core';

const CustomInput = ({ children, label, placeholder, value, onChange, ...props }) => {
    return (
        <TextField
            label={label}
            variant="outlined"
            value={value}
            onChange={onChange}
        />
    )
}

export default CustomInput