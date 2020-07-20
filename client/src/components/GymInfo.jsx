import React, { Component } from 'react';
import '../css/gymInfo.css'
import { Row, Col } from 'react-bootstrap'
import logo from '../css/images/gymInfoLogo.jpg';

class GymInfo extends Component {

    render() {                                                                  
        return (
            <div className='gymInfo'>
                <Row className='gymInfoRow'>
                    <Col sm={6}>
                        <Row className='gymInfoHeaderRow'>
                            <h2 className='gymInfoHeaderLeft'>THE GYM/</h2> <h2 className='gymInfoHeaderRight'>/GET READY</h2> 
                        </Row>
                        <Row className='gymInfoAddressRow'>
                            <h2 className='gymInfoAddress'>
                              18515 OLD STATESVILLE ROAD
                            </h2>
                        </Row>
                        <Row className='gymInfoAddressRow gymInfoAddressRow2'>
                            <h2 className='gymInfoAddress gymInfoAddress2'>
                              CORNELIUS, NC 28031
                            </h2>
                        </Row>
                        <Row className='gymInfoBodyRow'>
                            <p className='gymInfoBody'>
                              Once you walk through our doors, you are considered family to us. Our top priority is to make sure you always have a safe and enjoyable experience with us at G-FIT.
                            </p>
                            <p className='gymInfoBody'>
                              Think you’re ready for a workout? Fill out <a className='gymInfoLink' href='/userSignup'>this form</a> and let us know you’re coming! Your first week is FREE. 
                            </p>
                        </Row>
                    </Col>
                    <Col sm={6}>
                        <img src={logo} className="gymInfoLogo" alt="logo" />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default GymInfo