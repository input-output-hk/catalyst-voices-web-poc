import React from 'react'
import Form from 'react-bootstrap/Form'

import './styles.scss'

const Input = ({
    label,
    placeholder,
    value,
    readOnly,
    type,
    onChange,
    className,
    isInvalid,
    minLength,
    maxLength,
    required,
    pattern,
    onBlur,
    focused,
    id,
}) => {
    return (
        <>
            {label ? (
                <Form.Label htmlFor="inputPassword5">{label}</Form.Label>
            ) : null}
            <Form.Control
                type={type}
                placeholder={placeholder}
                value={value}
                readOnly={readOnly}
                onChange={onChange}
                className={className}
                isInvalid={isInvalid}
                minLength={minLength}
                maxLength={maxLength}
                required={required}
                pattern={pattern}
                onBlur={onBlur}
                focused={focused}
                id={id}
            />
        </>
    )
}

export default Input
