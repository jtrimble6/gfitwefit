import React, { Component } from 'react';
import NavbarSecondaryPage from '../components/nav/NavbarSecondaryPage'
import Footer from '../components/nav/Footer'
import ContactLanding from '../components/ContactLanding'
import ContactInfo from '../components/ContactInfo'

class ContactPage extends Component {

    render() {                                                                  
        return (
            <div>
                <NavbarSecondaryPage />
                <ContactLanding />
                <ContactInfo />
                <Footer />
            </div>
        )
    }
}

export default ContactPage