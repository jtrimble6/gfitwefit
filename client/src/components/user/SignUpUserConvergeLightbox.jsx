import React, { Component } from 'react'
import '../../css/signup.css'
// import ExistingAccount from "../../alerts/ExistingAccount";
// import PasswordError from '../../alerts/PasswordError';
import { Form } from 'react-bootstrap'



class SignUpUserConvergeLightbox extends Component {

    componentDidMount() {
        console.log('Converge Lightbox Ready')
      }

    render() {
        // Verify this is current step
        if (this.props.currentStep !== 6) {
            return null
        }

        return (
            <div className='userSignUpConvergeLightbox'>
              <Form.Row id="firstForm">
		  		<input readOnly id="token" value={this.props.sessionID} type="text" name="token" /> 
				<button onClick={window["openLightbox"]}>Open Lightbox</button> 
                <div>
                    <p>Transaction Status:</p><div id="txn_status"></div>
                <br />
                    <p>Transaction Response:</p><div id="txn_response"></div>
                </div>
  		      </Form.Row>
            </div>
        )
    };
};

export default SignUpUserConvergeLightbox;
       