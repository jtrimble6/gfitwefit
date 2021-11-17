import React, { Component } from 'react';
import { Alert } from 'reactstrap'

//import { Link } from 'react-router-dom';

class ContactError extends Component {
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
        if (this.props.contactError === true) {
            return (
                <Alert color='danger' isOpen={this.state.visible} toggle={this.onDismiss}>
                    Sorry, there was an error sending the message!
                </Alert>
            )
        } else {
            return <div></div>
        }
    }
}

export default ContactError;
