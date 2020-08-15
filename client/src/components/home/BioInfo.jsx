import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap'

// CSS 
import '../../css/home/bioInfo.css'

class BioInfo extends Component {

    render() {                                                                  
        return (
            <div className='bioInfo'>
              <div className="bioInfoSection">
                <Row className='bioInfoImgRow'>
                  <div className="trainerBioCircleImg">
                    <img src={this.props.trainerImg} alt='' />
                  </div>
                </Row>
                <Row className='bioInfoRow'>
                    
                    <Col sm={6}>
                        <Row className='bioInfoHeaderRow'>
                            <h2 className='bioInfoHeaderLeft'>BIO/</h2> <h2 className='bioInfoHeaderRight'>/MEET THE STAFF</h2> 
                        </Row>
                        <Row className='bioInfoHeaderRow'>
                            <h2 className='bioInfoName'>{this.props.trainerName}</h2>
                        </Row>
                        <Row className='bioInfoBodyRow'>
                            <p>
                              {this.props.trainerBio}
                            </p>
                        </Row>
                    </Col>
                    <Col sm={6}>
                        
                    </Col>
                </Row>
                {/* <Row className='bioMembershipRow'>
                    
                </Row> */}
              </div>
            </div>
        )
    }
}

export default BioInfo