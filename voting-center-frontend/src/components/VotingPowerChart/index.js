import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { PieChart, Pie, Cell, Label } from 'recharts'
import ButtonComponent, { ButtonTypes } from '../Button'
import { useAppContext } from '../../lib/context'

import './styles.scss'

export const data = [{ id: 0, value: 100 }]
export const COLORS = [
    '#895AF6',
    '#F43E5C',
    '#F77518',
    '#0DA2E7',
    '#1AC157',
    '#7C89F7',
    '#EC4699',
    '#14B8A5',
    '#E7B008',
    '#82CB15',
]

const VotingPowerChart = ({
    manageDelegationLink,
    delegate,
    votingPowerChartButton,
    votingDelegationText,
    buttonLink,
    storybook,
    onClick,
    showDeleteButton,
}) => {
    const {
        selectedDreps,
        setSelectedDreps,
        delegatedPower,
        setDelegatedPower,
        totalPercentage,
        setTotalPercentage,
        isActiveVoter,
        isSelectedDrepListFull,
    } = useAppContext()
    const [delegatedData, setDelegatedData] = useState(delegatedPower)
    useEffect(() => {
        delegatedPower.length > 0
            ? setDelegatedData(delegatedPower)
            : setDelegatedData(data)

        if (delegatedPower.length > 0) {
            let total = 0
            delegatedPower.forEach((delegation) => {
                total += delegation.value
            })
            setTotalPercentage(total)
        } else {
            setTotalPercentage(100)
        }
    }, [delegatedPower])

    return (
        <Col className="wrapper">
            <h2 className="mb-2 power-chart-heading">Voting delegation</h2>
            <p className="voting-power-text">{votingDelegationText}</p>
            <Row className="chart">
                <PieChart width={200} height={180}>
                    <Pie
                        data={delegatedData}
                        cx={'45%'}
                        cy={'50%'}
                        innerRadius={79}
                        outerRadius={90}
                        fill="#8884d8"
                        dataKey="value"
                        label={false}
                        startAngle={90}
                        endAngle={500}
                        paddingAngle={2}
                    >
                        {delegatedData.map((entry, index) => (
                            <Cell
                                key={index}
                                fill={
                                    totalPercentage === 100
                                        ? COLORS[index % COLORS.length]
                                        : '#EF4343'
                                }
                                className="rounded"
                            />
                        ))}
                        <Label
                            value={`${totalPercentage}%`}
                            offset={0}
                            position="center"
                            className={
                                totalPercentage !== 100
                                    ? 'percentage-red-color'
                                    : null
                            }
                        />
                    </Pie>
                </PieChart>

                <div className="chart-shadow"></div>
            </Row>
            <div className="d-flex flex-row align-items-center justify-content-between w-100 info">
                <p className="p-0">Status</p>
                <span>
                    {totalPercentage === 100 ? (
                        isActiveVoter ? (
                            'Not delegated'
                        ) : (
                            'Ready to delegate'
                        )
                    ) : totalPercentage < 100 ? (
                        <span className="danger-text">Under delegated</span>
                    ) : (
                        <span className="danger-text">Over delegated</span>
                    )}
                </span>
            </div>
            <div className="d-flex flex-row align-items-center justify-content-between w-100 info">
                <p className="p-0">Delegate(s)</p>
                <span>{delegate}</span>
            </div>
            {!storybook &&
                (buttonLink ? (
                    selectedDreps.length === 0 ? (
                        manageDelegationLink ? (
                            <Link to={`/delegations`}>
                                <ButtonComponent
                                    disabled={
                                        selectedDreps.length === 0
                                            ? true
                                            : false
                                    }
                                    className="w-100 chart-button-styles"
                                >
                                    {votingPowerChartButton}
                                </ButtonComponent>
                            </Link>
                        ) : (
                            <ButtonComponent
                                disabled={
                                    selectedDreps.length === 0 ? true : false
                                }
                                className="w-100 chart-button-styles"
                            >
                                {votingPowerChartButton}
                            </ButtonComponent>
                        )
                    ) : (
                        <Link to={`/${buttonLink}`}>
                            <ButtonComponent
                                disabled={
                                    selectedDreps.length === 0 ? true : false
                                }
                                className="w-100 chart-button-styles"
                            >
                                {votingPowerChartButton}
                            </ButtonComponent>
                        </Link>
                    )
                ) : selectedDreps.length > 0 ? (
                    manageDelegationLink ? (
                        <Link to={`/delegations`}>
                            <ButtonComponent
                                disabled={
                                    selectedDreps.length === 0 ? true : false
                                }
                                className="w-100 chart-button-styles"
                            >
                                {votingPowerChartButton}
                            </ButtonComponent>
                        </Link>
                    ) : (
                        <>
                            <ButtonComponent
                                disabled={
                                    votingPowerChartButton
                                        .toString()
                                        .includes('Add') &&
                                    isSelectedDrepListFull
                                        ? true
                                        : false
                                }
                                onClick={onClick}
                                className="w-100 chart-button-styles"
                            >
                                {votingPowerChartButton}
                            </ButtonComponent>
                            {showDeleteButton && (
                                <ButtonComponent
                                    onClick={() => {
                                        setSelectedDreps([])
                                        setDelegatedPower([])
                                    }}
                                    className="w-100 chart-button-styles"
                                    type={ButtonTypes.Danger}
                                >
                                    {'Cancel delegations'}
                                </ButtonComponent>
                            )}
                        </>
                    )
                ) : (
                    <ButtonComponent
                        disabled={selectedDreps.length === 0 ? true : false}
                        onClick={onClick}
                        className="w-100 chart-button-styles"
                    >
                        {votingPowerChartButton}
                    </ButtonComponent>
                ))}
        </Col>
    )
}

export default VotingPowerChart
