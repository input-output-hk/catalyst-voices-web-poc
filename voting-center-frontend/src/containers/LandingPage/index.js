import React, { useEffect, useState } from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Joyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride'
import { useLocation, useNavigate } from 'react-router-dom'
import CardImage1 from '../../assets/images/card-background-1.png'
import CardImage2 from '../../assets/images/card-background-2.png'
import CardItem from '../../components/Card'
import RegistrationInfo from '../../components/RegistrationInfo'
import SmallModal from '../../components/SmallModal'

import { useAppContext } from '../../lib/context'

import './styles.scss'

const LandingPage = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const {
        connectedWallet,
        isVoter,
        isDrep,
        setIsConnectClicked,
        drepPendingReview,
        gvcVisitedRoutes,
        setGvcVisitedRoutes,
        startTourGuide,
        setStartTourGuide,
        settings,
    } = useAppContext()

    const { dRep_registration_open } = settings

    const [showModal, setShowModal] = useState(false)
    const [becomeVoterModal, setBecomeVoterModal] = useState(false)
    const [drepPendingModal, setDrepPendingModal] = useState(false)
    const [isDrepRegistrationOpenModal, setIsDrepRegistrationOpenModal] =
        useState(false)
    const [showGuide, setShowGuide] = useState(true)
    const [guide, setGuide] = useState({
        run: true,
        steps: [
            {
                target: '.drep-registration',
                content:
                    'If we are previously registered as a voter, clicking on the button "Register as a drep" takes us to the drep registration form where we can register as a dRep.',
                disableBeacon: true,
            },
        ],
        stepIndex: 0,
    })

    const handleClose = () => {
        setShowModal(false)
        setBecomeVoterModal(false)
        setDrepPendingModal(false)
        setIsDrepRegistrationOpenModal(false)
    }

    const handleJoyrideCallback = (data) => {
        const { action, index, status, type } = data

        if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
            setGuide({
                ...guide,
                stepIndex: index + (action === ACTIONS.PREV ? -1 : 1),
            })
        } else if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
            setGuide({ ...guide, run: false })

            let setGvcVisitedRoutesClone = gvcVisitedRoutes
                ? gvcVisitedRoutes
                : []

            setGvcVisitedRoutesClone.push(location.pathname)
            setGvcVisitedRoutes(setGvcVisitedRoutesClone)
            localStorage.setItem(
                'gvc-visited-routes',
                JSON.stringify(setGvcVisitedRoutesClone)
            )
        }
    }

    const handleShowGuide = () => {
        if (gvcVisitedRoutes?.includes(location.pathname)) {
            setShowGuide(false)
            setStartTourGuide(false)
        } else {
            setShowGuide(true)
        }
    }

    useEffect(() => {
        handleShowGuide()
    }, [])

    return (
        <>
            <Row>
                <Joyride
                    steps={guide.steps}
                    callback={handleJoyrideCallback}
                    continuous={true}
                    showProgress={true}
                    showSkipButton={true}
                    run={showGuide || startTourGuide}
                    stepIndex={guide.stepIndex}
                    styles={{
                        options: {
                            primaryColor: '#7c89f7',
                        },
                    }}
                    disableScrollParentFix
                />
                <Col sm={12}>
                    <CardItem
                        className="card-item-single drep-registration"
                        buttonText={'Register as a dRep'}
                        buttonLink={
                            drepPendingReview
                                ? null
                                : connectedWallet &&
                                  isVoter &&
                                  !isDrep &&
                                  dRep_registration_open &&
                                  'drep-registration'
                        }
                        onClick={
                            dRep_registration_open
                                ? connectedWallet
                                    ? isVoter
                                        ? drepPendingReview
                                            ? () => setDrepPendingModal(true)
                                            : isDrep
                                            ? () => setShowModal(true)
                                            : null
                                        : () => setBecomeVoterModal(true)
                                    : () => setIsConnectClicked(true)
                                : () => setIsDrepRegistrationOpenModal(true)
                        }
                        img={CardImage2}
                        variant={'left'}
                        title={'Vote as an expert Help grow Cardano'}
                        content={
                            "You can register to be a dRep. dReps are voters' representatives and can vote on their behalf."
                        }
                    />
                </Col>
            </Row>
            <Row className="g-3">
                <Col>
                    <CardItem
                        className="card-item-single h-100"
                        img={CardImage1}
                        variant={'left'}
                        title={'Represent your community'}
                        content={
                            'If you are a domain expert or experienced with Project Catalyst and Cardano, register to become a dRep today.'
                        }
                    />
                </Col>
                <Col>
                    <CardItem
                        className="card-item-single h-100"
                        img={CardImage1}
                        variant={'left'}
                        title={'Earn rewards'}
                        content={
                            'Voting on behalf of others comes with responsibility, and you can earn rewards for participating.'
                        }
                    />
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col md={8} className="drep-info-landing">
                    <RegistrationInfo
                        drepHeading={'Ready to get started?'}
                        drepText={'Become a dRep and support the community.'}
                        drepButtonText={'Register as a dRep'}
                        buttonLink={
                            drepPendingReview
                                ? null
                                : connectedWallet &&
                                  isVoter &&
                                  !isDrep &&
                                  dRep_registration_open &&
                                  'drep-registration'
                        }
                        onClick={
                            dRep_registration_open
                                ? connectedWallet
                                    ? isVoter
                                        ? drepPendingReview
                                            ? () => setDrepPendingModal(true)
                                            : isDrep
                                            ? () => setShowModal(true)
                                            : null
                                        : () => setBecomeVoterModal(true)
                                    : () => setIsConnectClicked(true)
                                : () => setIsDrepRegistrationOpenModal(true)
                        }
                    />
                </Col>
            </Row>

            {showModal && (
                <SmallModal
                    show={showModal}
                    onClose={() => handleClose()}
                    secondButtonText={`Close`}
                    secondOnClick={() => handleClose()}
                    buttonText={`Dashboard`}
                    onClick={() => navigate('/dashboard')}
                    title={`Already registered!`}
                    description=""
                />
            )}

            {becomeVoterModal && (
                <SmallModal
                    show={becomeVoterModal}
                    onClose={() => handleClose()}
                    secondButtonText={`Close`}
                    secondOnClick={() => handleClose()}
                    buttonText={`Home`}
                    onClick={() => navigate('/')}
                    title={`You need to register as voter first.`}
                    description=""
                />
            )}

            {drepPendingModal && (
                <SmallModal
                    show={drepPendingModal}
                    onClose={() => handleClose()}
                    secondButtonText={`Close`}
                    secondOnClick={() => handleClose()}
                    buttonText={`Home`}
                    onClick={() => navigate('/')}
                    title={`Your dRep registration is pending review.`}
                    description=""
                />
            )}

            {isDrepRegistrationOpenModal && (
                <SmallModal
                    show={isDrepRegistrationOpenModal}
                    onClose={() => handleClose()}
                    secondButtonText={`Close`}
                    secondOnClick={() => handleClose()}
                    buttonText={`Home`}
                    onClick={() => navigate('/')}
                    description={`We're sorry, but dRep registration is currently not available.`}
                    title=""
                />
            )}
        </>
    )
}
export default LandingPage
