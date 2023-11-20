import React from 'react'
import { Modal as BootstrapModal } from 'react-bootstrap'
import ButtonComponent, { ButtonSizes, ButtonTypes } from '../Button'
import PropTypes from 'prop-types'

import './styles.scss'

const SmallModal = ({
    show,
    buttonText,
    secondButtonText,
    onClick,
    secondOnClick,
    title,
    description,
    onClose,
}) => {
    return (
        <BootstrapModal
            show={show}
            backdrop
            centered
            className="small-modal"
            onHide={onClose}
        >
            <BootstrapModal.Header closeButton></BootstrapModal.Header>
            <BootstrapModal.Title>{title}</BootstrapModal.Title>
            <BootstrapModal.Body>
                <div>
                    <p className="small-modal-text">{description}</p>
                </div>
                {secondButtonText ? (
                    <div className="d-flex w-100">
                        <ButtonComponent
                            type={ButtonTypes.Ghost}
                            size={ButtonSizes.MD}
                            className={`me-3 w-100`}
                            onClick={secondOnClick}
                        >
                            {secondButtonText}
                        </ButtonComponent>
                        <ButtonComponent
                            type={ButtonTypes.Primary}
                            size={ButtonSizes.MD}
                            onClick={onClick}
                            className={`w-100`}
                        >
                            {buttonText}
                        </ButtonComponent>
                    </div>
                ) : (
                    <div className="d-flex one-button-wrapper">
                        <ButtonComponent
                            type={ButtonTypes.Primary}
                            className={'small-modal-one-button'}
                            onClick={onClick}
                        >
                            {buttonText}
                        </ButtonComponent>
                    </div>
                )}
            </BootstrapModal.Body>
        </BootstrapModal>
    )
}

SmallModal.propTypes = {
    show: PropTypes.bool,
    buttonText: PropTypes.string.isRequired,
    secondButtonText: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    secondOnClick: PropTypes.func,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
}

export default SmallModal
