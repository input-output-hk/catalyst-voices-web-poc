import React, { useState, useEffect } from 'react'

import './styles.scss'

function ChangePictureButton({ className, text, onChange }) {
    return (
        <label className={`${className} change-picture-button`}>
            <input type="file" onChange={onChange} accept="image/jpg, image/jpeg, image/png"/>
            {text}
        </label>
    )
}

export default ChangePictureButton
