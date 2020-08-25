import React, { Component } from 'react';
import { Alert } from 'reactstrap'

//import { Link } from 'react-router-dom';

class AdminCancelMembershipSuccess extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true
        }

        this.onDismiss = this.onDismiss.bind(this)
    }

    onDismiss() {
        this.setState({ visible: false });
    }

    render() {
        // console.log(this.props.contactError);
        if (this.props.adminCancelMembershipSuccess === true) {
            return (
                <Alert color='success' isOpen={this.state.visible}>
                    User membership has been successfully cancelled.
                </Alert>
            )
        } else {
            return <div></div>
        }
    }
}

export default AdminCancelMembershipSuccess;