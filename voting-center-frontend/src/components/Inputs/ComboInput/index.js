import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'

import './styles.scss'

const ComboInput = ({
    label,
    placeholder,
    content,
    className,
    value="",
    onChange,
    required,
    onBlur,
    pattern,
    focused,
    isInvalid,
    minLength,
    maxLength,
    inputClassName,
    rightSide,
    type,
    min,
    max
}) => {
    return (
        <>
            <Form.Label htmlFor="inputPassword5" className="combo-input-label">
                {label}
            </Form.Label>
            <InputGroup
                className={`${className} combo-input-group ${
                    isInvalid && 'invalid-input'
                }`}
            >
                {rightSide ? (
                    <>
                        <Form.Control
                            placeholder={placeholder}
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            className={`combo-input-text ${inputClassName}`}
                            value={value && value}
                            onChange={onChange}
                            required={required}
                            onBlur={onBlur}
                            pattern={pattern}
                            focused={focused}
                            minLength={minLength}
                            maxLength={maxLength}
                            type={type}
                            min={min}
                            max={max}
                        />
                        <InputGroup.Text
                            id="basic-addon1"
                            className="combo-input-icon"
                        >
                            {content}
                        </InputGroup.Text>
                    </>
                ) : (
                    <>
                        <InputGroup.Text
                            id="basic-addon1"
                            className="combo-input-icon"
                        >
                            {content}
                        </InputGroup.Text>
                        <Form.Control
                            placeholder={placeholder}
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            className={`combo-input-text ${inputClassName}`}
                            value={value && value}
                            onChange={onChange}
                            required={required}
                            onBlur={onBlur}
                            pattern={pattern}
                            focused={focused}
                            minLength={minLength}
                            maxLength={maxLength}
                            type={type}
                            min={min}
                            max={max}
                        />
                    </>
                )}
            </InputGroup>
        </>
    )
}

export default ComboInput