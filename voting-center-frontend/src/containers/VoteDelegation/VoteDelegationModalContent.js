import React, { useState, useEffect } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { data, COLORS } from '../../components/VotingPowerChart'
import ButtonComponent from '../../components/Button'
import {
    ButtonSizes,
    ButtonTypes,
    ButtonVariants,
} from '../../components/Button'
import VotingPowerChart from '../../components/VotingPowerChart'
import SingleDrepDelegation from '../../components/SingleDrepDelegation'
import { PieChart, Pie, Cell, Label } from 'recharts'
import { useAppContext } from '../../lib/context'
import Trash from '../../assets/svg/Trash'
import { getSelectedDreps } from '../../lib/api'

import './styles.scss'

const VoteDelegationModalContent = ({ onClose, showDeleteButton }) => {
    const {
        selectedDreps,
        setSelectedDreps,
        votingPower,
        delegatedPower,
        setDelegatedPower,
        sliderChange,
        isActiveVoter,
        totalPercentage,
        setTotalPercentage,
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
    }, [delegatedPower, sliderChange])

    const [selectedDrepsList, setSelectedDrepsList] = useState()

    const handleSelectedDreps = async () => {
        const res = await getSelectedDreps(selectedDreps)
        setSelectedDrepsList(res)
    }

    useEffect(() => {
        handleSelectedDreps()
    }, [selectedDreps])
    return (
        <>
            <Col className="d-block d-md-none w-100">
                <VotingPowerChart
                    votingDelegationText={`Your total voting power is ${
                        votingPower && votingPower !== 'NaN.ef'
                            ? votingPower
                            : '--'
                    }`}
                    vp={totalPercentage}
                    delegate={selectedDreps.length}
                    votingPowerChartButton={'Add another dRep'}
                    onClick={onClose}
                    showDeleteButton={!showDeleteButton}
                />
            </Col>
            <Col className="d-none d-md-block">
                <Row className="flex-row justify-content-md-between align-content-center delegation-chart w-100 p-3">
                    <Col className="ps-3 d-flex align-items-center">
                        <PieChart width={200} height={180}>
                            <Pie
                                data={delegatedData}
                                cx={'45%'}
                                cy={'50%'}
                                innerRadius={79}
                                outerRadius={90}
                                fill="#8884D8"
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
                    </Col>
                    <Col className="px-0 d-flex flex-column pe-3">
                        <Col className="d-flex flex-row align-items-center justify-content-between delegates-info w-100 px-0">
                            <p className="p-0 delegates-info-text">Status</p>
                            <span className="delegates-info-span">
                                {totalPercentage === 100 ? (
                                    isActiveVoter ? (
                                        'Not delegated'
                                    ) : (
                                        'Ready to delegate'
                                    )
                                ) : totalPercentage < 100 ? (
                                    <span className="danger-text">
                                        Under delegated
                                    </span>
                                ) : (
                                    <span className="danger-text">
                                        Over delegated
                                    </span>
                                )}
                            </span>
                        </Col>
                        <Col className="d-flex flex-row align-items-center justify-content-between delegates-info w-100 px-0">
                            <p className="p-0 delegates-info-text">
                                Voting power
                            </p>
                            <span className="delegates-info-span">
                                {votingPower && votingPower !== 'NaN.ef'
                                    ? votingPower
                                    : '--'}
                            </span>
                        </Col>
                        <Col className="d-flex flex-row align-items-center justify-content-between delegates-info w-100 px-0">
                            <p className="p-0 delegates-info-text">
                                Delegate(s)
                            </p>
                            <span className="delegates-info-span">
                                {selectedDreps.length}
                            </span>
                        </Col>
                    </Col>
                    <Col
                        md={10}
                        className="btn-delegation d-flex align-content-center"
                    >
                        {!showDeleteButton && (
                            <ButtonComponent
                                onClick={() => {
                                    setSelectedDreps([])
                                    setDelegatedPower([])
                                }}
                                className="w-100 drep-button mt-0 me-3"
                                type={ButtonTypes.Danger}
                            >
                                Cancel delegations
                            </ButtonComponent>
                        )}
                        <ButtonComponent
                            onClick={onClose}
                            disabled={isSelectedDrepListFull}
                            className="w-100 drep-button"
                        >
                            Add another dRep
                        </ButtonComponent>
                    </Col>
                </Row>
            </Col>
            <Col md={12} className="delegation-wrapper-middle p-3 w-100">
                <Row className="justify-content-between align-items-center gx-0">
                    <Col className="px-0 d-flex flex-start">
                        <p className="p-0">
                            Your dReps
                            <span className="dreps-span-text">
                                ({selectedDreps.length})
                            </span>
                        </p>
                    </Col>
                    <Col className="d-flex justify-content-end align-items-center px-0">
                        <ButtonComponent
                            type={ButtonTypes.Ghost}
                            size={ButtonSizes.SM}
                            variant={ButtonVariants.Button}
                            leadingIcon={<Trash />}
                            onClick={() => {
                                setSelectedDreps([])
                                setDelegatedPower([])
                            }}
                        >
                            Clear
                        </ButtonComponent>
                    </Col>
                </Row>
            </Col>
            <Col md={12} className="list-item p-3 w-100">
                {selectedDrepsList &&
                    selectedDrepsList.map(({ id, attributes }, index) => (
                        <SingleDrepDelegation
                            key={id}
                            id={id}
                            drep={attributes}
                            className={'mb-4'}
                            color={COLORS[index % COLORS.length]}
                        />
                    ))}
            </Col>
        </>
    )
}
export default VoteDelegationModalContent
