import React, { Component } from 'react';
import '../../css/contact.css'
import axios from 'axios'
import { Button } from 'reactstrap'
import ContactSuccess from '../alerts/contactSuccess'
import ContactError from '../alerts/contactError'

require('dotenv').config();

class Contact extends Component {

    constructor(props) {
      super(props);
      this.state = {
        toggleForm: false,
        contactSuccess: false,
        contactError: false
      }
      this.handleSubmit = this.handleSubmit.bind(this)
      this.resetForm = this.resetForm.bind(this)
      this.toggleForm = this.toggleForm.bind(this)
    }

  handleSubmit(e){
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      const phone = document.getElementById('phone').value;
      axios({
          method: "POST", 
          url:"http://gfitwefit.com/send",
          // url:"http://localhost:3000/send", 
          data: {
              name: name,   
              email: email,  
              phone: phone,
              message: message
          }
      }).then((response)=>{
          if (response.data.msg === 'success'){
              console.log("Message Sent."); 
              this.setState({
                contactSuccess: true
              })
              this.resetForm()
          } else if(response.data.msg === 'fail'){
            console.log("Message failed to send.")
            this.setState({
              contactError: true
            })
          }
      })
    }

  resetForm(){
      document.getElementById('contact-form').reset();
    }

  toggleForm = () => {
      this.setState({
        toggleForm: !this.state.toggleForm
      })
    }



    render() {                                                                  
        return (
        // <div className='container'>
            <div className='contactPage'>
                <h1>Contact Us:</h1>
                <div className="row">
                  <div className="col contactTrainer">
                    <img src={require('../../css/images/gfitinsta/wg.jpg')} alt='Walter Gouveia'></img>
                    <p className='name'>Walt Gouveia</p>
                    <p className='position'>Co-Owner</p>
                    <p className='phone'>704.439.7043</p>
                  </div>
                  <Button
                    className='contactButton'
                    onClick={this.toggleForm}
                  >
                    {
                      !this.state.toggleForm ? <p>Contact Form</p> : <p>Close Form</p>
                    }
                    
                  </Button>
                  <div className="col contactTrainer">
                    <img src={require('../../css/images/gfitinsta/kg.jpeg')} alt='Kyle Gouveia'></img>
                    <p className='name'>Kyle Gouveia</p>
                    <p className='position'>Co-Owner</p>
                    <p className='phone'>703.554.5731</p>
                  </div>
                </div>
                <div className="row contactArea" hidden={!this.state.toggleForm}>
                  <form id="contact-form" onSubmit={this.handleSubmit} method="POST">
                      <div className="form-group">
                          <label htmlFor="name">Name</label>
                          <input type="text" className="form-control" id="name" />
                      </div>
                      <div className="form-group">
                          <label htmlFor="name">Phone Number</label>
                          <input type="text" className="form-control" id="phone" />
                      </div>
                      <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Email address</label>
                          <input type="email" className="form-control" id="email" aria-describedby="emailHelp" />
                      </div>
                      <div className="form-group">
                          <label htmlFor="message">Message</label>
                          <textarea className="form-control" rows="5" id="message"></textarea>
                      </div>
                      <ContactSuccess
                        contactSuccess={this.state.contactSuccess}
                      />
                      <ContactError 
                        contactError={this.state.contactError}
                      />
                      <button type="submit" className="btn submitButton">Send Message</button>
                  </form>
                </div>
            </div>
        // </div>
        )
    }
}

export default Contact