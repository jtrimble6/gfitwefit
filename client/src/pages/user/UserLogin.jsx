import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
// import LoginBar from '../../components/nav/LoginBar'
import NavbarSecondaryPage from '../../components/nav/NavbarSecondaryPage'
// import Footer from '../../components/nav/Footer'
import API from '../../utils/API'
import SignInError from "../../components/alerts/SignInError";

// CSS
import '../../css/admin/admin.css'
import '../../css/user/userLogin.css'

class UserLogin extends Component {

    state = {
        username: '',
        password: '',
        redirect: false,
        signInError: false
    }

    componentDidMount() {
        console.log('Ready')
    }

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }

    renderRedirect = () => {
        if (this.state.redirect === true) {
          return <Redirect to='/userHome' />
        }
        else {}
    }

    handleInputChange = event => {
        const { name, value } = event.target
        this.setState({
            signInError: false,
            [name]: value
        })
    }

    handleFormSubmit = event => {
        event.preventDefault()
        let userData = {
            username: this.state.username,
            password: this.state.password
        }

        API.loginUser(userData)
          .then(response => {
            if (response.status === 200) {
                console.log('Authenticated!')
                let thisUser = response.data.username
                let isAdmin = response.data.admin
                console.log('Admin? ', isAdmin)
                this.props.updateUser({
                    loggedIn: true,
                    username: response.data.username
                })
                let sessionData = { sessionUserID: response.data.username }
                API.createSession(sessionData)
                    .then(response => {
                        this.props.updateUser({
                            sessionID: response.data._id
                        })
                    }).catch(error => {
                        console.log('Admin Login Error: ', error)
                        this.setState({
                            signInError: true
                        })
                    })
                API.getUser(thisUser)
                    .then(response => {
                        console.log(response)
                        this.setRedirect()
                    })
              }
          }).catch(error => {
              this.setState({
                  signInError: true
              })
              console.log('User Login Error: ', error)
          })
    }

    render() {
        return (
            <div className='appPageMainDiv'>
                <div className="navbarDiv">
                  <NavbarSecondaryPage />
                </div>
                <div className="contentsDiv">
                  <div id="loginPage">
                    {this.renderRedirect()}
                    <div className="row">
                        <div className="col-sm-6 loginInfoColumn">
                            <h2 className='loginInfoHeader'>G-FIT GOLD</h2>
                            <div className="loginInfoDetails">
                                <h4 className='membershipDetailsTitle'>Membership Includes: </h4>
                                <div className="membershipDetails">
                                    <p>*Unlimited access to complete at-home workouts created by your favorite trainers!</p>
                                    <p>*Chat feature built-in to encourage and meet new G-Fit members!</p>
                                    <p>*Custom preferences to enjoy YOUR workouts YOUR WAY!</p>
                                    <p>Only $5/month gets instant access to our collection of at-home workout videos and much more!</p>                        
                                </div>
                            </div>
                            <a href='/userSignUp' className='userSignUpLink'>Sign Up Today</a>
                        </div>
                        <div className="col-sm-6">
                            <div className="formContainer">    
                                <form className="formLogin" action="index.html">
                                    <h2 className="formLoginHeading">LOGIN</h2> <br />
                                    <div className="loginWrap">
                                        <input
                                            value={this.state.username}
                                            name="username"
                                            onChange={this.handleInputChange}
                                            type="text"
                                            className="form-control"
                                            placeholder="Username (case sensitive)"
                                            autoFocus
                                        />
                                        <br/>
                                        <input
                                            value={this.state.password}
                                            name="password"
                                            onChange={this.handleInputChange}
                                            type="password"
                                            className="form-control"
                                            placeholder="Password (case sensitive)"
                                        />
                                        <br />
                                        <SignInError
                                            signInError={this.state.signInError}
                                        />
                                        <button
                                            className="loginButton btn btn-block"
                                            href="index.html"
                                            type="submit"
                                            onClick={this.handleFormSubmit}
                                            >
                                            <i className="fa fa-lock"></i> SIGN IN
                                        </button>  
                                        <label className="checkbox passwordResetLink">
                                            <span className="pull-right">
                                                <a href="/passwordReset">Forgot Password?</a>               
                                            </span>
                                        </label>
                                    </div> 
                                </form>	  	
                            </div>
                        </div>
                    </div>
                </div>
              </div>
              {/* <div className="footerDiv">
                <Footer />
              </div> */}
          </div>
        )
    }
}

export default UserLogin
       