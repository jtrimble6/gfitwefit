import React, { Component } from 'react';
// import { Collapse, Nav, NavItem } from 'reactstrap';
import { NavLink } from 'reactstrap';
import { Link} from "react-scroll";
import { slide as Menu } from 'react-burger-menu'
import classnames from "classnames";
import Footer from "./Footer"
import '../../css/navbar.css'

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.handleScroll = this.handleScroll.bind(this);

        this.state = {
          collapsed: true,
          prevScrollpos: window.pageYOffset,
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
      const { prevScrollpos } = this.state;
    
      const currentScrollPos = window.pageYOffset;
      const visible = prevScrollpos > currentScrollPos;
    
      this.setState({
        prevScrollpos: currentScrollPos,
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
            <nav 
              className={classnames("navbar navbar-expand-lg navbar-light fixed-top", {"navbar--hidden": !this.state.visible})} 
              role='navigation' 
              id="mainNav"
            >
                {/* <div className="container"> */}
                  <div className="row masterRow">

                    <div className="brandName">
                      <a className="navbar-brand js-scroll-trigger" href="/">GFIT</a>
                    </div>

                    <div className="pages">
                      <div className="row">
                        <i className="fas fa-bars navbar-toggler collapsed navbar-toggler-right" data-toggle='collapse' data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation" onClick={this.toggleNavbar}>
                        <Menu 
                          right 
                          noOverlay
                          // customBurgerIcon={ bars }
                          customCrossIcon={ <img src={require("../../css/images/cross.png")} alt='close' /> }
                          isOpen={!this.state.collapsed}
                          width='25%'
                          padding='10%'
                          className='burgerMenu'
                        >
                          <Link
                            activeClass="active"
                            className=' iconBar nav-link'
                            onClick={this.toggleNavbar}
                            to="welcomePage"
                            spy={true}
                            smooth={true}
                            offset={-100}
                            duration= {500}
                          > Home </Link>
                          <Link
                            activeClass="active"
                            className=' iconBar nav-link'
                            onClick={this.toggleNavbar}
                            to="tableWorkouts"
                            spy={true}
                            smooth={true}
                            offset={-150}
                            duration= {500}
                          > Schedule </Link>
                          <Link
                            activeClass="active"
                            className=' iconBar nav-link'
                            onClick={this.toggleNavbar}
                            to="facebookFeed"
                            spy={true}
                            smooth={true}
                            offset={-140}
                            duration= {500}
                          > Reviews </Link>
                          <Link
                            activeClass="active"
                            className=' iconBar nav-link'
                            onClick={this.toggleNavbar}
                            to="aboutPage"
                            spy={true}
                            smooth={true}
                            offset={-110}
                            duration= {500}
                          > About </Link>
                          <Link
                            activeClass="active"
                            className=' iconBar nav-link'
                            onClick={this.toggleNavbar}
                            to="contactPage"
                            spy={true}
                            smooth={true}
                            offset={-100}
                            duration= {500}
                          > Contact </Link>
                          <NavLink 
                            className=' iconBar nav-link' 
                            onClick={this.toggleNavbar}
                            href="/admin"
                          > Admin</NavLink>
                          {/* <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a> */}
                        </Menu>
                        </i>
                        <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto">
                          <li className="nav-item" >
                            <Link
                              activeClass="active"
                              className='nav-link js-scroll-trigger'
                              to="welcomePage"
                              spy={true}
                              smooth={true}
                              offset={-100}
                              duration= {500}
                            > Home </Link>
                          </li>
                          <li className="nav-item">
                            <Link
                              activeClass="active"
                              className='nav-link js-scroll-trigger'
                              to="tableWorkouts"
                              spy={true}
                              smooth={true}
                              offset={-150}
                              duration= {500}
                            > Schedule </Link>
                          </li>
                          <li className="nav-item" >
                            <Link
                              activeClass="active"
                              className='nav-link js-scroll-trigger'
                              to="facebookFeed"
                              spy={true}
                              smooth={true}
                              offset={-140}
                              duration= {500}
                            > Reviews </Link>
                          </li>
                          <li className="nav-item" >
                            <Link
                              activeClass="active"
                              className='nav-link js-scroll-trigger'
                              to="aboutPage"
                              spy={true}
                              smooth={true}
                              offset={-70}
                              duration= {500}
                            > About </Link>
                          </li>
                          <li className="nav-item" >
                            <Link
                              activeClass="active"
                              className='nav-link js-scroll-trigger'
                              to="contactPage"
                              spy={true}
                              smooth={true}
                              offset={-100}
                              duration= {500}
                            > Contact </Link>
                          </li>
                          <li className="nav-item" >
                            <a className="nav-link js-scroll-trigger" href='/admin'>Admin</a>
                          </li>
                        </ul>
                        </div>
                      </div>
                      
                    </div>

                    <Footer />
                      
                  </div>
                    
                {/* </div> */}
            </nav>
        )
    }
}

export default Navbar