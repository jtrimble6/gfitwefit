import React, { Component } from 'react'
import AdminBar from '../../components/nav/AdminBar'
import AdminVideoLibrary from './AdminVideoLibrary'
import '../../css/admin.css'
import 'react-table/react-table.css'

class AdminVideoLibraryPage extends Component {
  
    render() {
        return (
          <div id="adminPage">
            <AdminBar />
            <AdminVideoLibrary />

          </div>
        
        )
    };
};

export default AdminVideoLibraryPage;