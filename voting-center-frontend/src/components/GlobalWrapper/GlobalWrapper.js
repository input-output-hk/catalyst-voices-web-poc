import { useEffect, useRef, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { env } from '../../env'
import { useAppContext } from '../../lib/context'
import ScrollToTopMainScroll from '../../lib/hooks/ScrollToTop'
import DrepRoutes from '../DrepRoutes'
import DropdownNav from '../Dropdown'
import Footer from '../Footer'
import Header from '../Header'
import GeneralNotice from '../Notices/GeneralNotice'
import ScrollToTop from '../ScrollToTop'
import Sidebar from '../Sidebar'
import SmallModal from '../SmallModal'
import Spinner from '../Spinner'
import VoterRoutes from '../VoterRoutes'
import WalletModal from '../WalletModal'
import WalletRoutes from '../WalletRoutes'

import { useLocation } from 'react-router-dom'
import './styles.scss'

const GlobalWrapper = () => {
    const onClose = () => setIsConnectClicked(false)
    const lastPos = useRef(0)

    const {
        isConnectClicked,
        setIsConnectClicked,
        isLoading,
        isDrep,
        isVoter,
        setDrepListPage,
        drepListPage,
        drepPageCount,
        wrongNetwork,
        setConnectedWallet,
        setWrongNetwork,
        setDrepProfile,
        setVoterData,
        refreshWalletBalanceMessage,
        setRefreshWalletBalanceMessage,
    } = useAppContext()

    const [showSafetyCheck, setShowSafetyCheck] = useState(true)
    const { pathname } = useLocation()

    useEffect(() => {
        setTimeout(function () {
            setShowSafetyCheck(false)
        }, 5000)
    }, [])

    useEffect(() => {
        if (refreshWalletBalanceMessage)
            setTimeout(function () {
                setRefreshWalletBalanceMessage(false)
            }, 5000)
    }, [refreshWalletBalanceMessage])

    const handleScroll = (e) => {
        const bottom =
            e.target.scrollHeight - e.target.scrollTop <
            e.target.clientHeight + 10

        let currentYPos = e.target.scrollTop

        if (currentYPos > lastPos.current) {
            // downScroll
            if (pathname === '/delegations') {
                if (isLoading === false) {
                    if (bottom && drepListPage < drepPageCount) {
                        if (isLoading === false) {
                            let timeout
                            clearTimeout(timeout)
                            timeout = setTimeout(() => {
                                setDrepListPage(drepListPage + 1)
                            }, 800)
                        }
                    }
                }
            }
        }

        lastPos.current = currentYPos
    }

    useEffect(() => {
        if (pathname !== '/delegations' && drepListPage > 1) {
            setDrepListPage(1)
        }
    }, [pathname])

    const handleWalletDisconnect = () => {
        setDrepProfile(null)
        setVoterData(null)
        setConnectedWallet(null)
        setWrongNetwork(false)
    }

    return (
        <ScrollToTop>
            <Container fluid className="container-wrapper relative">
                {isConnectClicked ? (
                    <WalletModal show={isConnectClicked} onClose={onClose} />
                ) : null}
                {wrongNetwork && (
                    <SmallModal
                        show={wrongNetwork}
                        onClose={() => handleWalletDisconnect()}
                        buttonText={`Disconnect`}
                        onClick={() => handleWalletDisconnect()}
                        title={`Warning`}
                        description="The wallet connected is on the incorrect network"
                    />
                )}
                <Header />
                <Row className="justify-content-center">
                    <Col md={2} className="pe-md-0 pt-md-5 d-none d-md-block">
                        <Sidebar />
                    </Col>
                    <Col sm={12} className="pe-md-0 d-md-none d-block">
                        <DropdownNav
                            className={'w-100 pt-3 pb-3'}
                            dropdownMenu={true}
                        />
                    </Col>
                    <Col
                        sm={12}
                        md={10}
                        className="main-scroll pt-2"
                        id="main-scroll-wrapper"
                        onScroll={handleScroll}
                    >
                        <ScrollToTopMainScroll />
                        {isLoading && <Spinner />}
                        {showSafetyCheck && (
                            <div className="safety-check">
                                <GeneralNotice
                                    label={`Safety Check: Always verify you're on ${env.REACT_APP_FRONTEND_URL}!`}
                                />
                            </div>
                        )}
                        {refreshWalletBalanceMessage && (
                            <div className="refresh-wallet-balance">
                                <GeneralNotice
                                    label={`Wallet balance refreshed!`}
                                />
                            </div>
                        )}
                        {isVoter ? (
                            isDrep ? (
                                <>
                                    <DrepRoutes />
                                </>
                            ) : (
                                <>
                                    <VoterRoutes />
                                </>
                            )
                        ) : (
                            <>
                                <WalletRoutes />
                            </>
                        )}
                        <Footer className="mt-5" />
                    </Col>
                </Row>
            </Container>
        </ScrollToTop>
    )
}

export default GlobalWrapper
