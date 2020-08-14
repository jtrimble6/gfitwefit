import React, { Component } from 'react'
import AdminVideoLibrary from './AdminVideoLibrary'

// CSS
import '../../css/admin/admin.css'
import 'react-table/react-table.css'

// COMPONENTS
import AdminBar from '../../components/nav/AdminBar'

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