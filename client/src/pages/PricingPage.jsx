import React, { Component } from 'react';
import NavbarSecondaryPage from '../components/nav/NavbarSecondaryPage'
import Footer from '../components/nav/Footer'
import PricingLanding from '../components/PricingLanding'
import PricingInfo from '../components/PricingInfo'

class PricingPage extends Component {

    render() {                                                                  
        return (
            <div>
                <NavbarSecondaryPage />
                <PricingLanding />
                <PricingInfo />
                <Footer />
            </div>
        )
    }
}

export default PricingPage