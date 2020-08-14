import React, { Component } from 'react';
import { Row } from 'react-bootstrap'

// CSS
import '../../css/home/bioLanding.css'

class BioLanding extends Component {

    render() {                                                                  
        return (
            <div className='bioLanding'>
                <Row className='bioInfoImgRow'>
                  <div className="trainerBioCircleImg">
                    <img src={this.props.trainerImg} alt='' />
                  </div>
                </Row>
            </div>
        )
    }
}

export default BioLanding