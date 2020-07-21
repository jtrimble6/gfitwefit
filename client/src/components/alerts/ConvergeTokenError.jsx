import React, { Component } from 'react';
import { Alert } from 'reactstrap'

//import { Link } from 'react-router-dom';

class ConvergeTokenError extends Component {
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
        // console.log(this.props.convergeTokenError);
        if (this.props.convergeTokenError === true) {
            return (
                <Alert color='danger' isOpen={this.state.visible}>
                    There was an error connecting with ConvergePay. Please try again later.
                </Alert>
            )
        } else {
            return <div></div>
        }
    }
}

export default ConvergeTokenError;