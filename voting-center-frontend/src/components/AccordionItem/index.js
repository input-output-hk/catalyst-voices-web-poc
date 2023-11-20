import React from 'react'
import Accordion from 'react-bootstrap/Accordion'

import './styles.scss'

const AccordionItem = () => {
    return (
        <Accordion>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Accordion Title</Accordion.Header>
                <Accordion.Body>Placeholder for accordion text.</Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}

export default AccordionItem
