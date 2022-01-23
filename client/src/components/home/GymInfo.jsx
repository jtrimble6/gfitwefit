import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap'
import logo from '../../css/images/gymInfoLogo.jpg';

// CSS 
import '../../css/home/gymInfo.css'

class GymInfo extends Component {

    render() {                                                                  
        return (
            <div className='gymInfo'>
                <Row className='gymInfoRow'>
                    <div className='gymInfoLogoCol'>
                        <img src={logo} className="gymInfoLogo" alt="Gym Info Logo" />
                    </div>
                    <div className='gymInfoDetailsCol'>
                        <Row className='gymInfoDetailsRow'>
                            <h1 className='gymInfoDetailsHeader'>CREATIVE AND ENERGIZING WORKOUTS</h1>
                            <p className='gymInfoDetailsBody'>60 minute workouts that create a challenging and safe environment that is designed for ALL fitness levels and ALL ages wherever you may be on your fitness journey.</p>
                        </Row>
                        <Row className='gymInfoDetailsRow'>
                            <h1 className='gymInfoDetailsHeader'>BOXING/KICKBOXING TRAINING</h1>
                            <p className='gymInfoDetailsBody'>For three days of the week we implement boxing/kickboxing training to our workouts to keep it fun and engaging while burning lots of calories. We teach basic combos and moves to make it easy for everyone to learn even if you have never boxed before.</p>
                        </Row>
                        <Row className='gymInfoDetailsRow'>
                            <h1 className='gymInfoDetailsHeader'>KIDS SPEED AND STRENGTH CAMPS</h1>
                            <p className='gymInfoDetailsBody'>We help young athletes to become faster, stronger, build confidence, and create a foundation of fitness they will use for a lifetime!</p>
                        </Row>
                        <Row className='gymInfoDetailsRow'>
                            <h1 className='gymInfoDetailsHeader'>COMMUNITY EVENTS</h1>
                            <p className='gymInfoDetailsBody'>We not only sweat together, but we do LIFE together. Our monthly events include 5ks, barbeques, outreach opportunities, and other fun activities.</p>
                        </Row>
                    </div>
                </Row>
            </div>
        )
    }
}

export default GymInfo