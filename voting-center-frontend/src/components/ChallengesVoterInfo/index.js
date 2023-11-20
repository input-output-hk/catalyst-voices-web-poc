import { useEffect, useState } from 'react'
import { Col, Row, Spinner } from 'react-bootstrap'
import DetailedView from '../../assets/svg/DetailedView'
import EqualSign from '../../assets/svg/EqualSign'
import PlusSign from '../../assets/svg/PlusSign'
import { env } from '../../env'
import { useAppContext } from '../../lib/context'
import { formatCurrency } from '../../lib/helpers'
import ButtonComponent, {
    ButtonSizes,
    ButtonTypes,
    ButtonVariants,
} from '../Button'
import ErrorNotice from '../Notices/ErrorNotice'
import GeneralNotice from '../Notices/GeneralNotice'
import SmallModal from '../SmallModal'
import WalletStats from '../WalletStats'

import { getMetrics } from '../../lib/api'
import './styles.scss'

const ChallengesVoterInfo = ({ isDashboard }) => {
    const {
        connectedWallet,
        isDrep,
        isVoter,
        isActiveVoter,
        walletStatus,
        drepPendingReview,
        voterTransactionHash,
        drepProfile,
        voterData,
        lastTransaction,
        isLoading,
        setIsLoading,
        refreshVpAndBalance,
        setRefreshVpAndBalance,
    } = useAppContext()

    const [metrics, setMetrics] = useState(null)
    const [showTransactionModal, setShowTransactionModal] = useState(false)
    const handleMetrics = async () => {
        if (isDrep) {
            setMetrics(drepProfile?.attributes?.voter_info)
        } else {
            setMetrics(voterData?.attributes?.voter_info)
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

    const handleShowTransactionModal = () => {
        if (lastTransaction?.attributes?.is_successful === false) {
            setShowTransactionModal(true)
        }
    }

    useEffect(() => {
        handleMetrics()
        handleShowTransactionModal()
        setIsLoading(false)
    }, [lastTransaction])

    const handleNewMetrics = async () => {
        let data = await getMetrics(connectedWallet?.voting_key)
        if (data) {
            const { voter_info, ...otherAttributes } = data
            let newData = { ...voter_info, ...otherAttributes }
            setMetrics(newData)
            setRefreshVpAndBalance(false)
        }
    }

    useEffect(() => {
        if (refreshVpAndBalance) {
            handleNewMetrics()
        }
    }, [refreshVpAndBalance])

    return (
        <Row>
            <Col>
                {connectedWallet && isVoter ? (
                    <Row className="challenges-voter-info">
                        <Col>
                            <h2 className="dreps-challenges-header">
                                {isDrep
                                    ? isDashboard
                                        ? 'dRep dashboard'
                                        : 'dRep'
                                    : isActiveVoter
                                    ? isDashboard
                                        ? 'Active voter dashboard'
                                        : 'Active Voter'
                                    : isDashboard
                                    ? 'Delegation dashboard'
                                    : 'Passive Voter'}
                            </h2>

                            {drepPendingReview && (
                                <GeneralNotice
                                    label={
                                        'We are reviewing your application. We will let you know when your application is approved '
                                    }
                                />
                            )}

                            <Row>
                                {isDrep ? (
                                    isDashboard ? (
                                        <Col sm={12}>
                                            {balance(
                                                String(
                                                    connectedWallet?.walletBalance
                                                )
                                            ) < 500 ? (
                                                <ErrorNotice
                                                    label={
                                                        '500 staked ADA is the minimum requirement for you to vote. Please add ADA to your wallet to vote.'
                                                    }
                                                />
                                            ) : null}

                                            <Row className="mb-4">
                                                <Col className="d-flex align-items-start align-items-md-center justify-content-between flex-column flex-md-row">
                                                    <p className="update-time-status">
                                                        Last updated: (April 6th
                                                        22 00:00 UTC)
                                                    </p>

                                                    <a
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        href={`${env.REACT_APP_CARDANOSCAN_BASE_URL}transaction/${voterTransactionHash}`}
                                                        className="mt-2 mt-md-0 transaction-hash-link"
                                                    >
                                                        <ButtonComponent
                                                            type={
                                                                ButtonTypes.Ghost
                                                            }
                                                            size={
                                                                ButtonSizes.SM
                                                            }
                                                            endIcon={
                                                                <DetailedView />
                                                            }
                                                        >
                                                            View registration
                                                            transaction
                                                        </ButtonComponent>
                                                    </a>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col
                                                    sm={12}
                                                    className="d-flex justify-content-between align-items-center flex-wrap staked"
                                                >
                                                    <WalletStats
                                                        stakedAdaName={
                                                            'Staked ADA'
                                                        }
                                                        stakedAdaValue={balance(
                                                            String(
                                                                connectedWallet?.walletBalance
                                                            )
                                                        )}
                                                        delegatedADAvalue={`${balance(
                                                            String(
                                                                connectedWallet?.walletBalance
                                                            )
                                                        )} ADA in wallet`}
                                                        className={
                                                            balance(
                                                                String(
                                                                    connectedWallet?.walletBalance
                                                                )
                                                            ) < 500
                                                                ? 'red-letters'
                                                                : null
                                                        }
                                                        showSpinner={metrics}
                                                    />

                                                    <ButtonComponent
                                                        variant={
                                                            ButtonVariants.IconButton
                                                        }
                                                        type={ButtonTypes.Ghost}
                                                        size={ButtonSizes.XS}
                                                        iconButton={
                                                            <PlusSign />
                                                        }
                                                        className="d-none d-md-block"
                                                    />

                                                    <WalletStats
                                                        delegatedAdaName={
                                                            'Delegated ADA'
                                                        }
                                                        delegatedAdaValue={balance(
                                                            String(
                                                                metrics?.delegations_power -
                                                                    connectedWallet?.walletBalance
                                                            )
                                                        )}
                                                        delegationsValue={`${metrics?.delegations_count} delegations`}
                                                        showSpinner={metrics}
                                                    />

                                                    <ButtonComponent
                                                        variant={
                                                            ButtonVariants.IconButton
                                                        }
                                                        type={ButtonTypes.Ghost}
                                                        size={ButtonSizes.XS}
                                                        iconButton={
                                                            <EqualSign />
                                                        }
                                                        className="d-none d-md-block"
                                                    />

                                                    <WalletStats
                                                        tpName={
                                                            'Total voting power'
                                                        }
                                                        tpValue={balance(
                                                            String(
                                                                metrics?.voting_power
                                                            )
                                                        )}
                                                        votingPowerValue={
                                                            'Available for voting'
                                                        }
                                                        showSpinner={metrics}
                                                        className={
                                                            'mt-3 mt-md-0'
                                                        }
                                                    />
                                                </Col>
                                            </Row>
                                        </Col>
                                    ) : (
                                        <>
                                            <Col
                                                sm={4}
                                                className="col dreps-wallet-info"
                                            >
                                                <span>Delegation count</span>

                                                {isLoading ? (
                                                    <Spinner
                                                        className="ms-3"
                                                        animation="border"
                                                    />
                                                ) : metrics?.delegations_count ? (
                                                    <p>
                                                        {
                                                            metrics?.delegations_count
                                                        }
                                                    </p>
                                                ) : (
                                                    <p>--</p>
                                                )}
                                            </Col>
                                            <Col
                                                sm={4}
                                                className="col dreps-wallet-info"
                                            >
                                                <span>Total Voting power</span>
                                                {isLoading ? (
                                                    <Spinner
                                                        className="ms-3"
                                                        animation="border"
                                                    />
                                                ) : metrics?.voting_power ? (
                                                    <p>
                                                        {balance(
                                                            String(
                                                                metrics?.voting_power
                                                            )
                                                        )}
                                                    </p>
                                                ) : (
                                                    <p>--</p>
                                                )}
                                            </Col>
                                            <Col
                                                sm={4}
                                                className="col dreps-wallet-info"
                                            >
                                                <span>Voting power</span>
                                                {isLoading ? (
                                                    <Spinner
                                                        className="ms-3"
                                                        animation="border"
                                                    />
                                                ) : metrics?.voting_power ? (
                                                    <p>
                                                        {balance(
                                                            String(
                                                                metrics?.voting_power
                                                            )
                                                        )}
                                                    </p>
                                                ) : (
                                                    <p>--</p>
                                                )}
                                            </Col>
                                        </>
                                    )
                                ) : (
                                    <>
                                        <Row className="mb-3">
                                            <Col className="transaction-hash-link">
                                                <a
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    href={`${env.REACT_APP_CARDANOSCAN_BASE_URL}transaction/${voterTransactionHash}`}
                                                >
                                                    <ButtonComponent
                                                        type={ButtonTypes.Ghost}
                                                        size={ButtonSizes.SM}
                                                        endIcon={
                                                            <DetailedView />
                                                        }
                                                    >
                                                        {isActiveVoter
                                                            ? 'View registration transaction'
                                                            : 'View delegation transaction'}
                                                    </ButtonComponent>
                                                </a>
                                            </Col>
                                        </Row>

                                        <Col
                                            sm={6}
                                            className="col dreps-wallet-info"
                                        >
                                            <span>Voting power</span>

                                            {isLoading ? (
                                                <Spinner
                                                    className="ms-3"
                                                    animation="border"
                                                />
                                            ) : metrics?.voting_power ? (
                                                <p>
                                                    {balance(
                                                        String(
                                                            metrics?.voting_power
                                                        )
                                                    )}
                                                </p>
                                            ) : (
                                                <p>--</p>
                                            )}
                                        </Col>
                                        <Col
                                            sm={6}
                                            className="col dreps-wallet-info"
                                        >
                                            <span>Wallet status</span>
                                            <p>{walletStatus}</p>
                                        </Col>
                                    </>
                                )}
                            </Row>
                        </Col>

                        <SmallModal
                            onClose={() => setShowTransactionModal(false)}
                            show={showTransactionModal}
                            title=""
                            description="Your transaction failed. Please try again."
                            buttonText="Cancel"
                            onClick={() => setShowTransactionModal(false)}
                        />
                    </Row>
                ) : null}
            </Col>
        </Row>
    )
}

export default ChallengesVoterInfo
