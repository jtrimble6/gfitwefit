import React, { Component } from 'react'
import '../../../css/signup.css'
// import ExistingAccount from "../../alerts/ExistingAccount";
// import PasswordError from '../../alerts/PasswordError';
import { Form, Col } from 'react-bootstrap'

class UserHealth extends Component {

    componentDidMount() {
        console.log('User Health Info Ready')
      }

    render() {
        // Verify this is current step
        if (this.props.currentStep !== 2) {
            return null
        }

        return (
            <div>
                <Form.Row>
                <Form.Group as={Col} controlId="formGridHeight">
                    <Form.Label>Height</Form.Label>
                    <Form.Control 
                        value={this.props.height}
                        onChange={this.props.handleChange}
                        name="height"
                        placeholder="Height" 
                    />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridWeight">
                    <Form.Label>Weight</Form.Label>
                    <Form.Control 
                        value={this.props.weight}
                        onChange={this.props.handleChange}
                        name="weight"
                        placeholder="Weight" 
                    />
                </Form.Group>
                </Form.Row>

                <Form.Row>
                <Form.Group as={Col} controlId="formGridGender">
                    <Form.Label>Gender</Form.Label>
                    <Form.Control
                        value={this.props.gender}
                        onChange={this.props.handleChange}
                        name="gender"
                        placeholder="Gender" 
                    />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridDOB">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control 
                        value={this.props.dob}
                        onChange={this.props.handleChange}
                        name="dob"
                        placeholder="Date of Birth" 
                    //   type="date" 
                    />
                </Form.Group>
                </Form.Row>
            </div>
        )
    };
};

export default UserHealth;
       