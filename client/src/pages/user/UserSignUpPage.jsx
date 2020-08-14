import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

// CSS
import '../../css/general/signup.css'

// COMPONENTS
import LoginBar from '../../components/nav/LoginBar'
import Footer from '../../components/nav/Footer'
import SignUpUser from '../../components/user/SignUpUser'

class UserSignUpPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
        redirect: false,
      }
        this.setRedirect = this.setRedirect.bind(this)
        this.renderRedirect = this.renderRedirect.bind(this)

    }

    componentDidMount() {
        
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

    render() {
        return (
        
          <div className='appPageMainDiv'>
            <div className="navbarDiv">
              <LoginBar />
            </div>
            <div className="contentsDivUserSignUp">
              <SignUpUser />
            </div>
            <div className="footerDiv">
              <Footer />
            </div>
          </div>
        
        )
    };
};

export default UserSignUpPage;
       