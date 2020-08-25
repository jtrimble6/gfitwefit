import React, { Component } from 'react'
import API from '../../utils/API'
import ReactTable from "react-table";

//CSS
import '../../css/admin/admin.css'
import 'react-table/react-table.css'

class AdminScheduleEditor extends Component {
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
            passwordError: false,
            currentScheduleShowing: false
          }

        this.getSchedule = this.getSchedule.bind(this)
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.orderSchedule = this.orderSchedule.bind(this)
        this.handleCurrentScheduleShowHide = this.handleCurrentScheduleShowHide.bind(this)
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

            // Set day of week for ordering
            switch (schedule[g].dayOfWeek) {
                case 'Monday':
                  day = 1;
                  break;
                case 'Tuesday':
                   day = 2;
                  break;
                case 'Wednesday':
                  day = 3;
                  break;
                case 'Thursday':
                  day = 4;
                  break;
                case 'Friday':
                  day = 5;
                  break;
                case 'Saturday':
                  day = 6;
                  break;
                default: 
                  day = "Monday";
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

                console.log("Day already scheduled")

                // DELETE OLD DAY DATA
                API.deleteSchedule(scheduleData.dayOfWeek)
                  .then(res => {
                      console.log('DAY DELETED: ', res)
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
                    })
                  .catch(err => console.log(err))
                
                
                
            } else {
                API.saveSchedule(scheduleData)
                .then(res => {
                    if (res.data) {
                        console.log("Successfully scheduled!", res.data)
                        this.setState({
                            dayOfWeek: '',
                            workout: '',
                            times: '',
                        })
                        window.location.reload()
                    } else {
                        console.log("schedule error")
                    }
                })
                .catch(error => { console.log(error) })
            }
        })
        
        
      }
        
    handleCurrentScheduleShowHide = (event) => {
        event.preventDefault()
        let currentScheduleShowing = this.state.currentScheduleShowing
        if (currentScheduleShowing) {
            // console.log('HIDING FILTER')
            document.getElementById('scheduleRow').style.display = 'none'    
            document.getElementById('adminShowHideCurrentScheduleButton').innerHTML = 'Show Current Schedule'     
            this.setState({
              currentScheduleShowing: false
            })
        } else {
            // console.log('SHOWING FILTER')
            document.getElementById('scheduleRow').style.display = 'block'   
            document.getElementById('adminShowHideCurrentScheduleButton').innerHTML = 'Hide Current Schedule' 
            this.setState({
              currentScheduleShowing: true
            })
        }
            
      }

    render() {
      const schedule = this.state.sortedSchedule
      const columns = [{
        Header: 'Day',
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
          <div id="schedulePage">
            <div className="row scheduleFormRow">
              <div className="scheduleFormContainer">    
                  <form className="scheduleForm" action="index.html">
                    <h2 className="adminScheduleFormHeading">Adjust Schedule</h2>
                      <div className="scheduleFormSelectors">
                        <div className="form-group">
                            <label htmlFor="dayOfWeek">Day</label>
                              <select
                                    name="dayOfWeek"
                                    value={this.state.dayOfWeek}
                                    onChange={this.handleInputChange}
                                    type="text"
                                    className="form-control"
                                    id="dayOfWeek"   
                                    aria-label='Day of Week'                                    
                                >
                                <option value=''>Select One</option>
                                <option value='Monday'>MONDAYS</option>
                                <option value='Tuesday'>TUESDAYS</option>
                                <option value='Wednesday'>WEDNESDAYS</option>
                                <option value='Thursday'>THURSDAYS</option>
                                <option value='Friday'>FRIDAYS</option>
                                <option value='Saturday'>SATURDAYS</option>
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
                                    aria-label='Type of Workout'                            
                                >
                                <option value=''>Select One</option>
                                <option value='UPPER BODY//BOXING'>UPPER BODY//BOXING</option>
                                <option value='LOWER BODY//STRENGTH'>LOWER BODY//STRENGTH</option>
                                <option value='H.I.I.T.//BOXING'>H.I.I.T.//BOXING</option>
                                <option value='UPPER BODY//STRENGTH'>UPPER BODY//STRENGTH</option>
                                <option value='CARDIO//CORE'>CARDIO//CORE</option>
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
                                aria-label='Workout Times'                              
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
                          className="adminSubmitButton"
                          onClick={this.handleFormSubmit}
                        >
                          Change Schedule
                        </button> <br />
                        <button
                          type="submit"
                          id="adminShowHideCurrentScheduleButton"
                          className="adminShowHideCurrentScheduleButton"
                          onClick={this.handleCurrentScheduleShowHide}
                        >
                          Show Current Schedule
                        </button>
                        </div>
                    </form>
                </div>
            </div>
            <div id="scheduleRow" className="row scheduleRow">
              <h2 className="adminScheduleFormHeading">Current Schedule</h2>
              <ReactTable
                // filterable
                // defaultFilterMethod={(filter, row) =>
                //     String(row[filter.id]) === filter.value}
                showPagination={false}
                pageSize={6}
                data={schedule}
                resolveData={data => data.map(row => row)}
                columns={columns}
                className='scheduleTable'
              />
            </div>
          </div>
        )
    };
};

export default AdminScheduleEditor;