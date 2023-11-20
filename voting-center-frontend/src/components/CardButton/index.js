import React from 'react'
import { Button } from 'react-bootstrap'
import './styles.scss'

const CardButton = ({ children, onClick, className, disabled }) => {
    return (
        <Button
            className={`d-flex align-items-center justify-content-center card-button-container ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            <p className="card-button-text mb-0">{children}</p>
        </Button>
    )
}

export default CardButton
