import React, { Component } from 'react'
import '../../css/signup.css'



class SignUpUserAcknowledgement extends Component {

    componentDidMount() {
        console.log('Sign Up Acknowledgement Ready')
      }

    render() {
        // Verify this is current step
        if (this.props.currentStep !== 6) {
            return null
        }

        return (
            <div className='userSignUpAcknowledgement'>
              <h1 className='userSignUpAcknowledgementTitle'>
                  Thank you for signing up with GFit, head over to the sign in page and let't get after it!
              </h1>
            </div>
        )
    };
};

export default SignUpUserAcknowledgement;
       