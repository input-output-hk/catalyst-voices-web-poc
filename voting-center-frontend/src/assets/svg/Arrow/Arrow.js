import * as React from 'react'

const Arrow = ({ props, left }) => (
    <svg
        className={`arrows-wrapper ${left ? 'left-arrow' : ''}`}
        width={24}
        height={25}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.951 18.148a1.2 1.2 0 0 1 0-1.697l3.952-3.951L9.95 8.549a1.2 1.2 0 0 1 1.697-1.698l4.8 4.8a1.2 1.2 0 0 1 0 1.697l-4.8 4.8a1.2 1.2 0 0 1-1.697 0Z"
            fill="#576788"
        />
    </svg>
)

export default Arrow
