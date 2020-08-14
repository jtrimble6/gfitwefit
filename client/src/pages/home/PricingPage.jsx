import React, { Component } from 'react';

// COMPONENTS
import NavbarSecondaryPage from '../../components/nav/NavbarSecondaryPage'
import Footer from '../../components/nav/Footer'
import PricingLanding from '../../components/home/PricingLanding'
import PricingInfo from '../../components/home/PricingInfo'

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