import React, { Component } from 'react';
import { Modal, Button, Form, Col, Row } from 'react-bootstrap'

// CSS 
import '../../css/home/startTrialModal.css'

class StartTrialModal extends Component {
    
    render() {                                                                  
        return (
            <div className='startTrialModal'>
                <Modal id='startTrialModalConfirmation' show={this.props.showConfirmation} onHide={this.props.closeConfirmationModal}>
                    <Modal.Header className='startTrailModalHeader' closeButton>
                        <Modal.Title>Confirmation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h2 className='startTrialModalConfirmationTitle'>Thank you for your submission of our waiver.</h2>
                        <p className='startTrialModalConfirmationMessage startTrialModalConfirmationMessageLine1'>
                            You can now redeem your <strong>free week</strong> at our location. Check out our class times and come to a class that works best for your schedule.
                        </p>
                        <p className='startTrialModalConfirmationMessage startTrialModalConfirmationMessageLine2'>No sign ups needed!</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.closeConfirmationModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal id='startTrialModalForm' show={this.props.show} onHide={this.props.closeModal}>
                    <Modal.Header className='startTrailModalHeader' closeButton>
                        <Modal.Title>Start Trial</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form id='freeTrialForm'>
                            {/* FIRST NAME INPUT */}
                            <Form.Group as={Row}>
                                <Form.Label column sm="2" className='freeTrialFormLabel'>
                                    FIRST NAME*
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control id="firstname" placeholder="First Name" aria-label='First Name' />
                                </Col>
                            </Form.Group>

                            {/* LAST NAME INPUT */}
                            <Form.Group as={Row}>
                                <Form.Label column sm="2" className='freeTrialFormLabel'>
                                    LAST NAME*
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control id="lastname" placeholder="Last Name" aria-label='Last Name' />
                                </Col>
                            </Form.Group>

                            {/* PHONE INPUT */}
                            <Form.Group as={Row}>
                                <Form.Label column sm="2" className='freeTrialFormLabel'>
                                    PHONE*
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control id="phone" placeholder="Phone Number" aria-label='Phone' />
                                </Col>
                            </Form.Group>

                            {/* EMAIL INPUT */}
                            <Form.Group as={Row}>
                                <Form.Label column sm="2" className='freeTrialFormLabel'>
                                    EMAIL*
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control id="email" type="email" placeholder="Email" aria-label='Email' />
                                </Col>
                            </Form.Group>

                            {/* RADIO INPUT #1 */}
                            <Form.Group className='freeTrialWaiver'>
                                <Row className='freeTrialWaiverRow'>
                                    <Form.Label className="liabiityWaiverLabel">
                                        LIABILITY WAIVER*
                                    </Form.Label>
                                    {['checkbox'].map((type) => (
                                        <div key={`custom-inline-${type}`} className="mb-3">
                                            <Form.Check
                                                custom
                                                inline
                                                label="ACKNOWLEDGE"
                                                type={type}
                                                id={`custom-inline-${type}-1`}
                                                onChange={this.props.handleCheckbox}
                                                name="waivercheckbox"
                                            />
                                        </div>
                                    ))}
                                </Row>
                            </Form.Group>
                            {/* <ContactSuccess contactSuccess={this.state.contactSuccess}/> */}
                            {/* <ContactError contactError={this.state.contactError} /> */}
                            {/* <Button className='contactFormSubmit' type="submit" aria-label='Submit' onClick={this.handleSubmit}>SUBMIT</Button> */}
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.closeModal}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={this.props.submitModal}>
                            Submit
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default StartTrialModal