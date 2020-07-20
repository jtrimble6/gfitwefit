import React, { Component } from 'react'
import UserBar from '../../components/nav/UserBar'
import UserNavTabs from './UserNavTabs'
import '../../css/user.css'
import 'react-table/react-table.css'

class UserHomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
          
        }
        this.scrollTop = this.scrollTop.bind(this)
    }

    componentDidMount() {
        this.scrollTop()
      }

    scrollTop = () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }

  
    render() {
        return (
          <div id="userPage">
            <UserBar />
            <UserNavTabs />

          </div>
        
        )
    };
};

export default UserHomePage;