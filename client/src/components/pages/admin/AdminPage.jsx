import React, { Component } from 'react'
// import { Redirect } from 'react-router-dom'
import API from '../../../utils/API'
import ReactTable from "react-table";
// import matchSorter from 'match-sorter'
import AdminBar from '../../nav/AdminBar'
import '../../../css/admin.css'
import 'react-table/react-table.css'
import AdminSignup from './AdminSignUp'
// import ExistingAccount from "../../alerts/ExistingAccount";
// import PasswordError from '../../alerts/PasswordError';



class AdminPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentSchedule: [],
            sortedSchedule: [],
            dayOfWeek: '',
            workout: '',
            times: '',
            username: '',
            password: '',
            confirmPassword: '',
            redirect: false,
            nameTaken: false,
            passwordError: false
          }

        this.getSchedule = this.getSchedule.bind(this)
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.orderSchedule = this.orderSchedule.bind(this)
    }

    

    componentDidMount() {
        this.getSchedule()
      }

    // setRedirect = () => {
    //     console.log("Redirect");
    //     this.setState({
    //       redirect: true
    //     })
    //   };

    // renderRedirect = () => {
    //     if (this.state.redirect) {
    //       return <Redirect to='/admin' />
    //     }
    //   };

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

    handleInputChange = event => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
      }

    handleFormSubmit = event => {
        this.setState({
            passwordError: false,
            nameTaken: false,
        })
        event.preventDefault();
        //console.log(this.state)
        let scheduleData = {
            dayOfWeek: this.state.dayOfWeek,
            workout: this.state.workout,
            times: this.state.times,
        };
        console.log('THE DATA: ', scheduleData);
          API.getSchedule(scheduleData.dayOfWeek)
          .then(res => {
            console.log(res)
            if (res.data[0]) {

                console.log("Day scheduled")

                // DELETE OLD DAY DATA
                API.deleteSchedule(scheduleData.dayOfWeek)
                  .then(res => {
                      console.log('DAY DELETED: ', res)
                    })
                  .catch(err => console.log(err))
                
                // SAVE NEW DAY DATA
                API.saveSchedule(scheduleData)
                .then(res => {
                    if (res.data) {
                        console.log("Successfully scheduled!")
                        this.setState({
                            dayOfWeek: '',
                            workout: '',
                            times: '',
                        })
                    } else {
                        console.log("schedule error")
                    }
                })
                .catch(error => { console.log(error) })
                
            } else {
                API.saveSchedule(scheduleData)
                .then(res => {
                    if (res.data) {
                        console.log("Successfully scheduled!")
                        this.setState({
                            dayOfWeek: '',
                            workout: '',
                            times: '',
                        })
                    } else {
                        console.log("schedule error")
                    }
                })
                .catch(error => { console.log(error) })
            }
        })
        window.location.reload()
      }
        

    render() {
      const schedule = this.state.sortedSchedule
      const columns = [{
        Header: 'Day of Week',
        headerClassName: 'scheduleHeaders',
        accessor: 'dayOfWeek',
        Cell: props => <span className='dayOfWeek'>{props.value}</span> 
      },{
        Header: 'Workout',
        headerClassName: 'scheduleHeaders',
        accessor: 'workout',
        Cell: props => <span className='workout'>{props.value}</span> 
      },{
        Header: 'Times',
        headerClassName: 'scheduleHeaders',
        accessor: 'times',
        Cell: props => <span className='times'>{props.value}</span> 
      },
    
    ]

        return (
            <div id="adminPage">
            <AdminBar />
            <h1>Admin Page</h1> <hr />
            <div className="row formRow">
            <div className="formContainer">    
                  <form className="formSignup" action="index.html">
                    <h2 className="formSignup-heading">Adjust Schedule</h2>
                      <div className="signupWrap">
                        <div className="form-group">
                            <label htmlFor="dayOfWeek">Day of Week</label>
                              <select
                                    name="dayOfWeek"
                                    value={this.state.sport}
                                    onChange={this.handleInputChange}
                                    type="text"
                                    className="form-control"
                                    id="dayOfWeek"                                       
                                >
                                <option value=''>Select One</option>
                                <option value='Monday'>Monday</option>
                                <option value='Tuesday'>Tuesday</option>
                                <option value='Wednesday'>Wednesday</option>
                                <option value='Thursday'>Thursday</option>
                                <option value='Friday'>Friday</option>
                                <option value='Saturday'>Saturday</option>
                              </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="workout">Workout</label>
                              <select
                                    name="workout"
                                    value={this.state.workout}
                                    onChange={this.handleInputChange}
                                    type="text"
                                    className="form-control"
                                    id="workout"                                       
                                >
                                <option value=''>Select One</option>
                                <option value='UPPER + BOXING'>UPPER + BOXING</option>
                                <option value='LOWER STRENGTH'>LOWER STRENGTH</option>
                                <option value='H.I.I.T + BOXING'>H.I.I.T + BOXING</option>
                                <option value='UPPER STRENGTH'>UPPER STRENGTH</option>
                                <option value='CARDIO + CORE'>CARDIO + CORE</option>
                              </select>
                        </div>
                        <div className="form-group">
                        <label htmlFor="workout">Times</label>
                              <select
                                    name="times"
                                    value={this.state.times}
                                    onChange={this.handleInputChange}
                                    type="text"
                                    className="form-control"
                                    id="times"                                       
                                >
                                <option value=''>Select One</option>
                                <option value='5:30am, 8am, 9:30am, 5:45pm'>5:30am, 8am, 9:30am, 5:45pm</option>
                                <option value='5:30am, 8am, 9:30am'>5:30am, 8am, 9:30am</option>
                                <option value='8am, 9:30am, 5:45pm'>8am, 9:30am, 5:45pm</option>
                                <option value='8am, 9:30am'>8am, 9:30am</option>
                              </select>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary submit"
                            onClick={this.handleFormSubmit}
                        >
                        Submit
                        </button>
                        </div>
                    </form>
                </div>
            </div>
            <hr />
            <div className="row scheduleRow">
              <ReactTable
                // filterable
                // defaultFilterMethod={(filter, row) =>
                //     String(row[filter.id]) === filter.value}
                data={schedule}
                resolveData={data => data.map(row => row)}
                columns={columns}
                className='scheduleTable'
              />
            </div>
            
            <AdminSignup 
            
            />

          </div>
        
        )
    };
};

export default AdminPage;
       