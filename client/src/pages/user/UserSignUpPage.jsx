import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import LoginBar from '../../components/nav/LoginBar'
import Footer from '../../components/nav/Footer'
import '../../css/signup.css'
// import UnderConstructionPage from '../UnderConstructionPage.jsx'
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
            <div>
              <LoginBar />
              {/* <UnderConstructionPage /> */}
              <SignUpUser />
              <Footer />
            </div>
        
        )
    };
};

export default UserSignUpPage;
       