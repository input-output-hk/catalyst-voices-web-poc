import { useEffect, useState } from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Joyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride'
import { useLocation, useNavigate } from 'react-router-dom'
import CardImage1 from '../../assets/images/card-background-1.png'
import CardImage2 from '../../assets/images/card-background-2.png'
import CardImage3 from '../../assets/images/card-background-3.png'
import CardImage4 from '../../assets/images/card-background-4.png'
import CardItem from '../../components/Card'
import RegistrationInfo from '../../components/RegistrationInfo'
import SmallModal from '../../components/SmallModal'
import VotingPhase from '../../components/VotingPhase'
import {
    handleActiveVoterRegistration,
    getTransactionByHash,
} from '../../lib/api'
import { formatCurrency } from '../../lib/helpers'

import { useAppContext } from '../../lib/context'

import './styles.scss'

const HOMEPAGE_CONNECT_WALLET_CARD_TITLE = `Connect your wallet to start participating`
const HOMEPAGE_CONNECT_WALLET_SUBTITLE = `Connect your wallet and use your staked ADA to register as an active Voter, register as a dRep or delegate your voting power and give your opinion on all Project Catalyst proposals.`
const HOMEPAGE_FIRST_CARD_TITLE = `Use your ada as voting power`
const HOMEPAGE_FIRST_CARD_SUBTITLE = `Register to vote today and use your ada as voting power across all Project Catalyst proposals.`
const HOMEPAGE_SECOND_CARD_TITLE = `Delegate your voting power to dReps`
const HOMEPAGE_SECOND_CARD_SUBTITLE = `You can delegate your voting power to Delegate Representatives (dReps) to vote on your behalf. Choose your dReps and delegate today.`
const HOMEPAGE_THIRD_CARD_TITLE = `Let other people delegate their voting power to you`
const HOMEPAGE_THIRD_CARD_SUBTITLE = `You can register to be a dRep. dReps are voters' representatives and can vote on their behalf.`

const Homepage = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const {
        connectedWallet,
        setIsConnectClicked,
        isVoter,
        isDrep,
        setIsVoter,
        setIsActiveVoter,
        isActiveVoter,
        setVoterTransactionHash,
        voterTransactionHash,
        activeVoterRegisterModal,
        setActiveVoterRegisterModal,
        gvcVisitedRoutes,
        setGvcVisitedRoutes,
        startTourGuide,
        setStartTourGuide,
        settings,
        drepPendingReview,
        setVoterData,
        setVotingPower,
        setVotingPowerNumber,
        setLastTransaction,
    } = useAppContext()

    const { is_delegation_enabled, dRep_registration_open } = settings

    const [firstRegistrationModal, setFirstRegistrationModal] = useState(false)
    const [isWalletEmpty, setIsWalletEmpty] = useState(true)
    const [showEmptyWalletModal, setShowEmptyWalletModal] = useState(false)
    const [fromPassiveToActive, setFromPassiveToActive] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [error, setError] = useState('')
    const [showGuide, setShowGuide] = useState(true)
    const [guide, setGuide] = useState({
        run: true,
        steps: connectedWallet
            ? isVoter
                ? [
                      {
                          target: '.delegate-your-vote',
                          content:
                              'Clicking on the button "Delegate your vote" takes us to a page with a list of dReps to which it is possible to delegate your voting power.',
                          disableBeacon: true,
                      },
                      {
                          target: '.become-a-drep',
                          content:
                              'When you click on the "Register as a dRep" button, you will be redirected to a form where you can sign up as a dRep.',
                          disableBeacon: true,
                      },
                  ]
                : [
                      {
                          target: '.register-as-an-active-voter',
                          content:
                              'By clicking on the "Register as an active voter" button, self-delegation is performed and voting is enabled from that moment.',
                          disableBeacon: true,
                      },
                  ]
            : [
                  {
                      target: '.connect-wallet-card',
                      content:
                          'By clicking on the "Connect wallet" button, modal for connecting wallet will appear.',
                      disableBeacon: true,
                  },
              ],
        stepIndex: 0,
    })
    const [showDelegationDisabledModal, setShowDelegationDisabledModal] =
        useState(false)
    const [showVotingDisabledModal, setShowVotingDisabledModal] =
        useState(false)

    useEffect(() => {
        if (connectedWallet?.walletBalance > 0) {
            setIsWalletEmpty(false)
        } else {
            setIsWalletEmpty(true)
        }
    }, [connectedWallet])

    const handleClose = () => {
        setShowModal(false)
        setFromPassiveToActive(false)
        setShowEmptyWalletModal(false)
        setFirstRegistrationModal(false)
        setShowDelegationDisabledModal(false)
        setShowVotingDisabledModal(false)
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
            voter?.attributes?.transaction_hash
        )
        setLastTransaction(lastTransaction)
        setFromPassiveToActive(false)
        setActiveVoterRegisterModal(true)
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

    const handleJoyrideCallback = (data) => {
        const { action, index, status, type } = data

        if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
            setGuide({
                ...guide,
                stepIndex: index + (action === ACTIONS.PREV ? -1 : 1),
            })
        } else if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
            setGuide({ ...guide, run: false })

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
            setShowGuide(false)
            setStartTourGuide(false)
        } else {
            setShowGuide(true)
        }
    }

    useEffect(() => {
        handleShowGuide()
    }, [])

    return (
        <>
            {!activeVoterRegisterModal ? (
                <Row className="homepage">
                    <Joyride
                        steps={guide.steps}
                        callback={handleJoyrideCallback}
                        continuous={true}
                        showProgress={true}
                        showSkipButton={true}
                        run={showGuide || startTourGuide}
                        stepIndex={guide.stepIndex}
                        styles={{
                            options: {
                                primaryColor: '#7c89f7',
                            },
                        }}
                        disableScrollParentFix
                    />
                    <Col sm={12}>
                        <CardItem
                            contentClassName="card-item-single"
                            img={CardImage1}
                            variant={'left'}
                            title="Voting Center"
                            content={
                                'Help to grow the Cardano community by becoming an active voter, delegate your vote or even by putting yourself up there so people can delegate their voting power to you!'
                            }
                        />
                        {!connectedWallet && (
                            <CardItem
                                className="connect-wallet-card"
                                contentClassName="card-item-single"
                                buttonText={'Connect wallet'}
                                buttonLink=""
                                img={CardImage2}
                                variant={'left'}
                                title={HOMEPAGE_CONNECT_WALLET_CARD_TITLE}
                                content={HOMEPAGE_CONNECT_WALLET_SUBTITLE}
                                onClick={() => setIsConnectClicked(true)}
                            />
                        )}

                        {connectedWallet && (!isVoter || !isActiveVoter) && (
                            <CardItem
                                className="register-as-an-active-voter"
                                contentClassName="card-item-single"
                                buttonText={'Register as an active voter'}
                                buttonLink=""
                                img={CardImage2}
                                variant={'left'}
                                title={HOMEPAGE_FIRST_CARD_TITLE}
                                content={HOMEPAGE_FIRST_CARD_SUBTITLE}
                                onClick={() => {
                                    connectedWallet
                                        ? !isWalletEmpty
                                            ? voterTransactionHash
                                                ? isDrep
                                                    ? handleRegistration()
                                                    : isVoter
                                                    ? !isActiveVoter
                                                        ? setFromPassiveToActive(
                                                              true
                                                          )
                                                        : handleRegistration()
                                                    : handleRegistration()
                                                : setFirstRegistrationModal(
                                                      true
                                                  )
                                            : setShowEmptyWalletModal(true)
                                        : setIsConnectClicked(true)
                                }}
                            />
                        )}

                        {is_delegation_enabled &&
                            connectedWallet &&
                            isVoter &&
                            !isDrep && (
                                <CardItem
                                    className="delegate-your-vote"
                                    contentClassName="card-item-single"
                                    buttonText={'Delegate your vote'}
                                    buttonLink={
                                        connectedWallet
                                            ? isVoter
                                                ? isActiveVoter
                                                    ? 'delegations'
                                                    : 'dashboard'
                                                : null
                                            : null
                                    }
                                    img={CardImage3}
                                    variant={'right'}
                                    title={HOMEPAGE_SECOND_CARD_TITLE}
                                    content={HOMEPAGE_SECOND_CARD_SUBTITLE}
                                    onClick={() =>
                                        is_delegation_enabled
                                            ? !connectedWallet &&
                                              setIsConnectClicked(true)
                                            : setShowDelegationDisabledModal(
                                                  true
                                              )
                                    }
                                />
                            )}

                        {dRep_registration_open &&
                            connectedWallet &&
                            isVoter &&
                            !isDrep &&
                            !drepPendingReview && (
                                <CardItem
                                    className="become-a-drep"
                                    contentClassName="card-item-single"
                                    buttonText={'Register as a dRep'}
                                    buttonLink={
                                        connectedWallet
                                            ? 'drep-registration'
                                            : null
                                    }
                                    img={CardImage4}
                                    variant={'left'}
                                    title={HOMEPAGE_THIRD_CARD_TITLE}
                                    content={HOMEPAGE_THIRD_CARD_SUBTITLE}
                                    onClick={() =>
                                        !connectedWallet &&
                                        setIsConnectClicked(true)
                                    }
                                />
                            )}
                        <VotingPhase />
                    </Col>
                </Row>
            ) : (
                <RegistrationInfo
                    drepHeading={'You have registered as an active voter'}
                    drepText={
                        'Congratulations, you will be able to submit your own votes.'
                    }
                    drepButtonText={'My Dashboard'}
                    onClick={() => {
                        navigate('/dashboard')
                        setActiveVoterRegisterModal(false)
                    }}
                />
            )}

            {showModal && (
                <SmallModal
                    show={showModal}
                    onClose={() => handleClose()}
                    secondButtonText={`Close`}
                    secondOnClick={() => handleClose()}
                    buttonText={`Dashboard`}
                    onClick={() => navigate('/dashboard')}
                    title={
                        error ===
                        'Your wallet is already registered. Go to your dashboard to manage your wallet.'
                            ? `Already registered`
                            : 'Error'
                    }
                    description={error}
                />
            )}

            {fromPassiveToActive && (
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
            )}

            {showEmptyWalletModal && (
                <SmallModal
                    show={showEmptyWalletModal}
                    onClose={() => handleClose()}
                    buttonText={`Close`}
                    onClick={() => handleClose()}
                    title={`Warning`}
                    description="You do not have sufficient funds for the transaction."
                />
            )}

            {firstRegistrationModal && (
                <SmallModal
                    show={firstRegistrationModal}
                    onClose={() => handleClose()}
                    buttonText={`Continue`}
                    onClick={() => handleRegistration()}
                    title={`Warning`}
                    description="500 staked ADA is the minimum requirement for you to vote."
                />
            )}

            {showDelegationDisabledModal && (
                <SmallModal
                    show={showDelegationDisabledModal}
                    onClose={() => handleClose()}
                    secondButtonText={`Close`}
                    secondOnClick={() => handleClose()}
                    buttonText={`Home`}
                    onClick={() => handleClose()}
                    description={`We're sorry, but Delegations are currently not available.`}
                    title=""
                />
            )}

            {showVotingDisabledModal && (
                <SmallModal
                    show={showVotingDisabledModal}
                    onClose={() => handleClose()}
                    secondButtonText={`Close`}
                    secondOnClick={() => handleClose()}
                    buttonText={`Home`}
                    onClick={() => handleClose()}
                    description={`We're sorry, but Voting is currently not available.`}
                    title=""
                />
            )}
        </>
    )
}
export default Homepage
