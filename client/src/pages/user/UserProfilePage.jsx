import React, { Component } from 'react'
// import UserBar from '../../components/nav/UserBar'
import moment from 'moment'
import API from '../../utils/API'
import '../../css/user.css'
import UserEditProfile from './UserEditProfile.jsx'

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
            updateUserPasswordServerError: false


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
       
    }

    componentDidMount() {
        // console.log('User Sign Up Ready')
        this.scrollTop()
        this.getUserData()
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
                let subscriptionStatus = 'INACTIVE'
                let lastPaymentDate = 'N/A'
                let lastPaymentDateLife = ''
                if(user.paymentComplete) {
                  let lastPaymentDateConverted = moment(user.paymentDate).format('MM/DD/YYYY')
                  lastPaymentDateLife = moment(lastPaymentDateConverted).add(1, 'months').calendar()
                  let todaysDate = moment().format('MM/DD/YYYY')
                  let lastPaymentDateCurrent = lastPaymentDateLife >= todaysDate
                  subscriptionStatus = lastPaymentDateCurrent ? 'ACTIVE' : 'INACTIVE'
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
    
    handlePhoneChange({ target: { value } }) {
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
      console.log('USER IS MANAGING SUBSCRIPTION')
      }
  
    render() {
        return (
          <div id="userProfilePage">
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