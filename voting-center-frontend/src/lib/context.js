import { createContext, useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { getChallengesImages } from './api'

//data

import drep from './mockData/drep-profile.json'
import tags from './mockData/tags.json'

import { getChallenges, getFund, getSettings } from './api'

import { handleFundStage } from './helpers'

//import newFundMocked from './mockData/newFund.json'

const ACTIVE_WALLET_STATUS = 'Registered'
const PASSIVE_WALLET_STATUS = 'Delegated'
const MAX_NUMBER_OF_SELECTED_DREPS = 10

const binaryImageRegex = /(data:image\/[^;]+;base64[^"]+)/i
const urlRegex =
    /https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/

export const AppContext = createContext()
export function AppContextProvider({ children }) {
    let navigate = useNavigate()
    const [settings, setSettings] = useState({})
    const [connectedWallet, setConnectedWallet] = useState(null)
    const [myDashboardClicked, setMyDashboardClicked] = useState(false)
    const [myLogoClicked, setMyLogoClicked] = useState(false)
    const [completedDrepRegistration, setCompletedDrepRegistration] =
        useState(false)
    const { pathname } = useLocation()
    const [selectedDreps, setSelectedDreps] = useState([])
    const [votingPower, setVotingPower] = useState()
    const [votingPowerNumber, setVotingPowerNumber] = useState()
    const [delegatedPower, setDelegatedPower] = useState([])
    const [tagsList, setTagsList] = useState(tags)
    const [drepProfile, setDrepProfile] = useState()
    const [voterData, setVoterData] = useState()
    const [walletStatus, setWalletStatus] = useState(ACTIVE_WALLET_STATUS)
    const [challengePageSidebar, setChallengePageSidebar] = useState(true)
    const [totalPercentage, setTotalPercentage] = useState(100)
    const [isSelectedDrepListFull, setIsSelectedDrepListFull] = useState(false)
    const [fund, setFund] = useState(null)
    const [challengesList, setChallengesList] = useState(null)
    const [fundStage, setFundStage] = useState('')
    const [sliderChange, setSliderChange] = useState()
    const [isConnectClicked, setIsConnectClicked] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isDelegationSuccessful, setIsDelegationSuccessful] = useState(false)
    const [wrongNetwork, setWrongNetwork] = useState(false)
    //in order to test each flow, it is necessary to change these three parameters
    const [isVoter, setIsVoter] = useState(false)
    const [isDrep, setIsDrep] = useState(false)
    const [isActiveVoter, setIsActiveVoter] = useState(false)
    const [drepPendingReview, setDrepPendingReview] = useState(false)
    const [voterTransactionHash, setVoterTransactionHash] = useState('')
    const [activeVoterRegisterModal, setActiveVoterRegisterModal] =
        useState(false)
    const [gvcVisitedRoutes, setGvcVisitedRoutes] = useState(
        JSON.parse(localStorage.getItem('gvc-visited-routes'))?.length > 0
            ? JSON.parse(localStorage.getItem('gvc-visited-routes'))
            : []
    )
    const [voteIsDelegated, setVoteIsDelegated] = useState(false)

    const [drepListPage, setDrepListPage] = useState(1)
    const [drepPageCount, setDrepPageCount] = useState(1)

    const [startTourGuide, setStartTourGuide] = useState(false)

    const [lastTransaction, setLastTransaction] = useState('')
    const [challangesImages, setChallangesImages] = useState([])
    const [refreshVpAndBalance, setRefreshVpAndBalance] = useState(false)
    const [refreshWalletBalanceMessage, setRefreshWalletBalanceMessage] =
        useState(false)

    // Navigate to dashboard
    const redirectToDashboard = () => {
        let path = `/dashboard`
        setMyDashboardClicked(!myDashboardClicked)
        navigate(path)
    }

    const redirectToHomepage = () => {
        setMyLogoClicked(!myLogoClicked)
        navigate('/')
    }

    const handleChallenges = async (eventId) => {
        const res = await getChallenges(eventId)
        setChallengesList(res)
    }

    const handleFund = async (eventId) => {
        const res = await getFund(eventId)
        setFund(res)
        handleFundStage(res, setFundStage)
    }

    const handleSettings = async () => {
        const settings = await getSettings()

        if (settings) {
            let settingsObject = {
                dRep_registration_open:
                    settings?.attributes?.dRep_registration_open,
                is_voting_enabled: settings?.attributes?.is_voting_enabled,
                is_delegation_enabled:
                    settings?.attributes?.is_delegation_enabled,
                event_id: settings?.attributes?.event_id,
            }

            setSettings(settingsObject)
            if (settingsObject?.event_id >= 0) {
                handleFund(settingsObject?.event_id)
                handleChallenges(settingsObject?.event_id)
            }
        }
    }

    const handleChallengesImages = async () => {
        const challangesImagesData = await getChallengesImages()
        if (challangesImagesData) {
            setChallangesImages(challangesImagesData)
        }
    }

    useEffect(() => {
        if (pathname.substring(1).indexOf('/') > 0) {
            let newPath = pathname.substring(
                0,
                pathname.substring(1).indexOf('/') + 1
            )
            if (newPath !== '/drep') {
                redirectToHomepage()
            }
        } else {
            redirectToHomepage()
        }
        handleChallengesImages()
        handleSettings()
        setVoteIsDelegated(false)
        setGvcVisitedRoutes(
            JSON.parse(localStorage.getItem('gvc-visited-routes'))
        )
    }, [])

    useEffect(() => {
        selectedDreps.length >= MAX_NUMBER_OF_SELECTED_DREPS
            ? setIsSelectedDrepListFull(true)
            : setIsSelectedDrepListFull(false)
    }, [selectedDreps])

    useEffect(() => {
        if (isActiveVoter) {
            setWalletStatus(ACTIVE_WALLET_STATUS)
            setChallengePageSidebar(true)
        } else {
            setWalletStatus(PASSIVE_WALLET_STATUS)
            setChallengePageSidebar(false)
        }
    }, [isActiveVoter])

    useEffect(() => {
        setActiveVoterRegisterModal(false)
        setVoteIsDelegated(false)
    }, [pathname])

    return (
        <AppContext.Provider
            value={{
                settings,
                connectedWallet,
                setConnectedWallet,
                myDashboardClicked,
                setMyDashboardClicked,
                pathname,
                redirectToDashboard,
                myLogoClicked,
                setMyLogoClicked,
                redirectToHomepage,
                completedDrepRegistration,
                setCompletedDrepRegistration,
                selectedDreps,
                setSelectedDreps,
                votingPower,
                setVotingPower,
                votingPowerNumber,
                setVotingPowerNumber,
                delegatedPower,
                setDelegatedPower,
                tagsList,
                setTagsList,
                drepProfile,
                setDrepProfile,
                isActiveVoter,
                setIsActiveVoter,
                walletStatus,
                setWalletStatus,
                sliderChange,
                setSliderChange,
                totalPercentage,
                setTotalPercentage,
                isSelectedDrepListFull,
                setIsSelectedDrepListFull,
                fund,
                setFund,
                challengesList,
                setChallengesList,
                isConnectClicked,
                setIsConnectClicked,
                binaryImageRegex,
                urlRegex,
                isLoading,
                setIsLoading,
                drep,
                challengePageSidebar,
                fundStage,
                setFundStage,
                isDrep,
                setIsDrep,
                isVoter,
                setIsVoter,
                isDelegationSuccessful,
                setIsDelegationSuccessful,
                voteIsDelegated,
                setVoteIsDelegated,
                drepListPage,
                setDrepListPage,
                drepPageCount,
                setDrepPageCount,
                drepPendingReview,
                setDrepPendingReview,
                voterTransactionHash,
                setVoterTransactionHash,
                activeVoterRegisterModal,
                setActiveVoterRegisterModal,
                wrongNetwork,
                setWrongNetwork,
                voterData,
                setVoterData,
                gvcVisitedRoutes,
                setGvcVisitedRoutes,
                startTourGuide,
                setStartTourGuide,
                lastTransaction,
                setLastTransaction,
                challangesImages,
                setChallangesImages,
                refreshWalletBalanceMessage,
                setRefreshWalletBalanceMessage,
                refreshVpAndBalance,
                setRefreshVpAndBalance,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}
export function useAppContext() {
    return useContext(AppContext)
}
