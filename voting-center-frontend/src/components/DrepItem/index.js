import { useEffect, useState } from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Avatar from '../../assets/images/profile-avatar.svg'
import Arrow from '../../assets/svg/Arrow/Arrow'
import '../../assets/svg/Arrow/Arrow.scss'
import CloseIcon from '../../assets/svg/CloseIcon'
import ProfileContent from '../../containers/ProfileContent'
import { useAppContext } from '../../lib/context'
import AvatarImage from '../AvatarImage'
import LargeModal from '../LargeModal'
import Tag from '../Tag'
import './styles.scss'

const DrepItem = ({
    id,
    drep,
    className,
    largeModalButtonText,
    disableHover,
    noMetrics,
    setModal,
}) => {
    const {
        selectedDreps,
        setSelectedDreps,
        delegatedPower,
        setDelegatedPower,
        binaryImageRegex,
        urlRegex,
    } = useAppContext()

    const [isHovered, setIsHovered] = useState(false)
    const [isSelected, setIsSelected] = useState(selectedDreps.includes(id))
    const [showModal, setShowModal] = useState(false)
    const [isButtonHovered, setIsButtonHovered] = useState(false)

    useEffect(() => {
        setIsSelected(selectedDreps.includes(id))
    }, [selectedDreps])

    const handleButtonHover = (e) => {
        e.type === 'mouseenter'
            ? setIsButtonHovered(true)
            : setIsButtonHovered(false)
    }

    const handleHover = (e) => {
        disableHover === false
            ? e.type === 'mouseenter'
                ? setIsHovered(true)
                : setIsHovered(false)
            : null
    }

    const handleSelect = () => {
        if (selectedDreps.length < 10) {
            isSelected === false && largeModalButtonText && setIsSelected(true)
            largeModalButtonText && addDrepToSelectList(id)
            setShowModal(false)
            setIsButtonHovered(false)
        } else {
            setShowModal(true)
        }
    }

    const handleDeselect = () => {
        isSelected === true && setIsSelected(false)
        deleteDrepToSelectList(id)
        setShowModal(false)
        setIsButtonHovered(false)
    }

    const handleShowModal = () => {
        !isButtonHovered && setShowModal(true)
    }

    const addDrepToSelectList = (id) => {
        setSelectedDreps([...selectedDreps, id])

        let newDelegatedPower = delegatedPower
        let totalValue = 0
        newDelegatedPower &&
            newDelegatedPower.forEach((delegation) => {
                delegation.value = Math.round(100 / (selectedDreps.length + 1))
                totalValue += delegation.value
            })
        setDelegatedPower([
            ...newDelegatedPower,
            { id: id, value: Math.round(100 - totalValue) },
        ])
    }

    const deleteDrepToSelectList = (ids) => {
        setSelectedDreps(selectedDreps.filter((id) => id !== ids))

        let newDelegatedPower = delegatedPower.filter(
            (delegation) => delegation.id !== ids
        )

        let total = 0
        let lastDelegation = Math.round(100 / newDelegatedPower.length)

        newDelegatedPower &&
            newDelegatedPower.forEach((delegation) => {
                delegation.value = Math.round(100 / newDelegatedPower.length)
                total += delegation.value
            })

        if (total < 100) {
            lastDelegation = lastDelegation + (100 - total)
        } else {
            lastDelegation = lastDelegation - (total - 100)
        }

        if (newDelegatedPower.length) {
            newDelegatedPower[newDelegatedPower.length - 1].value =
                lastDelegation
        }
        setDelegatedPower(newDelegatedPower)
    }

    return (
        <>
            <Row className={`${className} ms-0`}>
                <Col
                    className="drep-item d-flex align-items-start align-items-md-center justify-content-between flex-column flex-md-row"
                    onMouseEnter={handleHover}
                    onMouseLeave={handleHover}
                    onClick={handleShowModal}
                >
                    <div className="d-flex align-items-center">
                        <AvatarImage
                            source={
                                binaryImageRegex.test(drep?.avatar) ||
                                urlRegex.test(drep?.avatar)
                                    ? drep.avatar
                                    : Avatar
                            }
                            name={drep?.avatar ? null : drep?.name}
                            style={{ minWidth: '48px', minHeight: '48px' }}
                        />
                        <Row>
                            <Col className="drep-text-info">
                                <p className="mb-0 drep-name">{drep?.name}</p>
                                <p
                                    className="mb-0 drep-description"
                                    style={{ wordBreak: 'break-all' }}
                                >
                                    {drep?.headline}
                                </p>
                            </Col>
                        </Row>
                    </div>
                    {isSelected ? (
                        <div className="d-flex align-items-start align-items-md-end flex-column">
                            <div className="d-flex mt-2 mt-md-0">
                                {drep?.tags?.map((tag, index) => (
                                    <Tag
                                        key={`${tag}-${index}`}
                                        isCheckAvailable={false}
                                    >
                                        {tag}
                                    </Tag>
                                ))}
                            </div>
                            <Tag
                                className={'deselect-tag'}
                                onClick={isButtonHovered && handleDeselect}
                                endIcon={<CloseIcon />}
                                onMouseEnter={handleButtonHover}
                                onMouseLeave={handleButtonHover}
                            >
                                Deselect
                            </Tag>
                        </div>
                    ) : isHovered ? (
                        <div className="d-none d-md-flex">
                            <Tag
                                onClick={handleSelect}
                                onMouseEnter={handleButtonHover}
                                onMouseLeave={handleButtonHover}
                            >
                                Select
                            </Tag>
                            <Arrow />
                        </div>
                    ) : (
                        <div className="d-flex mt-2 mt-md-0">
                            {drep?.tags?.length > 2
                                ? drep?.tags?.slice(0, 2).map((tag, index) => (
                                      <Tag
                                          key={`${tag}-${index}`}
                                          isCheckAvailable={false}
                                      >
                                          {tag}
                                      </Tag>
                                  ))
                                : drep?.tags?.map((tag, index) => (
                                      <Tag
                                          key={`${tag}-${index}`}
                                          isCheckAvailable={false}
                                      >
                                          {tag}
                                      </Tag>
                                  ))}
                            {drep?.tags?.length > 2 && (
                                <Tag isCheckAvailable={false}>
                                    +{drep?.tags?.length - 2}
                                </Tag>
                            )}
                        </div>
                    )}
                </Col>
            </Row>
            {(showModal || setModal) && (
                <LargeModal
                    id="drep-item-modal"
                    show={showModal || setModal}
                    buttonText={
                        !isSelected && largeModalButtonText
                            ? largeModalButtonText
                            : largeModalButtonText
                            ? largeModalButtonText
                            : 'Close'
                    }
                    onClick={
                        !isSelected
                            ? handleSelect
                            : largeModalButtonText
                            ? handleDeselect
                            : () => setShowModal(!showModal)
                    }
                    placement={'right'}
                    onClose={() => setShowModal(!showModal)}
                >
                    <ProfileContent drep={drep} />
                </LargeModal>
            )}
        </>
    )
}

DrepItem.defaultProps = {
    disableHover: false,
}

export default DrepItem
