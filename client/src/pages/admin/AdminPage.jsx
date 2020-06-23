import React, { Component } from 'react'
import AdminBar from '../../components/nav/AdminBar'
import AdminNavTabs from './AdminNavTabs'
import '../../css/admin.css'
import 'react-table/react-table.css'

class AdminPage extends Component {
  
    render() {
        return (
          <div id="adminPage">
            <AdminBar />
            <AdminNavTabs />

          </div>
        
        )
    };
};

export default AdminPage;