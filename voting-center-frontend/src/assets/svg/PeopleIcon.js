import * as React from 'react'

const PeopleIcon = ({ stroke, className }) => (
    <svg
        width={22}
        height={20}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <path
            d="M16 17h5v-2a3 3 0 0 0-5.356-1.857M16 17H6m10 0v-2c0-.656-.126-1.283-.356-1.857M6 17H1v-2a3 3 0 0 1 5.356-1.857M6 17v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 0 1 9.288 0M14 4a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM6 7a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
            stroke={stroke ? stroke : '#576788'}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
)

export default PeopleIcon
