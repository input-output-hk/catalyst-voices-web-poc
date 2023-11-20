import React from 'react'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './styles.scss'
const SmallCard = ({ title, content, button, className }) => (
    <Card className={`${className} small-card`}>
        <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Row>
                <Col>
                    {content}
                    {button}
                </Col>
            </Row>
        </Card.Body>
    </Card>
)

export default SmallCard
