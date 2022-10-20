import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import KidsTrainingSignUpModal from './KidsTrainingSignUpModal';

// CSS
import '../../css/kids/kidsLanding.css';

class KidsLanding extends Component {
	constructor(props) {
		super(props);

		this.state = {
			show: false,
			showConfirmation: false,
			submitting: false,
			acknowledged: false
		};

		this.showModal = this.showModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.submitModal = this.submitModal.bind(this);
		this.handleCheckbox = this.handleCheckbox.bind(this);
		this.showConfirmationModal = this.showConfirmationModal.bind(this);
		this.closeConfirmationModal = this.closeConfirmationModal.bind(this);
	}

	showModal = () => {
		this.setState({
			show: true
		});
	};

	showConfirmationModal = () => {
		this.setState({
			show: false,
			showConfirmation: true
		});
	};

	closeConfirmationModal = () => {
		this.setState({
			showConfirmation: false
		});
	};

	closeModal = () => {
		this.setState({
			show: false,
			acknowledged: false
		});
	};

	submitModal = () => {
		this.setState({
			submitting: true
		});

		console.log('submitting form');

		// let numberOfParticipants = document.getElementById('numberofparticipants').value
		let firstName = document.getElementById('participantfirstname').value;
		let lastName = document.getElementById('participantlastname').value;
		let grade = document.getElementById('participantgrade').value;
		let guardian = document.getElementById('parentname').value;
		let email = document.getElementById('email').value;

		console.log(firstName, lastName, grade, guardian, email, this.state.acknowledged);

		this.showConfirmationModal();
	};

	handleCheckbox = () => {
		this.setState({
			acknowledged: !this.state.acknowledged
		});
	};

	render() {
		return (
			<div className="kidsLanding">
				<KidsTrainingSignUpModal
					show={this.state.show}
					showConfirmation={this.state.showConfirmation}
					showConfirmationModal={this.showConfirmationModal}
					showModal={this.showModal}
					closeModal={this.closeModal}
					closeConfirmationModal={this.closeConfirmationModal}
					submitModal={this.submitModal}
					handleCheckbox={this.handleCheckbox}
				/>
				<Row className="kidsLandingTitle">
					<h2 className="kidsLandingTitleLeft">GOUVEIA FITNESS/</h2>
					<h2 className="kidsLandingTitleRight">/SPEED & STRENGTH CAMP</h2>
				</Row>
				<Row className="kidsLandingBodyRow">
					<Col sm={12} lg={12} xl={12}>
						<p className="kidsLandingBody">
							Our main focus is to develop our athletes acceleration, agility, top speed, strength, and
							power. We prioritize running mechanics, power development, and proper form while strength
							training.
						</p>
						<p className="kidsLandingScheduleHeader">MONDAYS AND WEDNESDAYS</p>
						<p className="kidsLandingScheduleText">4:30-5:30pm for all 4th, 5th, and 6th graders.</p>
						<p className="kidsLandingScheduleHeader">TUESDAYS AND THURSDAYS</p>
						<p className="kidsLandingScheduleText">4:30-5:30pm for all 7th, 8th, and 9th graders.</p>
						{/* <p className="kidsLandingPrice">
                            $250/participant for 12 sessions 
                        </p> */}
						<p className="kidsLandingEmail">Email us for more info! KGOUVEIA@GFITWEFIT.COM</p>
					</Col>
					{/* <Row className='kidsRegisterRow'>
                        <Button onClick={this.showModal} className='kidsRegisterButton'>Register Now</Button>
                    </Row> */}
				</Row>
			</div>
		);
	}
}

export default KidsLanding;
