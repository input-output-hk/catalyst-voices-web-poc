import { useAppContext } from '../../lib/context'
import RegistrationInfo from '../../components/RegistrationInfo'
import { useNavigate } from 'react-router-dom'

const VoteDelegationInfo = ({
    heading,
    text,
    errorMessage,
    transactionHash,
}) => {
    let navigate = useNavigate()
    const { redirectToDashboard, isDelegationSuccessful, setVoteIsDelegated } =
        useAppContext()

    const finishDelegation = () => {
        setVoteIsDelegated()
        redirectToDashboard()
    }

    const finishDelegationWithError = () => {
        setVoteIsDelegated()
        navigate('/delegations')
    }

    return (
        <>
            {isDelegationSuccessful ? (
                <RegistrationInfo
                    drepHeading={heading}
                    drepText={text}
                    drepButtonText={'My Dashboard'}
                    onClick={finishDelegation}
                    transactionHash={transactionHash}
                />
            ) : (
                <RegistrationInfo
                    drepHeading={'An error occurred'}
                    drepButtonText={'Try again'}
                    onClick={finishDelegationWithError}
                    errorMessage={errorMessage}
                />
            )}
        </>
    )
}

export default VoteDelegationInfo
