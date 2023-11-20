import { useState } from 'react'
import { Button as ButtonComponent } from 'react-bootstrap'
import { useAppContext } from '../../lib/context'
import { getWalletBalance } from '../../lib/wallet-connect'
import ProfileButton from '../ProfileButton'
import './styles.scss'

const Button = ({ onClick, children }) => {
    const {
        connectedWallet,
        setConnectedWallet,
        setRefreshWalletBalanceMessage,
        setRefreshVpAndBalance,
    } = useAppContext()

    const [spin, setSpin] = useState(false)

    const refreshWalletBalance = async () => {
        setSpin(true)
        setRefreshVpAndBalance(true)
        const { walletBalance } = await getWalletBalance(connectedWallet.wallet)
        if (walletBalance) {
            setConnectedWallet((prev) => {
                return { ...prev, walletBalance: walletBalance }
            })
            setRefreshWalletBalanceMessage(true)
        }
        setSpin(false)
    }

    return (
        <>
            {connectedWallet ? (
                <ProfileButton
                    value={`${connectedWallet?.walletBalance}`}
                    adressName={`${connectedWallet?.address?.substring(
                        0,
                        4
                    )}...${connectedWallet?.address?.substring(
                        connectedWallet?.address?.length - 4
                    )}`}
                    refreshWalletBalance={refreshWalletBalance}
                    spin={spin}
                />
            ) : (
                <ButtonComponent
                    variant="primary"
                    onClick={onClick}
                    className="wallet-container"
                >
                    {children}
                </ButtonComponent>
            )}
        </>
    )
}
Button.defaultProps = {
    children: 'Button',
    variant: 'primary',
}
export default Button
