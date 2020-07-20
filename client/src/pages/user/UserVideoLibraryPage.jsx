import React, { Component } from 'react'
// import UserBar from '../../components/nav/UserBar'
import UserVideoLibrary from './UserVideoLibrary'
import '../../css/admin.css'
import 'react-table/react-table.css'

class UserVideoLibraryPage extends Component {
  
    render() {
        return (
          <div id="videoLibraryPage">
            <UserVideoLibrary />

          </div>
        
        )
    };
};

export default UserVideoLibraryPage;