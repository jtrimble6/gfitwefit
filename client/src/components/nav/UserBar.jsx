import React, { Component } from 'react';
import { NavLink } from 'reactstrap';
import { slide as Menu } from 'react-burger-menu'
import logo from '../../css/images/GOUVEIA-FITNESS_Mark_Black.png';
import classnames from "classnames";
import CloseIcon from '@material-ui/icons/Close';
import '../../css/navbar.css'

class UserBar extends Component {
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
                            activeclass="active"
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
                        </i>
                        <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto">
                          <li className="nav-item" >
                            <NavLink
                              activeclass="active"
                              className='nav-link js-scroll-trigger'
                              href='/'
                            > Home </NavLink>
                          </li>
                          <li className="nav-item" >
                            <NavLink
                              activeclass="active"
                              className='nav-link js-scroll-trigger'
                              href='/logout'
                            > Logout </NavLink>
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

export default UserBar