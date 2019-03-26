import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import API from '../../../utils/API'
import Navbar from '../../nav/Navbar'
import '../../../css/signup.css'
import ExistingAccount from "../../alerts/ExistingAccount";
import PasswordError from '../../alerts/PasswordError';



class Signup extends Component {

    state = {
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        confirmPassword: '',
        redirect: false,
        nameTaken: false,
        passwordError: false
      }

    componentDidMount() {
        console.log('Ready')
      }

    setRedirect = () => {
        console.log("Redirect");
        this.setState({
          redirect: true
        })
      };

    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/admin' />
        }
      };

    handleInputChange = event => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
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
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            username: this.state.username,
            password: this.state.password,
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
                        this.setRedirect();
                    } else {
                        console.log("Signup error")
                    }
                })
                .catch(error => {
                    console.log(error)
                })
            } else {
                console.log("Username taken");
                this.setState({
                    nameTaken: true
                })
            }
        })
        .catch(error => {
            console.log(error)
        })
        }
        
    };

    render() {
        return (
            <div id="loginPage">
            <Navbar />
              {this.renderRedirect()}
                <div className="formContainer">    
                  <form className="formSignup" action="index.html">
                    <h2 className="formSignup-heading">Sign Up</h2>
                      <div className="signupWrap">
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                                <input 
                                value={this.state.firstName}
                                name="firstName"
                                onChange={this.handleInputChange}
                                type="text"
                                className="form-control"
                                id="firstName"
                                placeholder="First name"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                                <input
                                    value={this.state.lastName}
                                    name="lastName"
                                    onChange={this.handleInputChange}
                                    type="text"
                                    className="form-control"
                                    id="lastName"
                                    placeholder="Last name"                                        
                                />
                        </div>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                value={this.state.username}
                                name="username"
                                onChange={this.checkUserName}
                                type="text"
                                className="form-control"
                                id="username"
                                placeholder="Username"                                        
                            />
                            <small id="usernameError" className="form-text text-muted">{this.state.nameTaken}</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Create Password</label>
                            <input
                                value={this.state.password}
                                name="password"
                                onChange={this.handleInputChange}
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Password"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Confirm Password</label>
                            <input
                                value={this.state.confirmPassword}
                                name="confirmPassword"
                                onChange={this.handleInputChange}
                                type="password"
                                className="form-control"
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
                        <button
                            type="submit"
                            className="btn btn-primary submit"
                            onClick={this.handleFormSubmit}
                        >
                        Submit
                        </button>
                        </div>
                    </form>
                </div>
            </div>
        
        )
    };
};

export default Signup;
       