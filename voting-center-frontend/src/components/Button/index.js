import React from 'react'
import Button from 'react-bootstrap/Button'

import './styles.scss'

export const ButtonTypes = {
    Primary: 'primary',
    Secondary: 'secondary',
    Ghost: 'ghost',
    Destructive: 'destructive',
    Success: 'success',
    Danger: 'danger',
}

export const ButtonVariants = {
    IconButton: 'icon',
    Button: 'button',
}

export const ButtonSizes = {
    XS: 'xs',
    SM: 'sm',
    MD: 'md',
    LG: 'lg',
    XL: 'xl',
    XXL: 'xxl',
}

const ButtonComponent = ({
    children,
    onClick,
    className,
    leadingIcon,
    endIcon,
    type,
    variant,
    iconButton,
    size,
    disabled,
}) => {
    return (
        <Button
            className={`button-component btn-${type} btn-${size} ${className} d-flex align-items-center justify-content-center gx-2`}
            onClick={onClick}
            disabled={disabled}
        >
            <div className="d-flex align-items-center button-content">
                {variant !== ButtonVariants.IconButton && leadingIcon
                    ? leadingIcon
                    : variant === ButtonVariants.IconButton
                    ? iconButton
                    : null}
                {variant === ButtonVariants.IconButton ? null : (
                    <h5 className="mb-0">{children}</h5>
                )}
                {variant !== ButtonVariants.IconButton && endIcon && endIcon}
            </div>
        </Button>
    )
}

ButtonComponent.defaultProps = {
    children: 'Button',
    type: ButtonTypes.Primary,
    disabled: false,
    size: ButtonSizes.MD,
    variant: ButtonVariants.Button,
}

export default ButtonComponent
