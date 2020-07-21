import React, { Component } from 'react';
import { Alert } from 'reactstrap'

//import { Link } from 'react-router-dom';

class AdminSignUpSuccess extends Component {
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
        // console.log(this.props.AdminSignUpSuccess);
        if (this.props.adminSignUpSuccess === true) {
            return (
                <Alert color='success' isOpen={this.state.visible}>
                    New admin was successfully signed up!
                </Alert>
            )
        } else {
            return <div></div>
        }
    }
}

export default AdminSignUpSuccess;