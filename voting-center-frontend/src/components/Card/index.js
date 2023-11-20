import React from 'react'
import { Link } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import CardButton from '../CardButton'

import './styles.scss'
const CardItem = ({
    title,
    content,
    img,
    variant,
    buttonText,
    votingPhase,
    subcontent,
    onClick,
    className,
    contentClassName,
    cardHeight,
    drepListHeading,
    buttonLink,
}) => {
    return (
        <Card
            className={`border-0 main-card-item mb-3 mt-3 mt-md-0 ${cardHeight} ${className}`}
        >
            <Card.Body
                style={{
                    backgroundImage: `url(${img})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    borderRadius: '8px',
                    maxWidth: '100%',
                    maxHeight: '100%',
                    backgroundPosition: 'center',
                }}
            >
                <Row className={`h-100 card-item-content ${contentClassName}`}>
                    {!votingPhase ? (
                        variant === 'left' ? (
                            <>
                                <Col
                                    sm={12}
                                    md={8}
                                    className="d-flex flex-column align-items-sm-start"
                                >
                                    {drepListHeading && (
                                        <p className="drep-heading">
                                            {drepListHeading}
                                        </p>
                                    )}
                                    <Card.Title>{title}</Card.Title>
                                    <div className="card-item-text">
                                        {content}
                                    </div>
                                    {buttonText ? (
                                        buttonLink ? (
                                            <Link
                                                to={`/${buttonLink}`}
                                                className="d-flex justify-content-center justify-content-sm-start"
                                            >
                                                <CardButton
                                                    onClick={onClick}
                                                    className={'mt-3'}
                                                >
                                                    {buttonText}
                                                </CardButton>
                                            </Link>
                                        ) : (
                                            <CardButton
                                                onClick={onClick}
                                                className={'mt-3'}
                                            >
                                                {buttonText}
                                            </CardButton>
                                        )
                                    ) : null}
                                </Col>
                            </>
                        ) : (
                            <>
                                <Col md={4} sm={12}></Col>
                                <Col
                                    sm={12}
                                    md={8}
                                    className="d-flex flex-column align-items-center align-items-sm-start"
                                >
                                    <Card.Title>{title}</Card.Title>
                                    <div className="card-item-text">
                                        {content}
                                    </div>
                                    {buttonText ? (
                                        buttonLink ? (
                                            <Link to={`/${buttonLink}`}>
                                                <CardButton
                                                    onClick={onClick}
                                                    className={'mt-3'}
                                                >
                                                    {buttonText}
                                                </CardButton>
                                            </Link>
                                        ) : (
                                            <CardButton
                                                onClick={onClick}
                                                className={'mt-3'}
                                            >
                                                {buttonText}
                                            </CardButton>
                                        )
                                    ) : null}
                                </Col>
                            </>
                        )
                    ) : (
                        <>
                            <Col
                                sm={12}
                                md={12}
                                className="d-flex flex-column align-items-center align-items-sm-start"
                            >
                                <Card.Title>{title}</Card.Title>
                                <div className="card-item-text">{content}</div>
                                {buttonText ? (
                                    buttonLink ? (
                                        <Link to={`/${buttonLink}`}>
                                            <CardButton
                                                onClick={onClick}
                                                className={'mt-3'}
                                            >
                                                {buttonText}
                                            </CardButton>
                                        </Link>
                                    ) : (
                                        <CardButton
                                            onClick={onClick}
                                            className={'mt-3'}
                                        >
                                            {buttonText}
                                        </CardButton>
                                    )
                                ) : null}
                            </Col>
                        </>
                    )}
                </Row>
            </Card.Body>
        </Card>
    )
}
export default CardItem
