import React, { Component } from 'react'
import '../../../css/signup.css'
// import ExistingAccount from "../../alerts/ExistingAccount";
// import PasswordError from '../../alerts/PasswordError';
import { Form, Button, Col, FormCheck } from 'react-bootstrap'

class UserHealth extends Component {
    constructor(props) {
        super(props)
        this.state = {
            formChecked: false,
            paymentComplete: false,
        }
      
    }

    componentDidMount() {
        console.log('User Payment Ready')
      }

    render() {
        // Verify this is current step
        if (this.props.currentStep !== 3) {
            return null
        }

        return (
            <div>
                <Form.Row>
                <Form.Group as={Col} id="formGridCheckbox">
                    <FormCheck
                        isInvalid
                        type="checkbox" 
                        label="Sign Electronic Waiver" 
                        className="waiver"
                        onClick={this.props.checkWaiver}
                    />
                </Form.Group>

                <Button onClick={this.props.handleConvergePay} variant="warning" type="submit" className="payWithConverge">
                    Pay with Converge AutoPay
                </Button>
                </Form.Row>
            </div>
        
        )
    };
};

export default UserHealth;
       