import React, { Component } from 'react';
import { Row, Col, Card } from 'react-bootstrap'
import Carousel from 'react-elastic-carousel'
import Item from "../general/Item"

// CSS 
import '../../css/home/goldOut.css'

class GoldOut extends Component {

    render() {  
        const breakPoints = [
            { width: 1, itemsToShow: 1 },
            { width: 550, itemsToShow: 2 },
            { width: 768, itemsToShow: 3 },
            { width: 1200, itemsToShow: 4 }
          ];                                                                
        return (
            <div className='goldOut'>
              <div className='goldOutSection'>
                <Row className='goldOutTitle'>
                    <h2 className='goldOutTitleLeft'>GOLD OUT/</h2><h2 className='goldOutTitleRight'>/GO FOR THE GOLD</h2>
                </Row>
                <Row className='goldOutRow1'>
                    <Col sm={8}>
                        <p>You can’t achieve greatness without setting a goal first. At the gym, we write our fitness goals down to hold ourselves accountable. Once we achieve that gold, we write over it in gold to celebrate how far we’ve come. Check out some golden stories from our family of members:</p>
                    </Col>
                    <Col sm={4}>
                      
                    </Col>
                </Row>
                <Row className='goldOutRow2'>
                    <Carousel className='goldOutCarousel' breakPoints={breakPoints}>

                        <Item>
                          <Card className='goldOutCard' style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Text className='goldOutCardText'>
                                    You can’t achieve a goal without setting one first. At the gym, we write our fitness goals down to hold ourselves accountable. Once we achieve that gold, we write over it in gold to celebrate how far we’ve come. Check out some golden stories from our family of members:
                                </Card.Text>
                                <Card.Title className='goldOutCardTitle'>
                                    MEMBER NAME
                                </Card.Title>
                                <Card.Subtitle className='mb-2 text-muted goldOutCardSubTitle'>
                                    JOINED THE FAMILY 2018
                                </Card.Subtitle>
                            </Card.Body>
                          </Card>
                        </Item>

                        <Item>
                          <Card className='goldOutCard' style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Text className='goldOutCardText'>
                                    You can’t achieve a goal without setting one first. At the gym, we write our fitness goals down to hold ourselves accountable. Once we achieve that gold, we write over it in gold to celebrate how far we’ve come. Check out some golden stories from our family of members:
                                </Card.Text>
                                <Card.Title className='goldOutCardTitle'>
                                    MEMBER NAME
                                </Card.Title>
                                <Card.Subtitle className='mb-2 text-muted goldOutCardSubTitle'>
                                    JOINED THE FAMILY 2018
                                </Card.Subtitle>
                            </Card.Body>
                          </Card>
                        </Item>

                        <Item>
                          <Card className='goldOutCard' style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Text className='goldOutCardText'>
                                    You can’t achieve a goal without setting one first. At the gym, we write our fitness goals down to hold ourselves accountable. Once we achieve that gold, we write over it in gold to celebrate how far we’ve come. Check out some golden stories from our family of members:
                                </Card.Text>
                                <Card.Title className='goldOutCardTitle'>
                                    MEMBER NAME
                                </Card.Title>
                                <Card.Subtitle className='mb-2 text-muted goldOutCardSubTitle'>
                                    JOINED THE FAMILY 2018
                                </Card.Subtitle>
                            </Card.Body>
                          </Card>
                        </Item>

                        <Item>
                          <Card className='goldOutCard' style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Text className='goldOutCardText'>
                                    You can’t achieve a goal without setting one first. At the gym, we write our fitness goals down to hold ourselves accountable. Once we achieve that gold, we write over it in gold to celebrate how far we’ve come. Check out some golden stories from our family of members:
                                </Card.Text>
                                <Card.Title className='goldOutCardTitle'>
                                    MEMBER NAME
                                </Card.Title>
                                <Card.Subtitle className='mb-2 text-muted goldOutCardSubTitle'>
                                    JOINED THE FAMILY 2018
                                </Card.Subtitle>
                            </Card.Body>
                          </Card>
                        </Item>

                        <Item>
                          <Card className='goldOutCard' style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Text className='goldOutCardText'>
                                    You can’t achieve a goal without setting one first. At the gym, we write our fitness goals down to hold ourselves accountable. Once we achieve that gold, we write over it in gold to celebrate how far we’ve come. Check out some golden stories from our family of members:
                                </Card.Text>
                                <Card.Title className='goldOutCardTitle'>
                                    MEMBER NAME
                                </Card.Title>
                                <Card.Subtitle className='mb-2 text-muted goldOutCardSubTitle'>
                                    JOINED THE FAMILY 2018
                                </Card.Subtitle>
                            </Card.Body>
                          </Card>
                        </Item>

                        <Item>
                          <Card className='goldOutCard' style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Text className='goldOutCardText'>
                                    You can’t achieve a goal without setting one first. At the gym, we write our fitness goals down to hold ourselves accountable. Once we achieve that gold, we write over it in gold to celebrate how far we’ve come. Check out some golden stories from our family of members:
                                </Card.Text>
                                <Card.Title className='goldOutCardTitle'>
                                    MEMBER NAME
                                </Card.Title>
                                <Card.Subtitle className='mb-2 text-muted goldOutCardSubTitle'>
                                    JOINED THE FAMILY 2018
                                </Card.Subtitle>
                            </Card.Body>
                          </Card>
                        </Item>

                    </Carousel>
                </Row>
              </div>
            </div>
        )
    }
}

export default GoldOut