import React from 'react'

import generalNotice from '../../../assets/images/general-notice.svg'
import './styles.scss'

const GeneralNotice = ({ label }) => {
    return (
        <div className="general-notice message">
            <span className="message-text">
                <img src={generalNotice} alt="general notice" />
                {label}
            </span>
        </div>
    )
}

export default GeneralNotice
