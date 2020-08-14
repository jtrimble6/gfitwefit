import React, { Component } from 'react'
import { Form, Col, Row, InputGroup, FormControl } from 'react-bootstrap'

// CSS
import '../../css/general/signup.css'

class SignUpUserBasicInfo extends Component {

    render() {
        // Verify this is current step
        if (this.props.currentStep !== 2) {
            return null
        }

        return (
            <div className='userSignUpFormRow basicInfoStep'>
              <Form.Row>
                <Form.Group as={Col} controlid="formGridHeight">
                    <Form.Label>Height</Form.Label>
                    <Form.Control 
                        as="select"
                        value={this.props.height}
                        onChange={this.props.handleChange}
                        name="height"
                        title="height"
                        className='formDropdown'
                    >
                      <option>Select One</option>
                      <option>under 5'0"</option>
                      <option>5'1"</option>
                      <option>5'2"</option>
                      <option>5'3"</option>
                      <option>5'4"</option>
                      <option>5'5"</option>
                      <option>5'6"</option>
                      <option>5'7"</option>
                      <option>5'8"</option>
                      <option>5'9"</option>
                      <option>5'10"</option>
                      <option>5'11"</option>
                      <option>6'0"</option>
                      <option>6'1"</option>
                      <option>6'2"</option>
                      <option>6'3"</option>
                      <option>6'4"</option>
                      <option>6'5"</option>
                      <option>6'6"</option>
                      <option>6'7"</option>
                      <option>6'8"</option>
                      <option>6'9"</option>
                      <option>6'10"</option>
                      <option>6'11"</option>
                      <option>over 7'0"</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group as={Col} controlid="formGridWeight">
                  <Form.Label>Weight</Form.Label>
                  <InputGroup className="mb-3" controlid="formGridWeightInput">
                    <FormControl 
                      aria-label="Weight"
                      value={this.props.weight}
                      onChange={this.props.handleChange}
                      placeholder="Weight"
                      name="weight" 
                    />
                    <InputGroup.Append>
                    <InputGroup.Text>lbs</InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </Form.Group>

              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlid="formGridGender">
                    <Form.Label>Gender</Form.Label>
                    <Form.Control 
                        as="select"
                        value={this.props.gender}
                        onChange={this.props.handleChange}
                        name="gender"
                        placeholder="Gender"
                        className='formDropdown'
                    >
                        <option>Select One</option>
                        <option>Male</option>
                        <option>Female</option>
                    </Form.Control>
                </Form.Group>

                
                <Form.Group as={Col} controlid="formGridDOB">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Group as={Row} className='formGridDOBRow'>
                  <InputGroup className="mb-3 formGridDOBDayInput" controlid="formGridDOBDayInput">
                    <FormControl 
                      aria-label="Day"
                      value={this.props.day}
                      onChange={this.props.handleChange}
                      placeholder="01"
                      name="day" 
                    />
                    <InputGroup.Append>
                    <InputGroup.Text>Day</InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                  <InputGroup className="mb-3 formGridDOBMonthInput" controlid="formGridDOBMonthInput">
                    <FormControl 
                      aria-label="Month"
                      value={this.props.month}
                      onChange={this.props.handleChange}
                      placeholder="01"
                      name="month" 
                    />
                    <InputGroup.Append>
                    <InputGroup.Text>Month</InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                  <InputGroup className="mb-3 formGridDOBYearInput" controlid="formGridDOBYearInput">
                    <FormControl 
                      aria-label="Year"
                      value={this.props.year}
                      onChange={this.props.handleChange}
                      placeholder="2000"
                      name="year" 
                    />
                    <InputGroup.Append>
                    <InputGroup.Text>Year</InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                  </Form.Group>
                  
                </Form.Group>

                {/* <Form.Group as={Col} controlid="formGridDOB">
                    <Form.Label>Date of Birth</Form.Label>
                    <DatePicker 
                        id="example-datepicker" 
                        value={this.state.dateValue} 
                        onChange={this.handleChange} 
                    />
                    <Form.Control 
                        value={this.props.dob}
                        onChange={this.props.handleChange}
                        name="dob"
                        placeholder="Date of Birth" 
                    //   type="date" 
                    />
                </Form.Group> */}
              </Form.Row>
            </div>
        )
    };
};

export default SignUpUserBasicInfo;
       