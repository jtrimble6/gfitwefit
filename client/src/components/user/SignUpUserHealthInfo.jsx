import React, { Component } from 'react'
import '../../css/signup.css'
// import ExistingAccount from "../../alerts/ExistingAccount";
// import PasswordError from '../../alerts/PasswordError';
import { Form, Col } from 'react-bootstrap'



class SignUpUserHealthInfo extends Component {

    componentDidMount() {
        console.log('Health Info Ready')
      }

    render() {
        // Verify this is current step
        if (this.props.currentStep !== 3) {
            return null
        }

        return (
            <div className='userSignUpFormRow'>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridMedicalConditions">
                    <Form.Label>Medical conditions or previous surgery history that would limit you from exercise?</Form.Label>
                    <Form.Control 
                        value={this.props.medicalConditions}
                        onChange={this.props.handleChange}
                        name="medicalConditions"
                        placeholder="Ex. asthma, knee surgery" 
                    />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridCardiovascular">
                    <Form.Label>Family members with any cardiovascular disease history?</Form.Label>
                    <Form.Control 
                        as="select"
                        value={this.props.familyHistory}
                        onChange={this.props.handleChange}
                        name="familyHistory"
                        placeholder=""
                    >
                        <option>Select One</option>
                        <option>Yes</option>
                        <option>No</option>
                    </Form.Control>
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridRespiratory">
                    <Form.Label>Cardiovascular disease or respiratory issues?</Form.Label>
                    <Form.Control 
                        as="select"
                        value={this.props.personalHistory}
                        onChange={this.props.handleChange}
                        name="personalHistory"
                        placeholder="" 
                    >
                        <option>Select One</option>
                        <option>Yes</option>
                        <option>No</option>
                    </Form.Control>
                </Form.Group>
              </Form.Row>
            </div>
        )
    };
};

export default SignUpUserHealthInfo;
       