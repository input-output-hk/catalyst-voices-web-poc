import * as React from 'react'

const RssIcon = ({ fill, width, height }) => (
    <svg
        width={width ? width : 20}
        height={height ? height : 21}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2 .354h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-16a2 2 0 0 1 2-2Zm.844 2.783C6.683 3.137 10.29 4.629 13 7.34a14.266 14.266 0 0 1 4.204 10.155h-2.824c0-3.084-1.2-5.981-3.376-8.158A11.46 11.46 0 0 0 2.844 5.96V3.137Zm-.029 7.602V7.916c5.282 0 9.58 4.297 9.58 9.58H9.57a6.763 6.763 0 0 0-6.756-6.756Zm2.005 6.834a2.023 2.023 0 1 0 0-4.045 2.023 2.023 0 0 0 0 4.045Z"
            fill={fill ? fill : '#576788'}
        />
    </svg>
)

export default RssIcon
