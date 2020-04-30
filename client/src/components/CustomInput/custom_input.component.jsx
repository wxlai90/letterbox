import React from 'react'

const CustomInput = ({ children, label, ...props }) => {
    return (
        <label>
            {
                label
            }
            <input {...props} />
        </label>
    )
}

export default CustomInput