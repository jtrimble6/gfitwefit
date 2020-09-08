import React, { Component } from 'react';

// COMPONENTS
import NavbarSecondaryPage from '../../components/nav/NavbarSecondaryPage'
import Footer from '../../components/nav/Footer'
// import BioLanding from '../../components/home/BioLanding'
import BioInfo from '../../components/home/BioInfo'

// CSS
import walt from '../../css/images/headshots/Walt.jpg'
import kyle from '../../css/images/headshots/Kyle.jpg'
import jenn from '../../css/images/headshots/Jenn.jpeg'
import jacob from '../../css/images/headshots/Jacob.jpg'

class BioPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            trainerName: '',
            trainerImg: '',
            trainerBio1: 'This is where the trainer bio will appear. Fitness bio can be confusing, that’s why we have simplified our bio down to make it easy to understand. But the financial cost of your fitness goals are only half of the real cost. Time and commitment are possibly the most expensive part of your journey. But we promise that if you stick with it, you’ll thank yourself later.',
            trainerBio2: '',
            trainerBio3: ''
        }

        this.getTrainerInfo = this.getTrainerInfo.bind(this)
        
    }

    componentDidMount() {
        this.getTrainerInfo()
    }

    getTrainerInfo = () => {
        let params = (new URL(document.location)).searchParams
        let trainer = params.get("trainer")

        switch(trainer) {
            case 'walt':
                this.setState({
                  trainerImg: walt,
                  trainerName: 'Walt Gouveia'
                });
                break;
            case 'kyle':
                this.setState({
                  trainerImg: kyle,
                  trainerName: 'Kyle Gouveia'
                });
                break;
            case 'jenn':
                this.setState({
                  trainerImg: jenn,
                  trainerName: 'Jennifer Coleman',
                  trainerBio1: 'Jennifer is a Christ following fitness lover!  She is a firm believer that exercise is not just about “fixing up” what we see on the outside.  Exercise and movement are a means to reach what’s happening on the inside as well.   With Jennifer’s thoughtful workouts, sessions won’t be mundane or boring.  She takes careful consideration when creating any group or individual workout in order to provide challenging, fun and highly effective workouts, no matter your fitness level.   She strives to push people to be the best, strongest and healthiest versions of themselves through faith, healthy living and exercise. Her passion lies in putting Christ first, both personally and professionally, healthy living and exercise!',
                  trainerBio2: 'Jennifer spent two decades working twelve hour shifts as a Dispatcher and 911 operator. She is no stranger to the negative mental and physical effects of high stress and working long hours in a desk-bound environment. Fitness became the perfect outlet while also decreasing the challenges that can be associated with having Type One diabetes for nearly a lifetime.  She dedicates her personal journey to inspire her clients to walk in faith, live healthier lives, and move the bodies that were created just for them!',
                  trainerBio3: 'If you’re feeling scared – look up -you are not alone! If you are feeling weak- He’s got you! If you’re feeling doubtful – turn it over to Him!  Jennifer is a certified Personal Trainer and Group Fitness Instructor though the National Academy of Sports Medicine. She is currently working on her certification as a Fitness Instructor with Revelation Wellness.'
                })
                break;
            case 'jacob':
                this.setState({
                  trainerImg: jacob,
                  trainerName: 'Jacob Erdtmann'
                })
                break;
            default:
                return;
        }
          
    }

    render() {                                                                  
        return (
            <div className='appPageMainDiv'>
                <div className="navbarDiv">
                  <NavbarSecondaryPage />
                </div>
                <div className="contentsDiv">
                  <BioInfo 
                    trainerImg={this.state.trainerImg}
                    trainerBio1={this.state.trainerBio1}
                    trainerBio2={this.state.trainerBio2}
                    trainerBio3={this.state.trainerBio3}
                    trainerName={this.state.trainerName}
                  />
                </div>
                <div className="footerDiv">
                  <Footer />
                </div>
            </div>
        )
    }
}

export default BioPage