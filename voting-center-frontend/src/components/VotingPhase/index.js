import React, { useEffect, useState } from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { useAppContext } from '../../lib/context'
import {
    BETWEEN_PHASES_TITLE,
    FUND_PROGRESS_TITLE,
    PHASE_1_TITLE,
    PHASE_2_TITLE,
    PHASE_3_TITLE,
    PHASE_4_TITLE,
    PHASE_5_TITLE,
    PHASE_6_TITLE,
    PHASE_7_TITLE,
} from '../../lib/helpers'
import CardItem from '../Card'
import ProgressBarItem from '../ProgressBarItem'
import './styles.scss'

import CardImage4 from '../../assets/images/card-background-1.png'
import CardImage1 from '../../assets/images/card-background-5.png'
import CardImage2 from '../../assets/images/card-background-6.png'
import CardImage3 from '../../assets/images/card-background-7.png'

const VotingPhase = () => {
    const { fund, fundStage } = useAppContext()
    const [fundName, setFundName] = useState('')
    const [submissionActive, setSubmissionActive] = useState(false)
    const [refinementActive, setRefinementActive] = useState(false)
    const [finalizeActive, setFinalizeActive] = useState(false)
    const [assessmentActive, setAssessmentActive] = useState(false)
    const [assessmentQaActive, setAssessmentQaActive] = useState(false)
    const [votingActive, setVotingActive] = useState(false)
    const [tallyingActive, setTallyingActive] = useState(false)
    const [betweenActive, setBetweenActive] = useState(false)

    //Handling Phase Cards appearance based on stage
    function handleStage() {
        switch (fundStage) {
            case 'Submission':
                setSubmissionActive(true)
                setRefinementActive(false)
                setFinalizeActive(false)
                setAssessmentActive(false)
                setAssessmentQaActive(false)
                setVotingActive(false)
                setTallyingActive(false)
                setBetweenActive(false)
                break
            case 'Refinement':
                setSubmissionActive(false)
                setRefinementActive(true)
                setFinalizeActive(false)
                setAssessmentActive(false)
                setAssessmentQaActive(false)
                setVotingActive(false)
                setTallyingActive(false)
                setBetweenActive(false)
                break
            case 'Finalize':
                setSubmissionActive(false)
                setRefinementActive(false)
                setFinalizeActive(true)
                setAssessmentActive(false)
                setAssessmentQaActive(false)
                setVotingActive(false)
                setTallyingActive(false)
                setBetweenActive(false)
                break
            case 'Assessment':
                setSubmissionActive(false)
                setRefinementActive(false)
                setFinalizeActive(false)
                setAssessmentActive(true)
                setAssessmentQaActive(false)
                setVotingActive(false)
                setTallyingActive(false)
                setBetweenActive(false)
                break
            case 'Assessment QA':
                setSubmissionActive(false)
                setRefinementActive(false)
                setFinalizeActive(false)
                setAssessmentActive(false)
                setAssessmentQaActive(true)
                setVotingActive(false)
                setTallyingActive(false)
                setBetweenActive(false)
                break
            case 'Voting':
                setSubmissionActive(false)
                setRefinementActive(false)
                setFinalizeActive(false)
                setAssessmentActive(false)
                setAssessmentQaActive(false)
                setVotingActive(true)
                setTallyingActive(false)
                setBetweenActive(false)
                break
            case 'Tallying':
                setSubmissionActive(false)
                setRefinementActive(false)
                setFinalizeActive(false)
                setAssessmentActive(false)
                setAssessmentQaActive(false)
                setVotingActive(false)
                setTallyingActive(true)
                setBetweenActive(false)
                break
            default:
                setSubmissionActive(false)
                setRefinementActive(false)
                setFinalizeActive(false)
                setAssessmentActive(false)
                setAssessmentQaActive(false)
                setVotingActive(false)
                setTallyingActive(false)
                setBetweenActive(true)
                break
        }
    }

    useEffect(() => {
        setFundName(fund?.fund_name)
        handleStage()
    }, [fund, fundStage])

    const PHASE_1_SUBTITLE = `From: ${new Date(
        fund?.schedule?.proposal_submission
    )}\nTo: ${new Date(fund?.schedule?.refine_proposals)}`

    const PHASE_2_SUBTITLE = `From: ${new Date(
        fund?.schedule?.refine_proposals
    )}\nTo: ${new Date(fund?.schedule?.finalize_proposals)}`

    const PHASE_3_SUBTITLE = `From: ${new Date(
        fund?.schedule?.finalize_proposals
    )}\nTo: ${new Date(fund?.schedule?.proposal_assessment)}`

    const PHASE_4_SUBTITLE = `From: ${new Date(
        fund?.schedule?.proposal_assessment
    )}\nTo: ${new Date(fund?.schedule?.assessment_qa_start)}`

    const PHASE_5_SUBTITLE = `From: ${new Date(
        fund?.schedule?.assessment_qa_start
    )}\n To: ${new Date(fund?.schedule?.voting)}`

    const PHASE_6_SUBTITLE = `From: ${new Date(
        fund?.schedule?.voting
    )}\nTo: ${new Date(fund?.schedule?.tallying)}`

    const PHASE_7_SUBTITLE = `From: ${new Date(
        fund?.schedule?.tallying
    )}\nTo: ${new Date(fund?.schedule?.tallying_end)}`

    return (
        <>
            {!betweenActive && (
                <Row className="g-0">
                    <Col>
                        <h2 className="voting-phase-heading py-lg-2">
                            {FUND_PROGRESS_TITLE}
                        </h2>
                        <ProgressBarItem />
                    </Col>
                </Row>
            )}
            <Row
                className="gy-3 pb-4 flex-nowrap voting-phase-wrapper"
                style={{
                    overflowX: 'scroll',
                    scrollSnapType: 'x mandatory',
                    scrollSnapStop: 'always',
                }}
            >
                {betweenActive ? (
                    <Col sm={12}>
                        <CardItem
                            img={CardImage4}
                            variant={'left'}
                            title={
                                <h3 className="voting-phase-card-heading">
                                    <span className="voting-phase-card-subheading">
                                        {BETWEEN_PHASES_TITLE}
                                    </span>
                                </h3>
                            }
                            content={
                                <p className="voting-phase-card-text">
                                    Project Catalyst is currently between
                                    funding rounds, with the next Fund coming
                                    soon.
                                </p>
                            }
                            contentClassName={'p-2'}
                            cardHeight={'h-100'}
                            votingPhase={true}
                        />
                    </Col>
                ) : (
                    <>
                        <Col
                            sm={12}
                            style={{
                                scrollSnapAlign: 'start end',
                                scrollSnapStop: 'always',
                                flexShrink: '0',
                            }}
                            md={submissionActive ? 6 : 3}
                        >
                            <CardItem
                                img={CardImage1}
                                variant={'left'}
                                title={
                                    <h3 className="voting-phase-card-heading">
                                        Phase 1 <br />
                                        <span className="voting-phase-card-subheading">
                                            {PHASE_1_TITLE}
                                        </span>
                                    </h3>
                                }
                                content={
                                    submissionActive && (
                                        <p className="voting-phase-card-text">
                                            {PHASE_1_SUBTITLE}
                                        </p>
                                    )
                                }
                                contentClassName={'p-2'}
                                cardHeight={'h-100'}
                                votingPhase={true}
                                className={!submissionActive && 'past-phase'}
                            />
                        </Col>
                        <Col
                            sm={12}
                            style={{
                                scrollSnapAlign: 'start end',
                                scrollSnapStop: 'always',
                                flexShrink: '0',
                            }}
                            md={refinementActive ? 6 : 3}
                        >
                            <CardItem
                                img={CardImage2}
                                variant={'left'}
                                title={
                                    <h3 className="voting-phase-card-heading">
                                        Phase 2 <br />
                                        <span className="voting-phase-card-subheading">
                                            {PHASE_2_TITLE}
                                        </span>
                                    </h3>
                                }
                                content={
                                    refinementActive && (
                                        <p className="voting-phase-card-text">
                                            {PHASE_2_SUBTITLE}
                                        </p>
                                    )
                                }
                                contentClassName={'p-2'}
                                cardHeight={'h-100'}
                                votingPhase={true}
                                className={
                                    !submissionActive &&
                                    !refinementActive &&
                                    'past-phase'
                                }
                            />
                        </Col>
                        <Col
                            sm={12}
                            style={{
                                scrollSnapAlign: 'start end',
                                scrollSnapStop: 'always',
                                flexShrink: '0',
                            }}
                            md={finalizeActive ? 6 : 3}
                        >
                            <CardItem
                                img={CardImage3}
                                variant={'left'}
                                title={
                                    <h3 className="voting-phase-card-heading">
                                        Phase 3 <br />
                                        <span className="voting-phase-card-subheading">
                                            {PHASE_3_TITLE}
                                        </span>
                                    </h3>
                                }
                                content={
                                    finalizeActive && (
                                        <p className="voting-phase-card-text">
                                            {PHASE_3_SUBTITLE}
                                        </p>
                                    )
                                }
                                contentClassName={'p-2'}
                                cardHeight={'h-100'}
                                votingPhase={true}
                                className={
                                    !submissionActive &&
                                    !refinementActive &&
                                    !finalizeActive &&
                                    'past-phase'
                                }
                            />
                        </Col>
                        <Col
                            sm={12}
                            style={{
                                scrollSnapAlign: 'start end',
                                scrollSnapStop: 'always',
                                flexShrink: '0',
                            }}
                            md={assessmentActive ? 6 : 3}
                        >
                            <CardItem
                                img={CardImage3}
                                variant={'left'}
                                title={
                                    <h3 className="voting-phase-card-heading">
                                        Phase 4 <br />
                                        <span className="voting-phase-card-subheading">
                                            {PHASE_4_TITLE}
                                        </span>
                                    </h3>
                                }
                                content={
                                    assessmentActive && (
                                        <p className="voting-phase-card-text">
                                            {PHASE_4_SUBTITLE}
                                        </p>
                                    )
                                }
                                contentClassName={'p-2'}
                                cardHeight={'h-100'}
                                votingPhase={true}
                                className={
                                    !submissionActive &&
                                    !refinementActive &&
                                    !finalizeActive &&
                                    !assessmentActive &&
                                    'past-phase'
                                }
                            />
                        </Col>
                        <Col
                            sm={12}
                            style={{
                                scrollSnapAlign: 'start end',
                                scrollSnapStop: 'always',
                                flexShrink: '0',
                            }}
                            md={assessmentQaActive ? 6 : 3}
                        >
                            <CardItem
                                img={CardImage3}
                                variant={'left'}
                                title={
                                    <h3 className="voting-phase-card-heading">
                                        Phase 5 <br />
                                        <span className="voting-phase-card-subheading">
                                            {PHASE_5_TITLE}
                                        </span>
                                    </h3>
                                }
                                content={
                                    assessmentQaActive && (
                                        <p className="voting-phase-card-text">
                                            {PHASE_5_SUBTITLE}
                                        </p>
                                    )
                                }
                                contentClassName={'p-2'}
                                cardHeight={'h-100'}
                                votingPhase={true}
                                className={
                                    !submissionActive &&
                                    !refinementActive &&
                                    !finalizeActive &&
                                    !assessmentActive &&
                                    !assessmentQaActive &&
                                    'past-phase'
                                }
                            />
                        </Col>
                        <Col
                            sm={12}
                            style={{
                                scrollSnapAlign: 'start end',
                                scrollSnapStop: 'always',
                                flexShrink: '0',
                            }}
                            md={votingActive ? 6 : 3}
                        >
                            <CardItem
                                img={CardImage3}
                                variant={'left'}
                                title={
                                    <h3 className="voting-phase-card-heading">
                                        Phase 6 <br />
                                        <span className="voting-phase-card-subheading">
                                            {PHASE_6_TITLE}
                                        </span>
                                    </h3>
                                }
                                content={
                                    votingActive && (
                                        <p className="voting-phase-card-text">
                                            {PHASE_6_SUBTITLE}
                                        </p>
                                    )
                                }
                                contentClassName={'p-2'}
                                cardHeight={'h-100'}
                                votingPhase={true}
                                className={
                                    !submissionActive &&
                                    !refinementActive &&
                                    !finalizeActive &&
                                    !assessmentActive &&
                                    !assessmentQaActive &&
                                    !votingActive &&
                                    'past-phase'
                                }
                            />
                        </Col>
                        <Col
                            sm={12}
                            style={{
                                scrollSnapAlign: 'start end',
                                scrollSnapStop: 'always',
                                flexShrink: '0',
                            }}
                            md={tallyingActive ? 6 : 3}
                        >
                            <CardItem
                                img={CardImage3}
                                variant={'left'}
                                title={
                                    <h3 className="voting-phase-card-heading">
                                        Phase 7 <br />
                                        <span className="voting-phase-card-subheading">
                                            {PHASE_7_TITLE}
                                        </span>
                                    </h3>
                                }
                                content={
                                    tallyingActive && (
                                        <p className="voting-phase-card-text">
                                            {PHASE_7_SUBTITLE}
                                        </p>
                                    )
                                }
                                contentClassName={'p-2'}
                                cardHeight={'h-100'}
                                votingPhase={true}
                                className={
                                    !submissionActive &&
                                    !refinementActive &&
                                    !finalizeActive &&
                                    !assessmentActive &&
                                    !assessmentQaActive &&
                                    !votingActive &&
                                    !tallyingActive &&
                                    'past-phase'
                                }
                            />
                        </Col>
                    </>
                )}
            </Row>
        </>
    )
}

export default VotingPhase
