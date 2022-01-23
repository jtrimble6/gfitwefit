import React, { Component } from 'react';
import { Modal, Button, Form, Col, Row } from 'react-bootstrap'

// CSS 
import '../../css/kids/kidsTrainingSignUpModal.css'

class KidsTrainingSignUpModal extends Component {
    
    render() {                                                                  
        return (
            <div className='kidsTrainingSignUpModal'>
                <Modal id='kidsTrainingSignUpModalConfirmation' show={this.props.showConfirmation} onHide={this.props.closeConfirmationModal}>
                    <Modal.Header className='kidsTrainingSignUpModalHeader' closeButton>
                        <Modal.Title>Confirmation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h2 className='kidsTrainingSignUpModalConfirmationTitle'>Thank you for your signing up for our Kids' Speed & Strength Camp.</h2>
                        <p className='kidsTrainingSignUpModalConfirmationMessage kidsTrainingSignUpModalConfirmationMessageLine2'>
                            We are excited to have you join the family!
                        </p>
                        <p className='kidsTrainingSignUpModalConfirmationMessage kidsTrainingSignUpModalConfirmationMessageLine1'>
                            An email has been sent with further details to the email address provided.
                        </p>
                    </Modal.Body>
                    <Modal.Footer className='kidsTrainingSignUpModalFooter'>
                        <Button variant="secondary" onClick={this.props.closeConfirmationModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal id='kidsTrainingWaiverModal' show={this.props.showWaiver} onHide={this.props.closeWaiverModal}>
                    <Modal.Header className='kidsTrainingWaiverModalHeader' closeButton>
                        <Modal.Title>Waiver</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* <h2 className='kidsTrainingWaiverModalTitle'></h2> */}
                        <p className='kidsTrainingWaiverModalBody'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Posuere morbi leo urna molestie at elementum eu facilisis sed. Massa ultricies mi quis hendrerit dolor magna eget est. A iaculis at erat pellentesque. Semper feugiat nibh sed pulvinar proin gravida hendrerit lectus. At auctor urna nunc id cursus metus. Malesuada fames ac turpis egestas sed. Amet porttitor eget dolor morbi non arcu risus quis. Facilisis mauris sit amet massa vitae tortor condimentum lacinia quis. Consectetur adipiscing elit duis tristique sollicitudin. Egestas purus viverra accumsan in nisl nisi. Viverra mauris in aliquam sem fringilla ut morbi. Elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at augue. Et molestie ac feugiat sed lectus vestibulum mattis ullamcorper. Blandit libero volutpat sed cras ornare arcu dui. Fames ac turpis egestas integer eget aliquet.

                            Elementum nisi quis eleifend quam. Gravida cum sociis natoque penatibus et magnis dis. Velit sed ullamcorper morbi tincidunt ornare massa eget egestas. Quis ipsum suspendisse ultrices gravida dictum fusce ut. A diam maecenas sed enim ut sem viverra. Diam maecenas sed enim ut sem viverra. Nulla pellentesque dignissim enim sit amet. Lacus sed viverra tellus in hac habitasse. Pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus. Habitasse platea dictumst vestibulum rhoncus est pellentesque elit. Non pulvinar neque laoreet suspendisse interdum consectetur libero. Commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend.
                        </p>
                    </Modal.Body>
                    <Modal.Footer className='kidsTrainingWaiverModalFooter'>
                        <Button variant="secondary" onClick={this.props.closeConfirmationModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal id='kidsTrainingSignUpModalForm' show={this.props.show} onHide={this.props.closeModal}>
                    <Modal.Header className='kidsTrainingSignUpModalHeader' closeButton>
                        <Modal.Title>Kids Speed & Strength Sign Up</Modal.Title>
                    </Modal.Header>
                    <Modal.Body id='kidsTrainingSignUpModalBody'>
                        <Form id='kidsTrainingForm'>
                            {/* NUMBER OF PARTICIPANTS INPUT */}
                            {/* <Form.Group as={Row}>
                                <Form.Label column sm="2" lg="12" className='kidsTrainingFormLabel'>
                                    # OF PARTICIPANTS*
                                </Form.Label>
                                <Col sm="10" lg="12">
                                    <Form.Control id="numberofparticipants" as="select" aria-label="Select # of Participants">
                                        <option>Select</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7+">7 or more</option>
                                    </Form.Control>
                                </Col>
                            </Form.Group> */}

                            {/* PARTICIPANT NAME INPUT */}
                            <Form.Group as={Row}>
                                <Form.Label column sm="2" lg="12" className='kidsTrainingFormLabel'>
                                    PARTICIPANT FIRST NAME*
                                </Form.Label>
                                <Col sm="10" lg="12">
                                    <Form.Control id="participantfirstname" placeholder="First Name" aria-label='First Name' />
                                </Col>
                            </Form.Group>

                            {/* LAST NAME INPUT */}
                            <Form.Group as={Row}>
                                <Form.Label column sm="2" lg="12" className='kidsTrainingFormLabel'>
                                    PARTICIPANT LAST NAME*
                                </Form.Label>
                                <Col sm="10" lg="12">
                                    <Form.Control id="participantlastname" placeholder="Last Name" aria-label='Last Name' />
                                </Col>
                            </Form.Group>

                            {/* GRADE INPUT */}
                            <Form.Group as={Row}>
                                <Form.Label column sm="2" lg="12" className='kidsTrainingFormLabel'>
                                    PARTICIPANT GRADE*
                                </Form.Label>
                                <Col sm="10" lg="12">
                                    <Form.Control id="participantgrade" as="select" aria-label="Select Participant Grade">
                                        <option>Select Grade</option>
                                        <option value="4">4th</option>
                                        <option value="5">5th</option>
                                        <option value="6">6th</option>
                                        <option value="7">7th</option>
                                        <option value="8">8th</option>
                                        <option value="9">9th</option>
                                    </Form.Control>
                                </Col>
                            </Form.Group>

                            {/* PHONE INPUT */}
                            <Form.Group as={Row}>
                                <Form.Label column sm="2" lg="12" className='kidsTrainingFormLabel'>
                                    PARENT/GUARDIAN NAME*
                                </Form.Label>
                                <Col sm="10" lg="12">
                                    <Form.Control id="parentname" placeholder="Parent/Guardian Name" aria-label='Phone' />
                                </Col>
                            </Form.Group>

                            {/* EMAIL INPUT */}
                            <Form.Group as={Row}>
                                <Form.Label column sm="2" lg="12" className='kidsTrainingFormLabel'>
                                    EMAIL*
                                </Form.Label>
                                <Col sm="10" lg="12">
                                    <Form.Control id="email" type="email" placeholder="Email" aria-label='Email' />
                                </Col>
                            </Form.Group>

                            {/* RADIO INPUT #1 */}
                            <Form.Group className='kidsTrainingWaiver'>
                                <Row className='kidsTrainingWaiverRow'>
                                    <Form.Label className="liabiityWaiverLabel">
                                        PARENT/GUARDIAN WAIVER RELEASE*
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
                    <Modal.Footer className='kidsTrainingSignUpModalFooter'>
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

export default KidsTrainingSignUpModal