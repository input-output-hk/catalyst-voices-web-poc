import * as React from 'react'

const DetailedView = (props) => (
    <svg
        width={21}
        height={20}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M8.834 5H5.5c-.92 0-1.667.746-1.667 1.667V15c0 .92.747 1.667 1.667 1.667h8.334c.92 0 1.666-.746 1.666-1.667v-3.333m-3.333-8.334h5m0 0v5m0-5-8.334 8.334"
            stroke={props.stroke ? props.stroke : '#576788'}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
)

export default DetailedView
