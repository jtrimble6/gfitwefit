import React, { Component } from 'react'
import '../../css/signup.css'
// import ExistingAccount from "../../alerts/ExistingAccount";
// import PasswordError from '../../alerts/PasswordError';
import { Form, Col } from 'react-bootstrap'



class SignUpUserFitnessInfo extends Component {

    componentDidMount() {
        // console.log('Fitness Info Ready')
      }

    render() {
        // Verify this is current step
        if (this.props.currentStep !== 4) {
            return null
        }

        return (
            <div className='userSignUpFormRow fitnessInfoStep'>
              <Form.Row>
                <Form.Group as={Col} controlid="formGridFitnessGoals">
                    <Form.Label>
                        What are your top 3 goals for exercising?
                    </Form.Label>
                    <Form.Control 
                        value={this.props.fitnessGoals}
                        onChange={this.props.handleChange}
                        name="fitnessGoals"
                        placeholder="Ex. Lose weight, get toned, overall health, gain strength, improve endurance, etc." 
                    />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlid="formGridActivityLevel">
                    <Form.Label>What is your current physical activity level?</Form.Label>
                    <Form.Control 
                        as="select"
                        value={this.props.activityLevel}
                        onChange={this.props.handleChange}
                        name="activityLevel"
                        placeholder=""
                    >
                        <option>Select One</option>
                        <option>Sedentary (0 hours per week)</option>
                        <option>Low (1-2 hours per week)</option>
                        <option>Moderate (3-4 hours per week)</option>
                        <option>High (5-6 hours per week)</option>
                    </Form.Control>
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlid="formGridExercisePlan">
                    <Form.Label>How many days a week do you plan on exercising?</Form.Label>
                    <Form.Control 
                        as="select"
                        value={this.props.exercisePlan}
                        onChange={this.props.handleChange}
                        name="exercisePlan"
                        placeholder=""
                    >
                        <option>Select One</option>
                        <option>Sedentary (0 hours per week)</option>
                        <option>Low (1-2 hours per week)</option>
                        <option>Moderate (3-4 hours per week)</option>
                        <option>High (5-6 hours per week)</option>
                    </Form.Control>
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlid="formGridGymEquipment">
                    <Form.Label>What gym equipment do you crrently have access to?</Form.Label>
                    <Form.Control 
                        as="select"
                        value={this.props.gymEquipment}
                        onChange={this.props.handleChange}
                        name="gymEquipment"
                        placeholder=""
                    >
                        <option>Select One</option>
                        <option>None (bodyweight)</option>
                        <option>Light (dumbbells, resistance bands, loop bands, jumprope, gliders, stability ball)</option>
                        <option>Full (full gym access/most equipment)</option>
                    </Form.Control>
                </Form.Group>
              </Form.Row>
            </div>
        )
    };
};

export default SignUpUserFitnessInfo;
       