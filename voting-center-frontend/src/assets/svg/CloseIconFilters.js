import * as React from 'react'

const CloseIconFilters = ({ iconColor, width, height, ...props }) => (
    <svg
        width={width ? width : 14}
        height={height ? height : 15}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1.293 1.793a1 1 0 0 1 1.414 0L7 6.086l4.293-4.293a1 1 0 1 1 1.414 1.414L8.414 7.5l4.293 4.293a1 1 0 0 1-1.414 1.414L7 8.914l-4.293 4.293a1 1 0 0 1-1.414-1.414L5.586 7.5 1.293 3.207a1 1 0 0 1 0-1.414Z"
            fill="#1A1A1A"
            stroke={iconColor ? iconColor : '#D2D7E8'}
            strokeWidth={2}
            strokeLinecap="round"
        />
    </svg>
)

export default CloseIconFilters
