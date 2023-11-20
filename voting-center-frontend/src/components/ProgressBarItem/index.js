import React, { useEffect, useState } from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { useAppContext } from '../../lib/context'
import { activeStageIndex } from '../../lib/helpers'
import LoaderBar from '../LoaderBar'

import './styles.scss'

const ProgressBarItem = () => {
    const { fund, fundStage } = useAppContext()
    const [fundTime, setFundTime] = useState(null)
    const [fundName, setFundName] = useState('')

    // Remaining time
    function ftime() {
        let fundEndTime =
            activeStageIndex(fundStage) === 0
                ? new Date(fund?.schedule?.refine_proposals)
                : activeStageIndex(fundStage) === 1
                ? new Date(fund?.schedule?.finalize_proposals)
                : activeStageIndex(fundStage) === 2
                ? new Date(fund?.schedule?.proposal_assessment)
                : activeStageIndex(fundStage) === 3
                ? new Date(fund?.schedule?.assessment_qa_start)
                : activeStageIndex(fundStage) === 4
                ? new Date(fund?.schedule?.voting)
                : activeStageIndex(fundStage) === 5
                ? new Date(fund?.schedule?.tallying)
                : activeStageIndex(fundStage) === 6 &&
                  new Date(fund?.schedule?.tallying_end)

        let nowDate = new Date()
        let seconds = Math.floor((fundEndTime - nowDate) / 1000)
        let minutes = Math.floor(seconds / 60)
        let hours = Math.floor(minutes / 60)
        let days = Math.floor(hours / 24)

        hours = hours - days * 24
        minutes = minutes - days * 24 * 60 - hours * 60
        seconds = seconds - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60
        let remainingTime = {
            days: days,
            hours: hours,
            minutes: minutes,
        }
        setFundTime(remainingTime)
    }

    // Progress bar percent like difference between Fund Start Time and Fund End Time
    function loaderPercent() {
        let fundStartTime =
            activeStageIndex(fundStage) === 0
                ? new Date(fund?.schedule?.proposal_submission)
                : activeStageIndex(fundStage) === 1
                ? new Date(fund?.schedule?.refine_proposals)
                : activeStageIndex(fundStage) === 2
                ? new Date(fund?.schedule?.finalize_proposals)
                : activeStageIndex(fundStage) === 3
                ? new Date(fund?.schedule?.proposal_assessment)
                : activeStageIndex(fundStage) === 4
                ? new Date(fund?.schedule?.assessment_qa_start)
                : activeStageIndex(fundStage) === 5
                ? new Date(fund?.schedule?.voting)
                : activeStageIndex(fundStage) === 6 &&
                  new Date(fund?.schedule?.tallying)

        let fundEndTime =
            activeStageIndex(fundStage) === 0
                ? new Date(fund?.schedule?.refine_proposals)
                : activeStageIndex(fundStage) === 1
                ? new Date(fund?.schedule?.finalize_proposals)
                : activeStageIndex(fundStage) === 2
                ? new Date(fund?.schedule?.proposal_assessment)
                : activeStageIndex(fundStage) === 3
                ? new Date(fund?.schedule?.assessment_qa_start)
                : activeStageIndex(fundStage) === 4
                ? new Date(fund?.schedule?.voting)
                : activeStageIndex(fundStage) === 5
                ? new Date(fund?.schedule?.tallying)
                : activeStageIndex(fundStage) === 6 &&
                  new Date(fund?.schedule?.tallying_end)
        let currentDate = new Date()

        let max = Math.floor(
            (fundEndTime - fundStartTime) / (1000 * 60 * 60 * 24)
        )
        let min = 0
        let current = Math.floor(
            (currentDate - fundStartTime) / (1000 * 60 * 60 * 24)
        )
        let progressValue = Math.round(((current - min) / (max - min)) * 100)
        return progressValue
    }

    useEffect(() => {
        ftime()
        setFundName(fund?.fund_name)
    }, [fund])

    // Refreshing time every minute
    useEffect(() => {
        const interval = setInterval(() => {
            ftime()
        }, 60000)
        return () => clearInterval(interval)
    }, [fundTime])

    return (
        <div className="voting-phase">
            <Row className="align-items-center justify-content-between">
                <Col md={8} className="d-flex align-items-center flex-wrap">
                    <h4 className="progress-bar-heading pe-2 mb-0">
                        {fundName}
                    </h4>
                    <p className="progress-bar-text mb-0">{fundStage}</p>
                </Col>
                <Col
                    md={4}
                    className="d-md-flex justify-content-end progress-bar-text d-none"
                >
                    <p className="mb-0">
                        <span className="progress-bar-timer pe-1">
                            {fundTime?.days}d {fundTime?.hours}hs{' '}
                            {fundTime?.minutes}m
                        </span>
                        until end
                    </p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <LoaderBar now={loaderPercent()} />
                </Col>
            </Row>

            <Row>
                <Col className="d-md-none progress-bar-text d-flex">
                    <p>
                        <span className="pe-1 progress-bar-timer">
                            {fundTime?.days}d {fundTime?.hours}hs{' '}
                            {fundTime?.minutes}m
                        </span>
                        until end of {fundStage?.toLowerCase()}
                    </p>
                </Col>
            </Row>
        </div>
    )
}

export default ProgressBarItem
