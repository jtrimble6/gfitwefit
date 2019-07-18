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
                    <img src={require('../../css/images/gfitinsta/gfitfam.jpg')} alt='Walter Gouveia & Kyle Gouveia'></img>
                    <p className='name'>Walt Gouveia & Kyle Gouveia</p>
                    <p className='position'>Co-Owners</p>
                  </div>
                  {/* <div className="col trainer">
                    <img src={require('../../css/images/gfitinsta/kg.jpeg')} alt='Kyle Gouveia'></img>
                    <p className='name'>Kyle Gouveia</p>
                    <p className='position'>Co-Owner</p>
                  </div> */}
                  {/* <div className="col trainer">
                    <img src={require('../../css/images/gfitinsta/jt.png')} alt='Joshua Trimble'></img>
                    <p className='name'>Josh Trimble</p>
                    <p className='position'>Lead Developer</p>
                  </div> */}
                </div>
                <div className="row">
                   <p>
                     Gouveia Fitness is a family-owned and operated fitness center located at 18515 Old Statesville Rd in Cornelius, NC! Here at G-FIT we bring community and fitness together in one place. If you’re looking to lose weight/body fat, gain muscular strength/endurance, or boost your confidence, G-FIT offers adult group classes that will help you reach your goals. Our training foundation is based on creative interval workouts that provide a safe and upbeat environment. The G-fit team schedules monthly events, so we can all work toward a common goal, and strengthen our community outside of the gym.
                   </p>
                   <p>
                     The co-ed Junior Elite program is for young athletes ages 7-13. Our main focus is to develop speed and agility, functional strength and promote discipline! <br /> <br />
                     Come in and receive your free week today!
                   </p>
                </div> <hr />
                <div className="trainerBlog">
                  <h2 className='trainerHeader'>Meet Our Trainers:</h2>
                  <div className="row">
                    <div className="col trainer">
                      {/* <img src={require('../../css/images/gfitinsta/gfitfam.jpg')} alt='Jennifer'></img> */}
                      <h1 className='trainerName'>Jennifer</h1>
                      {/* <p className='position'>Trainer</p> */}
                    </div>
                    {/* <div className="col trainer">
                      <img src={require('../../css/images/gfitinsta/kg.jpeg')} alt='Kyle Gouveia'></img>
                      <p className='name'>Kyle Gouveia</p>
                      <p className='position'>Co-Owner</p>
                    </div> */}
                    {/* <div className="col trainer">
                      <img src={require('../../css/images/gfitinsta/jt.png')} alt='Joshua Trimble'></img>
                      <p className='name'>Josh Trimble</p>
                      <p className='position'>Lead Developer</p>
                    </div> */}
                </div>
                  <div className="row">
                     <p>
                       Jennifer believes that exercise and working out does not have to be a daunting task.  Her creativity shines through in her design of workouts for individuals and classes that are fun, educational and highly effective. She strives to push people to be the best, strongest and healthiest versions of themselves through healthy living and dedication to exercise.  Her passion lies in this approach, both personally and professionally.
                     </p>
                     <p>
                       Jennifer spent two decades working twelve hour shifts as a Dispatcher and 911 operator.  She is no stranger to the negative mental and physical effects of working long hours in a desk-bound environment. Fitness became the perfect outlet while also decreasing the challenges that can be associated with having Type One diabetes for nearly a lifetime.  Jennifer dedicates her personal journey to inspire her clients to live stronger lives, both mind and body. <br /> <br />
                       Jennifer is a Certified Personal Trainer and Certified Group Personal Trainer through the National Association of Sports Medicine.
                     </p>
                  </div>
                </div>
            </div>
        // </div>
        )
    }
}

export default About