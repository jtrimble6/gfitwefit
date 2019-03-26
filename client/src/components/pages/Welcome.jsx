import React, { Component } from 'react';
import { Link } from "react-scroll";
import logo from '../../css/images/gfit.svg';
// import $ from 'jquery'
import '../../css/landing.css'

class Welcome extends Component {

  render() {                                                       
    return (
    <div className='welcomePage' style={this.props.style}>
      <div className="Landing">
        <header className="Landing-header">
          <img src={logo} className="Landing-logo" alt="logo" />
          <h1>
              Welcome to GFit!
          </h1>
          {/* <a
            className="landing-link"
            href="/Schedule"
            target="_blank"
            rel="noopener noreferrer"
          > See schedule </a> */}
          <Link
            activeClass="active"
            className='landing-link'
            to="tableWorkouts"
            spy={true}
            smooth={true}
            offset={-150}
            duration= {500}
          > See Schedule </Link>
        </header>
      </div>
    </div>
    )
  }
}

export default Welcome