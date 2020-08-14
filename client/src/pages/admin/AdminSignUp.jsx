import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import API from '../../utils/API'
// import Navbar from '../../nav/Navbar'

// CSS
import '../../css/general/signup.css'

// COMPONENTS
import ExistingAccount from "../../components/alerts/ExistingAccount";
import PasswordError from '../../components/alerts/PasswordError';
import AdminSignUpSuccess from '../../components/alerts/AdminSignUpSuccess'
import AdminSignUpError from '../../components/alerts/AdminSignUpError'



class AdminSignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        phoneNumber: 'n/a',
        password: '',
        confirmPassword: '',
        redirect: false,
        nameTaken: false,
        passwordError: false,
        adminSignUpError: false,
        adminSignUpSuccess: false
      }
        this.setRedirect = this.setRedirect.bind(this)
        this.renderRedirect = this.renderRedirect.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.checkPassword = this.checkPassword.bind(this)
        this.checkUserName = this.checkUserName.bind(this)
      
      }

    componentDidMount() {
        console.log('Ready')
      }

    setRedirect = () => {
        console.log("Redirect");
        this.setState({
          redirect: true
        })
      }

    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/admin' />
        }
      }

    handleInputChange = event => {
        const { name, value } = event.target
        this.setState({
            [name]: value,
            adminSignUpError: false,
            adminSignUpSuccess: false,
            nameTaken: false,
            passwordError: false,
        })
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

    handleFormSubmit = event => {
        this.setState({
            passwordError: false,
            nameTaken: false,
        })
        event.preventDefault();
        //console.log(this.state)
        let userData = { 
            admin: true,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber,
            username: this.state.username,
            password: this.state.password,
            paymentComplete: false,
            waiverSigned: false
        };
        console.log(userData);
        if (this.state.password !== this.state.confirmPassword) {
            console.log('THE PASSWORDS DO NOT MATCH')
            this.setState({
                passwordError: true
            })
        } else {
          API.getUser(userData.username)
            .then(res => {
                console.log(res)
                if (!res.data[0]) {
                    console.log("Username available");
                    API.saveUser(userData)
                        .then(res => {
                            console.log(res)
                            if (res.data) {
                                console.log("Successful signup!")
                                this.setState({
                                    adminSignUpSuccess: true,
                                    firstName: '',
                                    lastName: '',
                                    username: '',
                                    email: '',
                                    password: '',
                                    confirmPassword: '',
                                })
                                // this.setRedirect();
                            } else {
                                console.log("Signup error")
                                this.setState({
                                    adminSignUpError: true
                                })
                            }
                        })
                        .catch(error => {
                            console.log('Backend error: ', error)
                            this.setState({
                                adminSignUpError: true
                            })
                        })
                } else {
                    console.log("Username taken");
                    this.setState({
                        nameTaken: true
                    })
                }})
                .catch(error => {
                    console.log(error)
                })
        }
        
      }

    render() {
        return (
            <div id="signUpPage">
              {/* {this.renderRedirect()} */}
                <div className="formContainer">    
                  <form className="formSignup" action="index.html">
                    <h2 className="adminSignUpFormHeading">Admin Sign Up</h2>
                      <div className="signupWrap">
                        <div className="form-group">
                            <label className='adminSignUpFormLabel' htmlFor="firstName">First Name</label>
                            <input 
                                value={this.state.firstName}
                                name="firstName"
                                onChange={this.handleInputChange}
                                type="text"
                                className="form-control adminSignUpFormEntry"
                                id="firstName"
                                placeholder="First name"
                            />
                        </div>
                        <div className="form-group">
                            <label className='adminSignUpFormLabel' htmlFor="lastName">Last Name</label>
                            <input
                                value={this.state.lastName}
                                name="lastName"
                                onChange={this.handleInputChange}
                                type="text"
                                className="form-control adminSignUpFormEntry"
                                id="lastName"
                                placeholder="Last name"                                        
                            />
                        </div>
                        <div className="form-group">
                            <label className='adminSignUpFormLabel' htmlFor="email">Email</label>
                            <input
                                value={this.state.email}
                                name="email"
                                onChange={this.handleInputChange}
                                type="text"
                                className="form-control adminSignUpFormEntry"
                                id="email"
                                placeholder="Email"                                        
                            />
                        </div>
                        <div className="form-group">
                            <label className='adminSignUpFormLabel' htmlFor="username">Username</label>
                            <input
                                value={this.state.username}
                                name="username"
                                onChange={this.checkUserName}
                                type="text"
                                className="form-control adminSignUpFormEntry"
                                id="username"
                                placeholder="Username"                                        
                            />
                            <small id="usernameError" className="form-text text-muted">{this.state.nameTaken}</small>
                        </div>
                        <div className="form-group">
                            <label className='adminSignUpFormLabel' htmlFor="exampleInputPassword1">Create Password</label>
                            <input
                                value={this.state.password}
                                name="password"
                                onChange={this.handleInputChange}
                                type="password"
                                className="form-control adminSignUpFormEntry"
                                id="password"
                                placeholder="Password"
                            />
                        </div>
                        <div className="form-group">
                            <label className='adminSignUpFormLabel' htmlFor="exampleInputPassword1">Confirm Password</label>
                            <input
                                value={this.state.confirmPassword}
                                name="confirmPassword"
                                onChange={this.checkPassword}
                                type="password"
                                className="form-control adminSignUpFormEntry"
                                id="confirmPassword"
                                placeholder="Confirm Password"
                            />
                            <small id="passwordError" className="form-text text-muted">{this.state.passwordError}</small>
                        </div>
                        <ExistingAccount
                          nameTaken={this.state.nameTaken}
                        />
                        <PasswordError
                          passwordError={this.state.passwordError}
                        />
                        <AdminSignUpError 
                          adminSignUpError={this.state.adminSignUpError}
                        />
                        <AdminSignUpSuccess 
                          adminSignUpSuccess={this.state.adminSignUpSuccess}
                        />
                        <button
                            type="submit"
                            className="adminSubmitButton"
                            onClick={this.handleFormSubmit}
                        >
                        Create Admin
                        </button>
                        </div>
                    </form>
                </div>
            </div>
        
        )
    }
}

export default AdminSignUp;
       
