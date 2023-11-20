import React, { useEffect } from 'react'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row'
import { useNavigate } from 'react-router-dom'
import CatalystLogo from '../../assets/images/catalyst-logo.png'
import CatalystLogoMobile from '../../assets/images/logo-catalyst-mobile.svg'
import { useAppContext } from '../../lib/context'
import ConnectWalletButton from '../ConnectWalletButton'
import SmallModal from '../SmallModal'

import './styles.scss'

const Header = () => {
    // When click on logo on drep-registration and vote-delegation page perform check first
    const navigate = useNavigate()
    const {
        setMyLogoClicked,
        myLogoClicked,
        redirectToHomepage,
        pathname,
        completedDrepRegistration,
        setIsConnectClicked,
    } = useAppContext()

    function handleLogo() {
        myLogoClicked ? setMyLogoClicked(false) : setMyLogoClicked(true)
    }

    useEffect(() => {
        if (myLogoClicked) {
            if (
                pathname === '/drep-registration' &&
                !completedDrepRegistration
            ) {
                return
            } else {
                handleLogo()
                navigate('/')
            }
        }
    }, [myLogoClicked])

    return (
        <Row className="pb-4 header">
            <Col className="d-flex justify-content-between align-items-center">
                <Image
                    fluid
                    src={CatalystLogo}
                    alt="Catalyst Logo"
                    className="d-none d-md-block d-lg-block d-xl-block icon-padding header-logo"
                    onClick={(e) => {
                        handleLogo()
                    }}
                />
                <Image
                    fluid
                    src={CatalystLogoMobile}
                    alt="Catalyst Logo"
                    className="d-lg-none d-sm-block d-md-none icon-padding header-logo-mobile"
                    onClick={(e) => {
                        handleLogo()
                    }}
                />
                <ConnectWalletButton onClick={() => setIsConnectClicked(true)}>
                    Connect Wallet
                </ConnectWalletButton>
            </Col>
            {myLogoClicked ? (
                <SmallModal
                    show={myLogoClicked}
                    buttonText="Yes, cancel"
                    secondButtonText="No, continue"
                    title="Are you sure?"
                    description="Are you sure you want to cancel? Any progress won't be saved."
                    onClick={redirectToHomepage}
                    secondOnClick={() => setMyLogoClicked(!myLogoClicked)}
                    onClose={() => setMyLogoClicked(!myLogoClicked)}
                />
            ) : null}
        </Row>
    )
}
export default Header
