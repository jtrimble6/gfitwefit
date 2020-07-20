import React, { Component } from 'react'
import '../../css/signup.css'
// import ExistingAccount from "../../alerts/ExistingAccount";
// import PasswordError from '../../alerts/PasswordError';
import { Form, Button } from 'react-bootstrap'



class SignUpUserConvergeLightbox extends Component {

    componentDidMount() {
        // console.log('Converge Lightbox Ready')
      }

    render() {
        // Verify this is current step
        if (this.props.currentStep !== 6) {
            return null
        }

        return (
            <div className='userSignUpConvergeLightbox'>
              <Form.Row id="convergeLightboxForm">
		  		{/* <input readOnly id="token" value={this.props.sessionID} type="text" name="token" />  */}
                {/* <button onClick={this.props.openLightbox}>Open Lightbox</button> */}
                <div id='txnDetails'>
                    
                    <h4 className='txnDetailsTitle'>Transaction Details</h4>

                    <p className='txnDetailsInfoTitle'>Transaction Status:</p>
                    <div id="txnStatus"></div><br />

                    <p className='txnDetailsInfoTitle'>Transaction Reference Number:</p>
                    <div id="txnReferenceNumber"></div><br />

                    <p className='txnDetailsInfoTitle'>Payment Type:</p>
                    <div id="txnPaymentType"></div><br />
                    
                    <p className='txnDetailsInfoTitle'>Payment Amount:</p>
                    <div id="txnPaymentAmount"></div>

                </div>
              </Form.Row>
                <div id="convergeLightboxDiv">
                  <button className='convergeLightboxButton' onClick={window["openLightbox"]}>Secure Payment</button> 
                </div>
                
                <div id="convergeCompleteDiv">
                  <Button id="txn_complete" className="txnCompleteButton" onClick={this.props.checkConvergePayment} type="submit">
                    
                  </Button>
                </div>
  		      
            </div>
        )
    };
};

export default SignUpUserConvergeLightbox;
       