import React, { Component } from 'react';
import '../../css/about.css'

class About extends Component {

    render() {                                                                  
        return (
        // <div className='container'>
            <div className='aboutPage'>
                <h1>Who We Are:</h1>
                <div className="row">
                  <div className="col trainer">
                    <img src={require('../../css/images/gfitinsta/wg.jpg')} alt='Walter Gouveia'></img>
                    <p className='name'>Walt Gouveia</p>
                    <p className='position'>Co-Owner</p>
                  </div>
                  <div className="col trainer">
                    <img src={require('../../css/images/gfitinsta/kg.jpeg')} alt='Kyle Gouveia'></img>
                    <p className='name'>Kyle Gouveia</p>
                    <p className='position'>Co-Owner</p>
                  </div>
                  {/* <div className="col trainer">
                    <img src={require('../../css/images/gfitinsta/jt.png')} alt='Joshua Trimble'></img>
                    <p className='name'>Josh Trimble</p>
                    <p className='position'>Lead Developer</p>
                  </div> */}
                </div>
                <div className="row">
                   <p>
                     Gouveia Fitness is a family-owned and operated fitness center located at the Fungo in Cornelius, NC! Here at G-FIT we bring community and fitness together in one place. If you’re looking to lose weight/body fat, gain muscular strength/endurance, or boost your confidence, G-FIT offers adult group classes that will help you reach your goals. Our training foundation is based on creative interval workouts that provide a safe and upbeat environment. The G-fit team schedules monthly events, so we can all work toward a common goal, and strengthen our community outside of the gym.
                   </p>
                   <p>
                     The co-ed Junior Elite program is for young athletes ages 7-13. Our main focus is to develop speed and agility, functional strength and promote discipline! <br /> <br />
                     Come in and receive your free week today!
                   </p>
                    
                </div>
            </div>
        // </div>
        )
    }
}

export default About