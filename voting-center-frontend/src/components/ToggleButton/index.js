import React from 'react'
import Form from 'react-bootstrap/Form'

import './styles.scss'

const ToggleButton = ({
    label,
    checked,
    onChange,
    className,
    size,
    reverse,
    disabled,
}) => {
    return (
        <Form.Check
            checked={checked && checked}
            onChange={onChange}
            className={`${className} form-switch-${
                size === 'small' ? 'sm' : ''
            }`}
            type={'switch'}
            id={`default-switch`}
            reverse={reverse}
            disabled={disabled}
            label={label}
        />
    )
}

ToggleButton.defaultProps = {
    reverse: false,
    size: 'default',
    disabled: false,
}

export default ToggleButton
