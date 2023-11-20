import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import CardImage1 from '../../assets/images/card-background-5.png'
import {
    deleteDrep,
    getTransactionByHash,
    handleActiveVoterRegistration,
} from '../../lib/api'
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
    activeStageIndex,
    formatCurrency,
} from '../../lib/helpers'
import Button from '../Button'
import CardItem from '../Card'
import ProfileCard from '../ProfileCard'
import SmallCard from '../SmallCard'
import SmallModal from '../SmallModal'
import Stepper from '../Stepper'
import VotingPowerChart from '../VotingPowerChart'

const ChallengesVotingPhase = ({ isDashboard = false }) => {
    const {
        connectedWallet,
        isDrep,
        setIsDrep,
        redirectToHomepage,
        selectedDreps,
        votingPower,
        isActiveVoter,
        drepProfile,
        setDrepProfile,
        fundStage,
        fund,
        settings,
        setIsConnectClicked,
        setActiveVoterRegisterModal,
        setVoterTransactionHash,
        setIsActiveVoter,
        setIsVoter,
        setVotingPower,
        setVotingPowerNumber,
        setLastTransaction,
        setVoterData,
    } = useAppContext()
    const { is_delegation_enabled } = settings
    const [fundName, setFundName] = useState('')
    const [drepDeleteModal, setDrepDeleteModal] = useState(false)
    const [fromPassiveToActive, setFromPassiveToActive] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        setFundName(fund?.fund_name)
    }, [fund])

    const data = [
        {
            name: PHASE_1_TITLE,
            description: `From: ${new Date(
                fund?.schedule?.proposal_submission
            )}\nTo: ${new Date(fund?.schedule?.refine_proposals)}`,
        },
        {
            name: PHASE_2_TITLE,
            description: `From: ${new Date(
                fund?.schedule?.refine_proposals
            )}\nTo: ${new Date(fund?.schedule?.finalize_proposals)}`,
        },
        {
            name: PHASE_3_TITLE,
            description: `From: ${new Date(
                fund?.schedule?.finalize_proposals
            )}\nTo: ${new Date(fund?.schedule?.proposal_assessment)}`,
        },
        {
            name: PHASE_4_TITLE,
            description: `From: ${new Date(
                fund?.schedule?.proposal_assessment
            )}\nTo: ${new Date(fund?.schedule?.assessment_qa_start)}`,
        },
        {
            name: PHASE_5_TITLE,
            description: `From: ${new Date(
                fund?.schedule?.assessment_qa_start
            )}\nTo: ${new Date(fund?.schedule?.voting)}`,
        },
        {
            name: PHASE_6_TITLE,
            description: `From: ${new Date(
                fund?.schedule?.voting
            )}\nTo: ${new Date(fund?.schedule?.tallying)}`,
        },
        {
            name: PHASE_7_TITLE,
            description: `From: ${new Date(
                fund?.schedule?.tallying
            )}\nTo: ${new Date(fund?.schedule?.tallying_end)}`,
        },
    ]

    function copyToClipboard(value) {
        navigator.clipboard.writeText(value)
    }

    let navigate = useNavigate()
    const redirectToProfilePage = () => {
        let path = `/drep/${drepProfile?.attributes?.username}`
        navigate(path)
    }

    const handleDeleteDrep = async () => {
        try {
            let response = await deleteDrep(drepProfile?.id)

            if (response) {
                setDrepProfile(null)
                setIsDrep(false)
                setDrepDeleteModal(false)
                redirectToHomepage()
            }
        } catch (error) {
            console.error(error)
            redirectToHomepage()
        }
    }

    const balance = (value) => {
        let firstPart = value?.substring(value?.length - 6, 0)
        let secondPart = value?.substring(value?.length - 6)

        let formattedBalance = `${formatCurrency(
            firstPart
        )}.${secondPart?.slice(0, 2)}`

        let vpNum = Number(firstPart)

        return { formattedBalance, vpNum }
    }

    const handleIsVoter = async (voter) => {
        setIsVoter(true)
        setVoterData(voter)

        let { formattedBalance, vpNum } = balance(
            String(voter?.attributes?.voter_info?.voting_power)
        )
        setVotingPower(formattedBalance)
        setVotingPowerNumber(vpNum)
        setIsActiveVoter(!voter.attributes?.is_passive)
        setVoterTransactionHash(voter.attributes?.transaction_hash)
        const lastTransaction = await getTransactionByHash(
            voter.attributes?.transaction_hash
        )
        setLastTransaction(lastTransaction)
        setFromPassiveToActive(false)
        setActiveVoterRegisterModal(true)
    }

    const handleClose = () => {
        setShowModal(false)
        setFromPassiveToActive(false)
    }

    const handleRegistration = async () => {
        if (!connectedWallet) {
            setIsConnectClicked(true)
            return
        }
        if (connectedWallet.error?.includes('Governance')) {
            setIsConnectClicked(true)
            return
        }
        const activeVoterRegistration = await handleActiveVoterRegistration(
            connectedWallet,
            isDrep
        )

        if (activeVoterRegistration?.errorMessage) {
            setError(activeVoterRegistration?.errorMessage)
            handleClose()
            setShowModal(true)
            return
        }

        const { transactionHash, voter } = activeVoterRegistration || {}
        setVoterTransactionHash(transactionHash)

        if (voter) {
            handleIsVoter(voter)
        }
    }

    return (
        <div>
            {connectedWallet ? (
                isDrep ? (
                    isDashboard ? (
                        <>
                            <ProfileCard
                                profile={true}
                                drep={drepProfile?.attributes}
                                buttonText={'View profile'}
                                showButton={false}
                                showDetailedView={false}
                                className={`mb-4`}
                                onClick={redirectToProfilePage}
                                disabledButton={false}
                            />

                            <ProfileCard
                                profile={false}
                                title={'Public voting key'}
                                contentText={
                                    drepProfile?.attributes?.encoded_voting_key
                                }
                                buttonText={'Copy'}
                                onClick={(e) =>
                                    copyToClipboard(
                                        drepProfile?.attributes
                                            ?.encoded_voting_key
                                    )
                                }
                                className={`mb-4`}
                            />

                            <ProfileCard
                                profile={false}
                                retire
                                title={'Retire'}
                                contentText={'Do you want to retire as a dRep?'}
                                buttonText={'Retire as a dRep'}
                                onClick={() => setDrepDeleteModal(true)}
                            />

                            <SmallModal
                                show={drepDeleteModal}
                                buttonText="Yes, retire"
                                secondButtonText="No"
                                title="Are you sure?"
                                description="Are you sure you want to retire as a dRep?"
                                onClick={handleDeleteDrep}
                                secondOnClick={() => setDrepDeleteModal(false)}
                                onClose={() => setDrepDeleteModal(false)}
                            />
                        </>
                    ) : (
                        <>
                            <ProfileCard
                                profile={true}
                                showButton={false}
                                showDetailedView={false}
                                drep={drepProfile?.attributes}
                                buttonText={'View profile'}
                                onClick={redirectToProfilePage}
                                className="profile-card-challenges"
                            />

                            {activeStageIndex(fundStage) !== 7 ? (
                                <Stepper
                                    stepperTitle={FUND_PROGRESS_TITLE}
                                    activeStepIndex={activeStageIndex(
                                        fundStage
                                    )}
                                    steps={data}
                                />
                            ) : (
                                <Row>
                                    <Col sm={12}>
                                        <CardItem
                                            img={CardImage1}
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
                                                    Project Catalyst is
                                                    currently between funding
                                                    rounds, with the next Fund
                                                    coming soon.
                                                </p>
                                            }
                                            contentClassName={'p-2'}
                                            cardHeight={'h-100'}
                                            votingPhase={true}
                                        />
                                    </Col>
                                </Row>
                            )}
                        </>
                    )
                ) : isActiveVoter ? (
                    isDashboard ? (
                        <>
                            {is_delegation_enabled && (
                                <VotingPowerChart
                                    votingDelegationText={
                                        'You are currently holding 100% of your voting power.'
                                    }
                                    delegate={selectedDreps.length}
                                    votingPowerChartButton={
                                        'Delegate your voting power'
                                    }
                                    buttonLink="delegations"
                                />
                            )}
                            <ProfileCard
                                className="mt-4"
                                profile={false}
                                title={'Public voting key'}
                                contentText={
                                    connectedWallet?.encoded_voting_key
                                }
                                buttonText={'Copy'}
                                onClick={(e) =>
                                    copyToClipboard(
                                        connectedWallet?.encoded_voting_key
                                    )
                                }
                            />
                        </>
                    ) : (
                        <Row>
                            {activeStageIndex(fundStage) !== 7 ? (
                                <Col xs={12}>
                                    <Stepper
                                        stepperTitle={FUND_PROGRESS_TITLE}
                                        activeStepIndex={activeStageIndex(
                                            fundStage
                                        )}
                                        steps={data}
                                    />
                                </Col>
                            ) : (
                                <Col sm={12}>
                                    <CardItem
                                        img={CardImage1}
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
                                                Project Catalyst is currently
                                                between funding rounds, with the
                                                next Fund coming soon.
                                            </p>
                                        }
                                        contentClassName={'p-2'}
                                        cardHeight={'h-100'}
                                        votingPhase={true}
                                    />
                                </Col>
                            )}
                        </Row>
                    )
                ) : (
                    <Row>
                        <Col>
                            {is_delegation_enabled && (
                                <VotingPowerChart
                                    votingDelegationText={`Your total voting power is ${
                                        votingPower && votingPower !== 'NaN.ef'
                                            ? votingPower
                                            : '--'
                                    }`}
                                    vp={100}
                                    delegationsText={'Ready to delegate'}
                                    delegate={selectedDreps.length}
                                    votingPowerChartButton={
                                        'Confirm delegations'
                                    }
                                    manageDelegationLink={true}
                                    // onClick={handleSelect}
                                />
                            )}

                            <SmallCard
                                className={'mt-3'}
                                title={'Take back my Voting Power'}
                                content={
                                    <p className="card-item-text">
                                        Do you want to become an active voter?
                                    </p>
                                }
                                button={
                                    <Button
                                        className={'w-100 mt-3'}
                                        size={'sm'}
                                        onClick={() =>
                                            setFromPassiveToActive(true)
                                        }
                                    >
                                        Become an Active Voter
                                    </Button>
                                }
                            />
                        </Col>
                    </Row>
                )
            ) : (
                <Row>
                    {activeStageIndex(fundStage) !== 7 ? (
                        <Col xs={12}>
                            <Stepper
                                stepperTitle={FUND_PROGRESS_TITLE}
                                activeStepIndex={activeStageIndex(fundStage)}
                                steps={data}
                            />
                        </Col>
                    ) : (
                        <Col sm={12}>
                            <CardItem
                                img={CardImage1}
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
                                        funding rounds, with the next Fund
                                        coming soon.
                                    </p>
                                }
                                contentClassName={'p-2'}
                                cardHeight={'h-100'}
                                votingPhase={true}
                            />
                        </Col>
                    )}
                </Row>
            )}

            <SmallModal
                show={fromPassiveToActive}
                onClose={() => handleClose()}
                secondButtonText={`Close`}
                secondOnClick={() => handleClose()}
                buttonText={`Continue`}
                onClick={() => handleRegistration()}
                title={`Your delegations will be deleted. Do you want to continue?`}
                description=""
            />

            <SmallModal
                show={showModal}
                onClose={() => handleClose()}
                buttonText={`Close`}
                onClick={() => handleClose()}
                title={`Error`}
                description={error}
            />
        </div>
    )
}

export default ChallengesVotingPhase
