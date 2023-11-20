import * as React from 'react'

const Heart = (props) => (
    <svg
        width={16}
        height={15}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1.172 1.672a4 4 0 0 1 5.656 0L8 2.843l1.172-1.171a4 4 0 1 1 5.656 5.656L8 14.157 1.172 7.328a4 4 0 0 1 0-5.656Z"
            fill="#EF4343"
        />
    </svg>
)

export default Heart