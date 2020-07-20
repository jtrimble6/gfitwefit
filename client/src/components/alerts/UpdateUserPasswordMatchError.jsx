import React, { Component } from 'react';
import { Alert } from 'reactstrap'

//import { Link } from 'react-router-dom';

class UpdateUserPasswordMatchError extends Component {
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
        if (this.props.updateUserPasswordMatchError === true) {
            return (
                <Alert className='updateUserInfoAlert' color='danger' isOpen={this.state.visible}>
                    The passwords do not match!
                </Alert>
            )
        } else {
            return <div></div>
        }
    }
}

export default UpdateUserPasswordMatchError;