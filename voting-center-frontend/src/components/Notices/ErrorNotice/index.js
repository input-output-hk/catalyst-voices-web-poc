import React from 'react'

import warningIcon from '../../../assets/images/warningIcon.svg'
import './styles.scss'

const ErrorNotice = ({ label }) => {
    return (
        <div className="error-notice message">
            <h3 className="message-text">
                <img src={warningIcon} alt="warning" />
                {label}
            </h3>
        </div>
    )
}

export default ErrorNotice
