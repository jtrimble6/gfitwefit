import React, { Component } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap'
import ContactSuccess from '../alerts/ContactSuccess'
import ContactError from '../alerts/ContactError'
import axios from 'axios'

// CSS 
import '../../css/contact/contactInfo.css'


class ContactInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
          env: 'PRODUCTION',
          toggleForm: false,
          contactSuccess: false,
          contactError: false,
          checkbox1: false,
          checkbox2: false,
          checkbox3: false,
          checkbox4: false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.resetForm = this.resetForm.bind(this)
        this.sendEmail = this.sendEmail.bind(this)
        this.handleCheckbox = this.handleCheckbox.bind(this)
      }
  
    handleSubmit(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        let checkbox1 = '';
        let checkbox2 = '';
        if (this.state.checkbox1) {
            checkbox1 = 'YES'
        } else {
            checkbox1 = 'NOT YET'
        }

        if (this.state.checkbox3) {
            checkbox2 = 'YES'
        } else {
            checkbox2 = 'NOT YET'
        }
        
        this.sendEmail(name, email, message, checkbox1, checkbox2)
      }

    handleCheckbox(e) {
        let target = e.target
        const checked = target.checked
        const name = target.name
        // console.log(checked)
        // console.log(name)
        this.setState({
            [name]: checked,
        });
    }

    sendEmail = (name, email, message, checkbox1, checkbox2) => {
        console.log(name, email, message, checkbox1, checkbox2)
        axios({
            method: "POST", 
            url: this.state.env === 'DEVELOPMENT' ? "http://localhost:3000/send" : "https://www.gfitwefit.com/send",
            data: {
                name: name,   
                email: email,  
                checkbox1: checkbox1,
                checkbox2: checkbox2,
                message: message
            }
        }).then((response)=> {
            if (response.data.msg === 'success'){
                console.log("Message Sent."); 
                this.setState({
                  contactSuccess: true
                })
                this.resetForm()
            } else if (response.data.msg === 'fail'){
              console.log("Message failed to send.")
              this.setState({
                contactError: true
              })
            }
        }).catch(err => {
          console.log("Message failed to send.")
          this.setState({
            contactError: true
          })
        })
        this.resetForm()
    }
  
    resetForm(){
        document.getElementById('contactForm').reset();
      }

    render() {                                                                  
        return (
            <div className='contactInfo'>
              <div className="contactInfoSection">
                <Row className='contactInfoHeaderRow'>
                    <h2 className='contactInfoHeaderLeft'>CONTACT/</h2> 
                    <h2 className='contactInfoHeaderRight'>/GET IN TOUCH</h2> 
                </Row>
                <Row className='contactInfoRow'>
                    <Col sm={6} className='contactInfoLeftSection'>
                        <Row className='contactInfoBodyRow'>
                            <p>
                              Need some more information? Planning your first class? Shoot us a message and let us know how we can help!
                            </p>
                            <small>
                              *Required
                            </small>
                        </Row>
                        <Row>
                          <Form id='contactForm'>
                            {/* NAME INPUT */}
                            <Form.Group as={Row}>
                                <Form.Label column sm="2">
                                  NAME*
                                </Form.Label>
                                <Col sm="10">
                                  <Form.Control id="name" placeholder="" aria-label='Name' />
                                </Col>
                            </Form.Group>

                            {/* EMAIL INPUT */}
                            <Form.Group as={Row}>
                                <Form.Label column sm="2">
                                  EMAIL*
                                </Form.Label>
                                <Col sm="10">
                                  <Form.Control id="email" type="email" placeholder="" aria-label='Email' />
                                </Col>
                            </Form.Group>

                            {/* RADIO INPUT #1 */}
                            <Form.Group className='formQuestion1'>
                              <Row>
                                <Form.Label>
                                  HAVE YOU EVER WORKED OUT WITH US BEFORE?
                                </Form.Label>
                              </Row>
                              <Row>
                                {['checkbox'].map((type) => (
                                  <div key={`custom-inline-${type}`} className="mb-3">
                                    <Form.Check
                                        custom
                                        inline
                                        label="YES"
                                        type={type}
                                        id={`custom-inline-${type}-1`}
                                        onChange={this.handleCheckbox}
                                        name="checkbox1"
                                    />
                                    <Form.Check
                                        custom
                                        inline
                                        label="NOT YET"
                                        type={type}
                                        id={`custom-inline-${type}-2`}
                                        onChange={this.handleCheckbox}
                                        name="checkbox2"
                                    />
                                  </div>
                                ))}
                              </Row>
                            </Form.Group>

                            {/* RADIO INPUT #2 */}
                            <Form.Group className='formQuestion2'>
                              <Row>                              
                                <Form.Label>
                                  ARE YOU PLANNING YOUR FIRST VISIT TO THE GYM?
                                </Form.Label>
                              </Row>
                              <Row>
                                {['checkbox'].map((type) => (
                                  <div key={`custom-inline-${type}`} className="mb-3">
                                    <Form.Check                                        
                                        custom
                                        inline
                                        label="YES"
                                        type={type}
                                        id={`custom-inline-${type}-3`}
                                        onChange={this.handleCheckbox}
                                        name="checkbox3"
                                    />
                                    <Form.Check                                        
                                        custom
                                        inline
                                        label="NOT YET"
                                        type={type}
                                        id={`custom-inline-${type}-4`}
                                        onChange={this.handleCheckbox}
                                        name="checkbox4"
                                    />
                                  </div>
                                ))}
                              </Row>
                            </Form.Group>

                            {/* TEXT INPUT */}
                            <Form.Group className='contactFormMessage'>
                                <Form.Label>HOW CAN WE HELP?*</Form.Label>
                                <Form.Control id="message" as="textarea" rows="10" aria-label='Message' />
                            </Form.Group>
                            <ContactSuccess contactSuccess={this.state.contactSuccess}/>
                            <ContactError contactError={this.state.contactError} />
                            <Button className='contactFormSubmit' type="submit" aria-label='Submit' onClick={this.handleSubmit}>SUBMIT</Button>
                          </Form>
                        </Row>
                    </Col>
                    <Col sm={5} className='contactInfoRightSection'>
                        <Row>
                          <h2 className='contactInfoRightSectionHeader'>CONTACT INFO</h2> 
                        </Row>
                        <Row>
                            <p className='contactInfoRightSectionAddress'>18515 OLD STATESVILLE ROAD CORNELIUS, NC 28031</p>
                        </Row>
                        <Row>
                            <p className='contactInfoRightSectionPhone'>703.554.5731</p>
                        </Row>
                        <Row>
                            <p className='contactInfoRightSectionEmail'>HELLO@GFITWEFIT.COM</p>
                        </Row>
                    </Col>
                </Row>
                
              </div>
            </div>
        )
    }
}

export default ContactInfo