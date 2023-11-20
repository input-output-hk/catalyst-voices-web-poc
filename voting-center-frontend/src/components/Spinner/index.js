import React from 'react'
import { Spinner as SpinnerComponent } from 'react-bootstrap'

import './styles.scss'

function Spinner() {
    return (
        <div className="spinner-overlay">
            <div className="spinner-wrapper">
                <SpinnerComponent
                    animation="border"
                    role="status"
                ></SpinnerComponent>
                <span className="spinner-text">Loading...</span>
            </div>
        </div>
    )
}

export default Spinner
