import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import StepCheck from '../../assets/svg/StepCheck'

import './styles.scss'
const Stepper = ({ stepperTitle, activeStepIndex, steps }) => {
    return (
        <Row className="stepper g-0">
            <Col>
                <p className="stepper-title">{stepperTitle}</p>
                {steps.map((step, index) => (
                    <Row key={index}>
                        <Col className="step-content d-flex">
                            {index + 1 < steps.length ? (
                                index < activeStepIndex ? (
                                    <div
                                        className={`steps-line steps-line-completed`}
                                    ></div>
                                ) : activeStepIndex === index ? (
                                    <div
                                        className={`steps-line steps-line-active`}
                                    ></div>
                                ) : (
                                    <div
                                        className={`steps-line steps-line-uncompleted`}
                                    ></div>
                                )
                            ) : null}
                            <Row className="me-2">
                                <Col className="step-check-container">
                                    {index < activeStepIndex ? (
                                        <StepCheck
                                            className={`step-check step-check-completed`}
                                        />
                                    ) : index === activeStepIndex ? (
                                        <StepCheck
                                            className={`step-check step-check-active`}
                                        />
                                    ) : (
                                        <StepCheck
                                            className={`step-check step-check-uncompleted`}
                                        />
                                    )}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <p className="phase-number">
                                        Phase {index + 1}
                                    </p>
                                    <p className="step-name">
                                        {activeStepIndex === index && (
                                            <span className="current-step-text">
                                                Curent step:{' '}
                                            </span>
                                        )}
                                        {step.name}
                                    </p>
                                    <p className="step-description">
                                        {activeStepIndex === index &&
                                            step.description}
                                    </p>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                ))}
            </Col>
        </Row>
    )
}

export default Stepper
