import React from 'react'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'

import './styles.scss'

const TabItem = ({ title }) => {
    return (
        <Tabs
            defaultActiveKey="profile"
            id="uncontrolled-tab-example"
            className="mb-3"
        >
            <Tab eventKey="home" title={title}>
                <h3 className="tab-heading">Headline</h3>
                <p className="tab-text">Placeholder for body text.</p>
            </Tab>
            <Tab eventKey="profile" title={title}>
                <h3 className="tab-heading">Headline</h3>
                <p className="tab-text">Placeholder for body text.</p>
            </Tab>
            <Tab eventKey="contact" title={title} disabled>
                <h3 className="tab-heading">Headline</h3>
                <p className="tab-text">Placeholder for body text.</p>
            </Tab>
        </Tabs>
    )
}

export default TabItem
