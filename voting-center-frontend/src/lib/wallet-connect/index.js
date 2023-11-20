import { bech32 } from 'bech32'
import { Buffer } from 'buffer'

import { strToHex } from '../../util'
import { decodeString } from '../api'
import { walletTypeHandler } from './accepted-wallets'

const TESTNET = 0
const MAINNET = 1

const walletCheck = (walletType) => {
    const { wallets } = walletTypeHandler()
    const acceptedWallets = wallets.map((wallet) => wallet.type)
    if (!window.cardano) {
        return {
            cardanoWallet: null,
            connectWalletError: 'Cardano global object not found.',
        }
    }
    if (!acceptedWallets.includes(walletType)) {
        return {
            cardanoWallet: null,
            connectWalletError:
                'The selected wallet is not elegible. Please select another wallet.',
        }
    } else {
        return {
            cardanoWallet: wallets.find((wallet) => wallet.type === walletType),
            connectWalletError: null,
        }
    }
}

export const connectWallet = async (walletType) => {
    try {
        let error = null
        let cip62Api
        let networkId
        let addresses
        const { cardanoWallet, connectWalletError } = walletCheck(walletType)
        const wallet = await cardanoWallet?.enable()
        const usedAddresses = await wallet?.getUsedAddresses()
        const unUsedAddresses = await wallet?.getUnusedAddresses()

        if (wallet) {
            networkId = await wallet.getNetworkId()
            if (networkId === MAINNET) {
                return {
                    networkError:
                        'The wallet connected is on the incorrect network.',
                }
            }
        }

        if (connectWalletError) {
            error = connectWalletError
            return { error }
        }

        if (cardanoWallet?.governance) {
            cip62Api = await cardanoWallet?.governance.enable([0])
        } else if (cardanoWallet?.catalyst) {
            cip62Api = await cardanoWallet?.catalyst.enable([0])
        } else if (cardanoWallet.isEnabled()) {
            error =
                'Governance API not found. Voting will not be possible, please choose another wallet.'
        }

        if (usedAddresses.length > 0) {
            addresses = usedAddresses
        } else {
            addresses = unUsedAddresses
        }

        try {
            const votingCredentials = await cip62Api?.getVotingCredentials()
            const walletBalance = await wallet?.getBalance()
            const decodedWalletBalance = await decodeString(walletBalance)
            const [addressToEncode] = addresses
            const address = bech32.encode(
                networkId === TESTNET ? 'addr_test' : 'addr',
                bech32.toWords(Buffer.from(addressToEncode, 'hex')),
                114
            )
            const bech32_vk = bech32.encode(
                'cvote_vk',
                bech32.toWords(
                    Buffer.from(
                        votingCredentials?.votingKey
                            ? votingCredentials?.votingKey
                            : votingCredentials?.voteKey,
                        'hex'
                    )
                ),
                114
            )

            // based on isVotingKey we dynamically change the key of the delegation object to be votingKey or voteKey
            return {
                wallet,
                cip62Api,
                address: address,
                voting_key: votingCredentials?.votingKey
                    ? votingCredentials?.votingKey
                    : votingCredentials?.voteKey,
                walletBalance: decodedWalletBalance[0],
                error,
                isVotingKey: votingCredentials?.votingKey ? true : false,
                encoded_voting_key: bech32_vk,
            }
        } catch (e) {
            const nufiError =
                'This version of this wallet is not supported. Supported versions of the NuFi wallet start from 4.0.0, including version 4.0.0 itself.'
            const eternlError =
                'This version of this wallet is not supported. Supported versions of the Eternl wallet start from 1.10.6, including version 1.10.6 itself.'

            if (cardanoWallet?.type === 'nufi') {
                error = nufiError
            } else if (cardanoWallet?.type === 'eternl') {
                error = eternlError
            } else {
                error = 'This version of this wallet is not supported.'
            }
            return { error }
        }
    } catch (err) {
        console.log(err)
    }
}

export const connectWalletWithSignature = async (walletType) => {
    const { wallet, address, error } = await connectWallet(walletType)

    const { signature } = await wallet.signData(address, strToHex(address))

    return { wallet, address, signature, error }
}

export const getWalletBalance = async (wallet) => {
    const walletBalance = await wallet?.getBalance()
    const decodedWalletBalance = await decodeString(walletBalance)

    return { walletBalance: decodedWalletBalance[0] }
}
