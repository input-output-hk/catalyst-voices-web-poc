import * as React from "react"

const ThumbUp = (props) => (
  <svg
    width={25}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M14.5 10h4.764a2 2 0 0 1 1.789 2.894l-3.5 7A2 2 0 0 1 15.763 21h-4.017c-.163 0-.326-.02-.485-.06L7.5 20m7-10V5a2 2 0 0 0-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7.5 11v9m7-10h-2m-5 10h-2a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2H8"
      stroke="#fff"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default ThumbUp
