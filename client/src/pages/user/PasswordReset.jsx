import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import LoginBar from '../../components/nav/LoginBar'
import Footer from '../../components/nav/Footer'
import API from '../../utils/API'
import EmailNotFound from "../../components/alerts/EmailNotFound";
import EmailFound from "../../components/alerts/EmailFound";
import crypto from 'crypto'
import moment from 'moment-timezone'
import '../../css/admin.css'
import '../../css/userLogin.css'

class PasswordReset extends Component {

    constructor(props) {
        super(props) 
        this.state = {
          email: '',
          redirect: false,
          emailError: false,
          emailSuccess: false,
          messageFromServer: '',
          }
  
          this.setRedirect = this.setRedirect.bind(this)
          this.renderRedirect = this.renderRedirect.bind(this)
          this.handleInputChange = this.handleInputChange.bind(this)
          this.handleFormSubmit = this.handleFormSubmit.bind(this)
  
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
          return <Redirect to='/userLogin' />
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
        // const nodemailer = require('nodemailer');
        let email = this.state.email
        let findEmailFunc = (users) => {
            return users.email.toLowerCase().trim() === email.trim()
          }
        if (this.state.email === '') {
            this.setState({
                emailError: true,
                messageFromServer: '',
            })
        } else {
            API.getUsers()
              .then(res => {
                console.log('ANY DATA?: ', res.data)
                let currentUsers = res.data
                let emailMatch = currentUsers.filter(findEmailFunc)
                if(emailMatch[0]) {
                console.log('EMAIL MATCH', emailMatch[0].username)
                this.setState({
                    emailSuccess: true,
                  })
                const token = crypto.randomBytes(20).toString('hex');
                let username = emailMatch[0].username
                let realTime = moment().tz('America/New_York').add(1, 'hour').format('YYYY-MM-DDTHH:mm:ss')
                let passInfo = {
                    username: username,
                    resetPasswordToken: token,
                    resetPasswordExpires: realTime,
                  }
                
                API.updatePassToken(username, passInfo)
                  .then(res => {
                      console.log('PASSWORD RESET TOKEN SENT!')
                      console.log('PASS INFO:', username, passInfo.resetPasswordToken, passInfo.resetPasswordExpires)
                      console.log(res.data)
                      this.setState({
                        email: '',
                        messageFromServer: '',
                      })
                    //   this.setState({
                    //       redirect: true
                    //   })
                    })
                  .catch(err => console.log(err))                
                } else {
                    console.log('NO MATCH')
                    this.setState({
                        emailError: true,
                        email: '',
                        messageFromServer: '',
                      })
                }
              })
              .catch(err => console.log(err))
        }
        
    }

    render() {
        return (
        <div>
            <LoginBar />
            <div id="loginPage">
              {this.renderRedirect()}
              <div className="row">
                <div className="formContainer">    
                    <form className="formLogin" action="index.html">
                        <h2 className="formLoginHeading">PASSWORD RESET</h2> <br />
                        <p className='passwordResetInstructions'>Please enter the email address for the account you would like to reset the password. An email will be sent with a temporary password.</p>
                        <div className="loginWrap">
                            <input
                                value={this.state.email}
                                name="email"
                                onChange={this.handleInputChange}
                                type="text"
                                className="form-control"
                                placeholder="Email address"
                                autoFocus
                            />
                            <br />
                            {/* <SignInError
                                signInError={this.state.signInError}
                            /> */}
                            <button
                                className="loginButton btn btn-block"
                                href="index.html"
                                type="submit"
                                onClick={this.handleFormSubmit}
                                >
                                <i className="fa fa-lock"></i> RESET PASSWORD
                            </button>  
                            <EmailNotFound
                                emailError={this.state.emailError}
                            />
                            <EmailFound
                                emailError={this.state.emailSuccess}
                            />
                        </div> 
                    </form>	  	
                  </div>
              </div>
            </div>
            <Footer />
            </div>
        )
    }
}

export default PasswordReset
       