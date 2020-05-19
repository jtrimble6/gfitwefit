import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import LoginBar from '../../nav/LoginBar'
import '../../../css/signup.css'
// import ExistingAccount from "../../alerts/ExistingAccount";
// import PasswordError from '../../alerts/PasswordError';
import API from '../../../utils/API'
import UserInfo from './UserInfo.jsx'
import UserHealth from './UserHealth.jsx'
import UserPayment from './UserPayment.jsx'
import UnderConstructionPage from '../UnderConstructionPage.jsx'
import { Form, Button, Col, FormCheck } from 'react-bootstrap'
import Login from '../admin/Admin'


class UserSignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
        currentStep: 1, // Default is Step 1
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        username: '',
        password: '',
        height: '',
        weight: '',
        gender: '',
        dob: '',
        medicalConditions: '',
        surgeryHistory: '',
        surgeryHistoryDescription: '',
        cardiovascularRisk: false,
        paymentComplete: false,
        formChecked: false,
        redirect: false,
      }
        this.setRedirect = this.setRedirect.bind(this)
        this.renderRedirect = this.renderRedirect.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleNextStep = this.handleNextStep.bind(this)
        this.handlePrevStep = this.handlePrevStep.bind(this)
        this.handleConvergePay = this.handleConvergePay.bind(this)

    }

    componentDidMount() {
        console.log('User Sign Up Ready')
      }

    setRedirect = () => {
        console.log("Redirect");
        this.setState({
          redirect: true
        })
      };

    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/signup' />
        }
      };

    handleChange(event) {
        const {name, value} = event.target
        this.setState({
          [name]: value
        })    
      }

    handleNextStep() {
        let currentStep = this.state.currentStep
        // If the current step is 1 or 2, then add one on "next" button click
        currentStep = currentStep >= 3? 4: currentStep + 1
        this.setState({
          currentStep: currentStep
        })
      }
        
    handlePrevStep() {
        let currentStep = this.state.currentStep
        // If the current step is 2 or 3, then subtract one on "previous" button click
        currentStep = currentStep <= 1? 1: currentStep - 1
        this.setState({
          currentStep: currentStep
        })
      }

    handleConvergePay = (event) => {
        event.preventDefault();
        console.log('Handling converge payment')
        API.getConvergePay()
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
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

    checkPassword = event => {
        const password = event.target.value
        this.setState({
         confirmPassword: password
        })
        if (this.state.password !== password) {
            console.log('THE PASSWORDS DO NOT MATCH')
            this.setState({
                passwordError: 'PASSWORDS DO NOT MATCH'
            })
        } else {
            this.setState({
                passwordError: 'PASSWORDS MATCH'
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
        console.log('User sending info')
        this.setState({
            passwordError: false,
            nameTaken: false,
        })
        event.preventDefault();
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
            dob: this.state.dob,
            medicalConditions: this.state.medicalConditions,
            surgeryHistory: this.state.surgeryHistory,
            surgeryHistoryDescription: this.state.surgeryHistoryDescription,
            cardiovascularRisk: this.state.cardiovascularRisk,
            paymentComplete: this.state.paymentComplete,
            formChecked: this.state.formChecked
        };
        console.log(userData);
        // if (this.state.password !== this.state.confirmPassword) {
        //     console.log('THE PASSWORDS DO NOT MATCH')
        //     this.setState({
        //         passwordError: true
        //     })
        // } else {
        //   API.getUser(userData.username)
        //   .then(res => {
        //     console.log(res)
        //     if (!res.data[0]) {
        //         console.log("Username available");
        //         API.saveUser(userData)
        //         .then(res => {
        //             console.log(res)
        //             if (res.data) {
        //                 console.log("Successful signup!")
        //                 this.setRedirect();
        //             } else {
        //                 console.log("Signup error")
        //             }
        //         })
        //         .catch(error => {
        //             console.log(error)
        //         })
        //     } else {
        //         console.log("Username taken");
        //         this.setState({
        //             nameTaken: true
        //         })
        //     }
        // })
        // .catch(error => {
        //     console.log(error)
        // })
        // }
        
    };

    render() {
        return (
            <div id="container">
              <LoginBar />
              {/* <UnderConstructionPage /> */}

              <div className="userSignUp">
              {this.renderRedirect()}
              <h1>User Sign Up</h1>
              <p>Step {this.state.currentStep}</p>

              <Form>
              
                <UserInfo 
                  currentStep={this.state.currentStep}
                  handleChange={this.handleChange}
                  firstName={this.state.firstName}
                  lastName={this.state.lastName}
                  email={this.state.email}
                  phoneNumber={this.state.phoneNumber}
                  username={this.state.userName}
                  password={this.state.password}
                  checkPassword={this.checkPassword}
                  checkUserName={this.checkUserName}
                />

                <UserHealth 
                  currentStep={this.state.currentStep}
                  handleChange={this.handleChange}
                  height={this.state.height}
                  weight={this.state.weight}
                  gender={this.state.gender}
                  dob={this.state.dob}
                  medicalConditions={this.state.medicalConditions}
                  surgeryHistory={this.state.surgeryHistory}
                  surgeryHistoryDescription={this.state.surgeryHistoryDescription}
                  cardiovascularRisk={this.state.cardiovascularRisk}
                />

                <UserPayment 
                  currentStep={this.state.currentStep}
                  handleChange={this.handleChange}
                  formChecked={this.state.formChecked}
                  checkWaiver={this.checkWaiver}
                  handleConvergePay={this.handleConvergePay}
                />

                <Form.Row className="formNav">
                  { 
                    (this.state.currentStep === 1) ? 
                    
                    <Button onClick={this.handleNextStep} variant="primary" className="nextStep">
                      Next
                    </Button>

                    :

                    (this.state.currentStep < 3) ?
                  
                    <span>
                      <Button onClick={this.handlePrevStep} variant="warning" className="prevStep">
                          Prev
                      </Button> 

                      <Button onClick={this.handleNextStep} variant="primary" className="nextStep">
                          Next
                      </Button>
                    </span>

                    :

                    <Button onClick={this.handleFormSubmit} variant="success" type="submit" className="submitSignUp">
                      Submit
                    </Button>

                  }
                </Form.Row>

              </Form>
              </div>
            </div>
        
        )
    };
};

export default UserSignUp;
       