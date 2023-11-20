import React, { useState } from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { Link } from 'react-router-dom'
import DiscordV2 from '../../assets/svg/Discord_v2'
import TelegramV2 from '../../assets/svg/Telegram_v2'
import TwitterV2 from '../../assets/svg/Twitter_v2'
import YoutubeV2 from '../../assets/svg/Youtube_v2'
import { useAppContext } from '../../lib/context'

import CatalystLogo from '../../assets/images/catalyst-logo.png'

import SmallModal from '../SmallModal'
import './styles.scss'

const Footer = ({ className }) => {
    const {
        isVoter,
        setStartTourGuide,
        setGvcVisitedRoutes,
        settings,
        connectedWallet,
        isDrep,
        drepPendingReview,
    } = useAppContext()
    const { is_voting_enabled, is_delegation_enabled, dRep_registration_open } =
        settings

    const [showDelegationDisabledModal, setShowDelegationDisabledModal] =
        useState(false)
    const [showVotingDisabledModal, setShowVotingDisabledModal] =
        useState(false)

    const handleStartTourGuide = () => {
        localStorage.removeItem('gvc-visited-routes')
        setGvcVisitedRoutes('')
        setStartTourGuide(true)
    }

    const handleClose = () => {
        setShowDelegationDisabledModal(false)
        setShowVotingDisabledModal(false)
    }

    return (
        <>
            <Row className={`footer ${className}`}>
                <Col sm={12} md={3}>
                    <Row>
                        <Col className="logo-link">
                            <Link to="/">
                                <img className="logo" src={CatalystLogo} />
                            </Link>
                        </Col>
                    </Row>

                    <Row className="mt-5 d-none d-md-block">
                        <Col>
                            <p className="mb-3">
                                <b>Follow us</b>
                            </p>

                            <Row>
                                <Col className="d-flex">
                                    <a
                                        href="https://t.me/cardanocatalyst"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="me-3"
                                    >
                                        <div className="social-wrapper">
                                            <TelegramV2 />
                                        </div>
                                    </a>
                                    <a
                                        href="https://twitter.com/InputOutputHK"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="me-3"
                                    >
                                        <div className="social-wrapper">
                                            <TwitterV2 />
                                        </div>
                                    </a>

                                    <a
                                        href="https://www.youtube.com/watch?v=P67YFdGedQ4&list=PLnPTB0CuBOByRhpTUdALq4J89m_h7QqLk"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="me-3"
                                    >
                                        <div className="social-wrapper">
                                            <YoutubeV2 />
                                        </div>
                                    </a>

                                    <a
                                        href="https://discord.com/invite/2RnUtK8"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="me-3"
                                    >
                                        <div className="social-wrapper">
                                            <DiscordV2 />
                                        </div>
                                    </a>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>

                <Col sm={12} md={3} className="mt-5 mt-md-0">
                    <p className="mb-1">
                        <b>Project Catalyst Voting</b>
                    </p>

                    <Link to="/">
                        <p>Home</p>
                    </Link>

                    {is_delegation_enabled && (
                        <Link
                            to={is_delegation_enabled ? '/delegations' : ''}
                            onClick={() => {
                                !is_delegation_enabled
                                    ? setShowDelegationDisabledModal(true)
                                    : null
                            }}
                        >
                            <p>Delegation</p>
                        </Link>
                    )}

                    {dRep_registration_open &&
                        connectedWallet &&
                        isVoter &&
                        !isDrep &&
                        !drepPendingReview && (
                            <Link to="/drep-registration">
                                <p>Register as a dRep</p>
                            </Link>
                        )}

                    {isVoter && (
                        <Link to="/dashboard">
                            <p>Wallet dashboard</p>
                        </Link>
                    )}

                    <Link
                        to={is_voting_enabled ? '/challenges' : ''}
                        onClick={() => {
                            !is_voting_enabled
                                ? setShowVotingDisabledModal(true)
                                : null
                        }}
                    >
                        <p>Challenges</p>
                    </Link>
                </Col>

                <Col sm={12} md={3} className="mt-3 mt-md-0">
                    <p className="mb-1">
                        <b>Other Resources</b>
                    </p>

                    <a
                        href="https://projectcatalyst.io/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <p>Projectcatalyst.io</p>
                    </a>

                    <a
                        href="https://cardano.org/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <p>Cardano.org</p>
                    </a>

                    <a
                        href="https://cardanofoundation.org/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <p>Cardano Foundation</p>
                    </a>

                    <a
                        href="https://www.essentialcardano.io/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <p>Essential Cardano</p>
                    </a>
                </Col>

                <Col sm={12} md={3} className="mt-3 mt-md-0">
                    <p className="mb-1">
                        <b>Contact</b>
                    </p>

                    <a href="mailto:support@projectcatalyst.io">
                        <p className="support-mail">
                            support@projectcatalyst.io
                        </p>
                    </a>

                    <p className="mb-1 mt-3">
                        <b>Support</b>
                    </p>

                    <p
                        className="start-tour-guide"
                        onClick={() => handleStartTourGuide()}
                    >
                        Start tour guide
                    </p>

                    <Row className="mt-4 d-md-none">
                        <Col>
                            <p className="mb-3">
                                <b>Follow us</b>
                            </p>

                            <Row>
                                <Col className="d-flex">
                                    <a
                                        href="https://t.me/cardanocatalyst"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="me-3"
                                    >
                                        <div className="social-wrapper">
                                            <TelegramV2 />
                                        </div>
                                    </a>
                                    <a
                                        href="https://twitter.com/InputOutputHK"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="me-3"
                                    >
                                        <div className="social-wrapper">
                                            <TwitterV2 />
                                        </div>
                                    </a>

                                    <a
                                        href="https://www.youtube.com/watch?v=P67YFdGedQ4&list=PLnPTB0CuBOByRhpTUdALq4J89m_h7QqLk"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="me-3"
                                    >
                                        <div className="social-wrapper">
                                            <YoutubeV2 />
                                        </div>
                                    </a>

                                    <a
                                        href="https://discord.com/invite/2RnUtK8"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="me-3"
                                    >
                                        <div className="social-wrapper">
                                            <DiscordV2 />
                                        </div>
                                    </a>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
            {showDelegationDisabledModal && (
                <SmallModal
                    show={showDelegationDisabledModal}
                    onClose={() => handleClose()}
                    secondButtonText={`Close`}
                    secondOnClick={() => handleClose()}
                    buttonText={`Home`}
                    onClick={() => handleClose()}
                    description={`We're sorry, but Delegations are currently not available.`}
                    title=""
                />
            )}

            {showVotingDisabledModal && (
                <SmallModal
                    show={showVotingDisabledModal}
                    onClose={() => handleClose()}
                    secondButtonText={`Close`}
                    secondOnClick={() => handleClose()}
                    buttonText={`Home`}
                    onClick={() => handleClose()}
                    description={`We're sorry, but Voting is currently not available.`}
                    title=""
                />
            )}
        </>
    )
}

export default Footer
