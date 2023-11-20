import React from 'react'

const ArrowButton = ({ circleColor, arrowColor, onClick, left }) => (
    <svg
        className={`arrow-container ${left ? 'arrow-left' : ''}`}
        width={44}
        height={44}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={onClick}
    >
        <circle
            cx={22}
            cy={22}
            r={22}
            fill={circleColor ? circleColor : '#E9EDF9'}
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M19.951 27.648a1.2 1.2 0 0 1 0-1.697L23.903 22l-3.952-3.951a1.2 1.2 0 0 1 1.697-1.697l4.8 4.8a1.2 1.2 0 0 1 0 1.697l-4.8 4.8a1.2 1.2 0 0 1-1.697 0Z"
            fill={arrowColor ? arrowColor : '#576788'}
        />
    </svg>
)

export default ArrowButton
