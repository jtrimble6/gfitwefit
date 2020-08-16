import React, { Component } from 'react';

// COMPONENTS
import Navbar from '../../components/nav/Navbar'
import Footer from '../../components/nav/Footer'
import AboutLanding from '../../components/home/AboutLanding'
import GymInfo from '../../components/home/GymInfo'
import TrainerInfo from '../../components/home/TrainerInfo'
import ScheduleInfo from '../../components/home/ScheduleInfo'
import GoldOut from '../../components/home/GoldOut'

// CSS
import '../../css/general/mainDiv.css'

class LandingPage extends Component {

    render() {                                                                  
        return (
            <div className='appPageMainDiv'>
              <div className="navbarDiv">
                <Navbar />
              </div>
              <div className="contentsDiv">
                <AboutLanding />
                <GymInfo />
                <TrainerInfo />
                <ScheduleInfo />
                <GoldOut />
              </div>
              <div className="footerDiv">
                <Footer />
              </div>
            </div>
        )
    }
}

export default LandingPage