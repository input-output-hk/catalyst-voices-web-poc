import * as React from 'react'

const WebIcon = ({
    stroke,
    width,
    height,
    strokeWidth,
    strokeLinecap,
    strokeLinejoin,
}) => (
    <svg
        width={width ? width : 20}
        height={height ? height : 21}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M1.055 9.354H3a2 2 0 0 1 2 2v1a2 2 0 0 0 2 2 2 2 0 0 1 2 2V19.3M6 2.29v1.564a2.5 2.5 0 0 0 2.5 2.5H9a2 2 0 0 1 2 2 2 2 0 1 0 4 0 2 2 0 0 1 2-2h1.064M13 18.842v-2.487a2 2 0 0 1 2-2h3.064m.936-4a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            stroke={stroke ? stroke : '#576788'}
            strokeWidth={strokeWidth ? strokeWidth : 2}
            strokeLinecap={strokeLinecap ? strokeLinecap : 'round'}
            strokeLinejoin={strokeLinejoin ? strokeLinejoin : 'round'}
        />
        <path
            d="m15 6.854 2.5-1v-1l-3.5-2.5-1.5-.5-4-.5-2.5 1 .5 3.5 2 .5 2 1 .5 2 1.5 1 2-1 .5-2.5ZM14 14.854h3v1.5l-2.5 1.5H13l1-3ZM8.5 14.854v4.5l-2.5-1-2-.5-2-3-1-5.5 3.5.5 1.5 4.5 2.5.5Z"
            fill="#576788"
        />
    </svg>
)

export default WebIcon
