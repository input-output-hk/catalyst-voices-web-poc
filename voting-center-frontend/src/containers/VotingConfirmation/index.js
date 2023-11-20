import { useEffect, useReducer } from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { useLocation, useNavigate } from 'react-router-dom'
import LineArrow from '../../assets/svg/LineArrow'
import ThumbDown from '../../assets/svg/ThumbDown'
import ThumbUp from '../../assets/svg/ThumbUp'
import ButtonComponent, {
    ButtonSizes,
    ButtonTypes,
} from '../../components/Button'
import ChallengesVoterInfo from '../../components/ChallengesVoterInfo'
import ChallengesVotingPhase from '../../components/ChallengesVotingPhase'
import SmallModal from '../../components/SmallModal'
import {
    getProposalsBallot,
    handleVoting,
    getAccountVotes,
    getSingleProposal,
} from '../../lib/api'
import { useAppContext } from '../../lib/context'
import ErrorNotice from '../../components/Notices/ErrorNotice'
import GeneralNotice from '../../components/Notices/GeneralNotice'
import { formatCurrency } from '../../lib/helpers'

import './styles.scss'

const VotingConfirmation = () => {
    const location = useLocation()
    const { settings, connectedWallet, setIsLoading } = useAppContext()
    const { vote, proposalId, challenge } = location.state

    const navigate = useNavigate()

    const initialState = {
        singeProposal: null,
        confirmVoteClicked: false,
        proposalsBallot: null,
        accountVotes: null,
        isVotedProposal: false,
        showErrorText: false,
    }

    function reducer(state, action) {
        switch (action.type) {
            case 'setSingleProposal':
                return { ...state, singeProposal: action.payload }
            case 'setConfirmVoteClicked':
                return { ...state, confirmVoteClicked: action.payload }
            case 'setProposalsBallot':
                return { ...state, proposalsBallot: action.payload }
            case 'setAccountVotes':
                return { ...state, accountVotes: action.payload }
            case 'setIsVotedProposal':
                return { ...state, isVotedProposal: action.payload }
            case 'setShowErrorText':
                return { ...state, showErrorText: action.payload }
            default:
                throw new Error()
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    const choiceIndex = () => {
        const lowercasedItem = vote?.toLowerCase()
        return state.proposalsBallot?.choices.indexOf(lowercasedItem)
    }

    const handleVoteClicked = async () => {
        try {
            const { data, error } = await handleVoting(
                connectedWallet,
                state.proposalsBallot?.voteplans[0]?.chain_proposal_index,
                state.proposalsBallot?.voteplans[0]?.chain_voteplan_id,
                choiceIndex()
            )

            if (error) {
                dispatch({
                    type: 'setShowErrorText',
                    payload: true,
                })
                return
            }
            if (data) {
                dispatch({
                    type: 'setConfirmVoteClicked',
                    payload: true,
                })
            }
        } catch (error) {
            dispatch({
                type: 'setShowErrorText',
                payload: true,
            })
        }
    }
    const handleClose = () => {
        dispatch({
            type: 'setConfirmVoteClicked',
            payload: false,
        })
        navigate(-1)
    }

    useEffect(() => {
        const handeSingleProposal = async () => {
            if (settings.event_id && challenge.id && proposalId) {
                setIsLoading(true)
                const proposal = await getSingleProposal(
                    settings?.event_id,
                    challenge?.id,
                    proposalId
                )
                dispatch({
                    type: 'setSingleProposal',
                    payload: proposal,
                })
                setIsLoading(false)
            }
        }
        const handeProposalBallot = async () => {
            if (settings.event_id && challenge.id && proposalId) {
                setIsLoading(true)
                const proposalsBallotData = await getProposalsBallot(
                    settings?.event_id,
                    challenge?.id,
                    proposalId
                )

                dispatch({
                    type: 'setProposalsBallot',
                    payload: proposalsBallotData,
                })
                setIsLoading(false)
            }
        }
        handeProposalBallot()
        handeSingleProposal()
    }, [settings, challenge, proposalId])

    useEffect(() => {
        const handleAccountVotes = async () => {
            if (state.proposalsBallot) {
                setIsLoading(true)
                const votes = await getAccountVotes(connectedWallet?.voting_key)

                if (votes) {
                    const votePlanIdVotes = votes.find(
                        (item) =>
                            item.vote_plan_id ===
                            state.proposalsBallot.voteplans[0].chain_voteplan_id
                    )

                    if (votePlanIdVotes) {
                        dispatch({
                            type: 'setAccountVotes',
                            payload: votePlanIdVotes,
                        })
                    }
                }
                setIsLoading(false)
            }
        }

        handleAccountVotes()
    }, [state.proposalsBallot])

    useEffect(() => {
        const handleIsVotedProposal = () => {
            if (
                state.accountVotes &&
                state.proposalsBallot &&
                state.accountVotes?.votes?.includes(
                    state.proposalsBallot?.voteplans[0]?.chain_proposal_index
                )
            ) {
                dispatch({
                    type: 'setIsVotedProposal',
                    payload: true,
                })
            } else {
                dispatch({
                    type: 'setIsVotedProposal',
                    payload: false,
                })
            }
        }

        handleIsVotedProposal()
    }, [state.accountVotes, state.proposalsBallot])

    return (
        <Row className="vote-confirmation-wrapper">
            <Col sm={12} className="d-block d-md-none mb-4">
                <ChallengesVotingPhase />
            </Col>
            <Col sm={12} md={8}>
                <ChallengesVoterInfo />
                <Row className="gx-3 gy-4">
                    <Col>
                        <Row className="vote-confirmation">
                            <Col>
                                <div
                                    onClick={() => navigate(-1)}
                                    className="d-flex align-items-center back"
                                >
                                    <LineArrow />
                                    <p>Back</p>
                                </div>
                                <Col className="d-flex align-items-center">
                                    <h2 className="header">
                                        {state.singeProposal?.title}
                                    </h2>
                                    <ButtonComponent
                                        type={
                                            vote === 'Yes'
                                                ? ButtonTypes.Success
                                                : ButtonTypes.Destructive
                                        }
                                        size={ButtonSizes.SM}
                                        endIcon={
                                            vote === 'Yes' ? (
                                                <ThumbUp />
                                            ) : (
                                                <ThumbDown />
                                            )
                                        }
                                        className="ms-3 vote-button"
                                    >
                                        {vote}
                                    </ButtonComponent>
                                </Col>
                                <Row className="justify-content-md-start mt-3 mb-3">
                                    <Col md={3} className="budget-text">
                                        Budget Requested
                                    </Col>
                                    <Col md={3} className="budget-value">
                                        ${' '}
                                        {formatCurrency(
                                            state.singeProposal?.funds
                                        )}{' '}
                                        USD_ADA
                                    </Col>
                                </Row>

                                {state.showErrorText ? (
                                    <Row>
                                        <Col>
                                            <ErrorNotice
                                                label={
                                                    'An error occurred during voting. Please try again.'
                                                }
                                            />
                                        </Col>
                                    </Row>
                                ) : (
                                    <>
                                        <Row className="mt-3">
                                            <Col>
                                                {state.isVotedProposal ? (
                                                    <ErrorNotice
                                                        label={
                                                            'Your vote for this proposal has already been recorded. Unfortunately, re-voting is not permitted!'
                                                        }
                                                    />
                                                ) : (
                                                    <GeneralNotice
                                                        label=" You can only submit a vote once
                                                per proposal, make sure this is
                                                correct!"
                                                    />
                                                )}
                                            </Col>
                                        </Row>

                                        {!state.isVotedProposal && (
                                            <Row className="justify-content-md-center">
                                                <ButtonComponent
                                                    className="mt-4"
                                                    onClick={handleVoteClicked}
                                                >
                                                    Confirm vote
                                                </ButtonComponent>
                                            </Row>
                                        )}
                                    </>
                                )}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
            <Col sm={12} md={4} className="d-none d-md-block">
                <ChallengesVotingPhase />
            </Col>
            {state.confirmVoteClicked && (
                <SmallModal
                    show={state.confirmVoteClicked}
                    title={'Your vote has been submitted'}
                    description="Congratulations, you have successfully submitted your vote on this proposal."
                    buttonText="Close"
                    onClick={handleClose}
                    onClose={handleClose}
                />
            )}
        </Row>
    )
}

export default VotingConfirmation
