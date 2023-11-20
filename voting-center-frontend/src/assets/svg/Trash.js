import * as React from 'react'

const Trash = (props) => (
    <svg
        width={16}
        height={18}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="m13.737 4.833-.723 10.12a1.667 1.667 0 0 1-1.662 1.547H4.456c-.875 0-1.6-.676-1.663-1.548L2.071 4.833m4.166 3.334v5m3.334-5v5m.833-8.334v-2.5a.833.833 0 0 0-.833-.833H6.237a.833.833 0 0 0-.833.833v2.5m-4.167 0h13.334"
            stroke="#576788"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
)

export default Trash
