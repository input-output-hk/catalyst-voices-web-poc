import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { Modal as BootstrapModal } from 'react-bootstrap'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Avatar from '../../assets/images/profile-avatar.svg'
import CopyIcon from '../../assets/svg/CopyIcon/CopyIcon'
import { useAppContext } from '../../lib/context'
import AvatarImage from '../AvatarImage'
import ButtonComponent, { ButtonSizes, ButtonTypes } from '../Button'
import CardButton from '../CardButton'

import { Link } from 'react-router-dom'
import DetailedView from '../../assets/svg/DetailedView'
import './styles.scss'

const DEFAULT_CONTENT_TEXT = 'Card content text'
const DEFAULT_PROFILE_JOB = 'Profile Job'
const DEFAULT_PROFILE_NAME = 'Profile Name'

function ProfileCard({
    drep,
    onClick,
    buttonText,
    title,
    contentText,
    profile,
    buttonIcon,
    className,
    disabledButton,
    showButton,
    retire,
    showDetailedView,
    showVanityUrl,
}) {
    // pathname from url
    const { binaryImageRegex, urlRegex, isDrep } = useAppContext()
    const [drepProfileLink, setDrepProfileLink] = useState()
    const [showUrl, setShowUrl] = useState(true)

    useEffect(() => {
        let domain = new URL(window.location.href)
        let origin = domain.origin
        let urlRegex =
            /^\/dReps|\/dashboard|\/delegations|\/voting-confirmation|\/challenges(\/.*)?$/
        let result = urlRegex.test(domain.pathname)
        setShowUrl(result)
        setDrepProfileLink(`${origin}/drep/`)
    }, [drepProfileLink])

    function copyToClipboard(value) {
        navigator.clipboard.writeText(value)
    }

    return (
        <BootstrapModal.Dialog centered className={`profile-card ${className}`}>
            {title && <BootstrapModal.Title>{title}</BootstrapModal.Title>}
            <BootstrapModal.Body>
                <Row className="content-row g-0 m-0">
                    {profile ? (
                        <Col className="d-flex align-content-center justify-content-start align-items-center g-0 m-0 content-col">
                            <AvatarImage
                                source={
                                    binaryImageRegex.test(drep?.avatar) ||
                                    urlRegex.test(drep?.avatar)
                                        ? drep.avatar
                                        : Avatar
                                }
                                name={drep?.avatar ? null : drep?.name}
                                className="profile-card-avatar"
                            />

                            <Row className="d-flex m-0 p-0 g-0 flex-column profile-card-description mt-3 w-100">
                                <Col className="d-flex align-items-center justify-content-between">
                                    <Col className="d-flex g-0 m-0 justify-content-start align-content-center name-description">
                                        <p className="profile-card-profile-name">
                                            {drep?.name || DEFAULT_PROFILE_NAME}
                                        </p>
                                    </Col>
                                    {showDetailedView && (
                                        <Link
                                            to={`/drep/${drep?.username}`}
                                            state={{ isDrepProfile: isDrep }}
                                            className="ms-2"
                                        >
                                            <ButtonComponent
                                                type={ButtonTypes.Ghost}
                                                size={ButtonSizes.XS}
                                                endIcon={<DetailedView />}
                                            >
                                                Detailed view
                                            </ButtonComponent>
                                        </Link>
                                    )}
                                </Col>

                                {drep?.username && (
                                    <Col className="d-flex g-0 m-0 justify-content-start align-content-center username-description">
                                        <p className="profile-card-profile-username">
                                            @{drep?.username}
                                        </p>
                                    </Col>
                                )}
                                {showVanityUrl && drep?.username && showUrl && (
                                    <Col className="d-flex g-0 m-0 justify-content-start align-content-center url-description">
                                        <p
                                            onClick={() =>
                                                copyToClipboard(
                                                    `${drepProfileLink}${drep?.username}`
                                                )
                                            }
                                            className="profile-card-profile-url"
                                        >
                                            Copy profile vanity URL
                                        </p>
                                    </Col>
                                )}
                                <Col className="d-flex justify-content-start align-content-center g-0 m-0 p-0 job-description">
                                    <p
                                        className="profile-card-job-description"
                                        style={{ wordBreak: 'break-all' }}
                                    >
                                        {drep?.headline || DEFAULT_PROFILE_JOB}
                                    </p>
                                </Col>
                            </Row>
                        </Col>
                    ) : (
                        <Col className="d-flex flex-column align-content-center justify-content-start align-items-center g-0 m-0 content-col">
                            <p className="card-content-text">
                                {contentText
                                    ? contentText
                                    : DEFAULT_CONTENT_TEXT}
                            </p>
                        </Col>
                    )}
                </Row>
                {showButton ? (
                    <Row className="bottom-part">
                        {profile ? (
                            <CardButton
                                onClick={onClick}
                                className={'profile-card-button-text'}
                                disabled={disabledButton}
                            >
                                {buttonText}
                            </CardButton>
                        ) : retire ? (
                            <CardButton
                                onClick={onClick}
                                className={'profile-card-button-text'}
                                disabled={disabledButton}
                            >
                                {buttonText}
                            </CardButton>
                        ) : (
                            <ButtonComponent
                                leadingIcon={
                                    buttonIcon ? buttonIcon : <CopyIcon />
                                }
                                type={ButtonTypes.Ghost}
                                className={'not-profile-card-button'}
                                onClick={onClick}
                            >
                                {buttonText}
                            </ButtonComponent>
                        )}
                    </Row>
                ) : null}
            </BootstrapModal.Body>
        </BootstrapModal.Dialog>
    )
}

ProfileCard.propTypes = {
    profile: PropTypes.bool,
    onClick: PropTypes.func,
}

ProfileCard.defaultProps = {
    showButton: true,
    showDetailedView: true,
    showVanityUrl: true,
}

export default ProfileCard
