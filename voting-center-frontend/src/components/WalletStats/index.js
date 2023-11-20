import React from 'react'
import { Row, Col, Spinner } from 'react-bootstrap'
import { useAppContext } from '../../lib/context'

import './styles.scss'

const WalletStats = ({
    stakedAdaValue,
    delegatedADAvalue,
    stakedAdaName,
    delegatedAdaName,
    tpName,
    delegatedAdaValue,
    tpValue,
    delegationsValue,
    votingPowerValue,
    className,
    showSpinner,
}) => {
    const { isLoading } = useAppContext()
    return (
        <Row className={`flex-column flex-start ${className}`}>
            <Col>
                <p className="adaWallet-text-top m-0">
                    {stakedAdaName}
                    {delegatedAdaName}
                    {tpName}
                </p>
            </Col>
            <Col>
                {showSpinner !== null || stakedAdaValue ? (
                    <p className="adaWallet-text-middle m-0 my-2">
                        {stakedAdaValue}
                        {delegatedAdaValue}
                        {tpValue}
                    </p>
                ) : (
                    <Row>
                        <Col className="d-flex justify-content-center my-3">
                            {isLoading ? (
                                <Spinner className="ms-3" animation="border" />
                            ) : (
                                <p>--</p>
                            )}
                        </Col>
                    </Row>
                )}
            </Col>
            <Col>
                {showSpinner !== null || stakedAdaValue ? (
                    <p className="adaWallet-text-bottom m-0">
                        {delegatedADAvalue} {delegationsValue}{' '}
                        {votingPowerValue}
                    </p>
                ) : null}
            </Col>
        </Row>
    )
}

export default WalletStats
