import React, { Component } from 'react'
// import UserBar from '../../components/nav/UserBar'
import MessageBoard from '../../components/MessageBoard'
import '../../css/user.css'
import 'react-table/react-table.css'

class UserChatPage extends Component {
  
    render() {
        return (
          <div id="messageBoardPage">
            <h2 className="messageBoardTitle">Chat Room</h2>
            <MessageBoard />

          </div>
        
        )
    };
};

export default UserChatPage;