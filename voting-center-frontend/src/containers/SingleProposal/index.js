import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import detailedWriteup from './proposal-data.json'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import LineArrow from '../../assets/svg/LineArrow'
import DetailedView from '../../assets/svg/DetailedView'
import WriteUp from '../../components/WriteUp'
import { useParams, useNavigate } from 'react-router-dom'
import { getSingleProposal } from '../../lib/api'
import { useAppContext } from '../../lib/context'
import Avatar from '../../assets/images/profile-avatar.svg'
import ButtonComponent, { ButtonTypes } from '../../components/Button'
import Like from '../../assets/svg/Like'
import Dislike from '../../assets/svg/Dislike'
import ChallengesVoterInfo from '../../components/ChallengesVoterInfo'
import { formatCurrency } from '../../lib/helpers'

import './styles.scss'

function SingleProposal() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { selectedChallenge, connectedWallet, isActiveVoter, isDrep } =
        useAppContext()
    const [singleProposal, setSingleProposal] = useState(null)

    const handleSingleProposal = async () => {
        const res = await getSingleProposal(id)
        setSingleProposal(res)
    }

    useEffect(() => {
        handleSingleProposal()
    }, [])

    return (
        <Row>
            <Col>
                <ChallengesVoterInfo />

                <Row className="single-proposal-wrapper">
                    <Col
                        sm={12}
                        md={6}
                        className="d-flex flex-column align-items-start proposal-info"
                    >
                        {/* Proposal Back Button Section */}
                        <div
                            onClick={() => navigate(-1)}
                            className="back-button-wrapper d-flex align-items-center mb-4"
                        >
                            <LineArrow />
                            <p className="back-button-text">Back</p>
                        </div>
                        {/* Proposal Title Section */}
                        <div className="proposal-title-wrapper d-flex align-items-center mb-4">
                            <a
                                href={singleProposal?.proposal_url}
                                target="_blank"
                                rel="noreferrer"
                                className="proposal-title d-flex align-items-center"
                            >
                                {singleProposal?.title}
                                <DetailedView stroke="#7c89f7" />
                            </a>
                        </div>
                        {/* Proposal First Info Section */}
                        <Row className="proposal-first-info w-100">
                            <Col className="align-items-start info-name">
                                <p>Budget requested</p>
                                <p>Proposal tags</p>
                                <p>Review score</p>
                                <p>Challenge:</p>
                            </Col>
                            <Col className="align-items-start info-value">
                                <p>
                                    ADA{' '}
                                    {formatCurrency(
                                        singleProposal?.proposal_funds
                                    )}
                                </p>
                                <p className="d-flex">
                                    - {/* {proposalInfo.tags.join(', ')} */}
                                </p>
                                <p>-{singleProposal?.reviews_score}</p>
                                <p>{selectedChallenge}</p>
                            </Col>
                        </Row>
                        {/* Proposal Second Info Section */}
                        <Row className="proposal-second-info flex-column align-items-start w-100">
                            <div>
                                <p className="second-info-title">
                                    Problem statement
                                </p>
                                <p className="second-info-text">
                                    {singleProposal?.proposal_summary}
                                </p>
                            </div>
                            <div>
                                <p className="second-info-title">Solution</p>
                                <p className="second-info-text">
                                    {singleProposal?.proposal_solution}
                                </p>
                            </div>
                            {/* <div>
                                <p className="second-info-title">Team</p>
                                <div className="d-flex proposal-team w-100 justify-content-between align-items-center">
                                    {proposalInfo.team.map(
                                        ({ name, avatar }, index) => (
                                            <div
                                                key={index}
                                                className="d-flex flex-column align-items-center"
                                            >
                                                <Image
                                                    fluid
                                                    src={`assets/img/${avatar}`}
                                                    alt="Catalyst Logo"
                                                    className="team-avatar mb-2"
                                                />
                                                <p className="team-name">
                                                    {name}
                                                </p>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div> */}
                            <Row>
                                <p className="second-info-title">Team</p>
                                <Col sm={12} className="mt-3">
                                    <div className="proposer-wrapper">
                                        <Image
                                            fluid
                                            src={Avatar}
                                            alt="avatar"
                                        />
                                        <p className="mb-0 mt-2 proposer-name">
                                            {
                                                singleProposal?.proposer
                                                    ?.proposer_name
                                            }
                                        </p>
                                    </div>
                                </Col>
                            </Row>
                            <div>
                                <p className="second-info-title">Experience</p>
                                <p className="second-info-text">
                                    {
                                        singleProposal?.proposer
                                            ?.proposer_relevant_experience
                                    }
                                </p>
                            </div>
                        </Row>
                    </Col>
                    <Col sm={12} md={6} className="mt-3 mt-md-0">
                        {detailedWriteup && (
                            <WriteUp
                                textData={detailedWriteup.detailed_writeup}
                            />
                        )}

                        {connectedWallet ? (
                            isActiveVoter || isDrep ? (
                                <div className="d-flex flex-column justify-content-center align-items-center vote-buttons w-100">
                                    <p>Cast your vote</p>
                                    <div className="d-flex justify-content-center w-100">
                                        <Link
                                            to="/voting-confirmation"
                                            state={{
                                                vote: true,
                                                title: singleProposal?.title,
                                                budget: formatCurrency(
                                                    singleProposal?.proposal_funds
                                                ),
                                            }}
                                        >
                                            <ButtonComponent
                                                variant="button"
                                                endIcon={<Like />}
                                                type={ButtonTypes.Success}
                                            >
                                                Yey
                                            </ButtonComponent>
                                        </Link>
                                        <Link
                                            to="/voting-confirmation"
                                            state={{
                                                vote: false,
                                                title: singleProposal?.title,
                                                budget: formatCurrency(
                                                    singleProposal?.proposal_funds
                                                ),
                                            }}
                                        >
                                            <ButtonComponent
                                                variant="button"
                                                endIcon={<Dislike />}
                                                type="destructive"
                                            >
                                                Ney
                                            </ButtonComponent>
                                        </Link>
                                    </div>
                                </div>
                            ) : null
                        ) : null}
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default SingleProposal
