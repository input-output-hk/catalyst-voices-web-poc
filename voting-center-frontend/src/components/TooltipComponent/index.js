import React, { forwardRef, useRef } from 'react'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

export const TooltipPositions = {
    start: 'start',
    end: 'end',
    center: false,
}

export const TooltipPlacements = {
    top: 'top',
    bottom: 'bottom',
    right: 'right',
    left: 'left',
    auto: 'auto',
}
// eslint-disable-next-line react/display-name
const CustomChild = forwardRef((props, ref) => {
    return <div ref={ref}>{props.children}</div>
})

/**
 * Generates a Overlay Tooltip
 *
 * @param {string} text -  Text displayed inside of Tooltip
 * @param {boolean} show -  Show Tooltip right away without any state
 * @param {string} placement - It can be `top`|`bottom`|`right`|`left`|`auto`, and it is used for positioning the Tooltip
 * @param {string} position - It can be `start`|`end` and it is used for positioning the arrow of Tooltip
 * @param {number} showDelay - Number in `ms` for setting the delay for showing the Tooltip
 * @param {number} hideDelay - Number in `ms` for setting the delay for hiding the Tooltip
 * @param {string|string[]} trigger - It can be `hover`| `click`|`focus` or `array` of one or more of those and it is used for triggering the Tooltip
 * @param {string} className - Adding styling for Tooltip
 *
 * @returns {OverlayTrigger} ToolTip Overlay
 */
const TooltipComponent = ({
    children,
    text,
    position,
    placement,
    showDelay,
    hideDelay,
    trigger,
    show,
    className,
}) => {
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            {text}
        </Tooltip>
    )

    const target = useRef(null)

    return (
        <OverlayTrigger
            placement={position ? `${placement}-${position}` : `${placement}`}
            delay={{ show: { showDelay }, hide: { hideDelay } }}
            trigger={trigger}
            className={`${className}`}
            overlay={renderTooltip}
            target={target.current}
        >
            <div ref={target}>
                <CustomChild>{children}</CustomChild>
            </div>
        </OverlayTrigger>
    )
}

TooltipComponent.defaultProps = {
    showDelay: 200,
    hideDelay: 400,
    placement: TooltipPlacements.top,
}

export default TooltipComponent
