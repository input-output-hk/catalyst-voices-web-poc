import { Card, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ThumbDown from '../../assets/svg/ThumbDown'
import ThumbUp from '../../assets/svg/ThumbUp'
import { useAppContext } from '../../lib/context'
import ButtonComponent, { ButtonSizes, ButtonTypes } from '../Button'

import './styles.scss'

const ProposalCard = ({ proposal, singleChallenge }) => {
    const {
        isActiveVoter,
        connectedWallet,
        fund,
        challengePageSidebar,
        isDrep,
    } = useAppContext()

    return (
        <Card className="proposal-card mb-3 mb-md-0 ms-2 ms-md-0 me-2 me-md-2 h-100">
            <Row className="mb-3">
                <Col className="d-flex align-items-center justify-content-between">
                    <Row>
                        <Col sm={12}>
                            <p className="proposal-number">{proposal?.title}</p>
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Row className="h-100">
                <Col>
                    <Row className="h-100">
                        <Col sm={12}>
                            <p className="main-text">
                                {proposal?.summary.length > 200
                                    ? proposal?.summary.substring(0, 200) +
                                      '...'
                                    : proposal?.summary}
                            </p>
                        </Col>

                        <Col
                            sm={12}
                            className="d-flex flex-column justify-content-end"
                        >
                            <Row className="my-3">
                                <Col sm={12}>
                                    <p className="fund-text mb-0 mt-3">
                                        Fund: <span>{fund?.name}</span>
                                    </p>
                                    <p className="fund-text">
                                        Challenge:{' '}
                                        <span>{singleChallenge?.title}</span>
                                    </p>
                                </Col>
                            </Row>

                            {connectedWallet ? (
                                challengePageSidebar ||
                                isActiveVoter ||
                                isDrep ? (
                                    <Row className="w-100 g-2">
                                        <Col className="d-flex w-100 vote-buttons-wrapper">
                                            <Link
                                                className="w-100"
                                                to="/voting-confirmation"
                                                state={{
                                                    vote: 'No',
                                                    proposalId: proposal?.id,
                                                    challenge: {
                                                        id: singleChallenge.id,
                                                    },
                                                }}
                                            >
                                                <ButtonComponent
                                                    type={
                                                        ButtonTypes.Destructive
                                                    }
                                                    size={ButtonSizes.SM}
                                                    endIcon={<ThumbDown />}
                                                    className={'w-100'}
                                                >
                                                    No
                                                </ButtonComponent>
                                            </Link>
                                            <Link
                                                className="w-100"
                                                to="/voting-confirmation"
                                                state={{
                                                    vote: 'Yes',
                                                    proposalId: proposal?.id,
                                                    challenge: {
                                                        id: singleChallenge.id,
                                                    },
                                                }}
                                            >
                                                <ButtonComponent
                                                    type={ButtonTypes.Success}
                                                    size={ButtonSizes.SM}
                                                    endIcon={<ThumbUp />}
                                                    className={'w-100'}
                                                >
                                                    Yes
                                                </ButtonComponent>
                                            </Link>
                                        </Col>
                                    </Row>
                                ) : null
                            ) : null}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Card>
    )
}

export default ProposalCard
