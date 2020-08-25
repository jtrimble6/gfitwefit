import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import API from '../../utils/API'
import { NavLink } from 'reactstrap';
import { Form, Button, ProgressBar } from 'react-bootstrap'


// CSS
import '../../css/general/signup.css'

// SIGN UP PAGES
import SignUpUserPersonalInfo from './SignUpUserPersonalInfo'
import SignUpUserBasicInfo from './SignUpUserBasicInfo'
import SignUpUserHealthInfo from './SignUpUserHealthInfo'
import SignUpUserFitnessInfo from './SignUpUserFitnessInfo'
import SignUpUserWaiver from './SignUpUserWaiver'
import SignUpUserConvergeLightbox from './SignUpUserConvergeLightbox'
import SignUpUserAcknowledgement from './SignUpUserAcknowledgment'

// ALERTS 
import ChangeStepError from '../alerts/ChangeStepError'

// SCRIPTS
// import ScriptTag from 'react-script-tag';

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
    clockRef = null;
    
    constructor(props) {
        super(props)
        this.state = {
        env: 'PRODUCTION',
        currentStep: 1, // Default is Step 1
        currentStepTitle: 'Basic Information',
        progressPct: 10,
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
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
        paymentRefNumber: '',
        paymentTxnId: '',
        paymentDate: '',
        paymentCard: '',
        emailError: false,
        passwordError: false,
        phoneError: false,
        waiverSigned: false,
        waiverError: false,
        changeStepError: false,
        stepOneFieldError: false,
        convergeTokenError: false,
        convergeSecondAttempt: false,
        sessionID: '',
        redirect: false,
        divStyle: {
          backgroundColor: '#85bb65 !important',
          color: 'white',
          border: 'none',
          width: '90%',
          marginLeft: '5%',
          marginBottom: '1%',
          textAlign: 'center',
          alignContent: 'center'
        }
      }
        this.setRedirect = this.setRedirect.bind(this)
        this.renderRedirect = this.renderRedirect.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handlePhoneChange = this.handlePhoneChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleNextStep = this.handleNextStep.bind(this)
        this.handlePrevStep = this.handlePrevStep.bind(this)
        this.handleFinalStep = this.handleFinalStep.bind(this)
        // this.handleFinalStepNoPay = this.handleFinalStepNoPay.bind(this)
        this.handleStepTitleChange = this.handleStepTitleChange.bind(this)
        this.handleConvergePay = this.handleConvergePay.bind(this)
        this.handleLightboxInit = this.handleLightboxInit.bind(this)
        this.scrollTop = this.scrollTop.bind(this)
        this.handleSignIn = this.handleSignIn.bind(this)
        this.validStepOne = this.validStepOne.bind(this)
        this.checkWaiver = this.checkWaiver.bind(this)
        this.checkEmail = this.checkEmail.bind(this)
        this.checkConvergePayment = this.checkConvergePayment.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.checkPassword = this.checkPassword.bind(this)
        this.setClockRef = this.setClockRef.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.pauseTimer = this.pauseTimer.bind(this);
        this.convergeCountdownComplete = this.convergeCountdownComplete.bind(this)
        this.handleConvergePayRetry = this.handleConvergePayRetry.bind(this)
        this.handleLightboxInitRetry = this.handleLightboxInitRetry.bind(this)
        this.handleContinueWithoutPayment = this.handleContinueWithoutPayment.bind(this)
        this.handleFormSubmitNoPay = this.handleFormSubmitNoPay.bind(this)
        this.handleSendUserInfo = this.handleSendUserInfo.bind(this)
        this.openLightbox = this.openLightbox.bind(this)
    }

    componentDidMount() {
        // console.log('User Sign Up Ready')
        this.scrollTop()
        this.setClockRef()
        
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
        this.setState(prevState=> ({ phoneNumber: normalizeInput(value, prevState.phoneNumber) }));
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
          progressPct: 100,
          currentStepTitle: 'Complete'
        })
      } else if (currentStep === 6) { 
        this.setState({
          progressPct: 90,
          currentStepTitle: 'Converge Payment'
        })
      } else if (currentStep === 5) {
        this.setState({
          progressPct: 75,
          currentStepTitle: 'Waiver & Payment'
        })
      } else if (currentStep === 4) {
        this.setState({
          progressPct: 60,
          currentStepTitle: 'Fitness Questionnaire'
        })
      } else if (currentStep === 3) {
        this.setState({
          progressPct: 40,
          currentStepTitle: 'Health Questionnaire'
        })
      } else if (currentStep === 2) {
        this.setState({
          progressPct: 20,
          currentStepTitle: 'Personal Information'
        })
      } else if (currentStep === 1) {
        this.setState({
          progressPct: 10,
          currentStepTitle: 'Basic Information'
        })
      } else {
        this.setState({
          progressPct: 0,
          currentStepTitle: 'Error'
        })
      }

      } 

    validStepOne = () => {
      let firstName = this.state.firstName
      let lastName = this.state.lastName
      let email = this.state.email
      let phoneNumber = this.state.phoneNumber
      let password = this.state.password
      let confirmPassword = this.state.confirmPassword

      let requiredFields = (firstName.length > 0 && lastName.length > 0 && email.length > 0 && phoneNumber.length > 0 && password.length > 0 && confirmPassword.length > 0) ? true : false

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
        // let stepOneComplete = this.validStepOne()
        let stepOneComplete = true

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
          currentStep: currentStep,
          waiverSigned: false,
          waiverError: false
        }, () => {
          this.handleStepTitleChange()
        })

      }

    handleFinalStep = () => {
      this.setState({
          currentStep: 7
        }, () => {
          this.handleStepTitleChange()
          this.scrollTop()
        })
      }

    // handleFinalStepNoPay = () => {
    //     this.setState({
    //       currentStep: 7
    //     }, () => {
    //       this.handleStepTitleChange()
    //       this.scrollTop()
    //     })
    //     var btn = document.getElementById('txn_complete');
    //     var t = document.createTextNode('CLICK TO FINISH!');
    //     btn.appendChild(t)
    //     btn.setAttribute('class', 'txnCompleteButton convergeSuccessButton')
    //     btn.style.display = 'block'
    //     document.getElementById('finalStepPrev').style.display = 'none'
    //     document.getElementById('convergeButtonRetry').style.display = 'none'
    //     document.getElementById('convergeLightboxInitButton').style.display = 'none'
    //     this.scrollTop()
    //   }

    handleConvergePay = (event) => {
        event.preventDefault();
        this.setState({
          convergeTokenError: false,
          convergeSecondAttempt: false
        })
        console.log('Handling converge payment')
        console.log('WAIVER CHECKED? ', this.state.waiverSigned)

        if (!this.state.waiverSigned) {
          console.log('WAIVER ERROR HERE')
          this.setState({
            waiverError: true
          })
          return
        } else {
          document.getElementById('convergeButton').style.disabled = true
          document.getElementById('convergeButton').innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...`
          this.setState({
            waiverError: false
          })
        }

        axios.defaults.timeout = 1000 * 15;
        axios({
          method: "GET", 
          url: this.state.env === 'DEVELOPMENT' ? "http://localhost:3000/converge_token_req" || "http://localhost:3001/converge_token_req" : "https://www.gfitwefit.com/converge_token_req",
          }).then((response)=> {
            console.log('GOT A RESPONSE: ', response)
            let ssl_txn_auth_token = response.data
            console.log(ssl_txn_auth_token)
            window.$convergeToken = ssl_txn_auth_token
            this.setState({
              sessionID: ssl_txn_auth_token
            })
            this.handleLightboxInit(ssl_txn_auth_token)
              // if (response.data.msg === 'success'){
              //     console.log("Payment Sent."); 
                  
              // } else if(response.data.msg === 'fail'){
              //   console.log("Payment failed to send.")
              // }
          }).catch((err) => {
            console.log('ERROR RETRIEVING CONVERGE TOKEN: ', err)
            document.getElementById('convergeButton').style.disabled = false
            document.getElementById('convergeButton').innerHTML = `Pay With Converge (try again)`
            this.setState({
              convergeTokenError: true
            })
          })
      }

    handleConvergePayRetry = (event) => {
        event.preventDefault();
        console.log('Handling converge payment retry')
        this.setState({
          convergeSecondAttempt: true
        })
        
        // debugger
        // console.log('WAIVER CHECKED? ', this.state.waiverSigned)

        // if (!this.state.waiverSigned) {
        //   console.log('WAIVER ERROR HERE')
        //   this.setState({
        //     waiverError: true
        //   })
        //   return
        // } else {
        //   document.getElementById('convergeButton').style.disabled = true
        //   document.getElementById('convergeButton').innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...`
        //   this.setState({
        //     waiverError: false
        //   })
        // }

        document.getElementById('convergeButtonRetry').style.disabled = true
        document.getElementById('convergeButtonRetry').innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...`

        axios.defaults.timeout = 1000 * 10;
        axios({
          method: "GET", 
          url: this.state.env === 'DEVELOPMENT' ? "http://localhost:3000/converge_token_req" || "http://localhost:3001/converge_token_req" : "https://www.gfitwefit.com/converge_token_req",
          }).then((response)=> {
            console.log('GOT A RESPONSE: ', response)
            let ssl_txn_auth_token = response.data
            console.log(ssl_txn_auth_token)
            window.$convergeToken = ssl_txn_auth_token
            this.setState({
              sessionID: ssl_txn_auth_token
            })
            this.handleLightboxInitRetry(ssl_txn_auth_token)
              // if (response.data.msg === 'success'){
              //     console.log("Payment Sent."); 
                  
              // } else if(response.data.msg === 'fail'){
              //   console.log("Payment failed to send.")
              // }
          }).catch((err) => {
            console.log('ERROR RETRIEVING CONVERGE TOKEN: ', err)
            document.getElementById('convergeButtonRetry').style.disabled = false
            document.getElementById('convergeButtonRetry').innerHTML = `Request new payment token`
            // document.getElementById('convergeButtonRetry').style.display = 'none'
            document.getElementById('continueWithoutPaymentButton').style.display = 'block'
            // document.getElementById('convergeLightboxDiv').innerHTML = `<Button id='convergeButton' className='payWithConverge'>Request new payment token</Button>`
            // let newConvergeButton = document.getElementById('convergeButton')
            // newConvergeButton.onclick = this.handleConvergePayRetry
            this.setState({
              convergeTokenError: true
            })
          })
      }

    handleLightboxInit = (authToken) => {
        console.log('Handling lightbox init -- Auth Token: ', authToken)
        this.scrollTop()
        document.getElementById('signUpRequiredSmall').style.display = 'none'
        this.setState({
          currentStep: 6
        }, () => {
          this.handleStepTitleChange()
          this.startTimer()
          // let tenMinutes = 60 * 1;
          // let display = document.querySelector('#time');
          // this.startTimer(tenMinutes, display)
        })
      }
    
    handleLightboxInitRetry = (authToken) => {
      // console.log('Handling lightbox init -- Auth Token: ', authToken)
      this.scrollTop()
      document.getElementById('convergeButtonRetry').innerHTML = `Request new payment token`
      document.getElementById('convergeButtonRetry').style.display = 'none'
      document.getElementById('convergeLightboxInitButton').style.display = 'block'
      // document.getElementById('convergeLightboxDiv').innerHTML = `<button id='convergeLightboxInitButton' style={this.props.divStyle} className='convergeLightboxButton' onClick={window["openLightbox"]}>Secure Payment</button> ` 
      // document.getElementById('signUpRequiredSmall').style.display = 'none'
      this.startTimer()
      }

    handleContinueWithoutPayment = (event) => {
      console.log('CONTINUING WITHOUT PAYMENT')
      document.getElementById('continueWithoutPaymentButton').style.display = 'none'
      this.handleFormSubmitNoPay()
      // this.handleFinalStepNoPay()
      }

    startTimer() {
        this.clockRef.start();
      }

    pauseTimer() {
        this.clockRef.pause();
      }

    setClockRef(ref) {
        // When the `Clock` (and subsequently `Countdown` mounts
        // this will give us access to the API
        this.clockRef = ref;
      }

    convergeCountdownComplete = () => {
      let txnStatus = document.getElementById('txnStatus').value
      console.log('TXN STATUS: ', txnStatus)
      if (this.state.convergeSecondAttempt) {
        console.log('USERS SECOND ATTEMPT FAILED')
        document.getElementById('convergeButtonRetry').style.display = 'block'
        document.getElementById('continueWithoutPaymentButton').style.display = 'block'
        document.getElementById('convergeLightboxInitButton').style.display = 'none'
        return
      } else if (txnStatus === undefined) {
          document.getElementById('convergeButtonRetry').style.display = 'block'
          document.getElementById('convergeLightboxInitButton').style.display = 'none'
          // document.getElementById('convergeLightboxDiv').innerHTML = `<Button id='convergeButton' className='payWithConverge'>Request new payment token</Button>` 
          // let newConvergeButton = document.getElementById('convergeButton')
          // newConvergeButton.onclick = this.props.handleConvergePayRetry
          // console.log('new converge button: ', newConvergeButton)
        }
      }

    checkConvergePayment = (event) => {
        event.preventDefault()
        document.getElementById('convergeInfo').style.display = 'none'
        let status = window.$status
        let msg = window.$msg
        console.log('CHECKING CONVERGE PAYMENT: ', status, msg)
        if(status === 'APPROVED') {
          // document.getElementById('finalStep').disabled = false
          this.setState({
            paymentComplete: true,
            paymentRefNumber: msg.ssl_transaction_reference_number,
            paymentTxnId: msg.ssl_txn_id,
            paymentDate: msg.ssl_txn_time,
            paymentCard: msg.ssl_card_number
          }, () => {
            this.handleFormSubmit()
          })
        } else {
          console.log('PAYMENT ERROR OCCURED')
          this.setState({
            paymentComplete: false,
            paymentRefNumber: 'n/a',
            paymentTxnId: 'n/a',
            paymentDate: 'n/a',
            paymentCard: 'n/a'
          }, () => {
            this.handleFormSubmit()
          })
        }
      }

    checkWaiver = () => {
        if (this.state.waiverSigned) {
            this.setState({
                waiverSigned: false,
                waiverError: true
            }, () => {
                console.log('WAIVER IS CHECKED? ', this.state.waiverSigned)
                console.log('WAIVER ERROR? ', this.state.waiverError)
            })
            
        } else {
            this.setState({
                waiverSigned: true,
                waiverError: false
            }, () => {
                console.log('WAIVER IS CHECKED? ', this.state.waiverSigned)
                console.log('WAIVER ERROR? ', this.state.waiverError)
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

    handleFormSubmit = () => {
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
            phoneNumber: this.state.phoneNumber,
            username: this.state.email,
            password: this.state.password,
            height: this.state.height,
            weight: this.state.weight,
            gender: this.state.gender,
            dob: dob,
            medicalConditions: this.state.medicalConditions,
            familyHistory: this.state.familyHistory,
            personalHistory: this.state.personalHistory,
            fitnessGoals: this.state.fitnessGoals ? this.state.fitnessGoals : 'n/a',
            activityLevel: this.state.activityLevel ? this.state.activityLevel : 'n/a',
            exercisePlan: this.state.exercisePlan ? this.state.exercisePlan : 'n/a',
            gymEquipment: this.state.gymEquipment ? this.state.gymEquipment : 'n/a',
            paymentComplete: this.state.paymentComplete,
            paymentRefNumber: this.state.paymentComplete ? this.state.paymentRefNumber : 'n/a',
            paymentTxnId: this.state.paymentComplete ? this.state.paymentTxnId : 'n/a',
            paymentDate: this.state.paymentComplete ? this.state.paymentDate : 'n/a',
            paymentCard: this.state.paymentComplete ? this.state.paymentCard : 'n/a',
            waiverSigned: this.state.waiverSigned
        };
        console.log(userData);

        // SAVE NEW USER
        API.saveUser(userData)
          .then(res => {
              console.log(res)
              if (res.data) {
                  console.log("Successful signup!")
                  this.handleSendUserInfo(userData.firstName, userData.lastName, userData.email, userData.paymentComplete)
              } else {
                  console.log("Signup error")
              }
          })
          .catch(error => {
              console.log(error)
          })
        
      }

    handleFormSubmitNoPay = () => {
        this.scrollTop()
        console.log('User sending info')
        this.setState({
            passwordError: false,
            nameTaken: false,
            currentStep: 7
        }, () => {
          this.handleStepTitleChange()
        })
        let dob = this.state.day + '/' + this.state.month + '/' + this.state.year
        //console.log(this.state)
        let userData = {
            firstName: this.state.firstName.trim(),
            lastName: this.state.lastName.trim(),
            email: this.state.email.trim(),
            phoneNumber: this.state.phoneNumber,
            username: this.state.email,
            password: this.state.password,
            height: this.state.height,
            weight: this.state.weight,
            gender: this.state.gender,
            dob: dob,
            medicalConditions: this.state.medicalConditions,
            familyHistory: this.state.familyHistory,
            personalHistory: this.state.personalHistory,
            fitnessGoals: this.state.fitnessGoals ? this.state.fitnessGoals : 'n/a',
            activityLevel: this.state.activityLevel ? this.state.activityLevel : 'n/a',
            exercisePlan: this.state.exercisePlan ? this.state.exercisePlan : 'n/a',
            gymEquipment: this.state.gymEquipment ? this.state.gymEquipment : 'n/a',
            paymentComplete: false,
            paymentRefNumber: 'n/a',
            paymentTxnId: 'n/a',
            paymentDate: 'n/a',
            paymentCard: 'n/a',
            waiverSigned: this.state.waiverSigned
        };
        console.log(userData);

        // SAVE NEW USER
        API.saveUser(userData)
          .then(res => {
              console.log(res)
              if (res.data) {
                console.log("Successful signup!")
                this.handleSendUserInfo(userData.firstName, userData.lastName, userData.email, userData.paymentComplete)
              } else {
                console.log("Signup error")
              }
          })
          .catch(error => {
              console.log(error)
          })
        
      }

    handleSendUserInfo = (firstName, lastName, email, subscriptionStatus) => {
        console.log(firstName, lastName, email, subscriptionStatus)
        axios({
            method: "POST", 
            url: this.state.env === 'DEVELOPMENT' ? "http://localhost:3000/sendUserInfo" : "http://gfitwefit.com/sendUserInfo",
            data: {
                firstName: firstName,   
                lastName: lastName,
                email: email,  
                subscriptionStatus: subscriptionStatus === true ? 'active' : 'inactive'
            }
        }).then((response)=> {
            if (response.data.msg === 'success'){
                console.log("Message Sent."); 
                this.setState({
                  contactSuccess: true
                })
                this.handleFinalStep()
            } else if(response.data.msg === 'fail'){
              console.log("Message failed to send.")
              this.setState({
                contactError: true
              })
            }
        })
      }

    openLightbox = (event) => {
      event.preventDefault()
      // window.["openLightbox"]
    }

    render() {
        return (
            <div className="signUpUserDiv">
                {/* {this.renderRedirect()} */}
                <div className="headerDiv">
                  <h1 className='signUpUserTitle'>User Sign Up</h1>
                  <p className='signUpUserStep'>
                    Step {this.state.currentStep} - {this.state.currentStepTitle}
                  </p>
                  <ProgressBar 
                    now={this.state.progressPct}
                  />
                  <small id='signUpRequiredSmall' className='signUpRequired'>*Required</small>
                </div>
                
                <Form className='signUpUserForm'>
                
                  <SignUpUserPersonalInfo 
                    currentStep={this.state.currentStep}
                    handleChange={this.handleChange}
                    handlePhoneChange={this.handlePhoneChange}
                    firstName={this.state.firstName}
                    lastName={this.state.lastName}
                    email={this.state.email}
                    phoneNumber={this.state.phoneNumber}
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

                  <SignUpUserWaiver 
                    currentStep={this.state.currentStep}
                    handleChange={this.handleChange}
                    waiverSigned={this.state.waiverSigned}
                    waiverError={this.state.waiverError}
                    checkWaiver={this.checkWaiver}
                    handleConvergePay={this.handleConvergePay}
                    sessionID={this.state.sessionID}
                    convergeTokenError={this.state.convergeTokenError}
                  />

                  <SignUpUserConvergeLightbox 
                    currentStep={this.state.currentStep}
                    handleChange={this.handleChange}
                    sessionID={this.state.sessionID}
                    openLightbox={this.openLightbox}
                    checkConvergePayment={this.checkConvergePayment}
                    refCallback={this.setClockRef}
                    convergeCountdownComplete={this.convergeCountdownComplete}
                    handleConvergePayRetry={this.handleConvergePayRetry}
                    divStyle={this.state.divStyle}
                    convergeTokenError={this.state.convergeTokenError}
                    handleContinueWithoutPayment={this.handleContinueWithoutPayment}
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

                      (this.state.currentStep < 6) ?

                        <Button onClick={this.handlePrevStep} variant="warning" id='finalStepPrev' className="prevStep">
                            Prev
                        </Button> 

                      :

                      (this.state.currentStep === 7) ?

                      <NavLink className='signInButton' href="/userLogin">
                       Sign In
                      </NavLink>

                      :

                      <span></span>

                      // <span className='stepButtonSpan'>
                      //   <Button onClick={this.handlePrevStep} variant="warning" className="prevStep">
                      //       Prev
                      //   </Button> 

                      //   <Button onClick={this.handleFormSubmit} variant="success" type="submit" className="submitSignUp">
                      //       Submit
                      //   </Button>
                      // </span>

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
       


