import React from 'react'
import Form from 'react-bootstrap/Form'
import './styles.scss'

const Checkbox = ({
    label,
    onChange,
    className,
    size,
    reverse,
    disabled,
    indeterminate,
    checked,
    id,
}) => {
    // const setCheckboxRef = (checkbox) => {
    //     if (checkbox) {
    //         checkbox.indeterminate = { indeterminate }
    //     }
    // }

    return (
        <Form.Check
            checked={checked && checked}
            // ref={setCheckboxRef}
            onChange={onChange}
            className={`checkbox-wrapper ${className} form-check-${
                size === 'small' ? 'sm' : ''
            }`}
            type={'checkbox'}
            id={id ? id : `default-checkbox`}
            reverse={reverse}
            disabled={disabled}
            label={label}
        />
    )
}

Checkbox.defaultProps = {
    checked: false,
    reverse: false,
    size: 'default',
    disabled: false,
    // indeterminate: false,
}

export default Checkbox
