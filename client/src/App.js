import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Switch, Redirect } from 'react-router-dom'

// API CALLS
import API from './utils/API'

// WEB PAGES
import LandingPage from './pages/home/LandingPage'
import ContactPage from './pages/home/ContactPage'
import TryItOutPage from './pages/home/TryItOutPage'
import BioPage from './pages/home/BioPage'
// import PricingPage from './pages/PricingPage'

// ADMIN PAGES
import AdminLogin from './pages/admin/AdminLogin'
import AdminSignUp from './pages/admin/AdminSignUp'
import AdminHomePage from './pages/admin/AdminHomePage'
import AdminVideoLibraryPage from './pages/admin/AdminVideoLibraryPage'
import Logout from './pages/admin/Logout'

// USER PAGES
import UserSignUpPage from './pages/user/UserSignUpPage'
import UserLogin from './pages/user/UserLogin'
import UserHomePage from './pages/user/UserHomePage'
import PasswordReset from './pages/user/PasswordReset'
import UpdatePassword from './pages/user/UpdatePassword'

// CSS
import './css/general/main.css';

class Landing extends Component {

  state = {
    loggedIn: '',
    admin: false,
    username: null,
    sessionID: null,
    userObject: {}
  }

  componentDidMount() {
    this.getUser()
  }

  updateUser = (userObject) => {
    localStorage.clear()
    this.setState(
      userObject
    )
    localStorage.setItem('user', this.state.username)
    localStorage.setItem('sessionID', this.state.sessionID)
    // console.log('LOCAL STORAGE: ', localStorage)
    // debugger;
  }

  getUser = () => {
    let localSessionID = localStorage.getItem('sessionID')
    // console.log('LOCAL SESSION ID: ', localSessionID)
    if (!localSessionID || localSessionID === 'null') {
      this.setState({
        loggedIn: false
      })
      // console.log('LOGGED IN? ', this.state.loggedIn)
    } else {
      // console.log("Session not null")
      API.checkSession(localSessionID)
        .then(response => {
          if (response.data._id === localSessionID) {
            // console.log("Login confirmed");
            this.setState({
              loggedIn: true,
              admin: response.data.admin
            })
            console.log('LOGGED IN? ', this.state.loggedIn)
          } else {
            // console.log("No matching sessions");
            this.setState({
              loggedIn: false,
              admin: false
            })
            // console.log(this.state.loggedIn)
          }
        }).catch(error => {
          console.log('Login Error: ', error)
          this.setState({
            loggedIn: false,
            admin: false
          })
        })
    }
  }

  render() {
    // let background1 = require('./css/images/gfitinsta/insta6.jpg')
    // let landingStyle = {
    //   zIndex: '100'
    // }       
    // let instafeedStyle = {
    //   zIndex: '1'
    // }    
    return (
      <Router>
        <div id='appRoot' className="App">
          <Switch>
            <Route exact path='/'
              render={() =>
                <LandingPage />
              }
            />
            <Route exact path='/contact'
              render={() =>
                <ContactPage />
              }
            />
            <Route exact path='/tryitout'
              render={() =>
                <TryItOutPage />
              }
            />
            <Route exact path='/bioPage'
              render={() =>
                <BioPage />
              }
            />
            <Route exact path='/logout'
              render={() =>
                <Logout 
                  updateUser={this.updateUser}
                />
              }
            />
            <Route exact path='/userSignup'
              render={() =>
                <UserSignUpPage 
                  updateUser={this.updateUser}
                />
              }
            />
            <Route exact path='/userLogin'
              render={() =>
                <UserLogin 
                  updateUser={this.updateUser}
                />
              }
            />
            <Route exact path='/passwordReset'
              render={() =>
                <PasswordReset />
              }
            />
            <Route exact path='/updatePassword'
              render={() =>
                <UpdatePassword />
              }
            />
            <Route exact path='/userHome'
              render={() =>
                <UserHomePage
                  updateUser={this.updateUser}
                />
              }
            />
            <Route exact path='/adminLogin'
              render={() =>
                <AdminLogin 
                  updateUser={this.updateUser}
                />
              }
            />
            <Route exact path='/adminSignup'
              render={() =>
                // <AdminSignUp />
                this.state.admin === true ? (
                  <AdminSignUp />
                ) : this.state.admin === false ? (
                  <Redirect to='/' />
                ) : (
                  null
                )}
              // }
            />
            <Route exact path='/adminHome'
              render={() =>
                <AdminHomePage />
                // this.state.admin === true ? (
                //   <AdminHomePage />
                // ) : this.state.admin === false ? (
                //   <Redirect to='/' />
                // ) : (
                //   null
                // )}
              }
            />
            <Route exact path='/adminVideoLibrary'
              render={() =>
                this.state.loggedIn === true ? (
                  <AdminVideoLibraryPage />
                ) : this.state.loggedIn === false ? (
                  <Redirect to='/' />
                ) : (
                  null
                )}
            />
          </Switch>
        </div>
      </Router>
      
    );
  }
}

export default Landing;
