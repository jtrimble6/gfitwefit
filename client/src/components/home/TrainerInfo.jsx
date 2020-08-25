import React, { Component } from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'

// CSS
import '../../css/home/trainerInfo.css'
import walt from '../../css/images/headshots/Walt.jpg'
import kyle from '../../css/images/headshots/Kyle.jpg'
import jenn from '../../css/images/headshots/Jenn.jpeg'
import jacob from '../../css/images/headshots/Jacob2.jpg'

class TrainerInfo extends Component {

    render() {                                                                  
        return (
            <div className='trainerInfo'>
                <Row className='trainerInfoRow'>
                  <h2 className='trainerInfoHeaderLeft'>OUR STAFF/</h2> <h2 className='trainerInfoHeaderRight'>/GET SET</h2> 
                </Row>
                  <Row className='trainerBioRow'>
                      {/* TRAINER BIO 1 */}
                      <Col sm-6='true' className='trainerBioCardColumn'>
                        <Card className='trainerBioCard'>
                          <Card.Img className='trainerBioImage' variant="top" src={walt} alt="Walt Gouveia" />
                          <Card.Body>
                              <Card.Title className='trainerBioTitle'>WALT GOUVEIA</Card.Title>
                              <Card.Subtitle className='trainerBioSubtitle'>OWNER + TRAINER</Card.Subtitle>
                              <Button href='/' className='trainerBioButton'>BIO //</Button>
                              {/* <Button href='/bioPage?trainer=walt' className='trainerBioButton'>BIO //</Button> */}
                          </Card.Body>
                        </Card>
                      </Col>

                      {/* TRAINER BIO 2 */}
                      <Col sm-6='true' className='trainerBioCardColumn'>
                        <Card className='trainerBioCard'>
                          <Card.Img className='trainerBioImage' variant="top" src={kyle} alt="Kyle Gouveia" />
                          <Card.Body>
                              <Card.Title className='trainerBioTitle'>KYLE GOUVEIA</Card.Title>
                              <Card.Subtitle className='trainerBioSubtitle'>OWNER + TRAINER</Card.Subtitle>
                              <Button href='/' className='trainerBioButton'>BIO //</Button>
                              {/* <Button href='/bioPage?trainer=kyle' className='trainerBioButton'>BIO //</Button> */}
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>

                    <Row className='trainerBioRow'>
                    {/* TRAINER BIO 3 */}
                    <Col sm-6='true' className='trainerBioCardColumn'>
                      <Card className='trainerBioCard'>
                        <Card.Img className='trainerBioImage' variant="top" src={jenn} alt="Jennifer Coleman"/>
                        <Card.Body>
                            <Card.Title className='trainerBioTitle'>JENNIFER COLEMAN</Card.Title>
                            <Card.Subtitle className='trainerBioSubtitle'>TRAINER</Card.Subtitle>
                            <Button href='/' className='trainerBioButton'>BIO //</Button>
                            {/* <Button href='/bioPage?trainer=jenn' className='trainerBioButton'>BIO //</Button> */}
                        </Card.Body>
                      </Card>
                    </Col>

                    {/* TRAINER BIO 4 */}
                    <Col sm-6='true' className='trainerBioCardColumn'>
                      <Card className='trainerBioCard'>
                        <Card.Img className='trainerBioImage' variant="top" src={jacob} alt="Jacob Erdtmann" />
                        <Card.Body>
                            <Card.Title className='trainerBioTitle'>JACOB ERDTMANN</Card.Title>
                            <Card.Subtitle className='trainerBioSubtitle'>TRAINER</Card.Subtitle>
                            <Button href='/' className='trainerBioButton'>BIO //</Button>
                            {/* <Button href='/bioPage?trainer=jacob' className='trainerBioButton'>BIO //</Button> */}
                        </Card.Body>
                      </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default TrainerInfo