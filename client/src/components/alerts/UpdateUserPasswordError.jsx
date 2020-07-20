import React, { Component } from 'react';
import { Alert } from 'reactstrap'

//import { Link } from 'react-router-dom';

class UpdateUserPasswordError extends Component {
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
        if (this.props.updateUserPasswordError === true) {
            return (
                <Alert className='updateUserInfoAlert' color='danger' isOpen={this.state.visible}>
                    The old password provided is incorrect, please try again.
                </Alert>
            )
        } else {
            return <div></div>
        }
    }
}

export default UpdateUserPasswordError;