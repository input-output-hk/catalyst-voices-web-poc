import React from 'react'

const SocialTelegram = ({ iconColor }) => (
    <svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#a)">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12ZM12.43 8.859c-1.167.485-3.5 1.49-6.998 3.014-.568.226-.866.447-.893.663-.046.366.412.51 1.034.705.085.027.173.054.263.084.613.199 1.437.432 1.865.441.389.008.823-.152 1.302-.48 3.268-2.207 4.955-3.322 5.061-3.346.075-.017.179-.039.249.024.07.062.063.18.056.212-.046.193-1.84 1.862-2.77 2.726-.29.269-.495.46-.537.504-.094.097-.19.19-.282.279-.57.548-.996.96.024 1.632.49.323.882.59 1.273.856.427.291.853.581 1.405.943.14.092.274.187.405.28.497.355.944.673 1.496.623.32-.03.652-.331.82-1.23.397-2.126 1.179-6.73 1.36-8.628a2.123 2.123 0 0 0-.02-.472.506.506 0 0 0-.172-.325c-.143-.117-.365-.142-.465-.14-.451.008-1.143.249-4.476 1.635Z"
                fill={iconColor ? 'url("#gradient")' : '#d2d7e8'}
            />
        </g>
        <defs>
            <clipPath id="a">
                <path fill="#fff" d="M0 0h24v24H0z" />
            </clipPath>
            <linearGradient id="gradient" gradientTransform="rotate(180)">
                <stop offset="0%" stopColor="#2AABEE" />
                <stop offset="100%" stopColor="#229ED9" />
            </linearGradient>
        </defs>
    </svg>
)

export default SocialTelegram
