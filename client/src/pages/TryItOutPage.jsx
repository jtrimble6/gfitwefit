import React, { Component } from 'react';
import NavbarSecondaryPage from '../components/nav/NavbarSecondaryPage'
import Footer from '../components/nav/Footer'
import TryItOutLanding from '../components/TryItOutLanding'
import TryItOutInfo from '../components/TryItOutInfo'

class TryItOutPage extends Component {

    render() {                                                                  
        return (
            <div>
                <NavbarSecondaryPage />
                <TryItOutLanding />
                <TryItOutInfo />
                <Footer />
            </div>
        )
    }
}

export default TryItOutPage