import React, { Component } from 'react';
import API from '../../utils/API'
import { Row, Col, Button } from 'react-bootstrap'

// CSS
import '../../css/home/scheduleInfo.css'

class ScheduleInfo extends Component {
    constructor(props) {
        super(props) 
        this.state ={
          currentSchedule: [],
          sortedSchedule: [],
        }
        this.getSchedule = this.getSchedule.bind(this)
        this.orderSchedule = this.orderSchedule.bind(this)
      }
    
      componentDidMount() {
        this.getSchedule()
      }
    
      getSchedule = () => {
        API.getSchedules()
          .then(res => {
              // console.log('SCHEDULE: ', res.data)
              this.setState({
                  currentSchedule: res.data
              })
              this.orderSchedule()
              // console.log('THE CURRENT SCHEDULE: ',  this.state.currentSchedule)
          })
          .catch(err => console.log(err))
    }
    
    orderSchedule = () => {
        let schedule = this.state.currentSchedule
        let newSchedule = []
        for (var g=0; g<schedule.length; g++) {
            let day = ''
            let data = schedule[g]
            // console.log('THIS DAY: ', schedule[g].dayOfWeek)
            switch (schedule[g].dayOfWeek) {
                case 'Monday':
                  day = 1;
                  // console.log('TODAY IS: ', day)
                  break;
                case 'Tuesday':
                   day = 2;
                  //  console.log('TODAY IS: ', day)
                  break;
                case 'Wednesday':
                  day = 3;
                  // console.log('TODAY IS: ', day)
                  break;
                case 'Thursday':
                  day = 4;
                  // console.log('TODAY IS: ', day)
                  break;
                case 'Friday':
                  day = 5;
                  // console.log('TODAY IS: ', day)
                  break;
                case 'Saturday':
                  day = 6;
                  // console.log('TODAY IS: ', day)
                  break;
                default: 
                  day = "Monday";
                  // console.log('TODAY IS: ', day)
              }
    
            let scheduleData = {
                day: day,
                dayOfWeek: data.dayOfWeek,
                workout: data.workout,
                times: data.times
            }
            newSchedule.push(scheduleData)
    
        }
    
        // console.log('NEW SCHEDULE: ', newSchedule)
    
        let sortedSchedule = newSchedule.sort((a,b) => (a.day) - (b.day))
    
        // console.log('ORDERED SCHEDULE: ', sortedSchedule)
        this.setState({
            sortedSchedule: sortedSchedule
        })
    }

    render() {                
        let sortedSchedule = this.state.sortedSchedule                                                  
        return (
            <div className='scheduleInfo'>
              <div className='scheduleInfoSection'>
                <Row className='scheduleInfoTitle'>
                    <h2 className='scheduleInfoTitleLeft'>SCHEDULE/</h2><h2 className='scheduleInfoTitleRight'>/GO</h2>
                </Row>
                <Row className='scheduleInfoRow1'>
                    <Col sm={6}>
                        <p>
                          Never expect to get the same workout twice here! Each class is uniquely designed in order to keep your body guessing and help you get closer to your goals. No prior sign ups are required. Come on in whenever your schedule allows you too!
                        </p>
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
                            <p>
                                {
                                    sortedSchedule.length === 6 ? sortedSchedule[0].workout : 'TBD'
                                }
                            </p>
                            <p>
                                {
                                    sortedSchedule.length === 6 ? sortedSchedule[1].workout : 'TBD'
                                }
                            </p>
                            <p>
                                {
                                    sortedSchedule.length === 6 ? sortedSchedule[2].workout : 'TBD'
                                }
                            </p>
                            <p>
                                {
                                    sortedSchedule.length === 6 ? sortedSchedule[3].workout : 'TBD'
                                }
                            </p>
                            <p>
                                {
                                    sortedSchedule.length === 6 ? sortedSchedule[4].workout : 'TBD'
                                }
                            </p>
                            <p>
                                {
                                    sortedSchedule.length === 6 ? sortedSchedule[5].workout : 'TBD'
                                }
                            </p>
                        </Col>
                        <Col sm={6} className='scheduleTimeOfWorkout'>
                            <p>
                                {
                                    sortedSchedule.length === 6 ? sortedSchedule[0].times : 'TBD'
                                }
                            </p>
                            <p>
                                {
                                    sortedSchedule.length === 6 ? sortedSchedule[1].times : 'TBD'
                                }
                            </p>
                            <p>
                                {
                                    sortedSchedule.length === 6 ? sortedSchedule[2].times : 'TBD'
                                }
                            </p>
                            <p>
                                {
                                    sortedSchedule.length === 6 ? sortedSchedule[3].times : 'TBD'
                                }
                            </p>
                            <p>
                                {
                                    sortedSchedule.length === 6 ? sortedSchedule[4].times : 'TBD'
                                }
                            </p>
                            <p id='saturdayTime'>
                                {
                                    sortedSchedule.length === 6 ? sortedSchedule[5].times : 'TBD'
                                }
                            </p>
                        </Col>
                      </Row>
                    </Col>
                </Row>
                <Row className='scheduleInfoRow3'>
                    <Col sm={6}>
                      <p>
                        Not quite ready to try the G FIT experience? Check out our digital workouts. They will walk you through some of our most common exercises so you’ll feel like you’re prepared when you show up for class!
                      </p>
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