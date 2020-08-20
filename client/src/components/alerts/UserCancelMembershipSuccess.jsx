import React, { Component } from 'react';
import { Alert } from 'reactstrap'

//import { Link } from 'react-router-dom';

class UserCancelMembershipSuccess extends Component {
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
        if (this.props.userCancelMembershipSuccess === true) {
            return (
                <Alert color='success' isOpen={this.state.visible}>
                    Your membership has been successfully cancelled.
                </Alert>
            )
        } else {
            return <div></div>
        }
    }
}

export default UserCancelMembershipSuccess;