import * as React from 'react'

const ShareIcon = ({ iconColor }) => (
    <svg width={20} height={20} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M17.5 5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM17.5 15a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM7.5 10a2.5 2.5 0 1 1-4.999 0A2.5 2.5 0 0 1 7.5 10Z"
            fill={iconColor ? iconColor : '#576788'}
        />
    </svg>
)

export default ShareIcon
