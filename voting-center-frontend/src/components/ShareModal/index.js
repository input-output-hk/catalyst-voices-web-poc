import React, { useState, useEffect } from 'react'
import './styles.scss'
import Row from 'react-bootstrap/Row'
import { Modal as BootstrapModal } from 'react-bootstrap'
import CardButton from '../CardButton'
import Input from '../Inputs/Input'
import { env } from '../../env'

const MODAL_TITLE = 'Share'
const MODAL_BODY = 'Share this profile on'

function ShareModal({ show, value, onClose, id }) {
    const [inputValue] = useState(value)

    function onClick() {
        navigator.clipboard.writeText(inputValue)
    }

    let propertyID = env.REACT_APP_SHARETHIS_PROPERTY_ID
    let shareThisScript = document.createElement('script')
    let shareThisButtonConfig = document.createElement('script')

    function socials() {
        shareThisScript.type = 'text/javascript'
        shareThisScript.setAttribute(
            'src',
            `https://platform-api.sharethis.com/js/sharethis.js#property=${propertyID}&product=inline-share-buttons&source=platform`
        )
        shareThisScript.setAttribute('async', 'async')

        shareThisButtonConfig.async = true
        shareThisButtonConfig.setAttribute(
            'src',
            `https://buttons-config.sharethis.com/js/${propertyID}.js`
        )
        document.head.appendChild(shareThisScript)
        document.head.appendChild(shareThisButtonConfig)
    }

    useEffect(() => {
        socials()
    }, [])

    return (
        <BootstrapModal
            id={id}
            show={show}
            onHide={() => {
                onClose && onClose()
                document.head.removeChild(shareThisScript)
                document.head.removeChild(shareThisButtonConfig)
            }}
            backdrop
            centered
            className="share-modal"
        >
            <BootstrapModal.Header closeButton></BootstrapModal.Header>
            <BootstrapModal.Title>{MODAL_TITLE}</BootstrapModal.Title>
            <BootstrapModal.Body>
                <div>
                    <p className="modal-text">{MODAL_BODY}</p>
                </div>
                <Row className="icons-row g-2">
                    <div className="sharethis-inline-share-buttons"></div>
                </Row>
                <Row className="bottom-part justify-content-center">
                    <Input
                        value={inputValue}
                        readOnly={true}
                        id="input-clipboard"
                    ></Input>
                    <CardButton onClick={onClick}>Copy link!</CardButton>
                </Row>
            </BootstrapModal.Body>
        </BootstrapModal>
    )
}

export default ShareModal
