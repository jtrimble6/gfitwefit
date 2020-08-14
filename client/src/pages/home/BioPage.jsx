import React, { Component } from 'react';

// COMPONENTS
import NavbarSecondaryPage from '../../components/nav/NavbarSecondaryPage'
import Footer from '../../components/nav/Footer'
import BioLanding from '../../components/home/BioLanding'
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
            trainerImg: '',
            trainerBio: 'This is where the trainer bio will appear. Fitness bio can be confusing, that’s why we have simplified our bio down to make it easy to understand. But the financial cost of your fitness goals are only half of the real cost. Time and commitment are possibly the most expensive part of your journey. But we promise that if you stick with it, you’ll thank yourself later.'
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
                    trainerImg: walt
                });
                break;
            case 'kyle':
                this.setState({
                    trainerImg: kyle
                });
                break;
            case 'jenn':
                this.setState({
                    trainerImg: jenn
                })
                break;
            case 'jacob':
                this.setState({
                    trainerImg: jacob
                })
                break;
            default:
                return;
        }
          
    }

    render() {                                                                  
        return (
            <div>
                <NavbarSecondaryPage />
                <BioLanding 
                    trainerImg={this.state.trainerImg}
                />
                <BioInfo 
                    trainerBio={this.state.trainerBio}
                />
                <Footer />
            </div>
        )
    }
}

export default BioPage