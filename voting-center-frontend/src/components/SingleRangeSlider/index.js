import React, { useRef, useEffect } from 'react'
import { useAppContext } from '../../lib/context'

import './styles.scss'

function SingleRangeSlider({ initial, id }) {
    const { delegatedPower, setDelegatedPower, setSliderChange, sliderChange } = useAppContext()

    const range = useRef(null)

    useEffect(() => {
        range.current.style.left = `0%`
        range.current.style.width = `${initial ? initial : 0}%`
    }, [sliderChange])


    const handleChange = event => {
        let objIndex = delegatedPower.findIndex((obj) => obj.id === id)

        if (objIndex >= 0) {
            let delegatedPowerClone = delegatedPower
            delegatedPowerClone[objIndex].value = Number(event.target.value)

            setSliderChange(event.target.value)
            setDelegatedPower(delegatedPowerClone)
        }
    }

    return (
        <div className="container">
            <div className="slider">
                <input
                    type="range"
                    min={0}
                    max={100}
                    value={initial}
                    onChange={(event) => {
                        handleChange(event)
                    }}
                    className="thumb thumb--zindex-5"
                />
                <div className="slider__track" />
                <div ref={range} className="slider__range" />
            </div>
        </div>
    )
}

export default SingleRangeSlider
