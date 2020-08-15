import React, { Component } from 'react';

// COMPONENTS
import NavbarSecondaryPage from '../../components/nav/NavbarSecondaryPage'
import Footer from '../../components/nav/Footer'
import ContactLanding from '../../components/contact/ContactLanding'
import ContactInfo from '../../components/contact/ContactInfo'

class ContactPage extends Component {

    render() {                                                                  
        return (
            <div className='appPageMainDiv'>
                <div className="navbarDiv">
                  <NavbarSecondaryPage />
                </div>
                <div className="contentsDiv">
                  <ContactLanding />
                  <ContactInfo />
                </div>
                <div className="footerDiv">
                  <Footer />
                </div>
            </div>
        )
    }
}

export default ContactPage