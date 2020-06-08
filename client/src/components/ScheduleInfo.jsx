import React, { Component } from 'react';
import '../css/scheduleInfo.css'
import { Row, Col, Button } from 'react-bootstrap'

class ScheduleInfo extends Component {

    render() {                                                                  
        return (
            <div className='scheduleInfo'>
              <div className='scheduleInfoSection'>
                <Row className='scheduleInfoTitle'>
                    <h2 className='scheduleInfoTitleLeft'>SCHEDULE/</h2><h2 className='scheduleInfoTitleRight'>/GO</h2>
                </Row>
                <Row className='scheduleInfoRow1'>
                    <Col sm={6}>
                        <p>Hate not knowing what to do when you go to the gym? We’ve done all the work for you. Every day the workout changes, we target a specific area of the body and put together a high energy work out to keep you on your toes.</p>
                    </Col>
                    <Col sm={6}>
                        
                    </Col>
                </Row>
                <Row className='scheduleInfoRow2'>
                    <Col sm className='scheduleInfoColumn' >
                      <Row>
                        <Col sm={3} className='scheduleDaysOfWeek'>
                            <p>MONDAYS</p>
                            <p>TUESDAYS</p>
                            <p>WEDNESDAYS</p>
                            <p>THURSDAYS</p>
                            <p>FRIDAYS</p>
                            <p>SATURDAYS</p>
                        </Col>
                        <Col sm={3} className='scheduleTypeOfWorkout'>
                            <p>UPPER BODY//BOXING</p>
                            <p>LOWER BODY//STRENGTH</p>
                            <p>H.I.I.T.//BOXING</p>
                            <p>UPPER BODY//STRENGTH</p>
                            <p>CARDIO//CORE</p>
                            <p>H.I.I.T.//BOXING</p>
                        </Col>
                        <Col sm={6} className='scheduleTimeOfWorkout'>
                            <p>5:30am, 8am, 9:30am, 5:45pm</p>
                            <p>5:30am, 8am, 9:30am, 5:45pm</p>
                            <p>5:30am, 8am, 9:30am, 5:45pm</p>
                            <p>5:30am, 8am, 9:30am, 5:45pm</p>
                            <p>5:30am, 8am, 9:30am</p>
                            <p>8am, 9:30am</p>
                        </Col>
                      </Row>
                    </Col>
                </Row>
                <Row className='scheduleInfoRow3'>
                    <Col sm={6}>
                      <p>Not quite ready to try the GFit experience? No worries, we’ve got you covered. Check out our digital workouts. They will walk you through some of our most common exercises so you’ll feel like a pro when you show up for class!</p>
                    </Col>
                    <Col sm={6}>
                        
                    </Col>
                </Row>
                <Row className='scheduleInfoRow4'>
                    <Button href='/tryitout' className='scheduleInfoButton'>
                        TRY IT OUT
                    </Button>
                </Row>
              </div>
            </div>
        )
    }
}

export default ScheduleInfo