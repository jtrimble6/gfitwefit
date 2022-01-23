import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap'

// CSS
import '../../css/general/footer.css'
import logo from '../../css/images/GOUVEIA-FITNESS_Mark_White.png';


class Footer extends Component {
    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.handleScroll = this.handleScroll.bind(this);

        this.state = {
          collapsed: true,
          prevScrollPos: window.pageYOffset,
          visible: true
        }
    }

    componentDidMount() {
      window.addEventListener("scroll", this.handleScroll);
    }
    
    componentWillUnmount() {
      window.removeEventListener("scroll", this.handleScroll);
    }

    handleScroll = () => {
      const { prevScrollPos } = this.state;
    
      const currentScrollPos = window.pageYOffset;
      const visible = prevScrollPos > currentScrollPos;
    
      this.setState({
        prevScrollPos: currentScrollPos,
        visible
      });
    };

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        })
      }

    render() {                                                          
        return (
          <div className="footerLandingPage">
            {/* <Row className='footerRow'> */}
                <div className='footerTopRow'>
                    <div className='footerDetailsDiv'>
                      <p className='footerDetailsAddress'>18515 OLD STATESVILLE ROAD, CORNELIUS, NC 28031</p>
                      <p className='footerDetailsCopyright'>All material copyright 2020 Gouveia Fitness, LLC, Use only with permission.</p>
                    </div>
                </div>
                <div className='footerBottomRow'>
                  {/* <div className='footerBrandCol'> */}
                      <div className='footerLogoSpan'>
                        <img src={logo} className="footerIconLogo" alt="Gouveia Fitness Footer Logo" />
                        <h2 className='footerIconTitle'>GOUVEIA FITNESS</h2>
                      </div>
                  {/* </div> */}
                  <div className='footerSocialCol'>
                    <div className='footerSocialDiv'>
                      <a href='https://goo.gl/maps/C1jpxUZfzX1wt42D8' target='_blank' rel='noopener noreferrer' aria-label="Google Maps">
                        <i className="fas fa-map-marker-alt footerIcon"></i>
                      </a>
                    </div>
                    <div className='footerSocialDiv'>
                      <a href='https://www.instagram.com/gfitwefit/?hl=en' target='_blank' rel='noopener noreferrer' aria-label="Instagram">
                        <i className="fab fa-instagram footerIcon"></i>
                      </a>
                    </div>
                    <div className='footerSocialDiv'>
                      <a href='https://www.facebook.com/gfitwefit/' target='_blank' rel='noopener noreferrer' aria-label="Facebook">
                        <i className="fab fa-facebook-square footerIcon"></i>
                      </a>
                    </div>
                  </div>
                </div>
                
            {/* </Row> */}
          </div>
        )
    }
}

export default Footer