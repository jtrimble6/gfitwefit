import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Switch, Redirect } from 'react-router-dom';
import API from './utils/API';
import Navbar from './components/nav/Navbar'
import Welcome from './components/pages/Welcome'
import Instafeed from './components/socialmedia/Instafeed'
import Facebookfeed from './components/socialmedia/Facebookfeed'
import Video from './components/pages/Video'
import About from './components/pages/About'
import Schedule from './components/pages/Schedule'
import Contact from './components/pages/Contact'
import Admin from './components/pages/admin/Admin';
import AdminSignup from './components/pages/admin/AdminSignup';
import AdminPage from './components/pages/admin/AdminPage';
import Logout from './components/pages/admin/Logout'
// import $ from 'jquery'
// import logo from './gfit.svg';
import './css/main.css';

class Landing extends Component {

  state = {
    loggedIn: '',
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
              loggedIn: true
            })
            console.log('LOGGED IN? ', this.state.loggedIn)
          } else {
            // console.log("No matching sessions");
            this.setState({
              loggedIn: false
            })
            // console.log(this.state.loggedIn)
          }
        }).catch(error => {
          console.log('Login Error: ', error)
        })
    }
  }

  render() {
    // let background1 = require('./css/images/gfitinsta/insta6.jpg')
    let landingStyle = {
      zIndex: '100'
    }       
    let instafeedStyle = {
      zIndex: '1'
    }    
    return (
      <Router>
        <div className="App">
          <Switch>
          <Route exact path='/'
              render={() =>
                <div className='container'>
                  <Navbar />
                  <Welcome 
                    style={landingStyle}
                  />
                  <Instafeed 
                    style={instafeedStyle}
                  />
                  <Video />
                  <Facebookfeed
                    style={instafeedStyle}
                  />
                  <About 
                  />
                  <Schedule 
                  />
                  <Contact 
                  />
                  <div className='spacer'><hr className='spacerLine'></hr></div>
                </div>
              }
            />
            <Route exact path='/logout'
              render={() =>
                <Logout 
                  updateUser={this.updateUser}
                />
              }
            />
            <Route exact path='/admin'
              render={() =>
                <Admin 
                  updateUser={this.updateUser}
                />
              }
            />
            <Route exact path='/adminSignup'
              render={() =>
                this.state.loggedIn === true ? (
                  <AdminSignup />
                ) : this.state.loggedIn === false ? (
                  <Redirect to='/' />
                ) : (
                  null
                )}
            />
            <Route exact path='/adminPage'
              render={() =>
                this.state.loggedIn === true ? (
                  <AdminPage />
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
