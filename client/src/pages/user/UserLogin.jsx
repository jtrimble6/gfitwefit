import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import LoginBar from '../../components/nav/LoginBar'
import Footer from '../../components/nav/Footer'
import API from '../../utils/API'
import SignInError from "../../components/alerts/SignInError";
import '../../css/admin.css'

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
        <div>
            <LoginBar />
            <div id="loginPage">
            
              {this.renderRedirect()}
                <div className="formContainer">    
                    <form className="formLogin" action="index.html">
                        <h2 className="formLoginHeading">User Login</h2> <br />
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
                        </div> 
                    </form>	  	
                </div>
            </div>
            <Footer />
            </div>
        )
    }
}

export default UserLogin
       