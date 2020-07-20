import React, { Component } from 'react';
import { Alert } from 'reactstrap'

//import { Link } from 'react-router-dom';

class UpdateUserPersonalInfoSuccess extends Component {
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
        if (this.props.updateUserInfoSuccess === true) {
            return (
                <Alert className='updateUserInfoAlert' color='success' isOpen={this.state.visible}>
                    Your personal info has been updated!
                </Alert>
            )
        } else {
            return <div></div>
        }
    }
}

export default UpdateUserPersonalInfoSuccess;