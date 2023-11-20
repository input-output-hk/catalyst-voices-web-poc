import React from 'react'
import Form from 'react-bootstrap/Form'

import './styles.scss'

const MoneyInput = ({
    label,
    name,
    placeholder,
    value,
    readOnly,
    onChange,
    className,
    isInvalid,
}) => {
    return (
        <div className="money-input-wrapper w-100">
            <label htmlFor={name}>{label}</label>
            <div className="d-flex align-items-center position-relative">
                <span>$</span>
                <Form.Control
                    id={name}
                    type="number"
                    placeholder={placeholder}
                    value={value}
                    readOnly={readOnly}
                    onChange={onChange}
                    className={`${className} money-input`}
                    isInvalid={isInvalid}
                />
            </div>
        </div>
    )
}

export default MoneyInput