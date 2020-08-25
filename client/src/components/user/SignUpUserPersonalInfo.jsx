import React, { Component } from 'react'
import { Form, Col } from 'react-bootstrap'

// CSS
import '../../css/general/signup.css'

// ALERTS
import EmailError from '../alerts/EmailError';
import PasswordError from '../alerts/PasswordError';
import PhoneError from '../alerts/PhoneError'


class SignUpUserPersonalInfo extends Component {

    componentDidMount() {
        // console.log('Personal Info Ready')
      }

    render() {
        // Verify this is current step
        if (this.props.currentStep !== 1) {
            return null
        }

        return (
            <div className='userSignUpFormRow personalInfoStep'>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridFirstName">
                    <Form.Label>First Name*</Form.Label>
                    <Form.Control 
                        value={this.props.firstName}
                        onChange={this.props.handleChange}
                        name="firstName"
                        placeholder="First Name" 
                        aria-label='First Name'
                    />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridLastName">
                    <Form.Label>Last Name*</Form.Label>
                    <Form.Control 
                        value={this.props.lastName}
                        onChange={this.props.handleChange}
                        name="lastName"
                        placeholder="Last Name" 
                        aria-label='Last Name'
                    />
                </Form.Group>
                </Form.Row>

                <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Email*</Form.Label>
                    <Form.Control
                        value={this.props.email}
                        name="email"
                        onChange={this.props.checkEmail}
                        type="email" 
                        placeholder="Email" 
                        aria-label='Email'
                    />
                    <EmailError 
                        emailError={this.props.emailError}
                    />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPhoneNumber">
                    <Form.Label>Phone Number*</Form.Label>
                    <Form.Control 
                        value={this.props.phoneNumber}
                        name="phoneNumber"
                        onChange={this.props.handlePhoneChange}
                        placeholder="(___) ___-____" 
                        aria-label='Phone Number'
                    />
                    <PhoneError 
                        phoneError={this.props.phoneError}
                    />
                </Form.Group>
                </Form.Row>

                <Form.Row>
                <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Password*</Form.Label>
                    <Form.Control 
                        value={this.props.password}
                        name="password"
                        onChange={this.props.handlePasswordChange}
                        type="password" 
                        placeholder="Password" 
                        aria-label='Password'
                    />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridConfirmPassword">
                    <Form.Label>Confirm Password*</Form.Label>
                    <Form.Control
                        value={this.props.confirmPassword}
                        name="confirmPassword"
                        onChange={this.props.checkPassword}
                        type="password" 
                        placeholder="Confirm Password" 
                        aria-label='Confirm Password'
                    />
                    <PasswordError 
                        passwordError={this.props.passwordError}
                    />
                </Form.Group>
              </Form.Row>
            </div>
        )
    };
};

export default SignUpUserPersonalInfo;
       