import * as React from "react"

const StepCheck = (props) => (
  <svg
    width={22}
    height={22}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx={11} cy={11} r={11}/>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.707 6.293a1 1 0 0 1 0 1.414l-8 8a1 1 0 0 1-1.414 0l-4-4a1 1 0 1 1 1.414-1.414L9 13.586l7.293-7.293a1 1 0 0 1 1.414 0Z"
      fill="#fff"
    />
  </svg>
)

export default StepCheck
