import React, { Component } from 'react'
// import UserBar from '../../components/nav/UserBar'
import axios from 'axios'
import moment from 'moment'
import API from '../../utils/API'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

// COMPONENTS
import UserEditProfile from './UserEditProfile.jsx'
import ManageUserConvergeLightbox from '../../components/user/ManageUserConvergeLightbox'

// CSS
import '../../css/user/user.css'

// ALERTS
import UserCancelMembershipError from "../../components/alerts/UserCancelMembershipError";
import UserCancelMembershipSuccess from "../../components/alerts/UserCancelMembershipSuccess";
import UserUpdateMembershipError from '../../components/alerts/UserUpdateMembershipError';
import UserUpdateMembershipSuccess from '../../components/alerts/UserUpdateMembershipSuccess';


const normalizeInput = (value, previousValue) => {
  // console.log('normalizing input')
  if (!value) return value;
  const currentValue = value.replace(/[^\d]/g, '');
  const cvLength = currentValue.length;
  
  if (!previousValue || value.length > previousValue.length) {
    if (cvLength < 4) return currentValue;
    if (cvLength < 7) return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`;
    return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3, 6)}-${currentValue.slice(6, 10)}`;
  }
  };

class UserProfilePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            env: 'PRODUCTION',
            userSubscriptionModal: false,
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            error: '',
            username: '',
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: '',
            height: '',
            weight: '',
            gender: '',
            dob: '',
            paymentComplete: false,
            paymentRefNumber: '',
            paymentTxnId: '',
            paymentDate: '',
            paymentCard: '',
            subscriptionStatus: '',
            lastPaymentDate: '',
            autoRenewDate: '',
            phoneError: false,
            emailError: false,
            passwordError: false,
            passwordMatchError: false,
            sessionID: '',
            workoutCategory: null,
            fitnessLevel: null,
            equipmentNeeded: null,
            updateUserInfoSuccess: false,
            updateUserInfoError: false,
            updateUserPreferencesSuccess: false,
            updateUserPreferencesError: false,
            updateUserPasswordSuccess: false,
            updateUserPasswordError: false,
            updateUserPasswordServerError: false,
            userCancelMembershipError: false,
            userCancelMembershipSuccess: false,
            userUpdateMembershipError: false,
            userUpdateMembershipSuccess: false

        }
        this.scrollTop = this.scrollTop.bind(this)
        this.getUserData = this.getUserData.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleRadioChange = this.handleRadioChange.bind(this)
        this.handlePhoneChange = this.handlePhoneChange.bind(this)
        this.checkEmail = this.checkEmail.bind(this)
        this.handleUserPersonalInfoChange = this.handleUserPersonalInfoChange.bind(this)
        this.handleFilterReset = this.handleFilterReset.bind(this)
        this.handleSetPreferences = this.handleSetPreferences.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleOldPasswordChange = this.handleOldPasswordChange.bind(this)
        this.checkNewPassword = this.checkNewPassword.bind(this)
        this.checkOldPassword = this.checkOldPassword.bind(this)
        this.handleUpdatePassword = this.handleUpdatePassword.bind(this)
        this.handleUserManageSubscription = this.handleUserManageSubscription.bind(this)
        this.handleUserCancellation = this.handleUserCancellation.bind(this)
        this.toggleUserSubscriptionModal = this.toggleUserSubscriptionModal.bind(this)
        this.closeUserSubscriptionModal = this.closeUserSubscriptionModal.bind(this)
        this.handleUserSubscribe = this.handleUserSubscribe.bind(this)
        this.handleConvergePay = this.handleConvergePay.bind(this)
        this.handleLightboxInit = this.handleLightboxInit.bind(this)
        this.setClockRef = this.setClockRef.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.pauseTimer = this.pauseTimer.bind(this);
        this.convergeCountdownComplete = this.convergeCountdownComplete.bind(this)
        this.handleConvergePayRetry = this.handleConvergePayRetry.bind(this)
        this.handleLightboxInitRetry = this.handleLightboxInitRetry.bind(this)
        this.handleSubscriptionSubmit = this.handleSubscriptionSubmit.bind(this)
    }

    componentDidMount() {
        // console.log('User Sign Up Ready')
        this.scrollTop()
        this.getUserData()
        this.setClockRef()
      }

    scrollTop() {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }

    getUserData = () => {
        let userId = localStorage.getItem('user');
        console.log('USER ID: ', userId)
        API.getUser(userId)
            .then(res => {
                // console.log(res.data[0])
                let user = res.data[0]

                // CHECK LAST PAYMENT DATE IS CURRENT
                let subscriptionStatus = false
                let lastPaymentDate = 'N/A'
                let lastPaymentDateLife = ''
                if(user.paymentComplete) {
                  let lastPaymentDateConverted = moment(user.paymentDate).format('MM/DD/YYYY')
                  lastPaymentDateLife = moment(lastPaymentDateConverted).add(1, 'months').calendar()
                  let todaysDate = moment().format('MM/DD/YYYY')
                  let lastPaymentDateCurrent = lastPaymentDateLife >= todaysDate
                  subscriptionStatus = lastPaymentDateCurrent ? true : false
                  lastPaymentDate = lastPaymentDateCurrent ? lastPaymentDateConverted : 'N/A'
                  // console.log('Today: ', todaysDate, 'Payment life ends: ', lastPaymentDateLife, 'Payment current? ', lastPaymentDateCurrent)
                }
                
                //CHECK USER PREFERENCES
                let userPreferences = user.videoFilterPreferences ? user.videoFilterPreferences : {
                  workoutCategory: null,
                  fitnessLevel: null,
                  equipmentNeeded: null
                }
                let workoutCategory = null
                let fitnessLevel = null
                let equipmentNeeded = null

                if (userPreferences.workoutCategory !== null) {
                  workoutCategory = userPreferences.workoutCategory
                }
                if (userPreferences.fitnessLevel !== null) {
                  fitnessLevel = userPreferences.fitnessLevel
                }
                if (userPreferences.equipmentNeeded !== null) {
                  equipmentNeeded = userPreferences.equipmentNeeded
                }

                this.setState({
                  firstName: user.firstName,
                  lastName: user.lastName,
                  gender: user.gender,
                  email: user.email,
                  phoneNumber: user.phoneNumber,
                  username: user.username,
                  subscriptionStatus: subscriptionStatus,
                  lastPaymentDate: lastPaymentDate,
                  autoRenewDate: lastPaymentDateLife,
                  workoutCategory: workoutCategory,
                  fitnessLevel: fitnessLevel,
                  equipmentNeeded: equipmentNeeded,
                  paymentCard: user.paymentCard
                })
            })
            .catch(err => {
                console.log(err)
            })
      }

    checkEmail = (event) => {
        const {name, value} = event.target
        this.setState({
          [name]: value,
          stepOneFieldError: false,
          changeStepError: false
        }) 
  
        // Verify email address is valid
        let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
        if ( re.test(value) ) {
          // VALID EMAIL
          console.log('EMAIL VALUE: ', value)
          this.setState({
            emailError: false,
          })
        }
        else {
          // INVALID EMAIL
          console.log('PLEASE ENTER A VALID EMAIL ADDRESS')
          this.setState({
            emailError: true
          })
        }

           
  
      }

    handleChange(event) {
        const {name, value} = event.target
        this.setState({
          [name]: value,  
          updateUserInfoSuccess: false,
          updateUserInfoError: false
        })    
      }

    handleRadioChange = ev => {
        const { name, value } = ev.target
        this.setState({
            [name]: value,
            updateUserPreferencesSuccess: false,
            updateUserPreferencesError: false
        })
      }
    
    handlePhoneChange ({ target: { value } }) {
        this.setState({
          stepOneFieldError: false,
          changeStepError: false
        })    
        this.setState(prevState=> ({ phoneNumber: normalizeInput(value, prevState.phoneNumber) }));
        if (value.length !== 14) {
          this.setState({
            phoneError: true
          })
        } else {
          this.setState({
            phoneError: false
          })
        }
      }

    handleFilterReset = (event) => {
        event.preventDefault()
        this.setState({
            equipmentNeeded: null,
            fitnessLevel: null, 
            workoutCategory: null
        })
      }

    handlePref = (event) => {
        event.preventDefault()
        // debugger;
        // this.scrollTop()
        console.log('User changing info')
      
        //console.log(this.state)
        let userData = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber,
        };
        console.log(userData);

        // SAVE NEW USER
        // API.saveUser(userData)
        //   .then(res => {
        //       console.log(res)
        //       if (res.data) {
        //           console.log("Successful signup!")
        //           this.handleFinalStep()
        //       } else {
        //           console.log("Signup error")
        //       }
        //   })
        //   .catch(error => {
        //       console.log(error)
        //   })
        
      }

    handleSetPreferences = (event) => {
        event.preventDefault()
        console.log('User setting preferences')
        console.log(this.state.equipmentNeeded, this.state.fitnessLevel, this.state.workoutCategory)
        let userId = localStorage.getItem('user');
        let userPreferences = {
          'equipmentNeeded': this.state.equipmentNeeded, 
          'fitnessLevel': this.state.fitnessLevel, 
          'workoutCategory': this.state.workoutCategory
        }

        API.updateUserPreferences(userId, userPreferences)
          .then(res => {
              console.log(res)
              if (res.data) {
                console.log("Successfully updated user preferences!")
                this.setState({
                  updateUserPreferencesSuccess: true,
                  updateUserPreferencesError: false,
                }, () => {
                  this.getUserData()
                })
              } else {
                console.log("Error updating user preferences.")
                this.setState({
                  updateUserPreferencesSuccess: false,
                  updateUserPreferencesError: true,
                }, () => {
                  this.getUserData()
                })
              }
          })
          .catch(error => {
              console.log(error)
          })
      }

    handlePasswordChange = (event) => {
        const {name, value} = event.target
          this.setState({
            [name]: value,
            confirmNewPassword: '',
            passwordError: false,
            passwordMatchError: false
          })    
      }

    handleOldPasswordChange = (event) => {
        const {name, value} = event.target
          this.setState({
            [name]: value,
            updateUserPasswordSuccess: false,
            updateUserPasswordError: false
          })    
      }

    checkOldPassword = () => {
      // CONFIRM NEW PASSWORD MATCH ON BOTH ENTRIES
      if (this.state.passwordError) {
        this.setState({
          passwordMatchError: true
        })
        return
      }

      let userId = localStorage.getItem('user');
      let newPassword = { newPassword: this.state.newPassword }
      
      let userData = {
        username: this.state.username,
        password: this.state.oldPassword
      }
      console.log(userData)

      API.updateUserPassword(userId, newPassword)
        .then(response => {
          if (response.status === 200) {
            console.log('THE USER PASSWORD HAS BEEN UPDATED SUCCESSFULLY')
            console.log('RESPONSE: ', response)
            this.setState({
              updateUserPasswordSuccess: true,
              oldPassword: '',
              newPassword: '',
              confirmNewPassword: ''
            }, () => {
              this.getUserData()
            })
          }
        })
        .catch(error => {
          this.setState({
            updateUserPasswordServerError: true,
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: ''
          })
          console.log('Error updating user password: ', error)
        })
      
      // API.loginUser(userData)
      //     .then(response => {
      //       if (response.status === 200) {
      //           console.log('Authenticated!')
      //           console.log('THE OLD PASSWORD IS CORRECT')
      //           this.setState({
      //             updateUserPasswordError: false,
      //           }, () => {
      //             console.log('User Id: ', userId, 'New Password: ', newPassword)
      //             API.updateUserPassword(userId, newPassword)
      //               .then(response => {
      //                 if (response.status === 200) {
      //                   console.log('THE USER PASSWORD HAS BEEN UPDATED SUCCESSFULLY')
      //                   console.log('RESPONSE: ', response)
      //                   this.setState({
      //                     updateUserPasswordSuccess: true,
      //                     oldPassword: '',
      //                     newPassword: '',
      //                     confirmNewPassword: ''
      //                   }, () => {
      //                     this.getUserData()
      //                   })
      //                 }
      //               })
      //               .catch(error => {
      //                 this.setState({
      //                   updateUserPasswordServerError: true,
      //                   oldPassword: '',
      //                   newPassword: '',
      //                   confirmNewPassword: ''
      //                 })
      //                 console.log('Error updating user password: ', error)
      //               })
      //           })
      //         }
      //     }).catch(error => {
      //       console.log('THE OLD PASSWORD IS INCORRECT')
      //       this.setState({
      //         updateUserPasswordError: true,
      //         oldPassword: '',
      //         newPassword: '',
      //         confirmNewPassword: ''
      //       })
      //     })
        
      }
  
    checkNewPassword = (event) => {
          const {name, value} = event.target
          this.setState({
            [name]: value,
          })    
          if (this.state.newPassword !== value) {
              // console.log('THE PASSWORDS DO NOT MATCH')
              this.setState({
                  passwordError: true
              })
          } else {
              // console.log('PASSWORDS MATCH')
              this.setState({
                  passwordError: false
              })
          }
      }

    handleUpdatePassword = (event) => {
      event.preventDefault()
      console.log('Old password: ', this.state.oldPassword, 'New password: ', this.state.newPassword, 'Confirm New password: ', this.state.confirmNewPassword)
      this.checkOldPassword()
      }

    handleUserPersonalInfoChange = (event) => {
        event.preventDefault()
        // debugger;
        // this.scrollTop()
        console.log('User changing info')
      
        //console.log(this.state)
        let userId = localStorage.getItem('user');
        let userData = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber,
        };
        console.log(userData);

        // UPDATE USER PERSONAL INFO
        
        API.updateUserPersonalInfo(userId, userData)
          .then(res => {
              console.log(res)
              if (res.data) {
                console.log("Successfully updated user personal info!")
                this.setState({
                  updateUserInfoSuccess: true,
                  updateUserInfoError: false
                })
              } else {
                console.log("No data to update.")
                this.setState({
                  updateUserInfoSuccess: false,
                  updateUserInfoError: true
                })
              }
          })
          .catch(error => {
              console.log('Error updating the database: ', error)
              this.setState({
                updateUserInfoSuccess: false,
                updateUserInfoError: true
              })
          })
        
      }
  
    handleUserManageSubscription = (event) => {
        event.preventDefault()
        console.log('USER IS MANAGING SUBSCRIPTION - STATUS: ', this.state.subscriptionStatus)
        this.toggleUserSubscriptionModal()
      }

    handleUserCancellation = (event) => {
      event.preventDefault()
      console.log('USER IS CANCELLING SUBSCRIPTION')
      document.getElementById('cancelSubscriptionButton').style.disabled = true
      document.getElementById('cancelSubscriptionButton').innerHTML = `<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...`
      let firstName = this.state.firstName
      let lastName = this.state.lastName
      let email = this.state.email
      let username = this.state.username
      let subscriptionUpdate = {
        paymentComplete: false,
        paymentRefNumber: 'n/a',
        paymentTxnId: 'n/a',
        paymentDate: 'n/a',
        paymentCard: 'n/a'
      }
      axios({
        method: "POST", 
        url: this.state.env === 'DEVELOPMENT' ? "http://localhost:3000/sendUserCancellation" : "http://gfitwefit.com/sendUserCancellation",
        data: {
            firstName: firstName,   
            lastName: lastName,
            email: email,  
            paymentCard: this.state.paymentCard
        }
        }).then((response)=> {
            if (response.data.msg === 'success') {
                console.log("Message Sent.")
                API.userCancelSubscription(username, subscriptionUpdate)
                  .then(res => {
                      console.log('USER SUBSCRIPTION UPDATED SUCCESSFULLY: ', res)
                      this.setState({
                        userCancelMembershipSuccess: true,
                        subscriptionStatus: false,
                        lastPaymentDate: 'n/a'
                      })
                      document.getElementById('subscriptionModalBody').innerHTML = `<span className='userCancelledModalBody'>We are very sorry to see you go.. hope to see you back soon!</span>`
                  })
                  .catch(err => {
                    console.log('USER SUBSCRIPTION UPDATE ERROR: ', err)
                    document.getElementById('cancelSubscriptionButton').style.disabled = false
                    document.getElementById('cancelSubscriptionButton').innerHTML = `Cancel Membership (try again)`
                    this.setState({
                      userCancelMembershipError: true
                    })
                  })
            } else if (response.data.msg === 'fail') {
              console.log("Message failed to send.")
              document.getElementById('cancelSubscriptionButton').style.disabled = false
              document.getElementById('cancelSubscriptionButton').innerHTML = `Cancel Membership (try again)`
              this.setState({
                userCancelMembershipError: true
              })
            }
        })
      }

    toggleUserSubscriptionModal = () => {
        this.setState({
          userSubscriptionModal: !this.state.userSubscriptionModal,
          userCancelMembershipSuccess: false,
          userCancelMembershipError: false
        });
      }

    closeUserSubscriptionModal = () => {
        this.setState({
          userSubscriptionModal: !this.state.userSubscriptionModal,
          userCancelMembershipSuccess: false,
          userCancelMembershipError: false,
          userUpdateMembershipError: false,
          UserUpdateMembershipSuccess: false
        }, () => {
          window.location.reload()
        });
      }

    handleUserSubscribe = (event) => {
      event.preventDefault()
      document.getElementById('manageUserConvergeLightbox').style.display = 'block'
      }

    handleConvergePay = (event) => {
        event.preventDefault();
        
        this.setState({
          convergeTokenError: false,
          convergeSecondAttempt: false
        })

        console.log('Handling converge payment')
        // document.getElementById('userSubscriptionButton').style.disabled = true
        // document.getElementById('userSubscriptionButton').innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...`

        axios.defaults.timeout = 1000 * 15;
        axios({
          method: "GET", 
          url: this.state.env === 'DEVELOPMENT' ? "http://localhost:3000/converge_token_req" || "http://localhost:3001/converge_token_req" : "https://www.gfitwefit.com/converge_token_req",
          }).then((response)=> {
            console.log('GOT A RESPONSE: ', response)
            let ssl_txn_auth_token = response.data
            console.log(ssl_txn_auth_token)
            window.$convergeToken = ssl_txn_auth_token
            this.setState({
              sessionID: ssl_txn_auth_token
            })
            this.handleLightboxInit(ssl_txn_auth_token)
              // if (response.data.msg === 'success'){
              //     console.log("Payment Sent."); 
                  
              // } else if(response.data.msg === 'fail'){
              //   console.log("Payment failed to send.")
              // }
          }).catch((err) => {
            console.log('ERROR RETRIEVING CONVERGE TOKEN: ', err)
            document.getElementById('convergeButton').style.disabled = false
            document.getElementById('convergeButton').innerHTML = `Pay With Converge (try again)`
            this.setState({
              convergeTokenError: true
            })
          })
      }

    handleConvergePayRetry = (event) => {
        event.preventDefault();
        console.log('Handling converge payment retry')
        // this.setState({
        //   convergeSecondAttempt: true
        // })
        
        // debugger
        // console.log('WAIVER CHECKED? ', this.state.waiverSigned)

        // if (!this.state.waiverSigned) {
        //   console.log('WAIVER ERROR HERE')
        //   this.setState({
        //     waiverError: true
        //   })
        //   return
        // } else {
        //   document.getElementById('convergeButton').style.disabled = true
        //   document.getElementById('convergeButton').innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...`
        //   this.setState({
        //     waiverError: false
        //   })
        // }

        document.getElementById('convergeButtonRetry').style.disabled = true
        document.getElementById('convergeButtonRetry').innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...`

        axios.defaults.timeout = 1000 * 10;
        axios({
          method: "GET", 
          url: this.state.env === 'DEVELOPMENT' ? "http://localhost:3000/converge_token_req" || "http://localhost:3001/converge_token_req" : "https://www.gfitwefit.com/converge_token_req",
          }).then((response)=> {
            console.log('GOT A RESPONSE: ', response)
            let ssl_txn_auth_token = response.data
            console.log(ssl_txn_auth_token)
            window.$convergeToken = ssl_txn_auth_token
            this.setState({
              sessionID: ssl_txn_auth_token
            })
            this.handleLightboxInitRetry(ssl_txn_auth_token)
              // if (response.data.msg === 'success'){
              //     console.log("Payment Sent."); 
                  
              // } else if(response.data.msg === 'fail'){
              //   console.log("Payment failed to send.")
              // }
          }).catch((err) => {
            console.log('ERROR RETRIEVING CONVERGE TOKEN: ', err)
            document.getElementById('convergeButtonRetry').style.disabled = false
            document.getElementById('convergeButtonRetry').innerHTML = `Request new payment token`
            // document.getElementById('convergeButtonRetry').style.display = 'none'
            document.getElementById('continueWithoutPaymentButton').style.display = 'block'
            // document.getElementById('convergeLightboxDiv').innerHTML = `<Button id='convergeButton' className='payWithConverge'>Request new payment token</Button>`
            // let newConvergeButton = document.getElementById('convergeButton')
            // newConvergeButton.onclick = this.handleConvergePayRetry
            this.setState({
              convergeTokenError: true
            })
          })
      }

    handleLightboxInit = (authToken) => {
        console.log('Handling lightbox init -- Auth Token: ', authToken)
        document.getElementById('subscriptionModalBodyDetails').style.display = 'none'
        document.getElementById('manageUserConvergeLightbox').style.display = 'block'
        this.scrollTop()
        this.startTimer()
      }
    
    handleLightboxInitRetry = (authToken) => {
      // console.log('Handling lightbox init -- Auth Token: ', authToken)
      document.getElementById('subscriptionModalBodyDetails').style.display = 'none'
      document.getElementById('manageUserConvergeLightbox').style.display = 'block'
      document.getElementById('convergeButtonRetry').innerHTML = `Request new payment token`
      document.getElementById('convergeButtonRetry').style.display = 'none'
      document.getElementById('convergeLightboxInitButton').style.display = 'block'
      this.scrollTop()
      this.startTimer()
      }
  
    startTimer() {
        this.clockRef.start();
      }

    pauseTimer() {
        this.clockRef.pause();
      }

    setClockRef(ref) {
        // When the `Clock` (and subsequently `Countdown` mounts
        // this will give us access to the API
        this.clockRef = ref;
      }

    convergeCountdownComplete = () => {
      let txnStatus = document.getElementById('txnStatus').value
      console.log('TXN STATUS: ', txnStatus)
      if (this.state.convergeSecondAttempt) {
        console.log('USERS SECOND ATTEMPT FAILED')
        document.getElementById('convergeButtonRetry').style.display = 'block'
        document.getElementById('continueWithoutPaymentButton').style.display = 'block'
        document.getElementById('convergeLightboxInitButton').style.display = 'none'
        return
      } else if (txnStatus === undefined) {
          document.getElementById('convergeButtonRetry').style.display = 'block'
          document.getElementById('convergeLightboxInitButton').style.display = 'none'
          // document.getElementById('convergeLightboxDiv').innerHTML = `<Button id='convergeButton' className='payWithConverge'>Request new payment token</Button>` 
          // let newConvergeButton = document.getElementById('convergeButton')
          // newConvergeButton.onclick = this.props.handleConvergePayRetry
          // console.log('new converge button: ', newConvergeButton)
        }
      }

    checkConvergePayment = (event) => {
        event.preventDefault()
        document.getElementById('convergeInfo').style.display = 'none'
        let status = window.$status
        let msg = window.$msg
        console.log('CHECKING CONVERGE PAYMENT: ', status, msg)
        if(status === 'APPROVED') {
          // document.getElementById('finalStep').disabled = false
          this.setState({
            paymentComplete: true,
            paymentRefNumber: msg.ssl_transaction_reference_number,
            paymentTxnId: msg.ssl_txn_id,
            paymentDate: msg.ssl_txn_time,
            paymentCard: msg.ssl_card_number
          }, () => {
            this.handleSubscriptionSubmit()
          })
        } else {
          console.log('PAYMENT ERROR OCCURED')
          this.setState({
            paymentComplete: false,
            paymentRefNumber: 'n/a',
            paymentTxnId: 'n/a',
            paymentDate: 'n/a',
            paymentCard: 'n/a'
          }, () => {
            this.handleSubscriptionSubmit()
          })
        }
      }

    handleSubscriptionSubmit = () => {
      // event.preventDefault()
      console.log('HANDLING USER SUBSCRIPTION UPDATE')
      document.getElementById('txnDetailsButton').style.disabled = true
      document.getElementById('txnDetailsButton').innerHTML = `<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...`
      let firstName = this.state.firstName
      let lastName = this.state.lastName
      let email = this.state.email
      let username = this.state.username
      let subscriptionUpdate = {
        paymentComplete: this.state.paymentComplete,
        paymentRefNumber: this.state.paymentRefNumber,
        paymentTxnId: this.state.paymentTxnId,
        paymentDate: this.state.paymentDate,
        paymentCard: this.state.paymentCard
      }
      axios({
        method: "POST", 
        url: this.state.env === 'DEVELOPMENT' ? "http://localhost:3000/sendUserSubscriptionUpdate" : "http://gfitwefit.com/sendUserSubscriptionUpdate",
        data: {
            firstName: firstName,   
            lastName: lastName,
            email: email,  
            paymentCard: subscriptionUpdate.paymentCard
        }
        }).then((response)=> {
            if (response.data.msg === 'success') {
                console.log("Message Sent.")
                API.userUpdateSubscription(username, subscriptionUpdate)
                  .then(res => {
                      console.log('USER SUBSCRIPTION UPDATED SUCCESSFULLY: ', res)
                      document.getElementById('userManageMembershipCloseButton').style.display = 'block'
                      this.setState({
                        userUpdateMembershipSuccess: true
                      })
                      document.getElementById('subscriptionModalBody').innerHTML = `<span className='userUpdateSubscriptionModalBody'>Glad to have you join the team! Head over to the videos tab to get started!</span>`
                  })
                  .catch(err => {
                    console.log('USER SUBSCRIPTION UPDATE ERROR: ', err)
                    document.getElementById('userManageMembershipCloseButton').style.display = 'block'
                    document.getElementById('txnDetailsButton').style.disabled = false
                    document.getElementById('txnDetailsButton').innerHTML = `Update Subscription (try again)`
                    this.setState({
                      userUpdateMembershipError: true
                    })
                  })
            } else if (response.data.msg === 'fail') {
              console.log("Message failed to send.")
              document.getElementById('txnDetailsButton').style.disabled = false
              document.getElementById('txnDetailsButton').innerHTML = `Update Subscription (try again)`
              this.setState({
                userUpdateMembershipError: true
              })
            }
        })
      }

    render() {
        return (
          <div id="userProfilePage">
            <Modal 
              isOpen={this.state.userSubscriptionModal} 
              autoFocus={true}
              centered={true}
              size='lg'
              className='subscriptionModal'
            >
                <ModalHeader id='modalTitle'>
                  Manage Subscription
                </ModalHeader>
                <ModalBody id='subscriptionModalBody' className='subscriptionModalBody'>
                    {
                      this.state.subscriptionStatus ? 

                      <div className="row subscriptionModalBodyInfo">
                        <div className='col-12 subscriptionModalBodyColumn1'>
                          <p>Your subscription is currently active. Would you like to cancel?</p>
                        </div>
                        <div className='col-12 subscriptionModalBodyColumn2'> 
                          <Button id='cancelSubscriptionButton' className='cancelSubscriptionButton' onClick={this.handleUserCancellation} color='danger'>
                            Cancel Subscription
                          </Button>
                        </div>
                      </div>

                      :

                      <div className="row subscriptionModalBodyInfo">
                        <div id="subscriptionModalBodyDetails" className='row'>
                          <div className='col-12 subscriptionModalBodyColumn1'>
                            <p>Getting started with G-Fit Gold is just a few clicks away!</p>
                          </div>
                          <div className='col-12 subscriptionModalBodyColumn2'> 
                            <Button className='userSubscriptionButton' onClick={this.handleConvergePay}>
                              Subscribe with Converge
                            </Button>
                          </div>
                        </div>
                        <ManageUserConvergeLightbox 
                          handleChange={this.handleChange}
                          sessionID={this.state.sessionID}
                          checkConvergePayment={this.checkConvergePayment}
                          refCallback={this.setClockRef}
                          convergeCountdownComplete={this.convergeCountdownComplete}
                          handleConvergePay={this.handleConvergePay}
                          handleConvergePayRetry={this.handleConvergePayRetry}
                          divStyle={this.state.divStyle}
                          convergeTokenError={this.state.convergeTokenError}
                          handleSubscriptionSubmit={this.handleSubscriptionSubmit}
                        />
                      </div>
                    }
                </ModalBody>
                <UserCancelMembershipError
                  userCancelMembershipError={this.state.userCancelMembershipError}
                />
                <UserCancelMembershipSuccess
                  userCancelMembershipSuccess={this.state.userCancelMembershipSuccess}
                />
                <UserUpdateMembershipError
                  userUpdateMembershipError={this.state.userUpdateMembershipError}
                />
                <UserUpdateMembershipSuccess
                  userUpdateMembershipSuccess={this.state.userUpdateMembershipSuccess}
                />
                <ModalFooter>
                  <Button id='userManageMembershipCloseButton' color="secondary" onClick={this.closeUserSubscriptionModal}>Close</Button>
                </ModalFooter>
              </Modal>

            <h2 className="userProfileHeading">User Profile</h2>
            <UserEditProfile 
              firstName={this.state.firstName}
              lastName={this.state.lastName}
              gender= {this.state.gender}
              email= {this.state.email}
              phoneNumber={this.state.phoneNumber}
              subscriptionStatus={this.state.subscriptionStatus}
              lastPaymentDate={this.state.lastPaymentDate}
              autoRenewDate={this.state.autoRenewDate}
              handleChange={this.handleChange}
              handleRadioChange={this.handleRadioChange}
              handlePhoneChange={this.handlePhoneChange}
              checkEmail={this.checkEmail}
              emailError={this.state.emailError}
              phoneError={this.state.phoneError}
              handleUserPersonalInfoChange={this.handleUserPersonalInfoChange}
              equipmentNeeded={this.state.equipmentNeeded}
              fitnessLevel={this.state.fitnessLevel}
              workoutCategory={this.state.workoutCategory}
              handleFilterReset={this.handleFilterReset}
              handleSetPreferences={this.handleSetPreferences}
              checkNewPassword={this.checkNewPassword}
              oldPassword={this.state.oldPassword}
              newPassword={this.state.newPassword}
              passwordError={this.state.passwordError}
              passwordMatchError={this.state.passwordMatchError}
              confirmNewPassword={this.state.confirmNewPassword}
              updateUserInfoSuccess={this.state.updateUserInfoSuccess}
              updateUserInfoError={this.state.updateUserInfoError}
              updateUserPreferencesSuccess={this.state.updateUserPreferencesSuccess}
              updateUserPreferencesError={this.state.updateUserPreferencesError}
              updateUserPasswordSuccess={this.state.updateUserPasswordSuccess}
              updateUserPasswordError={this.state.updateUserPasswordError}
              handlePasswordChange={this.handlePasswordChange}
              handleOldPasswordChange={this.handleOldPasswordChange}
              handleUpdatePassword={this.handleUpdatePassword}
              handleUserManageSubscription={this.handleUserManageSubscription}
            />

          </div>
        
        )
    };
};

export default UserProfilePage;