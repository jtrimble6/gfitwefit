import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import Countdown from 'react-countdown';

// CSS
import '../../css/general/signup.css'

// ALERTS
import ConvergeTokenError from '../alerts/ConvergeTokenError'



class SignUpUserConvergeLightbox extends Component {
  
    componentDidMount() {
        // console.log('Converge Lightbox Ready')
       
      }

    render() {
        // Verify this is current step
        if (this.props.currentStep !== 6) {
            return null
        }

        // Set timer length
        // const { refCallback, time } = this.props;

        return (
            <div className='userSignUpConvergeLightbox'>
              <Form.Row id="convergeLightboxForm">
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
                <div className="convergeInfo" id='convergeInfo'>
                  <p className='convergeDisclaimer'>Our Partners at Converge take it from here. They offer a secure payment gateway that will process payment on a monthly subscription basis. Your subscription can be managed at any time through the user profile tab once logged in.</p>
                  <p className='subscriptionDetails'>$5/month will be charged to your credit card starting today.</p>
                  <small className='convergeTimer' id='convergeTimer'>
                    *Secure payment token expires: <span id="time">
                      <Countdown 
                        ref={this.props.refCallback} 
                        date={Date.now() + 60000 * 10}
                        intervalDelay={0}
                        zeroPadTime={2}
                        precision={1}
                        autoStart={false}
                        onComplete={this.props.convergeCountdownComplete}
                        daysInHours
                        id='convergeCountdown'
                      />
                    </span>
                  *</small>
                </div>
                <div id="convergeLightboxDiv">
                  <Button 
                    id='convergeLightboxInitButton' 
                    className='convergeLightboxButton' 
                    onClick={window["openLightbox"]}
                  >
                    Secure Payment
                  </Button> 
                  <Button 
                    onClick={this.props.handleConvergePayRetry} 
                    id='convergeButtonRetry' 
                    className='payWithConvergeRetry'
                  >
                    Request new payment token
                  </Button>
                  <Button 
                    onClick={this.props.handleContinueWithoutPayment} 
                    id='continueWithoutPaymentButton' 
                    className='continueWithoutPaymentButton'
                  >
                    Finish signup without payment.
                  </Button>
                  <ConvergeTokenError
                    convergeTokenError={this.props.convergeTokenError}
                  />
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
       