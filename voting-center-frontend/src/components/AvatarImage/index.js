import React from 'react'
import Image from 'react-bootstrap/Image'
import CatalystLogo from '../../assets/images/logo-catalyst-mobile.svg'

import './styles.scss'

const AvatarImage = ({ source, name, className, ...props }) => {
    var initials = name
        ? name
              ?.split(' ')
              ?.slice(0, 2)
              ?.map(function (str) {
                  return str ? str[0].toUpperCase() : ''
              })
              ?.join('')
        : ''
    return (
        <div className="avatar-component-wrapper">
            <Image
                fluid
                src={source ? source : CatalystLogo}
                className={`avatar-img ${className}`}
                alt={'user'}
                {...props}
            />
            {name ? <span className="initials">{initials}</span> : null}
        </div>
    )
}

export default AvatarImage