import React from 'react'

const CloseIcon = ({ iconcolor, width, height }) => (
    <svg
        width={width ? width : 18}
        height={height ? height : 18}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="m8.848 12.857 7.071-7.072m-7.071 0 7.071 7.072"
            stroke={iconcolor ? iconcolor : '#fff'}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
)

export default CloseIcon
