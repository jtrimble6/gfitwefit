import React, { Component } from 'react';
import { Alert } from 'reactstrap'

//import { Link } from 'react-router-dom';

class ContactSuccess extends Component {
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
        if (this.props.contactSuccess === true) {
            return (
                <Alert color='success' isOpen={this.state.visible} toggle={this.onDismiss}>
                    Thank you for your message!
                </Alert>
            )
        } else {
            return <div></div>
        }
    }
}

export default ContactSuccess;