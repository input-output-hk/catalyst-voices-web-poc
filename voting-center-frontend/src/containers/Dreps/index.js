import VoteDelegation from '../VoteDelegation'
import { useAppContext } from '../../lib/context'
import DrepList from '../DrepList'

const DrepsPage = () => {
    const { connectedWallet } = useAppContext()
    return <>{connectedWallet ? <VoteDelegation /> : <DrepList />}</>
}

export default DrepsPage
