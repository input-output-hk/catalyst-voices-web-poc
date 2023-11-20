import React from 'react'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import DetailedView from '../../assets/svg/DetailedView'

import './styles.scss'

const ChallengeCard = ({ img, challenge, className, onCardClick }) => {
    const handleInnerLinkClick = (e) => {
        e.stopPropagation()
    }

    return (
        <Card
            className={`${className} challenge-card h-100`}
            onClick={onCardClick}
        >
            <Card.Img variant="top" src={img?.attributes?.challenge_img} />
            <Card.Body>
                <Row className="challenge-card-content h-100">
                    <Col>
                        <Row className="d-flex justify-content-between h-100">
                            <Col sm={12}>
                                <Row>
                                    <Col className="d-flex justify-content-end">
                                        <a
                                            href={
                                                challenge?.supplemental?.url
                                                    ?.objective
                                            }
                                            onClick={handleInnerLinkClick}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="challenge-url"
                                        >
                                            <DetailedView />
                                        </a>
                                    </Col>
                                </Row>
                                <Card.Title>{challenge?.title}</Card.Title>
                                <p className="card-text mb-2">
                                    {challenge?.description}
                                </p>
                            </Col>

                            <Col sm={12} className="d-flex align-items-end">
                                <p className="card-budget">
                                    {challenge?.reward?.value}{' '}
                                    {challenge?.reward?.currency}
                                </p>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}
export default ChallengeCard
