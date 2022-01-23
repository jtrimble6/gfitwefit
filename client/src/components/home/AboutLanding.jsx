import React, { Component } from 'react';
import { Jumbotron, Row, Col, Button } from 'react-bootstrap'
import StartTrialModal from './StartTrialModal';

// CSS
import '../../css/home/aboutLanding.css'
// import logo from '../../css/images/aboutLandingLogo.png';

class AboutLanding extends Component {
    constructor(props) {
      super(props)

      this.state = {
        show: false,
        showConfirmation: false,
        submitting: false,
        acknowledged: false,
      }

      this.showModal = this.showModal.bind(this)
      this.closeModal = this.closeModal.bind(this)
      this.submitModal = this.submitModal.bind(this)
      this.handleCheckbox = this.handleCheckbox.bind(this)
      this.showConfirmationModal = this.showConfirmationModal.bind(this)
      this.closeConfirmationModal = this.closeConfirmationModal.bind(this)
    }
    
    showModal = () => {
      this.setState({
        show: true
      })
    }

    showConfirmationModal = () => {
      this.setState({
        show: false,
        showConfirmation: true
      })
    }

    closeConfirmationModal = () => {
      this.setState({
        showConfirmation: false
      })
    }

    closeModal = () => {
      this.setState({
        show: false,
        acknowledged: false
      })
    }

    submitModal = () => {
      this.setState({
        submitting: true
      })

      console.log("submitting form")

      let firstName = document.getElementById('firstname').value
      let lastName = document.getElementById('lastname').value
      let phone = document.getElementById('phone').value
      let email = document.getElementById('email').value

      console.log(firstName, lastName, phone, email, this.state.acknowledged)

      this.showConfirmationModal()
    }

    handleCheckbox = () => {
      this.setState({
        acknowledged: !this.state.acknowledged
      })
    }

    render() {                                                                  
        return (
            <div className='aboutLanding'>
              <StartTrialModal 
                show={this.state.show}
                showConfirmation={this.state.showConfirmation}
                showConfirmationModal={this.showConfirmationModal}
                showModal={this.showModal}
                closeModal={this.closeModal}
                closeConfirmationModal={this.closeConfirmationModal}
                submitModal={this.submitModal}
                handleCheckbox={this.handleCheckbox}
              />
                <Jumbotron className='aboutJumbotron'>
                    <Row>
                        <Col className='aboutJumbotronBodyColumn'>
                            <Row className='aboutJumbotronHeaderRow'>
                              <h1 className='aboutJumbotronHeaderPrimary'>LOOKING FOR A HAPPIER AND HEALTHIER LIFESTYLE?</h1>
                              <h1 className='aboutJumbotronHeaderSecondary'>FAMILY FOCUSED FITNESS</h1>
                            </Row>
                            <p className='aboutJumbotronBody'>
                            Gouveia Fitness “also known as G-FIT” is owned by brothers who love fitness, family, and community.  G-FIT’s training style incorporates creative interval workouts, boxing, games and community events that will help you lose weight, build muscle, boost your confidence for you AND your kids.
                            </p>
                            {/* <Button onClick={this.showModal} className='freeTrialButton'>START FREE TRIAL</Button> */}
                        </Col>
                    </Row>
                </Jumbotron>
            </div>
        )
    }
}

export default AboutLanding