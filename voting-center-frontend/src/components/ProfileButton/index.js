import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Avatar from '../../assets/images/Avatar.png'
import CatalystLogo from '../../assets/images/logo-catalyst-mobile.svg'
import threeDots from '../../assets/images/threeDots.svg'
import Refresh from '../../assets/svg/Refresh'
import { useAppContext } from '../../lib/context'
import { formatCurrency } from '../../lib/helpers'
import AvatarImage from '../AvatarImage'
import './styles.scss'

const ProfileButton = ({ value, adressName, refreshWalletBalance, spin }) => {
    const {
        myDashboardClicked,
        setMyDashboardClicked,
        setConnectedWallet,
        pathname,
        completedDrepRegistration,
        binaryImageRegex,
        urlRegex,
        drepProfile,
        isVoter,
        setIsVoter,
        setIsActiveVoter,
        setIsDrep,
        setSelectedDreps,
        setDelegatedPower,
    } = useAppContext()
    const navigate = useNavigate()

    const [showItems, setShowItems] = useState(false)

    function handleDashboard() {
        myDashboardClicked
            ? setMyDashboardClicked(false)
            : setMyDashboardClicked(true)
    }

    //disconnect wallet and navigate to homepage
    const disconnect = (walletType) => {
        setConnectedWallet(false)
        setIsVoter(false)
        setIsActiveVoter(false)
        setIsDrep(false)
        setSelectedDreps([])
        setDelegatedPower([])
        localStorage.removeItem('walletType', walletType)
        navigate('/')
    }
    const handleClick = () => {
        setShowItems((prevState) => !prevState)
    }

    useEffect(() => {
        if (myDashboardClicked) {
            if (
                pathname === '/drep-registration' &&
                !completedDrepRegistration
            ) {
                return
            } else {
                handleDashboard()
                navigate('/dashboard')
            }
        }
    }, [myDashboardClicked])

    let balance = () => {
        let firstPart = value.substring(value?.length - 6, 0)
        let secondPart = value.substring(value?.length - 6)

        let formattedBalance = `${formatCurrency(firstPart)}.${secondPart.slice(
            0,
            2
        )}`

        return formattedBalance
    }

    return (
        <div className="profile-container">
            <div className="profile-button">
                <AvatarImage
                    source={
                        binaryImageRegex.test(
                            drepProfile?.attributes?.avatar
                        ) || drepProfile
                            ? urlRegex.test(drepProfile?.attributes?.avatar)
                                ? drepProfile.attributes?.avatar
                                : Avatar
                            : CatalystLogo
                    }
                    name={
                        drepProfile?.attributes?.avatar
                            ? null
                            : drepProfile?.attributes?.name
                    }
                    className="profile-button-avatar"
                />
                <div className="balance-wrapper d-flex">
                    <div className="d-flex flex-column pe-4">
                        <p className="balance">{balance()} ADA</p>
                        <p className="address">{adressName}</p>
                    </div>
                    <div
                        className="d-flex align-items-center justify-content-center"
                        style={{ cursor: 'pointer' }}
                    >
                        <Refresh
                            onClick={refreshWalletBalance}
                            className={`refresh-icon ${
                                spin ? 'refresh-icon-rotate' : ''
                            }`}
                        />
                    </div>
                </div>
                <img
                    className="dots"
                    src={threeDots}
                    alt="dots"
                    onClick={handleClick}
                />
            </div>
            {showItems ? (
                <ul className="profile-button-items d-flex flex-column align-items-start">
                    {isVoter && (
                        <li
                            onClick={(e) => {
                                handleClick()
                                handleDashboard()
                            }}
                        >
                            My Dashboard
                        </li>
                    )}
                    <li onClick={disconnect}>Disconnect</li>
                </ul>
            ) : null}
        </div>
    )
}

export default ProfileButton
