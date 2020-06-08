import React, { Component } from 'react';
import '../css/tryItOutLanding.css'
import { Row, Col } from 'react-bootstrap'

class TryItOutLanding extends Component {

    render() {                                                                  
        return (
            <div className='tryItOutLanding'>
                <Row className='tryItOutInfoTitle'>
                    <h2 className='tryItOutInfoTitleLeft'>TRY US OUT/</h2><h2 className='tryItOutInfoTitleRight'>/COUCH TO GFIT</h2>
                </Row>
                <Row className='tryItOutInfoBodyRow'>
                    <Col sm={6}>
                        <p>
                            So, you’re not quite ready for a full G FIT class. That’s OK!
                        </p>
                        <p>
                            We know that a new gym/exercise style can be confusing, so we created this part of our website to get you started without the pressure of walking through the door. Try out one of the workout videos below that you can do in the comfort of your own home. This will help you get the feel of what our classes are like.
                        </p>
                        <p>
                        When you’re ready, come join us for one of our group classes and shake off the nerves of not knowing what to expect!
                        </p>
                    </Col>
                    <Col sm={6}>
                        
                    </Col>
                </Row>
            </div>
        )
    }
}

export default TryItOutLanding