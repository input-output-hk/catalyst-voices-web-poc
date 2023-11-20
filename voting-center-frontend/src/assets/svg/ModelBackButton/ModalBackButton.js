import React from 'react'

const ModalBackButton = ({
    arrowColor,
    circleColor,
    arrowWidth,
    width,
    height,
    onClick,
    className,
}) => (
    <svg
        width={width ? width : 40}
        height={width ? width : 40}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`modal-back-button-container ${className}`}
        onClick={onClick}
    >
        <circle
            cx={width ? width / 2 : 20}
            cy={height ? height / 2 : 20}
            r={width ? width / 2 : 20}
            fill={circleColor ? circleColor : '#F8F9FC'}
        />
        <path
            d="m15 24-4-4m0 0 4-4m-4 4h18"
            stroke={arrowColor ? arrowColor : '#576788'}
            strokeWidth={arrowWidth ? arrowWidth : 2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
)

export default ModalBackButton
