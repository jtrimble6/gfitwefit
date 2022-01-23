import React, { Component } from 'react';
import axios from 'axios'

// COMPONENTS
import NavbarSecondaryPage from '../../components/nav/NavbarSecondaryPage'
import Footer from '../../components/nav/Footer'
import KidsLanding from '../../components/kids/KidsLanding'


class KidsPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
        
        }
    
    }

    componentDidMount() {
        
    }

    render() {                                                                  
        return (
            <div className='appPageMainDiv'>
                <div className="navbarDiv">
                    <NavbarSecondaryPage />
                </div>
                <div className="contentsDiv">
                    <KidsLanding />
                </div>
                <div className="footerDiv">
                    <Footer />
                </div>
            </div>
        )
    }
}

export default KidsPage