import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap'

// CSS
import '../css/pricing/pricingInfo.css'

class PricingInfo extends Component {

    render() {                                                                  
        return (
            <div className='pricingInfo'>
              <div className="pricingInfoSection">
                <Row className='pricingInfoRow'>
                    <Col sm={6}>
                        <Row className='pricingInfoHeaderRow'>
                            <h2 className='pricingInfoHeaderLeft'>PRICING/</h2> <h2 className='pricingInfoHeaderRight'>/HALF THE COST</h2> 
                        </Row>
                        <Row className='pricingInfoBodyRow'>
                            <p>
                              Fitness pricing can be confusing, that’s why we have simplified our pricing down to make it easy to understand. But the financial cost of your fitness goals are only half of the real cost. Time and commitment are possibly the most expensive part of your journey. But we promise that if you stick with it, you’ll thank yourself later.
                            </p>
                        </Row>
                    </Col>
                    <Col sm={6}>
                        
                    </Col>
                </Row>
                <Row className='pricingMembershipRow'>
                    <Col sm={5} className='pricingMembershipLeftColumn'>
                        <Row className='pricingMembershipHeaderRow'>
                            <h2 className='pricingMembershipHeaderLeftMain'>TRY IT OUT</h2>
                        </Row>
                        <Row className='pricingMembershipHeaderRow'>
                            <h2 className='pricingMembershipHeaderLeft'>NEW MEMBER OFFER/</h2> <h2 className='pricingMembershipHeaderRight'>/FREE</h2> 
                        </Row>
                        <Row className='pricingMembershipBodyRow'>
                            <p>
                              Your first week of classes are 100% on the house. All we ask is you let us know youre coming in advance!
                            </p>
                        </Row>
                    </Col>
                    <Col sm={5} className='pricingMembershipRightColumn'>
                        <Row className='pricingMembershipHeaderRow'>
                            <h2 className='pricingMembershipHeaderLeftMain'>REACH YOUR GOALS</h2>
                        </Row>
                        <Row className='pricingMembershipSubHeaderRow'>
                            <h2 className='pricingMembershipHeaderLeft'>
                              10 CLASS PACK/
                            </h2> 
                            <h2 className='pricingMembershipHeaderRight'>
                              /$99
                            </h2> 
                        </Row>
                        <Row className='pricingMembershipBodyRow'>
                            <p>
                              Take your time, these 10 classes never expire. This option is perfect for beginners.
                            </p>
                        </Row>
                        <Row className='pricingMembershipSubHeaderRow'>
                            <h2 className='pricingMembershipHeaderLeft'>
                              ONE MONTH UNLIMITED/
                            </h2> 
                            <h2 className='pricingMembershipHeaderRight'>
                              /$149
                            </h2> 
                        </Row>
                        <Row className='pricingMembershipBodyRow'>
                            <p>
                              Includes all the classes you can handle in one 30-day period.
                            </p>
                        </Row>
                    </Col>
                </Row>
              </div>
            </div>
        )
    }
}

export default PricingInfo