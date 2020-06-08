import React, { Component } from 'react';
import Navbar from '../components/nav/Navbar'
import Footer from '../components/nav/Footer'
import AboutLanding from '../components/AboutLanding'
import GymInfo from '../components/GymInfo'
import TrainerInfo from '../components/TrainerInfo'
import ScheduleInfo from '../components/ScheduleInfo'
import GoldOut from '../components/GoldOut'

class LandingPage extends Component {

    render() {                                                                  
        return (
            <div>
                <Navbar />
                <AboutLanding />
                <GymInfo />
                <TrainerInfo />
                <ScheduleInfo />
                <GoldOut />
                <Footer />
            </div>
        )
    }
}

export default LandingPage