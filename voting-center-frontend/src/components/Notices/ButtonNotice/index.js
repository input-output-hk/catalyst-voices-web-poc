import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import CardButton from '../../CardButton'
import PropTypes from 'prop-types'
import './styles.scss'

function ButtonNotice({ text, buttonText, onClick, className }) {
    return (
        <div className={`button-notice message ${className}`}>
            <Row className="d-flex flex-column flex-sm-row p-0 g-0 m-0 notice-content">
                <Col sm={7} className="d-flex m-0 p-0 g-0 content-text">
                    <span className="notice-message-text">{text}</span>
                </Col>
                <Col
                    sm={5}
                    className="d-flex m-0 p-0 g-0 mt-3 mt-sm-0 align-content-center align-items-center justify-content-end content-button"
                >
                    <CardButton onClick={onClick}>{buttonText}</CardButton>
                </Col>
            </Row>
        </div>
    )
}

ButtonNotice.propTypes = {
    text: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired,
}

export default ButtonNotice
