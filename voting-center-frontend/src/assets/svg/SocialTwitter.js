import * as React from 'react'

const SocialTwitter = ({ iconColor }) => (
    <svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#a)">
            <path
                d="M7.55 21.75c9.055 0 14.008-7.503 14.008-14.008 0-.211-.004-.427-.014-.638A9.999 9.999 0 0 0 24 4.555c-.898.4-1.85.66-2.826.774a4.95 4.95 0 0 0 2.165-2.723A9.897 9.897 0 0 1 20.213 3.8a4.93 4.93 0 0 0-8.394 4.49A13.985 13.985 0 0 1 1.673 3.15a4.93 4.93 0 0 0 1.523 6.57 4.93 4.93 0 0 1-2.23-.614v.06a4.922 4.922 0 0 0 3.95 4.829 4.893 4.893 0 0 1-2.221.084 4.933 4.933 0 0 0 4.597 3.422A9.875 9.875 0 0 1 0 19.538a13.969 13.969 0 0 0 7.55 2.212Z"
                fill={iconColor ? '#1DA1F2' : '#d2d7e8'}
            />
        </g>
        <defs>
            <clipPath id="a">
                <path fill="#fff" d="M0 0h24v24H0z" />
            </clipPath>
        </defs>
    </svg>
)

export default SocialTwitter
