import React, { Component } from 'react'
import API from '../../utils/API'
import ReactTable from "react-table";
import Moment from 'moment'
import { Button } from 'react-bootstrap'

//CSS
import '../../css/admin/admin.css'
import 'react-table/react-table.css'

class AdminEditUsers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentUsers: [],
            sortedUsers: [],
            name: '',
            email: '',
            subscriptionStatus: '',
          }

        this.getUsers = this.getUsers.bind(this)
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.orderUsers = this.orderUsers.bind(this)
        this.handleEditUserSubscription = this.handleEditUserSubscription.bind(this)
    }

    

    componentDidMount() {
        this.getUsers()
      }

    getUsers = () => {
        API.getUsers()
          .then(res => {
              // console.log('SCHEDULE: ', res.data)
              this.setState({
                  currentUsers: res.data
              })
              this.orderUsers()
            //   console.log('THE CURRENT USERS: ',  this.state.currentUsers)
          })
          .catch(err => console.log(err))
      }  

    orderUsers = () => {
        let users = this.state.currentUsers
        // let newUsers = []
        // console.log('NEW SCHEDULE: ', newUsers)

        // let sortedUsers = newUsers.sort((a,b) => (a.signUpDate) - (b.signUpDate))
        let sortedUsers = users.sort((a,b) => new Moment(a.signUpDate).format('YYYYMMDD') - new Moment(b.signUpDate).format('YYYYMMDD'))

        console.log('SORTED USERS: ', sortedUsers)
        this.setState({
            sortedUsers: sortedUsers
        })
      }

    handleEditUserSubscription = (event) => {
        event.preventDefault()
        console.log('EDITING USER SUBSCRIPTION')
    }

    handleInputChange = event => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
      }

    handleFormSubmit = event => {
        this.setState({
        
        })
        event.preventDefault();
        //console.log(this.state)
        let userData = {

        };
        console.log('THE DATA: ', userData);
        
      }

    render() {
      const users = this.state.sortedUsers
      const columns = [{
        Header: 'Name',
        headerClassName: 'userHeaders',
        accessor: 'name',
        Cell: props => <span className='adminEditUsersFullName'>{props.original.firstName + ' ' + props.original.lastName}</span> 
      },{
        Header: 'Email',
        headerClassName: 'userHeaders',
        accessor: 'email',
        Cell: props => <span className='adminEditUsersEmail'>{props.value}</span> 
      },{
        Header: 'Subscription Status',
        headerClassName: 'userHeaders',
        accessor: 'paymentComplete',
        Cell: props => <span className='adminEditUsersSubscriptionStatus'>{props.value === true ? 'ACTIVE' : 'INACTIVE'} <Button className='adminEditUserSubscriptionButton' onClick={this.handleEditUserSubscription}>Change</Button></span> 
      },
    
    ]

        return (
          <div id="adminEditUsersPage">
            <div id="usersRow" className="row usersRow">
              <h2 className="adminEditUsersFormHeading">G-Fit Users</h2>
              <ReactTable
                // filterable
                // defaultFilterMethod={(filter, row) =>
                //     String(row[filter.id]) === filter.value}
                showPagination={false}
                pageSize={6}
                data={users}
                resolveData={data => data.map(row => row)}
                columns={columns}
                className='usersTable'
              />
            </div>
          </div>
        )
    };
};

export default AdminEditUsers;