import React, { Component } from 'react';
import { Alert } from 'reactstrap'

//import { Link } from 'react-router-dom';

class AdminSignUpError extends Component {
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
        // console.log(this.props.AdminSignUpError);
        if (this.props.adminSignUpError === true) {
            return (
                <Alert color='danger' isOpen={this.state.visible}>
                    There was an error signing up admin. Please try again later.
                </Alert>
            )
        } else {
            return <div></div>
        }
    }
}

export default AdminSignUpError;