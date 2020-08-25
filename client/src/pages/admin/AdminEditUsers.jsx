import React, { Component } from 'react'
import API from '../../utils/API'
import ReactTable from "react-table";
import Moment from 'moment'
import { Button } from 'react-bootstrap'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

//CSS
import '../../css/admin/admin.css'
import 'react-table/react-table.css'

// ALERTS
import AdminCancelMembershipError from "../../components/alerts/AdminCancelMembershipError";
import AdminCancelMembershipSuccess from "../../components/alerts/AdminCancelMembershipSuccess";
import AdminUpdateMembershipError from '../../components/alerts/AdminUpdateMembershipError';
import AdminUpdateMembershipSuccess from '../../components/alerts/AdminUpdateMembershipSuccess.jsx';

class AdminEditUsers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentUsers: [],
            sortedUsers: [],
            name: '',
            email: '',
            selectedUser: '',
            subscriptionStatus: '',
            adminCancelMembershipError: false,
            adminCancelMembershipSuccess: false,
            adminUpdateMembershipError: false,
            adminUpdateMembershipSuccess: false
          }

        this.getUsers = this.getUsers.bind(this)
        this.getUserData = this.getUserData.bind(this)
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.orderUsers = this.orderUsers.bind(this)
        this.handleEditUserSubscription = this.handleEditUserSubscription.bind(this)
        this.toggleAdminSubscriptionModal = this.toggleAdminSubscriptionModal.bind(this)
        this.closeAdminSubscriptionModal = this.closeAdminSubscriptionModal.bind(this)
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

    getUserData = () => {
        let userId = this.state.selectedUser;
        console.log('USER ID: ', userId)
        this.toggleAdminSubscriptionModal()
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
        console.log('EDITING USER SUBSCRIPTION: ', event.target)
        let selectedUser = event.target.dataset.username
        let subscriptionStatus = event.target.dataset.subscriptionstatus
        this.setState({
          selectedUser: selectedUser,
          subscriptionStatus: subscriptionStatus
        }, () => {
          this.getUserData()
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
        
        })
        event.preventDefault();
        //console.log(this.state)
        let userData = {

        };
        console.log('THE DATA: ', userData);
        
      }

    toggleAdminSubscriptionModal = () => {
        this.setState({
          adminSubscriptionModal: !this.state.adminSubscriptionModal,
          adminCancelMembershipSuccess: false,
          adminCancelMembershipError: false
        });
      }

    closeAdminSubscriptionModal = () => {
        this.setState({
          adminSubscriptionModal: !this.state.adminSubscriptionModal,
          adminCancelMembershipSuccess: false,
          adminCancelMembershipError: false,
          adminUpdateMembershipError: false,
          adminUpdateMembershipSuccess: false
        }, () => {
          window.location.reload()
        });
      }

    render() {
      const users = this.state.sortedUsers
      const columns = [{
        Header: 'Name',
        headerClassName: 'userHeaders',
        accessor: 'name',
        Cell: props => <span className='adminEditUsersFullName'>{props.original.firstName + ' ' + props.original.lastName}</span> 
      },{
        Header: 'Username',
        headerClassName: 'userHeaders',
        accessor: 'username',
        Cell: props => <span className='adminEditUsersUsername'>{props.original.username}</span> 
      },{
        Header: 'Email',
        headerClassName: 'userHeaders',
        accessor: 'email',
        Cell: props => <span className='adminEditUsersEmail'>{props.value}</span> 
      },{
        Header: 'Subscription Status',
        headerClassName: 'userHeaders',
        accessor: 'paymentComplete',
        Cell: props => <span className='adminEditUsersSubscriptionStatus'>{props.value === true ? 'ACTIVE' : 'INACTIVE'} <Button data-username={props.original.username} data-subscriptionstatus={props.value} className='adminEditUserSubscriptionButton' onClick={this.handleEditUserSubscription}>Change</Button></span> 
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
            <Modal 
              isOpen={this.state.adminSubscriptionModal} 
              autoFocus={true}
              centered={true}
              size='lg'
              className='subscriptionModal'
            >
                <ModalHeader id='modalTitle'>
                  Manage User Subscription
                </ModalHeader>
                <ModalBody id='subscriptionModalBody' className='subscriptionModalBody'>
                  {this.state.selectedUser}'s status is currently {this.state.subscriptionStatus === 'true' ? 'ACTIVE' : 'INACTIVE'}.
                </ModalBody>
                <AdminCancelMembershipError
                  adminCancelMembershipError={this.state.adminCancelMembershipError}
                />
                <AdminCancelMembershipSuccess
                  adminCancelMembershipSuccess={this.state.adminCancelMembershipSuccess}
                />
                <AdminUpdateMembershipError
                  adminUpdateMembershipError={this.state.adminUpdateMembershipError}
                />
                <AdminUpdateMembershipSuccess
                  adminUpdateMembershipSuccess={this.state.adminUpdateMembershipSuccess}
                />
                <ModalFooter>
                  <Button id='adminManageMembershipCloseButton' color="secondary" onClick={this.closeAdminSubscriptionModal}>Close</Button>
                </ModalFooter>
              </Modal>
          </div>
        )
    };
};

export default AdminEditUsers;