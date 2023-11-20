import { Link } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useAppContext } from '../../lib/context'
import ButtonComponent, {
    ButtonTypes,
    ButtonVariants,
    ButtonSizes,
} from '../Button'
import ErrorNotice from '../Notices/ErrorNotice'
import DetailedView from '../../assets/svg/DetailedView'

import './styles.scss'

const RegistrationInfo = ({
    drepHeading,
    drepText,
    drepButtonText,
    onClick,
    buttonLink,
    errorMessage,
}) => {
    const { voterTransactionHash } = useAppContext()
    return (
        <Row>
            <Col className="d-flex justify-content-center align-items-md-center drep-wrapper">
                <Row className="drep-content flex-column align-items-center">
                    <div>
                        <Col>
                            <h2 className="drep-heading text-center">
                                {drepHeading}
                            </h2>
                        </Col>
                        <Col className="d-flex justify-content-center">
                            {drepText ? (
                                <h2 className="drep-text text-center">
                                    {drepText}
                                </h2>
                            ) : (
                                <ErrorNotice
                                    label={
                                        errorMessage
                                            ? errorMessage.toString()
                                            : 'We encountered a connection issue whilst creating your account'
                                    }
                                />
                            )}
                        </Col>
                    </div>
                    <Col className="d-flex justify-content-md-center justify-content-center align-items-end align-items-md-start drep-btn-wrapper">
                        {buttonLink ? (
                            <Link to={`/${buttonLink}`}>
                                <ButtonComponent
                                    type={ButtonTypes.Primary}
                                    variant={ButtonVariants.Default}
                                    size={ButtonSizes.MD}
                                    onClick={onClick}
                                >
                                    {drepButtonText}
                                </ButtonComponent>
                            </Link>
                        ) : (
                            <ButtonComponent
                                type={ButtonTypes.Primary}
                                variant={ButtonVariants.Default}
                                size={ButtonSizes.MD}
                                onClick={onClick}
                            >
                                {drepButtonText}
                            </ButtonComponent>
                        )}
                    </Col>
                    <Col className="d-flex align-items-center justify-content-center mt-5">
                        {voterTransactionHash && (
                            <a
                                href={`https://preprod.cardanoscan.io/transaction/${voterTransactionHash}`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <ButtonComponent
                                    className="transaction-id-button"
                                    type={ButtonTypes.Ghost}
                                    size={ButtonSizes.SM}
                                    endIcon={<DetailedView />}
                                >
                                    Transaction ID: {voterTransactionHash}
                                </ButtonComponent>
                            </a>
                        )}
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default RegistrationInfo
