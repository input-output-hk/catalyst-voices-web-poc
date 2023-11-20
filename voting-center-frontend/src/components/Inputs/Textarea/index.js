import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'

import './styles.scss'

const Textarea = ({
    label,
    placeholder,
    capture,
    maxLength,
    onChange,
    id,
    required,
    value,
    count,
    isInvalid,
    focused,
}) => {
    return (
        <>
            <Form.Group className="textarea-wrapper mb-3">
                <Form.Label>{label}</Form.Label>
                <Form.Text>{capture}</Form.Text>
                <Form.Control
                    id={id}
                    as="textarea"
                    rows={3}
                    placeholder={placeholder}
                    maxLength={maxLength}
                    onChange={(e) => {
                        onChange && onChange(e)
                    }}
                    className="mb-2"
                    required={required}
                    value={value}
                    isInvalid={isInvalid}
                    focused={focused}
                />
                <p className="character-count d-flex justify-content-end">
                    {count} / {maxLength}
                </p>
            </Form.Group>
        </>
    )
}

export default Textarea
