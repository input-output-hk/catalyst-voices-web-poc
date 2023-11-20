import React from 'react'
import ArrowButton from '../../assets/svg/ArrowButton/ArrowButton'
import '../../assets/svg/ArrowButton/ArrowButton.scss'
import PropTypes from 'prop-types'

function Arrow({ left, onClick, circleColor, arrowColor }) {
    return (
        <ArrowButton
            onClick={onClick}
            left={left}
            circleColor={circleColor}
            arrowColor={arrowColor}
        />
    )
}

Arrow.propTypes = {
    left: PropTypes.bool,
    onClick: PropTypes.func,
}

export default Arrow
