import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function ScrollToTopMainScroll() {
    const { pathname } = useLocation()

    useEffect(() => {
        const mainScrollContainer = document.getElementById(
            'main-scroll-wrapper'
        )
        mainScrollContainer.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }, [pathname])

    return null
}

export default ScrollToTopMainScroll
