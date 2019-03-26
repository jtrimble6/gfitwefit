import React, { Component } from 'react';
// import { Collapse, Nav, NavItem } from 'reactstrap';
import { NavLink } from 'reactstrap';
import { Link, animateScroll as scroll } from "react-scroll";
import { slide as Menu } from 'react-burger-menu'
import '../../css/navbar.css'

class AdminBar extends Component {
    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);

        this.state = {
          collapsed: true
        }
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        })
      }

    render() {                                                                  
        return (
            <nav className="navbar navbar-expand-lg navbar-light fixed-top" role='navigation' id="mainNav">
                {/* <div className="container"> */}
                  <div className="row masterRow">

                    <div className="brandName">
                      <a className="navbar-brand js-scroll-trigger" href="/">GFit</a>
                    </div>

                    <div className="pages">
                      <div className="row">
                        <button className="navbar-toggler collapsed navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" onClick={this.toggleNavbar}>
                        <Menu 
                          right 
                          noOverlay
                          customCrossIcon={ <img src={require("../../css/images/cross.png")} alt='close' /> }
                          isOpen={!this.state.collapsed}
                          width='25%'
                          padding='10%'
                          className='burgerMenu'
                        >
                          <NavLink
                            activeClass="active"
                            className=' iconBar nav-link'
                            onClick={this.toggleNavbar}
                            href='/'
                          > Home </NavLink>
                          <NavLink 
                            className=' iconBar nav-link' 
                            onClick={this.toggleNavbar}
                            href="/logout"
                          > Logout </NavLink>
                          {/* <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a> */}
                        </Menu>
                        </span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto">
                          <li className="nav-item" >
                            <NavLink
                              activeClass="active"
                              className='nav-link js-scroll-trigger'
                              href='/'
                            > Home </NavLink>
                          </li>
                          <li className="nav-item" >
                            <NavLink
                              activeClass="active"
                              className='nav-link js-scroll-trigger'
                              href='/logout'
                            > Logout </NavLink>
                          </li>
                        </ul>
                        </div>
                      </div>
                      
                    </div>

                    <div className="row connectIcons">
                        <a href='https://www.instagram.com/gfitwefit/?hl=en' target='_blank' rel='noopener noreferrer'>
                          <i className="fab fa-instagram"></i>
                        </a>
                        <a href='https://www.facebook.com/gfitwefit/' target='_blank' rel='noopener noreferrer'>
                          <i className="fab fa-facebook-square"></i>
                        </a>
                        <a href='https://goo.gl/maps/itU5E9NRMvw' target='_blank' rel='noopener noreferrer'>
                        <i className="fas fa-map-marker-alt"></i>
                        </a>
                    </div>
                      
                  </div>
                    
                {/* </div> */}
            </nav>
        )
    }
}

export default AdminBar