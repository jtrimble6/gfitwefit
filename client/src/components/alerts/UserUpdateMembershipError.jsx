import React, { Component } from 'react';
import { Alert } from 'reactstrap'

//import { Link } from 'react-router-dom';

class UserUpdateMembershipError extends Component {
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
        if (this.props.userUpdateMembershipError === true) {
            return (
                <Alert color='danger' isOpen={this.state.visible}>
                    Sorry, there was an error updating your membership. Please try again!
                </Alert>
            )
        } else {
            return <div></div>
        }
    }
}

export default UserUpdateMembershipError;