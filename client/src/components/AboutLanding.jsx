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
                              Gouveia Fitness or G-Fit is a family owned gym run by two brothers who love fitness, family and community. Our training style incorporates creative interval workouts, boxing, games and community events that will help you lose weight, build muscle, boost your confidence and turn friends into family!
                            </p>
                            <p className='aboutJumbotronBody'>
                              We strongly believe that “as iron sharpens iron, so one man sharpens another” - Proverbs 27:17 ...because fitness isn’t just about you, it’s about a lifestyle and that affects all of us. We are in this journey with you! Let’s go! <strong className='gFitStrongLeft'> G FIT/</strong><strong className='gFitStrongRight'>/WE FIT</strong>. 
                            </p>
                        </Col>
                    </Row>
                </Jumbotron>
            </div>
        )
    }
}

export default AboutLanding