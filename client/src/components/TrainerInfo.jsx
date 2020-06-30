import React, { Component } from 'react'
import '../css/trainerInfo.css'
import { Row, Col, Card, Button } from 'react-bootstrap'
import walt from '../css/images/headshots/Walt.jpg'
import kyle from '../css/images/headshots/Kyle.jpg'
import jenn from '../css/images/headshots/Jenn.jpeg'
import jacob from '../css/images/headshots/Jacob.jpg'

class TrainerInfo extends Component {

    render() {                                                                  
        return (
            <div className='trainerInfo'>
                <Row className='trainerInfoRow'>
                  <h2 className='trainerInfoHeaderLeft'>OUR STAFF/</h2> <h2 className='trainerInfoHeaderRight'>/GET SET</h2> 
                </Row>
                <Row className='trainerBioRow'>
                    {/* TRAINER BIO 1 */}
                    <Col sm className='trainerBioCardColumn'>
                      <Card className='trainerBioCard'>
                        <Card.Img className='trainerBioImage' variant="top" src={walt} />
                        <Card.Body>
                            <Card.Title className='trainerBioTitle'>WALT GOUVEIA</Card.Title>
                            <Card.Subtitle className='trainerBioSubtitle'>OWNER + TRAINER</Card.Subtitle>
                            <Button className='trainerBioButton'>BIO //</Button>
                        </Card.Body>
                      </Card>
                    </Col>

                    {/* TRAINER BIO 2 */}
                    <Col sm className='trainerBioCardColumn'>
                      <Card className='trainerBioCard'>
                        <Card.Img className='trainerBioImage' variant="top" src={kyle} />
                        <Card.Body>
                            <Card.Title className='trainerBioTitle'>KYLE GOUVEIA</Card.Title>
                            <Card.Subtitle className='trainerBioSubtitle'>OWNER + TRAINER</Card.Subtitle>
                            <Button className='trainerBioButton'>BIO //</Button>
                        </Card.Body>
                      </Card>
                    </Col>

                    {/* TRAINER BIO 3 */}
                    <Col sm className='trainerBioCardColumn'>
                      <Card className='trainerBioCard'>
                        <Card.Img className='trainerBioImage' variant="top" src={jenn} />
                        <Card.Body>
                            <Card.Title className='trainerBioTitle'>JENNIFER COLEMAN</Card.Title>
                            <Card.Subtitle className='trainerBioSubtitle'>TRAINER</Card.Subtitle>
                            <Button className='trainerBioButton'>BIO //</Button>
                        </Card.Body>
                      </Card>
                    </Col>

                    {/* TRAINER BIO 4 */}
                    <Col sm className='trainerBioCardColumn'>
                      <Card className='trainerBioCard'>
                        <Card.Img className='trainerBioImage' variant="top" src={jacob} />
                        <Card.Body>
                            <Card.Title className='trainerBioTitle'>JACOB ERDTMANN</Card.Title>
                            <Card.Subtitle className='trainerBioSubtitle'>TRAINER</Card.Subtitle>
                            <Button className='trainerBioButton'>BIO //</Button>
                        </Card.Body>
                      </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default TrainerInfo