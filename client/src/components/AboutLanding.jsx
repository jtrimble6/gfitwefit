import React, { Component } from 'react';
import '../css/aboutLanding.css'
import { Jumbotron, Row, Col } from 'react-bootstrap'
import logo from '../css/images/aboutLandingLogo.png';

class AboutLanding extends Component {

    render() {                                                                  
        return (
            <div className='aboutLanding'>
                <Jumbotron className='aboutJumbotron'>
                    <Row>
                        <Col sm={4} className='aboutJumbotronLogoColumn'>
                            <img src={logo} className="aboutJumbotronLogo" alt="logo" />
                        </Col>
                        <Col sm={8} className='aboutJumbotronBodyColumn'>
                            <Row className='aboutJumbotronHeaderRow'>
                              <h1 className='aboutJumbotronHeaderLeft'>WELCOME TO GOUVEIA FITNESS/</h1> <h1 className='aboutJumbotronHeaderRight'>/G FIT</h1> 
                            </Row>
                            <p className='aboutJumbotronBody'>
                              We’re a family-owned and operated fitness center in Cornelius, NC.
                            </p>
                            <p className='aboutJumbotronBody'>
                              Here at G-FIT we bring community and fitness together in one place. If you’re looking to lose weight/body fat, gain muscular strength/endurance, or boost your confidence, G-FIT offers adult group classes that will help you reach your goals.
                            </p>
                            <p className='aboutJumbotronBody'>
                              Our training foundation is based on creative interval workouts that provide a safe and upbeat envi- ronment. The G-fit team schedules monthly events, so we can all work toward a common goal, and strengthen our community outside of the gym.
                            </p>
                        </Col>
                    </Row>
                </Jumbotron>
            </div>
        )
    }
}

export default AboutLanding