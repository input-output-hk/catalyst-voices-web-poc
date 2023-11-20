import axios, { axiosCatalystCore } from './axiosInstance'

const ALREADY_REGISTERED_MESSAGE =
    'Your wallet is already registered. Go to your dashboard to manage your wallet.'

export const getSettings = async () => {
    const { data } = await axios.get('api/setting')
    return data.data
}

export const getSelectedDreps = async (selectedDreps) => {
    let drepsQuery = ``
    selectedDreps.forEach((drepId, index) => {
        let newString = `filters[id][$in][${index}]=${drepId}&`
        drepsQuery = drepsQuery.concat(newString)
    })

    try {
        const { data } = await axios.get(`api/dreps?${drepsQuery}`)
        return data.data
    } catch (error) {
        console.error(error)
    }
}

export const getChallenges = async (eventId) => {
    try {
        const { data } = await axiosCatalystCore.get(
            `api/v1/event/${eventId}/objectives`
        )
        return data
    } catch (error) {
        console.error(error)
    }
}

export const getProposalsForChallenge = async (eventId, challangeId) => {
    try {
        const { data } = await axiosCatalystCore.get(
            `api/v1/event/${eventId}/objective/${challangeId}/proposals`
        )
        return data
    } catch (error) {
        console.error(error)
    }
}

export const getFund = async (fund_id) => {
    try {
        const { data } = await axiosCatalystCore.get(`api/v1/event/${fund_id}`)
        return data
    } catch (error) {
        console.error(error)
    }
}

export const getVoterByVotingKey = async (voting_key) => {
    try {
        const { data } = await axios.get(
            `/api/voters?filters[voting_key][$eq]=${voting_key}`
        )
        return data
    } catch (error) {
        console.error(error)
    }
}

export const getDrepByVotingKey = async (voting_key) => {
    try {
        const { data } = await axios.get(`/api/dreps/${voting_key}`)
        return data?.data
    } catch (error) {
        if (error?.response?.status === 404) return
        console.error(error)
    }
}

export const getDrepByUsername = async (username) => {
    try {
        const { data } = await axios.get(`/api/dreps/${username}`)
        return data?.data
    } catch (error) {
        if (error?.response?.status === 404) return
        console.error(error)
    }
}

export const checkImage = async (file) => {
    try {
        let formData = new FormData()
        formData.append('file', file)

        const { data } = await axios.post('api/image-check', formData)
        return data
    } catch (error) {
        throw new Error(error?.response?.data?.error?.message)
    }
}

export const deleteDrep = async (id) => {
    try {
        let response = await axios.delete(`/api/dreps/${id}`)
        return response
    } catch (error) {
        console.error(error)
    }
}

export const updateDrep = async (id, form) => {
    try {
        const res = await axios.put(`/api/dreps/${id}`, { data: form })
        return res
    } catch (error) {
        console.error(error)
    }
}

export const getVoterById = async (id) => {
    try {
        const res = await axios.get(`/api/voters/${id}`)
        return res
    } catch (error) {
        console.error(error)
    }
}

export const decodeString = async (string) => {
    try {
        let { data: decodedKey } = await axios.post('/api/cbor-decode', {
            string,
        })
        return decodedKey
    } catch (error) {
        console.error(error)
    }
}

export const handleActiveVoterRegistration = async (wallet, isDrep) => {
    const {
        cip62Api,
        address,
        voting_key,
        encoded_voting_key,
        error: walletError,
        isVotingKey,
    } = wallet

    let voteOrVotingKey = isVotingKey ? 'votingKey' : 'voteKey'

    const { data: voters } = await getVoterByVotingKey(voting_key)

    let errorMessage = walletError ? walletError : ''
    let voter = {}

    if (voters.length > 0) {
        if (voters[0].attributes.is_passive && !isDrep) {
            if (voting_key) {
                try {
                    const submitedDelegation = await cip62Api.submitDelegation({
                        delegations: [
                            {
                                [voteOrVotingKey]: voting_key,
                                weight: 1,
                            },
                        ],
                        purpose: 0,
                    })

                    if (submitedDelegation) {
                        let transactionHash = submitedDelegation.txHash
                        let isPassive = true
                        const voterData = {
                            transaction_hash: `${submitedDelegation.txHash}`,
                            is_passive: false,
                        }

                        try {
                            voter = await axios.put(
                                `/api/voters/${voters[0].id}`,
                                {
                                    data: voterData,
                                }
                            )
                            isPassive = false
                        } catch (error) {
                            errorMessage = error
                        }

                        const transactionData = {
                            transaction_hash: `${submitedDelegation.txHash}`,
                            transaction_metadata: submitedDelegation,
                            is_successful: null,
                        }
                        try {
                            await axios.post('/api/transactions', {
                                data: transactionData,
                            })
                        } catch (error) {
                            errorMessage = error
                        }

                        return {
                            voter: {
                                id: voter?.data?.voter?.id,
                                attributes: {
                                    ...voter?.data?.voter,
                                },
                            },
                            errorMessage,
                            submitedDelegation,
                            isPassive,
                            transactionHash,
                        }
                    } else {
                        errorMessage =
                            'Your transaction has failed or the previous transaction was not validated. Please try again.'
                        return {
                            errorMessage,
                        }
                    }
                } catch (error) {
                    errorMessage =
                        'Your transaction has failed or the previous transaction was not validated. Please try again.'
                    return {
                        errorMessage,
                    }
                }
            }
        } else {
            errorMessage = ALREADY_REGISTERED_MESSAGE
        }
        return { errorMessage }
    } else {
        if (voting_key) {
            try {
                const submitedDelegation = await cip62Api.submitDelegation({
                    delegations: [
                        {
                            [voteOrVotingKey]: voting_key,
                            weight: 1,
                        },
                    ],
                    purpose: 0,
                })

                if (submitedDelegation) {
                    let transactionHash = submitedDelegation.txHash
                    let isPassive = true
                    try {
                        voter = await axios.post('/api/voters', {
                            voting_key: voting_key,
                            encoded_voting_key: encoded_voting_key,
                            wallet_address: address,
                            is_passive: false,
                            transaction_hash: submitedDelegation.txHash,
                            transaction_metadata: submitedDelegation,
                        })
                        isPassive = false
                    } catch (error) {
                        errorMessage = error
                    }

                    return {
                        voter: {
                            id: voter?.data?.voter?.id,
                            attributes: {
                                ...voter?.data?.voter,
                            },
                        },
                        errorMessage,
                        isPassive,
                        submitedDelegation,
                        transactionHash,
                    }
                } else {
                    errorMessage =
                        'Your transaction has failed or the previous transaction was not validated. Please try again.'
                    return {
                        errorMessage,
                    }
                }
            } catch (error) {
                errorMessage =
                    'Your transaction has failed or the previous transaction was not validated. Please try again.'
                return {
                    errorMessage,
                }
            }
        }
    }
}

export async function handleDelegation(wallet, delegatedPower) {
    const { cip62Api, address, voting_key, isVotingKey, encoded_voting_key } =
        wallet

    let voteOrVotingKey = isVotingKey ? 'votingKey' : 'voteKey'

    const { data: voters } = await getVoterByVotingKey(voting_key)

    let errorMessage = null

    let votingKeys = []

    for (const [index, { id }] of delegatedPower.entries()) {
        try {
            const { data } = await axios.get(`/api/dreps/${id}`)
            votingKeys.push(data.data.attributes.voting_key)
        } catch (error) {
            errorMessage = error
        }
    }

    let delegationData = []

    votingKeys.forEach((voting_key, index) => {
        delegationData.push({
            [voteOrVotingKey]: voting_key,
            weight: delegatedPower[index].value,
        })
    })

    const submitedDelegation = await cip62Api.submitDelegation({
        delegations: delegationData,
        purpose: 0,
    })

    let transactionHash = submitedDelegation.txHash
    let voterAndTransaction = null

    if (voters.length > 0) {
        const transactionData = {
            transaction_hash: `${submitedDelegation.txHash}`,
            transaction_metadata: submitedDelegation,
            is_successful: null,
        }
        try {
            await axios.post('/api/transactions', { data: transactionData })
        } catch (error) {
            errorMessage = error
        }

        const voterId = voters[0].id

        const voterData = {
            transaction_hash: `${submitedDelegation.txHash}`,
            is_passive: true,
        }

        try {
            await axios.put(`/api/voters/${voterId}`, {
                data: voterData,
            })
        } catch (error) {
            errorMessage = error
        }

        try {
            for (const [index, { id, value }] of delegatedPower.entries()) {
                let delegationData = {
                    voter_id: +voterId,
                    drep_id: +id,
                    weight_percent: value,
                    transaction_hash: `${submitedDelegation.txHash}`,
                }

                await axios.post(`/api/delegations`, {
                    data: delegationData,
                })
            }
        } catch (error) {
            errorMessage = error
        }
    } else {
        voterAndTransaction = await axios.post('/api/voters', {
            voting_key: voting_key,
            encoded_voting_key: encoded_voting_key,
            wallet_address: address,
            is_passive: true,
            transaction_hash: submitedDelegation.txHash,
            transaction_metadata: submitedDelegation,
        })

        const { data } = await getVoterByVotingKey(voting_key)

        try {
            for (const [index, { id, value }] of delegatedPower.entries()) {
                let delegationData = {
                    voter_id: data[0].id,
                    drep_id: id,
                    weight_percent: value,
                    transaction_hash: `${submitedDelegation.txHash}`,
                }

                await axios.post(`/api/delegations`, {
                    data: delegationData,
                })
            }
        } catch (error) {
            errorMessage = error
        }
    }

    return { errorMessage, voterAndTransaction, transactionHash }
}

export async function handleGetDelegations(wallet) {
    const { voting_key } = wallet
    const { data } = await getVoterByVotingKey(voting_key)

    try {
        const { data: delegations } = await axios.get(
            `/api/delegations?filters[transaction_hash][$eq]=${data[0]?.attributes?.transaction_hash}`
        )
        return delegations.data
    } catch (error) {
        console.error(error)
    }
}

export async function getTransactionByHash(transactionHash) {
    try {
        const { data } = await axios.get(
            `/api/transactions?filters[transaction_hash][$eq]=${transactionHash}`
        )
        return data.data[0]
    } catch (error) {
        console.error(error)
    }
}

export const getChallengesImages = async () => {
    try {
        const { data } = await axios.get(
            `/api/challenges-images?populate=challenge_img`
        )
        return data.data
    } catch (error) {
        console.error(error)
    }
}

export const handleVoting = async (
    wallet,
    chainProposalIndex,
    chainVoteplanId,
    choice
) => {
    const { cip62Api } = wallet
    try {
        const vote = await cip62Api.signVotes(
            [
                {
                    proposal: {
                        votePublic: true,
                        votePlanId: chainVoteplanId,
                        proposalIndex: +chainProposalIndex,
                    },
                    choice: choice,
                    purpose: 0,
                },
            ],
            '{"fees":{"constant":10,"coefficient":2,"certificate":100},"discrimination":"production","block0_initial_hash":{"hash":"baf6b54817cf2a3e865f432c3922d28ac5be641e66662c66d445f141e409183e"},"block0_date":1586637936,"slot_duration":20,"time_era":{"epoch_start":0,"slot_start":0,"slots_per_epoch":180},"transaction_max_expiry_epochs":1, "purpose":0,"ver":0}'
        )

        if (vote) {
            const { data } = await axiosCatalystCore.post(`api/v1/fragments`, {
                fail_fast: true,
                fragments: vote,
            })

            return { data: data, error: null }
        }
    } catch (error) {
        return { data: null, error: error }
    }
}

export const getSingleProposal = async (eventId, objectiveId, proposalId) => {
    try {
        const { data } = await axiosCatalystCore.get(
            `api/v1/event/${eventId}/objective/${objectiveId}/proposal/${proposalId}`
        )

        return data
    } catch (error) {
        console.error(error)
    }
}

export const getProposalsBallot = async (eventId, objectiveId, proposalId) => {
    try {
        const { data } = await axiosCatalystCore.get(
            `api/v1/event/${eventId}/objective/${objectiveId}/proposal/${proposalId}/ballot`
        )

        return data
    } catch (error) {
        console.error(error)
    }
}

export const getAccountVotes = async (accountVotingKey) => {
    try {
        const { data } = await axiosCatalystCore.get(
            `/api/v1/votes/plan/account-votes/${accountVotingKey}`
        )

        return data
    } catch (error) {
        console.error(error)
    }
}

export const getMetrics = async (voting_key) => {
    try {
        const { data } = await axios.get(
            `${process.env.REACT_APP_CATALYST_CORE_API_URL}api/v1/registration/voter/0x${voting_key}`
        )
        return data
    } catch (error) {
        return null
    }
}
