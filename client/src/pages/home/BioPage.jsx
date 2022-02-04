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
            trainerBio3: '',
            trainerBio4: ''
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
                  trainerName: 'Walt Gouveia',
                  trainerBio1: 'Walt Gouveia is the co-owner of Gouveia Fitness (G-FIT). He played football and baseball in high school and went on to play college football for Shepherd University. He earned 1st team All Conference Linebacker honors and received 4 conference championship rings.',
                  trainerBio2: 'After his college career, we was under his mentor Eddie Mason, who played Linebacker for the Washington Redskins. He worked for Eddie’s gym (Mase Training) for 3 years where he learned the business of health and fitness.',
                  trainerBio3: 'In 2018 he and his brother Kyle decided to step out in Faith and went to pursue their childhood dream which was to open a gym of their own. They are now training adults and kids in the Cornelius / Huntersville area of North Carolina. They also coach JV football for SouthLake Christian. Go Eagles!!!',
                  trainerBio4: 'Walt lives in Davidson NC with the love of his life (Rhema) and doing their best to raise 2 kids. Liliana and Gavin. We also can’t forget their pup Samson.'
                });
                break;
            case 'kyle':
                this.setState({
                  trainerImg: kyle,
                  trainerName: 'Kyle Gouveia',
                  trainerBio1: 'Kyle Gouveia is the co-owner of Gouveia Fitness. Health and fitness have always been a passion, and lifestyle for kyle after growing up active and involved in sports. He earned his Bachelor of Science degree from James Madison University with a concentration in Kinesiology and Health sciences.',
                  trainerBio2: 'After college, Kyle received his personal training certification from The American College of Sports Medicine. He began his fitness career at Sport & Health in Northern Virginia with the Explosive Performance team which focuses primarily on athletes, and sports performance training. After a few years training in VA, he made the move to Charlotte with his wife, where he continued to personal train for gyms around the Lake Norman area. Kyle was introduced to the South Lake Christian Academy community shortly after moving to Charlotte, and began assisting with training and coaching the lacrosse and football teams. In 2018, Kyle decided it was time to pursuit his dream of owning a gym with his brother Walt.',
                  trainerBio3: '“I became a gym owner because I wanted to help change lives forever. It was always something Walt and I had talked about since we were younger. In God’s timing we were finally able to make it happen. We didnt want to start just any gym, but rather build a community where people can have fun, feel healthy, and create life long memories.”',
                  trainerBio4: 'We are proud of our Gouveia Fitness family, and the community that has formed. We are excited to see how G-Fit impacts each and every persons’ health and fitness journey!'
                });
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
                    trainerBio4={this.state.trainerBio4}
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