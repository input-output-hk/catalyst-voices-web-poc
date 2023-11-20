import * as React from 'react'

const HollowStar = (props) => (
    <svg
        width={16}
        height={15}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M7.525 1.082a.5.5 0 0 1 .95 0l1.07 3.292a1.5 1.5 0 0 0 1.427 1.036h3.461a.5.5 0 0 1 .294.905l-2.8 2.034a1.5 1.5 0 0 0-.545 1.677l1.07 3.292a.5.5 0 0 1-.77.559l-2.8-2.035a1.5 1.5 0 0 0-1.763 0l-2.8 2.035a.5.5 0 0 1-.77-.56l1.07-3.29a1.5 1.5 0 0 0-.545-1.678l-2.8-2.034a.5.5 0 0 1 .293-.905H5.03a1.5 1.5 0 0 0 1.426-1.036l1.07-3.292Z"
            stroke="#7C89F7"
        />
    </svg>
)

export default HollowStar
