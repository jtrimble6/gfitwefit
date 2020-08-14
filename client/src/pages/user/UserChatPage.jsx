import React, { Component } from 'react'

// CSS
import '../../css/user/user.css'
import 'react-table/react-table.css'

// COMPONENTS
import MessageBoard from '../../components/general/MessageBoard'

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