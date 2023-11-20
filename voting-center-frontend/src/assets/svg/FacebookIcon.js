import * as React from 'react'

const FacebookIcon = ({ fill, width, height }) => (
    <svg
        width={width ? width : 21}
        height={height ? height : 21}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 10.41c0 4.972 3.791 9.106 8.75 9.945v-7.223H6.125v-2.777H8.75V8.131c0-2.5 1.691-3.888 4.084-3.888.757 0 1.575.11 2.332.221v2.556h-1.341c-1.284 0-1.575.611-1.575 1.39v1.944h2.8l-.466 2.777H12.25v7.223c4.959-.839 8.75-4.972 8.75-9.945C21 4.88 16.275.354 10.5.354S0 4.88 0 10.41Z"
            fill={fill ? fill : '#576788'}
        />
    </svg>
)

export default FacebookIcon
