import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'

import './styles.scss'

const ComboBox = ({ label, placeholder, content, className }) => {
    return (
        <>
            <Form.Label
                htmlFor="inputPassword5"
                className="combobox-input-label"
            >
                {label}
            </Form.Label>
            <InputGroup className={`${className} combobox-input-group`}>
                <InputGroup.Text
                    id="basic-addon1"
                    className="combobox-input-icon"
                >
                    {content || '@'}
                </InputGroup.Text>
                <Form.Control
                    placeholder={placeholder}
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    className="combobox-input-text"
                />
            </InputGroup>
        </>
    )
}

export default ComboBox
