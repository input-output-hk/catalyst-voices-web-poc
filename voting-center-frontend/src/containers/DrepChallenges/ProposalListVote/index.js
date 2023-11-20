import React, { useEffect, useReducer } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import LineArrow from '../../../assets/svg/LineArrow'
import ChallengesVoterInfo from '../../../components/ChallengesVoterInfo'
import ChallengesVotingPhase from '../../../components/ChallengesVotingPhase'
import Input from '../../../components/Inputs/Input'
import ProposalCard from '../../../components/ProposalCard'
import { getProposalsForChallenge } from '../../../lib/api'
import { useAppContext } from '../../../lib/context'
import { useLocation } from 'react-router-dom'

import './styles.scss'

const ProposalListVote = () => {
    const { id } = useParams()
    const { settings, setIsLoading } = useAppContext()
    const location = useLocation()
    const { singleChallenge } = location.state

    const reducer = (state, action) => {
        switch (action.type) {
            case 'setSearchTerm':
                return { ...state, searchTerm: action.payload }
            case 'setProposalsList':
                return { ...state, proposalsList: action.payload }
            default:
                throw new Error()
        }
    }

    const [state, dispatch] = useReducer(reducer, {
        searchTerm: '',
        proposalsList: [],
        filteredProposalList: [],
    })

    useEffect(() => {
        const handleSingleChallenge = async () => {
            if (settings) {
                setIsLoading(true)
                const proposals = await getProposalsForChallenge(
                    settings?.event_id,
                    id
                )
                if (proposals) {
                    dispatch({
                        type: 'setProposalsList',
                        payload: proposals,
                    })
                }
                setIsLoading(false)
            }
        }
        handleSingleChallenge()
    }, [id, settings])

    return (
        <Row className="dreps-challenges-wrapper">
            <Col sm={12} className="d-block d-md-none mb-4">
                <ChallengesVotingPhase />
            </Col>
            <Col sm={12} md={8}>
                <ChallengesVoterInfo />

                <Row className="gx-3 gy-4">
                    <Col>
                        <Row className="drep-list-vote">
                            <Col>
                                <Link to={`/challenges`}>
                                    <div className="d-flex align-items-center back">
                                        <LineArrow />
                                        <p>Back</p>
                                    </div>
                                </Link>
                                <h2 className="header">
                                    {singleChallenge?.title}
                                </h2>
                                <p className="text">
                                    {singleChallenge?.description}
                                </p>

                                <Row className="challenges-search">
                                    <Col>
                                        <Input
                                            onChange={(e) =>
                                                dispatch({
                                                    type: 'setSearchTerm',
                                                    payload: e.target.value,
                                                })
                                            }
                                            value={state.searchTerm}
                                            placeholder={'Search proposals...'}
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
                                            Showing{' '}
                                            {
                                                state.proposalsList?.filter(
                                                    (proposal) =>
                                                        proposal?.title
                                                            .toLowerCase()
                                                            .includes(
                                                                state.searchTerm.toLowerCase()
                                                            )
                                                )?.length
                                            }{' '}
                                            results
                                        </p>
                                    </Col>
                                </Row>
                                <Row className="g-2">
                                    {state.proposalsList?.filter((proposal) =>
                                        proposal?.title
                                            .toLowerCase()
                                            .includes(
                                                state.searchTerm.toLowerCase()
                                            )
                                    )?.length !== 0 ? (
                                        state.proposalsList
                                            ?.filter((proposal) =>
                                                proposal?.title
                                                    .toLowerCase()
                                                    .includes(
                                                        state.searchTerm.toLowerCase()
                                                    )
                                            )
                                            ?.map((proposal, index) => (
                                                <Col sm={12} md={4} key={index}>
                                                    <ProposalCard
                                                        proposal={proposal}
                                                        singleChallenge={
                                                            singleChallenge
                                                        }
                                                    />
                                                </Col>
                                            ))
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
                        </Row>
                    </Col>
                </Row>
            </Col>
            <Col sm={12} md={4} className="d-none d-md-block">
                <ChallengesVotingPhase />
            </Col>
        </Row>
    )
}

export default ProposalListVote
