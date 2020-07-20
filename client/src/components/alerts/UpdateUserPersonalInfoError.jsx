import React, { Component } from 'react';
import { Alert } from 'reactstrap'

//import { Link } from 'react-router-dom';

class UpdateUserPersonalInfoError extends Component {
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
        // console.log(this.props.contactSuccess);
        if (this.props.updateUserInfoError === true) {
            return (
                <Alert className='updateUserInfoAlert' color='danger' isOpen={this.state.visible}>
                    There was an error updating your personal info, please try again later.
                </Alert>
            )
        } else {
            return <div></div>
        }
    }
}

export default UpdateUserPersonalInfoError;