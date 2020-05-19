import React, { Component } from 'react'
import '../../../css/signup.css'
// import ExistingAccount from "../../alerts/ExistingAccount";
// import PasswordError from '../../alerts/PasswordError';
import { Form, Col } from 'react-bootstrap'



class UserInfo extends Component {

    componentDidMount() {
        console.log('User Info Ready')
      }

    render() {
        // Verify this is current step
        if (this.props.currentStep !== 1) {
            return null
        }

        return (
            <div>
                <Form.Row>
                <Form.Group as={Col} controlId="formGridFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control 
                        value={this.props.firstName}
                        onChange={this.props.handleChange}
                        name="firstName"
                        placeholder="First Name" 
                    />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control 
                        value={this.props.lastName}
                        onChange={this.props.handleChange}
                        name="lastName"
                        placeholder="Last Name" 
                    />
                </Form.Group>
                </Form.Row>

                <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        value={this.props.email}
                        name="email"
                        onChange={this.props.handleChange}
                        type="email" 
                        placeholder="Email" 
                    />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPhoneNumber">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control 
                        value={this.props.phoneNumber}
                        name="phoneNumber"
                        onChange={this.props.handleChange}
                        type="phone" 
                        placeholder="Phone Number" 
                    />
                </Form.Group>
                </Form.Row>

                <Form.Row>
                <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        value={this.props.password}
                        name="password"
                        onChange={this.props.handleChange}
                        type="password" 
                        placeholder="Password" 
                    />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        value={this.props.confirmPassword}
                        name="confirmPassword"
                        onChange={this.props.checkPassword}
                        type="password" 
                        placeholder="Confirm Password" 
                    />
                </Form.Group>
                </Form.Row>
            </div>
        )
    };
};

export default UserInfo;
       