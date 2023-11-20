import { useEffect, useReducer } from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Joyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride'
import { useLocation } from 'react-router-dom'
import ChallengeCard from '../../components/ChallengeCard'
import ChallengesVoterInfo from '../../components/ChallengesVoterInfo'
import ChallengesVotingPhase from '../../components/ChallengesVotingPhase'
import Filters from '../../components/Filters'
import Input from '../../components/Inputs/Input'
import { useAppContext } from '../../lib/context'
import { useNavigate } from 'react-router-dom'

import './styles.scss'

const DrepChallenges = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const {
        challengesList,
        gvcVisitedRoutes,
        setGvcVisitedRoutes,
        startTourGuide,
        setStartTourGuide,
        fund,
        challangesImages,
    } = useAppContext()

    const reducer = (state, action) => {
        switch (action.type) {
            case 'setFilteredChallengesList':
                return { ...state, filteredChallengesList: action.payload }
            case 'setSearchTerm':
                return { ...state, searchTerm: action.payload }
            case 'setShowFilters':
                return { ...state, showFilters: action.payload }
            case 'setShowGuide':
                return { ...state, showGuide: action.payload }
            case 'setGuide':
                return { ...state, guide: action.payload }
            default:
                throw new Error()
        }
    }

    const [state, dispatch] = useReducer(reducer, {
        filteredChallengesList: challengesList,
        searchTerm: '',
        showFilters: false,
        showGuide: true,
        guide: {
            run: true,
            steps: [
                {
                    target: '.challenges-search',
                    content:
                        'Here it is possible to search for proposals or challenges.',
                    disableBeacon: true,
                },
                {
                    target: '.challenges-list',
                    content: 'List of all challenges from the current fund.',
                    disableBeacon: true,
                },
            ],
            stepIndex: 0,
        },
    })

    const handleShowFilters = () => {
        dispatch({ type: 'setShowFilters', payload: !state.showFilters })
    }

    const handleJoyrideCallback = (data) => {
        const { action, index, status, type } = data

        if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
            dispatch({
                type: 'setGuide',
                payload: {
                    ...state.guide,
                    stepIndex: index + (action === ACTIONS.PREV ? -1 : 1),
                },
            })
        } else if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
            dispatch({
                type: 'setGuide',
                payload: { ...state.guide, run: false },
            })

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
            dispatch({
                type: 'setShowGuide',
                payload: false,
            })
            setStartTourGuide(false)
        } else {
            dispatch({
                type: 'setShowGuide',
                payload: false,
            })
        }
    }

    useEffect(() => {
        if (state.searchTerm.length === 0) {
            dispatch({
                type: 'setFilteredChallengesList',
                payload: challengesList,
            })
        }

        const filteredChallenges = challengesList?.filter((challenge) =>
            challenge.title
                .toLowerCase()
                .includes(state.searchTerm.toLowerCase())
        )
        dispatch({
            type: 'setFilteredChallengesList',
            payload: filteredChallenges,
        })
    }, [state.searchTerm])

    useEffect(() => {
        handleShowGuide()
    }, [])

    return (
        <Row className="dreps-challenges-wrapper">
            <Joyride
                steps={state.guide.steps}
                callback={handleJoyrideCallback}
                continuous={true}
                showProgress={true}
                showSkipButton={true}
                run={state?.showGuide || startTourGuide}
                stepIndex={state.guide.stepIndex}
                styles={{
                    options: {
                        primaryColor: '#7c89f7',
                    },
                }}
                disableScrollParentFix
            />
            <Col sm={12} className="d-block d-md-none mb-4">
                <ChallengesVotingPhase />
            </Col>
            <Col sm={12} md={8}>
                <ChallengesVoterInfo />

                <Row className="challenges-search">
                    <h2 className="dreps-phase-heading">
                        Challenges in {fund?.name}
                    </h2>
                    <Col md={11}>
                        <Input
                            onChange={(e) =>
                                dispatch({
                                    type: 'setSearchTerm',
                                    payload: e.target.value,
                                })
                            }
                            value={state?.searchTerm}
                            placeholder={
                                'Search name, proposal, challenges, topic...'
                            }
                        />
                    </Col>
                </Row>
                <Row className="dreps-sorting-content d-flex align-items-center my-4">
                    <Col
                        sm={12}
                        className="dreps-sort-content d-flex align-items-center justify-content-between ps-0 ps-md-4"
                    >
                        <div></div>
                        <p className="me-0 pe-0 me-md-4 pe-md-4 dreps-sort-result">
                            Showing {state.filteredChallengesList?.length}{' '}
                            results
                        </p>
                    </Col>
                    {state?.showFilters && (
                        <Col>
                            <Filters onClose={handleShowFilters} />
                        </Col>
                    )}
                </Row>
                <Row className="gx-3 gy-4 challenges-list">
                    {state.filteredChallengesList?.length !== 0 ? (
                        state.filteredChallengesList?.map(
                            (challenge, index) => (
                                <Col
                                    sm={12}
                                    md={4}
                                    key={index}
                                    onClick={() => {
                                        navigate(
                                            `/challenges/${challenge.id}`,
                                            {
                                                state: {
                                                    singleChallenge: challenge,
                                                },
                                            }
                                        )
                                    }}
                                >
                                    <ChallengeCard
                                        img={challangesImages?.find(
                                            (challengeImg) =>
                                                +challengeImg?.attributes
                                                    ?.challenge_id ===
                                                +challenge.id
                                        )}
                                        challenge={challenge}
                                    />
                                </Col>
                            )
                        )
                    ) : (
                        <Col
                            sm={12}
                            className="d-flex flex-column align-items-center mt-5 proposals-list-no-result"
                        >
                            <h3>No search results found</h3>
                            <p>Please try again</p>
                        </Col>
                    )}
                </Row>
            </Col>
            <Col sm={12} md={4} className="d-none d-md-block">
                <ChallengesVotingPhase />
            </Col>
        </Row>
    )
}
export default DrepChallenges
