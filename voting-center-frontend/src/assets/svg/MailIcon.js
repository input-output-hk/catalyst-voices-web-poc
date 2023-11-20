import * as React from 'react'

const MailIcon = ({ iconColor }) => (
    <svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="m3 8 7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2Z"
            stroke={iconColor ? iconColor : '#576788'}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
)

export default MailIcon
