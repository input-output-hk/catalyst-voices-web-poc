import React, { useEffect, useState } from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Avatar from '../../assets/images/Avatar.png'
import MinusSign from '../../assets/svg/MinusSign'
import PlusSignBigger from '../../assets/svg/PlusSignBigger'
import Trash from '../../assets/svg/Trash'
import { useAppContext } from '../../lib/context'
import AvatarImage from '../AvatarImage'
import ButtonComponent, {
    ButtonSizes,
    ButtonTypes,
    ButtonVariants,
} from '../Button'
import ComboInput from '../Inputs/ComboInput'
import SingleRangeSlider from '../SingleRangeSlider'

import './styles.scss'

const SingleDrepDelegation = ({ className, drep, id, color }) => {
    const {
        selectedDreps,
        setSelectedDreps,
        delegatedPower,
        setDelegatedPower,
        sliderChange,
        setSliderChange,
        binaryImageRegex,
        urlRegex,
        votingPowerNumber,
    } = useAppContext()

    const [sliderValue, setSliderValue] = useState()

    useEffect(() => {
        const objIndex = delegatedPower.findIndex((obj) => obj.id === id)

        if (objIndex >= 0) {
            setSliderValue(
                Math.round(
                    (votingPowerNumber / 100) * delegatedPower[objIndex].value
                )
            )
            setSliderChange(delegatedPower[objIndex].value)
        }
    }, [sliderValue, delegatedPower, sliderChange])

    const deleteDrepToSelectList = (ids) => {
        setSelectedDreps(selectedDreps.filter((id) => id !== ids))
        setDelegatedPower(
            delegatedPower.filter((delegation) => delegation.id !== ids)
        )
    }

    const handleDelete = () => {
        deleteDrepToSelectList(id)
    }

    const handleChange = (event) => {
        let objIndex = delegatedPower.findIndex((obj) => obj.id === id)

        if (objIndex >= 0) {
            if (Number(event.target.value) > 100) {
                event.target.value = 100
            }

            let delegatedPowerClone = delegatedPower
            delegatedPowerClone[objIndex].value = Number(event.target.value)
            if (
                Number(event.target.value) <= 100 &&
                Number(event.target.value) >= 0
            ) {
                setSliderValue(
                    Math.round(
                        (votingPowerNumber / 100) *
                            delegatedPowerClone[objIndex].value
                    )
                )

                setSliderChange(event.target.value)
                setDelegatedPower(delegatedPowerClone)
            }
        }
    }

    return (
        <Row
            className={`single-drep-delegation ${className}`}
            style={{ borderColor: color }}
        >
            <Col>
                <Row className="justify-content-between align-items-center">
                    <Col className="d-flex justify-content-start align-items-center">
                        <AvatarImage
                            source={
                                binaryImageRegex.test(drep.avatar) ||
                                urlRegex.test(drep.avatar)
                                    ? drep.avatar
                                    : Avatar
                            }
                            name={drep?.avatar ? null : drep?.name}
                        />
                        <p className="p-0 avatar-list-name">{drep?.name}</p>
                    </Col>
                    <Col className="d-flex justify-content-end align-items-center pe-3">
                        <ButtonComponent
                            type={ButtonTypes.Ghost}
                            size={ButtonSizes.SM}
                            variant={ButtonVariants.IconButton}
                            iconButton={<Trash />}
                            onClick={handleDelete}
                        ></ButtonComponent>
                    </Col>
                </Row>
                <Row className="drep-voting-stats align-items-center gy-2">
                    <Col md={4}>
                        <p className="voting-power-text">Delegate</p>
                    </Col>
                    <Col md={3} className="px-md-0 d-flex align-items-center">
                        <ComboInput
                            value={
                                delegatedPower.findIndex(
                                    (obj) => obj.id === id
                                ) >= 0
                                    ? Number(
                                          delegatedPower[
                                              delegatedPower.findIndex(
                                                  (obj) => obj.id === id
                                              )
                                          ].value
                                      )
                                    : 50
                            }
                            min={'0'}
                            max={'100'}
                            type="text"
                            rightSide={true}
                            content="%"
                            onChange={handleChange}
                            className="text-md-center text-left percent-value"
                        />
                    </Col>
                    <Col
                        sm={5}
                        md={5}
                        className="d-flex justify-content-md-end align-items-center"
                    >
                        <p className="p-0 voting-power-text">
                            voting power:{' '}
                            <span>{sliderValue ? sliderValue : '--'}</span>
                        </p>
                    </Col>
                </Row>
                <Row className="align-items-center">
                    <Col className="d-flex align-items-center">
                        <MinusSign
                            className="range-minus-icon"
                            style={{ marginTop: '3px' }}
                        />
                        <SingleRangeSlider
                            initial={
                                delegatedPower.findIndex(
                                    (obj) => obj.id === id
                                ) >= 0
                                    ? delegatedPower[
                                          delegatedPower.findIndex(
                                              (obj) => obj.id === id
                                          )
                                      ].value
                                    : 50
                            }
                            id={id}
                        />
                        <PlusSignBigger className="range-plus-icon" />
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default SingleDrepDelegation
