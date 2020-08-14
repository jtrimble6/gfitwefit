import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import LoginBar from '../../components/nav/LoginBar'
import Footer from '../../components/nav/Footer'
import API from '../../utils/API'
import SignInError from "../../components/alerts/SignInError";

// CSS
import '../../css/admin/admin.css'

class AdminLogin extends Component {

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
          return <Redirect to='/adminHome' />
        }
        else {}
    }

    handleInputChange = event => {
        const { name, value } = event.target
        this.setState({
            [name]: value,
            signInError: false
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
                  this.props.updateUser({
                      loggedIn: true,
                      username: response.data.username
                  })
                  let sessionData = {
                      sessionUserID: response.data.username
                  }
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
              console.log('Admin Login Error: ', error)
          })
    }

    render() {
        return (
        <div>
            <LoginBar />
            <div id="loginPage">
            
              {this.renderRedirect()}
                <div className="formContainer">    
                    <form className="formLogin" action="index.html">
                        <h2 className="formLoginHeading">Admin Login</h2> <br />
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
                                className="btn btn-primary btn-block"
                                href="index.html"
                                type="submit"
                                onClick={this.handleFormSubmit}
                                >
                                <i className="fa fa-lock"></i> SIGN IN
                            </button>
                            <hr/>     
                        </div> 
                    </form>	  	
                </div>
            </div>
            <Footer />
            </div>
        )
    }
}

export default AdminLogin
       