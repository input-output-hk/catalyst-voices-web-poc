import React from 'react'
import Form from 'react-bootstrap/Form'
import './styles.scss'

const RadioButton = ({
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
            checked={checked}
            onChange={onChange}
            className={`radio-button ${className} form-check-${
                size === 'small' ? 'sm' : ''
            }`}
            type={'radio'}
            id={`default-radio`}
            reverse={reverse}
            disabled={disabled}
            label={label}
        />
    )
}

RadioButton.defaultProps = {
    checked: false,
    reverse: false,
    size: 'Default',
    disabled: false,
}

export default RadioButton
