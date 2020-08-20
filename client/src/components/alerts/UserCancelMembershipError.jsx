import React, { Component } from 'react';
import { Alert } from 'reactstrap'

//import { Link } from 'react-router-dom';

class UserCancelMembershipError extends Component {
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
        if (this.props.userCancelMembershipError === true) {
            return (
                <Alert color='danger' isOpen={this.state.visible}>
                    Sorry, there was an error cancelling your membership. Please try again!
                </Alert>
            )
        } else {
            return <div></div>
        }
    }
}

export default UserCancelMembershipError;