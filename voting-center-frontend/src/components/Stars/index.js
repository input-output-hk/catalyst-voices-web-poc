import React from 'react'

import FullStar from '../../assets/svg/FullStar'
import HollowStar from '../../assets/svg/HollowStar'
import DarkStar from '../../assets/svg/DarkStar'

import './styles.scss'
import DarkHollowStar from '../../assets/svg/DarkHollowStar'

const Stars = ({ rating, color }) => {
    const full = new Array(rating).fill('fullStar')
    const hollow = new Array(5 - full.length).fill('hollowStars')

    return (
        <div className="d-flex stars">
            {full.map((star, index) =>
                color === 'dark' ? (
                    <DarkStar key={`${star}-${index}`} />
                ) : (
                    <FullStar key={`${star}-${index}`} />
                )
            )}
            {hollow.map((star, index) =>
                color === 'dark' ? (
                    <DarkHollowStar key={`${star}-${index}`} />
                ) : (
                    <HollowStar key={`${star}-${index}`} />
                )
            )}
        </div>
    )
}

export default Stars
