import React from 'react'

const CustomInput = ({ children, label, ...props }) => {
    return (
        <label>
            {
                label
            }
            <input {...props} style={{ marginLeft: '5px' }} />
        </label>
    )
}

export default CustomInput