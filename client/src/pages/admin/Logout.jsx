import React, { Component } from 'react'
import '../../css/admin.css'

class Logout extends Component {
  constructor(props) {
      super(props) 
      this.state = {
          username: ''
      }
      this.logout = this.logout.bind(this)
    }


    componentDidMount() {
        this.logout()
    }

    logout = () => {
        localStorage.clear()
    }

    
    render() {
        return (
            <div id="logoutPage">
             <h1>You have successfully logged out!</h1>
             <a href='/'>Back to home</a>
            </div>
        )
    }
}

export default Logout
       