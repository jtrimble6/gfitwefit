import React, { Component } from 'react';
// import { Collapse, Nav, NavItem } from 'reactstrap';
import { NavLink } from 'reactstrap';
import { stack as Menu } from 'react-burger-menu'
import classnames from "classnames";

// CSS 
import '../../css/general/navbar.css'
import logo from '../../css/images/GOUVEIA-FITNESS_Mark_Black.png';

class NavbarSecondaryPage extends Component {
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
        if (this.state.collapsed) {
          // document.getElementById('appRoot').style.filter = 'blur(5px)'
        } else {
          // document.getElementById('appRoot').style.filter = 'blur(0px)'
        }
        
      }

    render() {                                                          
        return (
            <nav 
              className={classnames("navbar navbar-expand-lg navbar fixed-top", {"navbar--hidden": !this.state.visible})} 
              role='navigation' 
              id="mainNav"
            >
              <span className="brandName">
                {/* <a className="navbar-brand js-scroll-trigger" href="/">GFIT</a> */}
                <img src={logo} className="navbar-brand Navbar-logo" alt="logo" />
              </span>
                {/* <div className="container"> */}
                  <div className="row masterRow">
                    <div className="pages">
                      <div className="row">
                        <i className="navbarTogglerButtonCustom fas fa-bars navbar-toggler collapsed navbar-toggler-right" data-toggle='collapse' data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation" onClick={this.toggleNavbar}>
                        <Menu 
                          right 
                          disableAutoFocus               
                          className='burgerMenu'
                          // noOverlay
                          // customBurgerIcon={ bars }
                          customCrossIcon={ <img src={require("../../css/images/cross.png")} alt='close' /> } 
                        >
                          <NavLink 
                            className=' iconBar nav-link' 
                            onClick={this.toggleNavbar}
                            href="/"
                          > HOME</NavLink>
                          <NavLink 
                            className=' iconBar nav-link' 
                            onClick={this.toggleNavbar}
                            href="/userLogin"
                          > G-FIT GOLD</NavLink>
                          <NavLink 
                            className=' iconBar nav-link' 
                            onClick={this.toggleNavbar}
                            href="/contact"
                          > CONTACT US</NavLink>
                          <NavLink 
                            className=' iconBar nav-link signUp' 
                            onClick={this.toggleNavbar}
                            href="/tryitout"
                          > TRY IT OUT</NavLink>
                          {/* <NavLink 
                            className=' iconBar nav-link' 
                            onClick={this.toggleNavbar}
                            href="/admin"
                          > ADMIN</NavLink> */}
                          {/* <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a> */}
                        </Menu>
                        </i>
                        <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto">
                          <li className="nav-item" >
                            <a className="nav-link js-scroll-trigger" href='/'>
                              HOME
                            </a>
                          </li>
                          <li className="nav-item" >
                            <a className="nav-link js-scroll-trigger" href='/userLogin'>
                              G-FIT GOLD
                            </a>
                          </li>
                          <li className="nav-item" >
                            <a className="nav-link js-scroll-trigger" href='/contact'>
                              CONTACT US
                            </a>
                          </li>
                          <li className="nav-item" >
                            <a className="nav-link js-scroll-trigger signUp" href='/tryitout'>
                              TRY IT OUT
                            </a>
                          </li>
                        </ul>
                        </div>
                      </div>
                      
                    </div>
                      
                  </div>
                    
                {/* </div> */}
            </nav>
        )
    }
}

export default NavbarSecondaryPage