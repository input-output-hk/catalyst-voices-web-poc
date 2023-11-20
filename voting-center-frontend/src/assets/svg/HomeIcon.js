import * as React from 'react'

const HomeIcon = ({ stroke, className }) => (
    <svg
        width={20}
        height={20}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <path
            d="m1 10 2-2m0 0 7-7 7 7M3 8v10a1 1 0 0 0 1 1h3M17 8l2 2m-2-2v10a1 1 0 0 1-1 1h-3m-6 0a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1m-6 0h6"
            stroke={stroke ? stroke : '#576788'}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
)

export default HomeIcon
