import React, { Component } from 'react';
import '../../css/about.css'

class About extends Component {

    render() {                                                                  
        return (
        // <div className='container'>
            <div className='aboutPage'>
                <h1>Who We Are:</h1>
                <div className="row">
                  <div className="col trainer">
                    <img src={require('../../css/images/gfitinsta/wg.jpg')} alt='Walter Gouveia'></img>
                    <p className='name'>Walt Gouveia</p>
                    <p className='position'>Owner</p>
                  </div>
                  <div className="col trainer">
                    <img src={require('../../css/images/gfitinsta/kg.jpeg')} alt='Kyle Gouveia'></img>
                    <p className='name'>Kyle Gouveia</p>
                    <p className='position'>Head Trainer</p>
                  </div>
                  {/* <div className="col trainer">
                    <img src={require('../../css/images/gfitinsta/jt.png')} alt='Joshua Trimble'></img>
                    <p className='name'>Josh Trimble</p>
                    <p className='position'>Lead Developer</p>
                  </div> */}
                </div>
                <div className="row">
                   <p>
                     Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                   </p>
                   <p>
                     Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                   </p>
                </div>
            </div>
        // </div>
        )
    }
}

export default About