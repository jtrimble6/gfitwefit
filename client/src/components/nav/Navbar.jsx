import React, { Component } from 'react';
// import { Collapse, Nav, NavItem } from 'reactstrap';
import { NavLink } from 'reactstrap';
// import * as Scroll from 'react-scroll';
import { Link, Events, scrollSpy } from 'react-scroll'
import { stack as Menu } from 'react-burger-menu'
import classnames from "classnames";


// CSS
import '../../css/general/navbar.css'
import logo from '../../css/images/GOUVEIA-FITNESS_Mark_Black.png';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
          collapsed: true,
          prevScrollPos: window.pageYOffset,
          visible: true
        }

        this.toggleNavbar = this.toggleNavbar.bind(this)
        this.handleScroll = this.handleScroll.bind(this)
        this.openNavbar = this.openNavbar.bind(this)
    }

    componentDidMount() {
        Events.scrollEvent.register('begin', function(to, element) {
          console.log('begin', arguments);
        });
    
        Events.scrollEvent.register('end', function(to, element) {
          console.log('end', arguments);
        });
    
        scrollSpy.update();
        // window.addEventListener("scroll", this.handleScroll);
      }
    
    componentWillUnmount() {
        // Events.scrollEvent.remove('begin');
        // Events.scrollEvent.remove('end');
        // window.removeEventListener("scroll", this.handleScroll);
      }

    handleScroll = () => {
      this.toggleNavbar()
      let scheduleInfo = document.getElementById('scheduleInfo')
      console.log('got element: ', scheduleInfo)
      scheduleInfo.scrollIntoView({behavior: "smooth"}); // Boolean parameter
      // let scroll = Scroll.animateScroll;
      // scroll.scrollTo(400);
      // const { prevScrollPos } = this.state;
    
      // const currentScrollPos = window.pageYOffset;
      // const visible = prevScrollPos > currentScrollPos;
    
      // this.setState({
      //   prevScrollPos: currentScrollPos,
      //   visible
      // });
      }

    openNavbar = (event) => {
      event.preventDefault()
      console.log('OPEN NAV')
      this.setState({
        collapsed: false
      })
      console.log('EVENT: ', event.target.href)
      let targetRef = event.target.href
      if (targetRef) {
        window.location = targetRef
      }
      
    }

    toggleNavbar = (event) => {
      // if (event) {
      //   event.preventDefault()
      //   console.log('TOGGLE NAVBAR')
      //   let navbarElement = document.getElementById('burgerMenuElement')
      //   if (!this.state.collapsed) {
      //     this.setState({
      //       collapsed: true
      //     })
      //     navbarElement.classList.add("navbarElementHidden");
      //   } else {
      //     this.setState({
      //       collapsed: false
      //     })
      //     navbarElement.classList.remove("navbarElementHidden");
      //   }
      // } else {
        event.preventDefault()
        let scheduleInfo = document.getElementById('scheduleInfo')
        console.log('got element: ', scheduleInfo)
        scheduleInfo.scrollIntoView({behavior: "smooth"}); // Boolean parameter
        console.log('TOGGLE NAVBAR SCROLL')
        let navbarElement = document.getElementById('burgerMenuElement')
        if (!this.state.collapsed) {
          this.setState({
            collapsed: true
          })
          navbarElement.classList.add("navbarElementHidden");
        } else {
          this.setState({
            collapsed: false
          })
          navbarElement.classList.remove("navbarElementHidden");
        }
      // }
      
        // this.setState({
        //   collapsed: !this.state.collapsed
        // })
        // if (this.state.collapsed) {
        //   // document.getElementById('appRoot').style.filter = 'blur(5px)'
        // } else {
        //   // document.getElementById('appRoot').style.filter = 'blur(0px)'
        // }
        
      }
    

    render() {             
        return (
            <nav 
              className={classnames("navbar navbar-expand-lg navbar fixed-top", {"navbar--hidden": !this.state.collapsed})} 
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

                        {/* COLLAPSED NAVBAR */}
                        <i className="navbarTogglerButtonCustom fas fa-bars navbar-toggler collapsed navbar-toggler-right" 
                          data-toggle='collapse' 
                          data-target="#navbarResponsive" 
                          aria-controls="navbarResponsive" 
                          aria-expanded="false" 
                          aria-label="Toggle navigation" 
                          onClick={this.openNavbar}
                        >
                          <Menu 
                            right 
                            disableAutoFocus               
                            className='burgerMenu navbarElementHidden'
                            id='burgerMenuElement'
                            noOverlay
                            isOpen={!this.state.collapsed}
                            // customBurgerIcon={ bars }
                            customCrossIcon={ <img src={require("../../css/images/cross.png")} alt='close' onClick={this.toggleNavbar} /> } 
                          >
                            <NavLink 
                              className='iconBar nav-link' 
                              // onClick={this.toggleNavbar}
                              href="/"
                            > 
                              HOME
                            </NavLink>

                            <Link
                              activeClass="active"
                              className='iconBar nav-link'
                              onClick={this.toggleNavbar}
                              // to="scheduleInfo"
                              // spy={true}
                              // smooth={true}
                              // offset={-150}
                              // duration={500}
                            > 
                              SEE SCHEDULE 
                            </Link>
                            
                            <NavLink 
                              className='iconBar nav-link' 
                              // onClick={this.toggleNavbar}
                              href="/contact"
                            > 
                              CONTACT US
                            </NavLink>

                            <NavLink 
                              className='iconBar nav-link' 
                              // onClick={this.toggleNavbar}
                              href="/userLogin"
                            > 
                              G-FIT GOLD
                            </NavLink>

                            <NavLink 
                              className='iconBar nav-link signUp' 
                              // onClick={this.toggleNavbar}
                              href="/tryitout"
                            > 
                              TRY IT OUT
                            </NavLink>

                            {/* <NavLink 
                              className='iconBar nav-link' 
                              onClick={this.toggleNavbar}
                              href="/admin"
                            > ADMIN</NavLink> */}
                            {/* <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a> */}
                          </Menu>
                        </i>

                        {/* EXPANDED NAVBAR */}
                        <div className="collapse navbar-collapse" id="navbarResponsive">
                          <ul className="navbar-nav ml-auto">

                            <li className="nav-item" >
                              <a className="nav-link js-scroll-trigger" href='/'>
                                HOME
                              </a>
                            </li>
                            
                            <li className="nav-item">
                              <Link
                                activeClass="active"
                                className='nav-link js-scroll-trigger'
                                // to="scheduleInfo"
                                // spy={true}
                                // smooth={true}
                                // offset={-150}
                                // duration={500}
                                onClick={this.handleScroll}
                              > 
                                SEE SCHEDULE
                              </Link>
                            </li>

                            <li className="nav-item">
                              <a className="nav-link js-scroll-trigger" href='/contact'>
                                CONTACT US
                              </a>
                            </li>

                            <li className="nav-item">
                              <a className="nav-link js-scroll-trigger" href='/userLogin'>
                                G-FIT GOLD
                              </a>
                            </li>
                            
                            <li className="nav-item">
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

export default Navbar