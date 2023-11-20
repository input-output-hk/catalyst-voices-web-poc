import * as React from 'react'

const Dislike = (props) => (
    <svg
        width={20}
        height={20}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M12 12h4.764a2 2 0 0 0 1.789-2.894l-3.5-7A2 2 0 0 0 13.263 1H9.247a2 2 0 0 0-.485.06L5 2m7 10v5a2 2 0 0 1-2 2h-.095A.905.905 0 0 1 9 18.096c0-.715-.211-1.413-.608-2.008L5 11V2m7 10h-2M5 2H3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2.5"
            stroke="#F8F9FC"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
)

export default Dislike