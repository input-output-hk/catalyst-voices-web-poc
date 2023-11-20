import React from 'react'

import ButtonComponent, { ButtonTypes } from '../Button'
import Like from '../../assets/svg/Like'
import Dislike from '../../assets/svg/Dislike'

import './styles.scss'

const WriteUp = ({ textData }) => {
    return (
        <div className="d-flex flex-column align-items-center w-100">
            <div className="write-up">
                <h2>Detailed writeup</h2>
                {textData.map(({ header, text }, index) => (
                    <div key={index} className="write-up-text">
                        <h3>{header}</h3>
                        <p>{text}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default WriteUp
