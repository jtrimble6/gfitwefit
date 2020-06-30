import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import '../../css/signup.css'
import API from '../../utils/API'
// import UnderConstructionPage from '../UnderConstructionPage.jsx'
import { NavLink } from 'reactstrap';
import { Form, Button } from 'react-bootstrap'

// SIGN UP PAGES
import SignUpUserPersonalInfo from './SignUpUserPersonalInfo'
import SignUpUserBasicInfo from './SignUpUserBasicInfo'
import SignUpUserHealthInfo from './SignUpUserHealthInfo'
import SignUpUserFitnessInfo from './SignUpUserFitnessInfo'
import SignUpUserPayment from './SignUpUserPayment'
import SignUpUserConvergeLightbox from './SignUpUserConvergeLightbox'
import SignUpUserAcknowledgement from './SignUpUserAcknowledgment'

// ALERTS 
import changeStepError from '../alerts/ChangeStepError'
import ChangeStepError from '../alerts/ChangeStepError'

// import ExistingAccount from "../../alerts/ExistingAccount";
// import PasswordError from '../../alerts/PasswordError';

const normalizeInput = (value, previousValue) => {
  // console.log('normalizing input')
  if (!value) return value;
  const currentValue = value.replace(/[^\d]/g, '');
  const cvLength = currentValue.length;
  
  if (!previousValue || value.length > previousValue.length) {
    if (cvLength < 4) return currentValue;
    if (cvLength < 7) return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`;
    return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3, 6)}-${currentValue.slice(6, 10)}`;
  }
};

// const validateInput = value => {
//   let error = ""
  
//   if (!value) error = "Required!"
//   else 
//   }
  
//   return error;
// };


class SignUpUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
        currentStep: 1, // Default is Step 1
        currentStepTitle: 'Basic Information',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        error: '',
        username: '',
        password: '',
        confirmPassword: '',
        height: '',
        weight: '',
        gender: '',
        dob: '',
        day: '',
        month: '',
        year: '',
        medicalConditions: '',
        familyHistory: '',
        personalHistory: '',
        cardiovascularRisk: false,
        paymentComplete: false,
        formChecked: false,
        emailError: false,
        passwordError: false,
        phoneError: false,
        changeStepError: false,
        stepOneFieldError: false,
        sessionID: '',
        redirect: false,
      }
        this.setRedirect = this.setRedirect.bind(this)
        this.renderRedirect = this.renderRedirect.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handlePhoneChange = this.handlePhoneChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleNextStep = this.handleNextStep.bind(this)
        this.handlePrevStep = this.handlePrevStep.bind(this)
        this.handleStepTitleChange = this.handleStepTitleChange.bind(this)
        this.handleConvergePay = this.handleConvergePay.bind(this)
        this.handleLightboxInit = this.handleLightboxInit.bind(this)
        this.showResult = this.showResult.bind(this)
        this.scrollTop = this.scrollTop.bind(this)
        this.handleSignIn = this.handleSignIn.bind(this)
        this.validStepOne = this.validStepOne.bind(this)
    }

    componentDidMount() {
        console.log('User Sign Up Ready')
        const script = document.createElement("script");

        script.src = "https://demo.convergepay.com/hosted-payments/PayWithConverge.js";
        script.async = true;

        document.body.appendChild(script);
      }

    scrollTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
      }

    setRedirect = () => {
        console.log("Redirect");
        this.setState({
          redirect: true
        })
      }

    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/signup' />
        }
      }

    handleSignIn = () => {
      console.log('redirect to login')
      return <Redirect to='/login' />
      }

    handleChange(event) {
        const {name, value} = event.target
        this.setState({
          [name]: value,
          stepOneFieldError: false,
          changeStepError: false
        })    
      }
    
    handlePhoneChange({ target: { value } }) {
        this.setState({
          stepOneFieldError: false,
          changeStepError: false
        })    
        this.setState(prevState=> ({ phone: normalizeInput(value, prevState.phone) }));
        if (value.length !== 14) {
          this.setState({
            phoneError: true
          })
        } else {
          this.setState({
            phoneError: false
          })
        }
      }

    handleStepTitleChange = () => {
      let currentStep = this.state.currentStep
      if (currentStep === 7) { 
        this.setState({
          currentStepTitle: 'Complete'
        })
      } else if (currentStep === 6) { 
        this.setState({
          currentStepTitle: 'Converge Payment'
        })
      } else if (currentStep === 5) {
        this.setState({
          currentStepTitle: 'Waiver & Payment'
        })
      } else if (currentStep === 4) {
        this.setState({
          currentStepTitle: 'Fitness Questionnaire'
        })
      } else if (currentStep === 3) {
        this.setState({
          currentStepTitle: 'Health Questionnaire'
        })
      } else {
        this.setState({
          currentStepTitle: 'Basic Information'
        })
      }

      } 

    validStepOne = () => {
      let firstName = this.state.firstName
      let lastName = this.state.lastName
      let email = this.state.email
      let phone = this.state.phone
      let password = this.state.password
      let confirmPassword = this.state.confirmPassword

      let requiredFields = (firstName.length > 0 && lastName.length > 0 && email.length > 0 && phone.length > 0 && password.length > 0 && confirmPassword.length > 0) ? true : false

      if (!requiredFields) {
        this.setState({
          stepOneFieldError: true
        })
        return false
      } else if (this.state.phoneError || this.state.emailError || this.state.passwordError) {
        this.setState({
          changeStepError: true
        })
        return false
      } else {
        this.setState({
          stepOneFieldError: false,
          changeStepError: false
        })
        return true
      }
      }

    handleNextStep(event) {
        event.preventDefault()
        let stepOneComplete = this.validStepOne()

        // CHECK FOR ERRORS
        if (stepOneComplete) {
          let currentStep = this.state.currentStep
          // If the current step is 1 or 2, then add one on "next" button click
          currentStep = currentStep >= 6? 7: currentStep + 1
          this.setState({
            currentStep: currentStep
          }, () => {
            this.handleStepTitleChange()
          })
          this.scrollTop()
        } 
        
      }
        
    handlePrevStep(event) {
        event.preventDefault()
        this.scrollTop()
        this.handleStepTitleChange()
        let currentStep = this.state.currentStep
        // If the current step is 2 or 3, then subtract one on "previous" button click
        currentStep = currentStep <= 1? 1: currentStep - 1
        this.setState({
          currentStep: currentStep
        }, () => {
          this.handleStepTitleChange()
        })

      }

    handleConvergePay = (event) => {
        event.preventDefault();
        console.log('Handling converge payment')

        // Start the HTTPS server
        // var cors = "https://cors-anywhere.herokuapp.com/"

        axios({
          method: "GET", 
          // url: "https://www.gfitwefit.com/converge_token_req",
          url: "http://localhost:3000/converge_token_req", 
          }).then((response)=> {
            console.log('GOT A RESPONSE: ', response)
            let ssl_txn_auth_token = response.data
            console.log(ssl_txn_auth_token)
            this.setState({
              sessionID: ssl_txn_auth_token
            })
            this.handleLightboxInit(ssl_txn_auth_token)
              // if (response.data.msg === 'success'){
              //     console.log("Payment Sent."); 
                  
              // } else if(response.data.msg === 'fail'){
              //   console.log("Payment failed to send.")
              // }
          })
        
      }

    handleLightboxInit = (authToken) => {
      console.log('Handling lightbox init -- Auth Token: ', authToken)
      this.setState({
        currentStep: 6
      }, () => {
        this.handleStepTitleChange()
      })
      }

    showResult = (status, msg) => {
      document.getElementById('txn_status').innerHTML = "<b>" + status + "</b>";
			document.getElementById('txn_response').innerHTML = msg;
      }

    checkWaiver = () => {
        if (this.state.formChecked) {
            this.setState({
                formChecked: false
            }, () => {
                console.log(this.state.formChecked)
            })
            
        } else {
            this.setState({
                formChecked: true
            }, () => {
                console.log(this.state.formChecked)
            })
            
        }
        
      }

    checkEmail = (event) => {
      const {name, value} = event.target

      this.setState({
        stepOneFieldError: false,
        changeStepError: false
      })    

      // Verify email address is valid
      let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if ( re.test(value) ) {
        // VALID EMAIL
        console.log('EMAIL VALUE: ', value)
        this.setState({
          emailError: false,
        })
      }
      else {
        // INVALID EMAIL
        console.log('PLEASE ENTER A VALID EMAIL ADDRESS')
        this.setState({
          emailError: true
        })
      }

      this.setState({
        [name]: value
      })    

      }

    handlePasswordChange = (event) => {
      const {name, value} = event.target
        this.setState({
          [name]: value,
          confirmPassword: '',
          passwordError: false,
          stepOneFieldError: false,
          changeStepError: false
        })    
      }

    checkPassword = (event) => {
        const {name, value} = event.target
        
        this.setState({
          [name]: value,
          stepOneFieldError: false,
          changeStepError: false
        })    
        if (this.state.password !== value) {
            // console.log('THE PASSWORDS DO NOT MATCH')
            this.setState({
                passwordError: true
            })
        } else {
            // console.log('PASSWORDS MATCH')
            this.setState({
                passwordError: false
            })
        }
      }

    checkUserName = event => {
        const username = event.target.value;
        console.log(username);
        this.setState({
            username: username
        });
        API.getUser(username)
        .then(res => {
            console.log(res)
            if (!res.data[0]) {
                console.log("Username available");
                this.setState({
                    nameTaken: "Username available"
                })
            } else {
                console.log("Username unavailable");
                this.setState({
                    nameTaken: "Username unavailable"
                })
            }
        })
        .catch(error => {
            console.log(error)
        })
      }

    handleSubmit = (event) => {
        event.preventDefault()
        const { email, username, password } = this.state
        alert(`Your registration detail: \n 
          Email: ${email} \n 
          Username: ${username} \n
          Password: ${password}`)
      }

    handleFormSubmit = event => {
        event.preventDefault()
        this.scrollTop()
        console.log('User sending info')

        this.setState({
            passwordError: false,
            nameTaken: false,
            currentStep: 6
        }, () => {
          this.handleStepTitleChange()
        })
        let dob = this.state.day + '/' + this.state.month + '/' + this.state.year
        //console.log(this.state)
        let userData = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            phone: this.state.phone,
            username: this.state.email,
            password: this.state.password,
            height: this.state.height,
            weight: this.state.weight,
            gender: this.state.gender,
            dob: dob,
            medicalConditions: this.state.medicalConditions,
            familyHistory: this.state.familyHistory,
            personalHistory: this.state.personalHistory,
            fitnessGoals: this.state.fitnessGoals,
            activityLevel: this.state.activityLevel,
            exercisePlan: this.state.exercisePlan,
            gymEquipment: this.state.gymEquipment,
            paymentComplete: this.state.paymentComplete,
            formChecked: this.state.formChecked
        };
        console.log(userData);
        
      }

    render() {
        return (
            <div className="signUpUserDiv">
                {/* {this.renderRedirect()} */}
                <h1 className='signUpUserTitle'>User Sign Up</h1>
                <p className='signUpUserStep'>
                  Step {this.state.currentStep} - {this.state.currentStepTitle}
                </p>
                <small className='signUpRequired'>*Required</small>
                
                <Form className='signUpUserForm'>
                
                  <SignUpUserPersonalInfo 
                    currentStep={this.state.currentStep}
                    handleChange={this.handleChange}
                    handlePhoneChange={this.handlePhoneChange}
                    firstName={this.state.firstName}
                    lastName={this.state.lastName}
                    email={this.state.email}
                    phone={this.state.phone}
                    username={this.state.userName}
                    password={this.state.password}
                    confirmPassword={this.state.confirmPassword}
                    handlePasswordChange={this.handlePasswordChange}
                    checkPassword={this.checkPassword}
                    passwordError={this.state.passwordError}
                    checkUserName={this.checkUserName}
                    checkEmail={this.checkEmail}
                    emailError={this.state.emailError}
                    phoneError={this.state.phoneError}
                  />

                  <SignUpUserBasicInfo 
                    currentStep={this.state.currentStep}
                    handleChange={this.handleChange}
                    height={this.state.height}
                    weight={this.state.weight}
                    gender={this.state.gender}
                    dob={this.state.dob}
                    day={this.state.day}
                    month={this.state.month}
                    year={this.state.year}
                  />

                  <SignUpUserHealthInfo 
                    currentStep={this.state.currentStep}
                    handleChange={this.handleChange}
                    medicalConditions={this.state.medicalConditions}
                    familyHistory={this.state.familyHistory}
                    personalHistory={this.state.personalHistory}
                  />

                  <SignUpUserFitnessInfo 
                    currentStep={this.state.currentStep}
                    handleChange={this.handleChange}
                    fitnessGoals={this.state.fitnessGoals}
                    activityLevel={this.state.activityLevel}
                    exercisePlan={this.state.exercisePlan}
                    gymEquipment={this.state.gymEquipment}
                  />

                  <SignUpUserPayment 
                    currentStep={this.state.currentStep}
                    handleChange={this.handleChange}
                    formChecked={this.state.formChecked}
                    checkWaiver={this.checkWaiver}
                    handleConvergePay={this.handleConvergePay}
                    sessionID={this.state.sessionID}
                  />

                  <SignUpUserConvergeLightbox 
                    currentStep={this.state.currentStep}
                    handleChange={this.handleChange}
                    sessionID={this.state.sessionID}
                  />
                  
                  <SignUpUserAcknowledgement 
                    currentStep={this.state.currentStep}
                  />


                  <Form.Row className="formNav">
                    { 
                      (this.state.currentStep === 1) ? 
                      
                      <Button onClick={this.handleNextStep} variant="primary" className="nextStep">
                        Next
                      </Button>
                      
                      :

                      (this.state.currentStep < 5) ?
                    
                      <span className='stepButtonSpan'>
                        <Button onClick={this.handlePrevStep} variant="warning" className="prevStep">
                            Prev
                        </Button> 

                        <Button onClick={this.handleNextStep} variant="primary" className="nextStep">
                            Next
                        </Button>
                      </span>

                      :

                      (this.state.currentStep < 7) ?
                    
                      <span className='stepButtonSpan'>
                        <Button onClick={this.handlePrevStep} variant="warning" className="prevStep">
                            Prev
                        </Button> 

                        <Button onClick={this.handleNextStep} variant="primary" className="nextStep" disabled={true}>
                            Next
                        </Button>
                      </span>

                      :

                      (this.state.currentStep === 7) ?

                      <NavLink className='signInButton' href="/login">
                       Sign In
                      </NavLink>

                      :

                      <span className='stepButtonSpan'>
                        <Button onClick={this.handlePrevStep} variant="warning" className="prevStep">
                            Prev
                        </Button> 

                        <Button onClick={this.handleFormSubmit} variant="success" type="submit" className="submitSignUp">
                            Submit
                        </Button>
                      </span>

                    }
                    <ChangeStepError 
                      changeStepError={this.state.changeStepError}
                      stepOneFieldError={this.state.stepOneFieldError}
                    />
                  </Form.Row>

                </Form>
              </div>
        
        )
    };
};

export default SignUpUser;
       


