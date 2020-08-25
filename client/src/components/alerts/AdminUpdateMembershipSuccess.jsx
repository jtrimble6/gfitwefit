import React, { Component } from 'react';
import { Alert } from 'reactstrap'

//import { Link } from 'react-router-dom';

class AdminUpdateMembershipSuccess extends Component {
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
        if (this.props.adminUpdateMembershipSuccess === true) {
            return (
                <Alert color='success' isOpen={this.state.visible}>
                    User membership has been successfully updated.
                </Alert>
            )
        } else {
            return <div></div>
        }
    }
}

export default AdminUpdateMembershipSuccess;