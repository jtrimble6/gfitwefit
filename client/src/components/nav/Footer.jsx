import React, { Component } from 'react';
import classnames from "classnames";
import '../../css/navbar.css'

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
            <span 
              className={classnames("row connectIcons", {"connectIcons--hidden": !this.state.visible})} 
            >
            
                    <a href='https://www.instagram.com/gfitwefit/?hl=en' target='_blank' rel='noopener noreferrer'>
                        <i className="fab fa-instagram"></i>
                    </a>
                    <a href='https://www.facebook.com/gfitwefit/' target='_blank' rel='noopener noreferrer'>
                        <i className="fab fa-facebook-square"></i>
                    </a>
                    <a href='https://goo.gl/maps/C1jpxUZfzX1wt42D8' target='_blank' rel='noopener noreferrer'>
                    <i className="fas fa-map-marker-alt"></i>
                    </a>

            </span>
        )
    }
}

export default Footer