import * as React from 'react'

const Like = (props) => (
    <svg
        width={20}
        height={20}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M8 8H3.236a2 2 0 0 0-1.789 2.894l3.5 7A2 2 0 0 0 6.736 19h4.018c.163 0 .326-.02.485-.06l3.76-.94M8 8V3a2 2 0 0 1 2-2h.096c.5 0 .905.405.905.905 0 .714.211 1.412.608 2.006L15 9v9M8 8h2m5 10h2a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-2.5"
            stroke="#F8F9FC"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
)

export default Like