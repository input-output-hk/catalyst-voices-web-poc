import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Modal as BootstrapModal } from 'react-bootstrap'
import ModalBackButton from '../../assets/svg/ModelBackButton/ModalBackButton'
import '../../assets/svg/ModelBackButton/ModelBackButton.scss'
import { useAppContext } from '../../lib/context'

import './styles.scss'
import PropTypes from 'prop-types'
import ButtonComponent, { ButtonTypes } from '../Button'

const LargeModal = ({
    id,
    show,
    children,
    placement,
    textHeading,
    backButton,
    buttonText,
    secondButtonText,
    onClick,
    secondOnClick,
    onClose,
    disableButton,
    destructive,
}) => {
    const { isSelectedDrepListFull } = useAppContext()
    return (
        <BootstrapModal
            show={show}
            backdrop
            centered
            dialogClassName="large-modal"
            className={placement ? `${placement}-side` : ''}
            onHide={onClose}
            id={id}
        >
            <BootstrapModal.Header
                closeButton
                className={backButton ? 'header-normal' : 'header-reverse'}
            >
                {backButton ? <ModalBackButton /> : null}
            </BootstrapModal.Header>
            {textHeading ? (
                <BootstrapModal.Title>{textHeading}</BootstrapModal.Title>
            ) : null}
            <BootstrapModal.Body className="large-modal-body">
                {children}
            </BootstrapModal.Body>

            <BootstrapModal.Footer>
                {secondButtonText ? (
                    <Row className="w-100">
                        <Col className="ps-0">
                            <ButtonComponent
                                type={ButtonTypes.Ghost}
                                className={'w-100 button-styles'}
                                onClick={secondOnClick}
                            >
                                {secondButtonText}
                            </ButtonComponent>
                        </Col>
                        <Col className="p-0">
                            <ButtonComponent
                                type={
                                    destructive
                                        ? ButtonTypes.Destructive
                                        : ButtonTypes.Primary
                                }
                                className={'w-100 button-styles'}
                                onClick={onClick}
                                disabled={
                                    disableButton ||
                                    (buttonText.toString().includes('Add') &&
                                        isSelectedDrepListFull)
                                        ? true
                                        : false
                                }
                            >
                                {buttonText}
                            </ButtonComponent>
                        </Col>
                    </Row>
                ) : (
                    <ButtonComponent
                        type={ButtonTypes.Primary}
                        className={'w-100 button-styles'}
                        onClick={onClick}
                        disabled={
                            disableButton ||
                            (buttonText.toString().includes('Add') &&
                                isSelectedDrepListFull)
                                ? true
                                : false
                        }
                    >
                        {buttonText}
                    </ButtonComponent>
                )}
            </BootstrapModal.Footer>
        </BootstrapModal>
    )
}

LargeModal.propTypes = {
    show: PropTypes.bool,
    secondButtonText: PropTypes.string,
    backButton: PropTypes.bool,
}

export default LargeModal
