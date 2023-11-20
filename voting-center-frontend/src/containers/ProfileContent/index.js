import React, { useEffect, useState } from 'react'
import { Col, Row, Spinner } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import ErrorNotice from '../../components/Notices/ErrorNotice'
import ProfileCard from '../../components/ProfileCard'
import Tag from '../../components/Tag'
import { getDrepByVotingKey } from '../../lib/api'
import { useAppContext } from '../../lib/context'
import { formatCurrency } from '../../lib/helpers'
import './styles.scss'

function ProfileContent({ drep }) {
    const { isSelectedDrepListFull, isLoading, setIsLoading } = useAppContext()
    const [metrics, setMetrics] = useState(0)
    const { pathname } = useLocation()

    const handleMetrics = async () => {
        if (drep?.voting_key) {
            const drepWithMetrics = await getDrepByVotingKey(drep?.voting_key)

            if (drepWithMetrics) {
                setMetrics(drepWithMetrics?.attributes?.voter_info)
            }
        }
    }

    const balance = (value) => {
        let firstPart = value?.substring(value?.length - 6, 0)
        let secondPart = value?.substring(value?.length - 6)

        let formattedBalance = `${formatCurrency(
            firstPart
        )}.${secondPart?.slice(0, 2)}`

        return formattedBalance
    }

    function handleProfile() {
        let show = showProfile
        setShowProfile(!show)
    }

    useEffect(() => {
        if (drep?.voter_info && Object.keys(drep?.voter_info).length > 0) {
            setMetrics(drep?.voter_info)
        } else {
            handleMetrics()
        }
    }, [drep])

    useEffect(() => {
        if (metrics === null) {
            setIsLoading(false)
        } else {
            if (metrics === 0 || metrics === undefined) {
                setIsLoading(true)
            } else {
                setIsLoading(false)
            }
        }
    }, [metrics])

    return (
        <Row className="profile-content-wrapper w-100 g-0">
            {isSelectedDrepListFull && (
                <ErrorNotice
                    label={
                        'You can delegate maximum to 10 representatives. Please unselect a representative to select a new one.'
                    }
                />
            )}
            <ProfileCard
                drep={drep}
                profile={true}
                showDetailedView={!pathname.includes('drep')}
                buttonText={'View profile'}
                className={`profile-content-profile-card`}
                onClick={handleProfile}
                showButton={false}
                showVanityUrl={false}
            />
            <Row className="g-0 d-none d-md-flex">
                <Col
                    className="d-flex d-none d-md-flex flex-wrap flex-row"
                    id="tags"
                >
                    {drep?.tags?.map((tag, index) => (
                        <Tag
                            className={'me-3 mb-3'}
                            key={`${tag}-${index}`}
                            stayActive={true}
                        >
                            {tag}
                        </Tag>
                    ))}
                </Col>
            </Row>
            <Row className="g-0 d-block d-md-none">
                <Col className="d-flex d-block d-md-none flex-row tags-mobile-scroll">
                    {drep?.tags?.map((tag, index) => (
                        <Tag
                            className={'me-3'}
                            key={`${tag}-${index}`}
                            stayActive={true}
                        >
                            {tag}
                        </Tag>
                    ))}
                </Col>
            </Row>
            <Col
                className="d-flex flex-sm-row flex-column justify-content-between profile-info-wrapper"
                id="balance"
            >
                <Col className="d-flex flex-row flex-sm-column mb-4 mb-sm-0 align-items-center justify-content-between">
                    <p className="info-heading">Voting power</p>
                    {isLoading ? (
                        <Spinner className="ms-3" animation="border" />
                    ) : metrics?.voting_power ? (
                        <p className="info-text">
                            {balance(String(metrics?.voting_power))}
                        </p>
                    ) : (
                        <p>--</p>
                    )}
                </Col>
                <Col className="d-flex flex-row flex-sm-column mb-4 mb-sm-0 align-items-center justify-content-between">
                    <p className="info-heading">Delegated ADA</p>
                    {isLoading ? (
                        <Spinner className="ms-3" animation="border" />
                    ) : metrics?.delegations_power ? (
                        <p className="info-text">
                            {balance(String(metrics?.delegations_power))}
                        </p>
                    ) : (
                        <p>--</p>
                    )}
                </Col>
                <Col className="d-flex flex-row flex-sm-column align-items-center justify-content-between">
                    <p className="info-heading d-none d-sm-block">
                        Delegations
                    </p>
                    <p className="info-heading d-block d-sm-none">
                        Delegation count
                    </p>
                    {isLoading ? (
                        <Spinner className="ms-3" animation="border" />
                    ) : metrics?.delegations_count ? (
                        <p className="info-text">
                            {metrics?.delegations_count}
                        </p>
                    ) : (
                        <p>--</p>
                    )}
                </Col>
            </Col>
            <Row id="about-contrib">
                <Row className="w-100 g-0">
                    <Col className="d-flex flex-column w-100 info-wrapper g-0">
                        <Col className="info-content">
                            <p className="info-heading mb-3">About</p>
                            <p
                                className="info-text mb-4"
                                style={{ wordBreak: 'break-all' }}
                            >
                                {drep?.profile_bio}
                            </p>
                        </Col>
                    </Col>
                </Row>
                <Row className="g-0">
                    <Col className="d-flex flex-column g-0 info-wrapper">
                        <Col className="info-content">
                            <p className="info-heading mb-3">
                                Contributions to Cardano
                            </p>
                            <p
                                className="info-text"
                                style={{ wordBreak: 'break-all' }}
                            >
                                {drep?.contribution}
                            </p>
                        </Col>
                    </Col>
                </Row>
            </Row>
        </Row>
    )
}
export default ProfileContent
