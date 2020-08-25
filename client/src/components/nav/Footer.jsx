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
          <div className="footerLanding">
            <Row className='footerRow'>
                <Col className='footerBrand'>
                  {/* <Row> */}
                    <span className='footerLogoDiv'>
                      <img src={logo} className="footerLogo" alt="Gouveia Fitness Footer Logo" />
                    </span>
                    <span className='footerTitleDiv'>
                      <h2 className='footerTitle'>GOUVEIA FITNESS</h2>
                    </span>
                  {/* </Row> */}
                </Col>
                <Col className='footerInfo'>
                  <Row className='footerAddress'>
                    <p>18515 OLD STATESVILLE ROAD, CORNELIUS, NC 28031</p>
                  </Row>
                  <Row className='footerDisclaimer'>
                    <p>All material copyright 2020 Gouveia Fitness, LLC, Use only with permission.</p>
                  </Row>
                </Col>
                <Col className='footerSocial'>
                  <a href='https://goo.gl/maps/C1jpxUZfzX1wt42D8' target='_blank' rel='noopener noreferrer' aria-label="Google Maps">
                    <i className="fas fa-map-marker-alt footerIcon"></i>
                  </a>
                  <a href='https://www.instagram.com/gfitwefit/?hl=en' target='_blank' rel='noopener noreferrer' aria-label="Instagram">
                    <i className="fab fa-instagram footerIcon"></i>
                  </a>
                  <a href='https://www.facebook.com/gfitwefit/' target='_blank' rel='noopener noreferrer' aria-label="Facebook">
                    <i className="fab fa-facebook-square footerIcon"></i>
                  </a>
                </Col>
            </Row>
          </div>
        )
    }
}

export default Footer