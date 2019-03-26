import React, { Component } from 'react';
import { Table } from 'reactstrap';
import API from '../../utils/API'
import '../../css/schedule.css'

class Schedule extends Component {
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
          console.log('SCHEDULE: ', res.data)
          this.setState({
              currentSchedule: res.data
          })
          this.orderSchedule()
          console.log('THE CURRENT SCHEDULE: ',  this.state.currentSchedule)
      })
      .catch(err => console.log(err))
}

orderSchedule = () => {
    let schedule = this.state.currentSchedule
    let newSchedule = []
    for (var g=0; g<schedule.length; g++) {
        let day = ''
        let data = schedule[g]
        console.log('THIS DAY: ', schedule[g].dayOfWeek)
        switch (schedule[g].dayOfWeek) {
            case 'Monday':
              day = 1;
              console.log('TODAY IS: ', day)
              break;
            case 'Tuesday':
               day = 2;
               console.log('TODAY IS: ', day)
              break;
            case 'Wednesday':
              day = 3;
              console.log('TODAY IS: ', day)
              break;
            case 'Thursday':
              day = 4;
              console.log('TODAY IS: ', day)
              break;
            case 'Friday':
              day = 5;
              console.log('TODAY IS: ', day)
              break;
            case 'Saturday':
              day = 6;
              console.log('TODAY IS: ', day)
              break;
            default: 
              day = "Monday";
              console.log('TODAY IS: ', day)
          }

        let scheduleData = {
            day: day,
            dayOfWeek: data.dayOfWeek,
            workout: data.workout,
            times: data.times
        }
        newSchedule.push(scheduleData)

    }

    console.log('NEW SCHEDULE: ', newSchedule)

    let sortedSchedule = newSchedule.sort((a,b) => (a.day) - (b.day))

    console.log('ORDERED SCHEDULE: ', sortedSchedule)
    this.setState({
        sortedSchedule: sortedSchedule
    })
}

    render() {
      let schedules = this.state.sortedSchedule          
      let uuidv4 = require('uuid')                                                       
        return (
        <div className='tableWorkouts'>
          <Table borderless>
            <thead>
            <tr>
              <th>DAY</th>
              <th>WORKOUT</th>
              <th>TIMES</th>
            </tr>
            </thead>
            <tbody>
              {
                schedules.map((schedule) => (
                  <tr key={uuidv4()}>
                    <td>{schedule.dayOfWeek}</td>
                    <td>{schedule.workout}</td>
                    <td>{schedule.times}</td>
                  </tr>
                ))
              }
            {/* <tr>
              <td>MONDAY</td>
              <td>UPPER + BOXING</td>
              <td>5:30AM, 8AM, 9:30AM, 5:45PM</td>
            </tr>
            <tr>
              <td>TUESDAY</td>
              <td>LOWER STRENGTH</td>
              <td>5:30AM, 8AM, 9:30AM, 5:45PM</td>
            </tr>
            <tr>
              <td>WEDNESDAY</td>
              <td>H.I.I.T + BOXING</td>
              <td>5:30AM, 8AM, 9:30AM, 5:45PM</td>
            </tr>
            <tr>
              <td>THURSDAY</td>
              <td>UPPER STRENGTH</td>
              <td>5:30AM, 8AM, 9:30AM, 5:45PM</td>
            </tr>
            <tr>
              <td>FRIDAY</td>
              <td>CARDIO + CORE</td>
              <td>5:30AM, 8AM, 9:30AM</td>
            </tr>
            <tr>
              <td>SATURDAY</td>
              <td>H.I.I.T + BOXING</td>
              <td>8AM, 9:30AM</td>
            </tr> */}
            </tbody>
          </Table>
        </div>
        )
    }
}

export default Schedule