import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import SocialDiscord from '../../../assets/svg/SocialDiscord'
import SocialFacebook from '../../../assets/svg/SocialFacebook'
import SocialGithub from '../../../assets/svg/SocialGithub'
import SocialLinkedin from '../../../assets/svg/SocialLinkedin'
import SocialTelegram from '../../../assets/svg/SocialTelegram'
import SocialTwitter from '../../../assets/svg/SocialTwitter'
import SocialYoutube from '../../../assets/svg/SocialYoutube'

import './styles.scss'

export const Socials = {
    facebook: 'Facebook',
    discord: 'Discord',
    linkedin: 'Linkedin',
    twitter: 'Twitter',
    telegram: 'Telegram',
    github: 'Github',
    youtube: 'Youtube',
}

const SocialInput = ({
    social,
    onChange,
    value,
    labelClassName,
    inputIconClassName,
    isInvalid,
    focused,
}) => {
    const [color, setColor] = useState(false)

    const SocialsData = {
        facebook: {
            label: Socials.facebook,
            icon: <SocialFacebook iconColor={color} />,
        },
        discord: {
            label: Socials.discord,
            icon: <SocialDiscord iconColor={color} />,
        },
        linkedin: {
            label: Socials.linkedin,
            icon: <SocialLinkedin iconColor={color} />,
        },
        twitter: {
            label: Socials.twitter,
            icon: <SocialTwitter iconColor={color} />,
        },
        telegram: {
            label: Socials.telegram,
            icon: <SocialTelegram iconColor={color} />,
        },
        github: {
            label: Socials.github,
            icon: <SocialGithub iconColor={color} />,
        },
        youtube: {
            label: Socials.youtube,
            icon: <SocialYoutube iconColor={color} />,
        },
    }

    useEffect(() => {
        value ? setColor(true) : setColor(false)
    }, [value])

    return (
        <>
            <Form.Label
                htmlFor="inputPassword5"
                className={`social-input-label ${labelClassName}`}
            >
                {SocialsData[Socials[social].toLowerCase()].label}
            </Form.Label>
            <InputGroup
                className={`mb-3 social-input-group ${
                    isInvalid && 'invalid-input'
                }`}
            >
                <Form.Control
                    placeholder={`${
                        SocialsData[Socials[social].toLowerCase()].label
                    } username`}
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    className="social-input-text"
                    onChange={onChange}
                    value={value ? value : ''}
                    focused={focused}
                ></Form.Control>
                <InputGroup.Text
                    id="basic-addon1"
                    className={`social-input-icon ${inputIconClassName}`}
                >
                    {SocialsData[Socials[social].toLowerCase()].icon}
                </InputGroup.Text>
            </InputGroup>
        </>
    )
}

export default SocialInput
