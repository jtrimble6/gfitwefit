import React, { Component } from 'react';
import '../../css/contact.css'

class Contact extends Component {

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
                  <div className="col contactTrainer">
                    <img src={require('../../css/images/gfitinsta/kg.jpeg')} alt='Kyle Gouveia'></img>
                    <p className='name'>Kyle Gouveia</p>
                    <p className='position'>Co-Owner</p>
                    <p className='phone'>703.554.5731</p>
                  </div>
                </div>
            </div>
        // </div>
        )
    }
}

export default Contact