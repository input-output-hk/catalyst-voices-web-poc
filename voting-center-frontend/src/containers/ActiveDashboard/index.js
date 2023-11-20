import { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Joyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride'

import ChallengesVoterInfo from '../../components/ChallengesVoterInfo'
import ChallengesVotingPhase from '../../components/ChallengesVotingPhase'
import VotingPhase from '../../components/VotingPhase'
import { handleGetDelegations } from '../../lib/api'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../../lib/context'
import RegistrationInfo from '../../components/RegistrationInfo'

import './styles.scss'

const ActiveDashboard = () => {
    const navigate = useNavigate()
    const {
        connectedWallet,
        setSelectedDreps,
        setDelegatedPower,
        gvcVisitedRoutes,
        setGvcVisitedRoutes,
        startTourGuide,
        setStartTourGuide,
        isDrep,
        activeVoterRegisterModal,
        setActiveVoterRegisterModal,
    } = useAppContext()
    const [showGuide, setShowGuide] = useState(true)
    const [tourStep, setTourStep] = useState(0)
    const [steps, setSteps] = useState([])

    const handleJoyrideCallback = (data) => {
        const { action, index, status, type } = data

        if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
            // Update state to advance the tour
            setTourStep(index + (action === ACTIONS.PREV ? -1 : 1))
        } else if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
            // Need to set our running state to false, so we can restart if we click start again.
            setTourStep({ run: false })
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
            let stepsData
            isDrep
                ? (stepsData = [
                      {
                          target: '.transaction-hash-link',
                          content:
                              'View transaction details on the Cardanoscan.',
                          disableBeacon: true,
                      },
                      {
                          target: '.staked',
                          content:
                              'Here we can see the total amount of ADA staked, delegated and total VP.',
                      },
                      {
                          target: '.info',
                          content:
                              'You also can share your profile and public voting key, as well see the public profile.',
                          placement: 'left',
                      },
                  ])
                : (stepsData = [
                      {
                          target: '.transaction-hash-link',
                          content:
                              'View transaction details on the Cardanoscan.',
                          disableBeacon: true,
                      },
                  ])
            setSteps(stepsData)
            setShowGuide(true)
        }
    }

    useEffect(() => {
        handleShowGuide()
    }, [])

    useEffect(() => {
        const handleGetVotersDelegations = async () => {
            if (connectedWallet) {
                const res = await handleGetDelegations(connectedWallet)
                if (res) {
                    let delegetePowerClone = []
                    let selectedDrepsClone = []

                    res.forEach((delegateClone) => {
                        delegetePowerClone.push({
                            id: delegateClone?.attributes?.drep_id,
                            value: delegateClone?.attributes?.weight_percent,
                        })
                        selectedDrepsClone.push(
                            delegateClone?.attributes?.drep_id
                        )
                    })

                    setSelectedDreps(selectedDrepsClone)
                    setDelegatedPower(delegetePowerClone)
                }
            }
        }

        handleGetVotersDelegations().catch(console.error)
    }, [])

    return (
        <div>
            {activeVoterRegisterModal ? (
                <RegistrationInfo
                    drepHeading={'You have registered as an active voter'}
                    drepText={
                        'Congratulations, you will be able to submit your own votes.'
                    }
                    drepButtonText={'My Dashboard'}
                    onClick={() => {
                        navigate('/dashboard')
                        setActiveVoterRegisterModal(false)
                    }}
                />
            ) : (
                <Row className="active-dashboard-wrapper">
                    <Col sm={12} md={8}>
                        <ChallengesVoterInfo isDashboard={true} />

                        <Col className="d-block d-md-none mt-4" md={4}>
                            <ChallengesVotingPhase isDashboard={true} />
                        </Col>
                        <VotingPhase />
                    </Col>
                    <Col className="d-none d-md-block info" md={4}>
                        <ChallengesVotingPhase isDashboard={true} />
                    </Col>
                    <Joyride
                        callback={handleJoyrideCallback}
                        stepIndex={tourStep}
                        steps={steps}
                        continuous={true}
                        showProgress={true}
                        showSkipButton={true}
                        run={showGuide || startTourGuide}
                        styles={{
                            options: {
                                primaryColor: '#7c89f7',
                            },
                        }}
                        disableScrollParentFix
                    />
                </Row>
            )}
        </div>
    )
}

export default ActiveDashboard
