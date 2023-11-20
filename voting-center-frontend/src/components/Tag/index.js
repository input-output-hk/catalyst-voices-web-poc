import React, { useState } from 'react'
import './styles.scss'
import Button from 'react-bootstrap/Button'

function TagComponent({
    children,
    onClick,
    onMouseEnter,
    onMouseLeave,
    className,
    endIcon,
    isCheckAvailable,
    stayActive,
}) {
    const [active, setActive] = useState(stayActive ? true : false)

    function clickHandler() {
        setActive(!active)
    }

    function handleFunction(e) {
        onClick && onClick(e)
        active ? clickHandler() : isCheckAvailable && clickHandler()
    }

    return (
        <Button
            onClick={handleFunction}
            className={`tag-component ${className} d-flex align-items-center justify-content-center ${
                stayActive ? 'active' : active ? 'active' : ''
            }`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {children}
            {endIcon && endIcon}
        </Button>
    )
}

TagComponent.defaultProps = {
    isCheckAvailable: true,
}

export default TagComponent
