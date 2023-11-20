import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Modal as BootstrapModal } from 'react-bootstrap'
import { connectWallet } from '../../lib/wallet-connect'
import walletSvg from '../../assets/images/wallet-icon.svg'
import ErrorNotice from '../Notices/ErrorNotice'
import { useAppContext } from '../../lib/context'
import {
    getVoterByVotingKey,
    getDrepByVotingKey,
    getTransactionByHash,
    getVoterById,
} from '../../lib/api'
import { walletTypeHandler } from '../../lib/wallet-connect/accepted-wallets'
import { formatCurrency } from '../../lib/helpers'

import './styles.scss'

const WalletModal = ({ show, onClose }) => {
    const { showWallets } = walletTypeHandler()
    const [error, setError] = useState('')
    const [alreadyConnected, setAlreadyConnected] = useState(false)
    const {
        connectedWallet,
        setConnectedWallet,
        setIsActiveVoter,
        setIsVoter,
        setIsDrep,
        setDrepProfile,
        setDrepPendingReview,
        setVoterTransactionHash,
        setWrongNetwork,
        setVoterData,
        setVotingPower,
        setVotingPowerNumber,
        setLastTransaction,
    } = useAppContext()

    const navigate = useNavigate()

    const balance = (value) => {
        let firstPart = value?.substring(value?.length - 6, 0)
        let secondPart = value?.substring(value?.length - 6)

        let formattedBalance = `${formatCurrency(
            firstPart
        )}.${secondPart?.slice(0, 2)}`

        let vpNum = Number(firstPart)

        return { formattedBalance, vpNum }
    }

    const handleIsVoter = async (voting_key) => {
        let { data: voters } = await getVoterByVotingKey(voting_key)

        if (voters?.length > 0) {
            let { data: voter } = await getVoterById(voters[0]?.id)
            setIsVoter(true)
            setVoterData(voter)

            let { formattedBalance, vpNum } = balance(
                String(voter?.attributes?.voter_info?.voting_power)
            )
            setVotingPower(formattedBalance)
            setVotingPowerNumber(vpNum)
            setIsActiveVoter(!voters[0].attributes?.is_passive)
            setVoterTransactionHash(voters[0].attributes?.transaction_hash)
            const lastTransaction = await getTransactionByHash(
                voters[0].attributes?.transaction_hash
            )
            setLastTransaction(lastTransaction)
            navigate('/dashboard')
        }
    }

    const handleIsDrep = async (voting_key) => {
        const drep = await getDrepByVotingKey(voting_key)

        if (drep) {
            if (drep?.attributes?.is_approved) {
                setDrepPendingReview(false)
                setIsDrep(true)
                setDrepProfile(drep)
                navigate('/dashboard')
            } else {
                setDrepPendingReview(true)
            }
        }
    }

    const connect = async (walletType) => {
        const walletData = await connectWallet(walletType)

        if (walletData?.networkError) {
            setWrongNetwork(true)
        }

        if (walletData?.error) {
            if (
                walletData?.error?.includes('Governance') ||
                walletData?.error?.includes('Catalyst')
            ) {
                setError(walletData?.error)
            } else {
                setError(walletData?.error)
                return
            }
        }

        setConnectedWallet(walletData)
        await handleIsVoter(walletData?.voting_key)
        await handleIsDrep(walletData?.voting_key)

        onClose()
    }

    useEffect(() => {
        if (connectedWallet?.error) {
            setError(connectedWallet.error)
        }
    }, [connectedWallet])

    return (
        <BootstrapModal show={show} onHide={onClose} backdrop centered>
            <BootstrapModal.Header closeButton></BootstrapModal.Header>
            <BootstrapModal.Title>Connect your Wallet</BootstrapModal.Title>
            <BootstrapModal.Body>
                <div className="d-flex flex-column justify-content-center w-100">
                    <p>Choose the wallet you want to connect with</p>
                    {error && <ErrorNotice label={error} />}
                    {!alreadyConnected &&
                        showWallets.length > 0 &&
                        showWallets.map(({ label, type, icon }) => (
                            <div key={type}>
                                {icon && (
                                    <div
                                        className="wallet"
                                        onClick={() => connect(type)}
                                    >
                                        <span>{label}</span>
                                        <img src={icon} alt="" />
                                    </div>
                                )}
                            </div>
                        ))}
                    <p className="pb-0">
                        Nufi wallet supported versions are 4.0.0 - 6.2.0
                        (inclusive).
                    </p>
                    <p className="pb-0">
                        Eternl wallet supported versions are 1.10.6 - 1.10.7
                        (inclusive).
                    </p>
                    <p className="pb-0">
                        Please use a compatible version. Thank you!
                    </p>
                </div>
            </BootstrapModal.Body>
            {!showWallets[0]?.icon && (
                <ErrorNotice label="No wallet was found." />
            )}
        </BootstrapModal>
    )
}
export default WalletModal
