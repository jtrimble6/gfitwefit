import React, { Component } from 'react';

// COMPONENTS
import NavbarSecondaryPage from '../../components/nav/NavbarSecondaryPage'
import Footer from '../../components/nav/Footer'
import ContactLanding from '../../components/contact/ContactLanding'
import ContactInfo from '../../components/contact/ContactInfo'

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