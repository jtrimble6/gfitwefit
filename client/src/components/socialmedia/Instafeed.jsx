import React, { Component } from "react";
import Slider from "react-slick";
// import "~slick-carousel/slick/slick.css"; 
// import "~slick-carousel/slick/slick-theme.css";
import '../../css/instafeed.css'

class Instafeed extends Component {
  render() {
    const settings = {
      className: "center",
      centerMode: true,
      infinite: true,
      centerPadding: "60px",
      slidesToShow: 4,
      autoplay: true,
      speed: 500,
      arrows: false,
      responsive: [
        {
          breakpoint: 1222,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            centerPadding: "20px",
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 1000,
          settings: {
            centerPadding: "20px",
            slidesToShow: 3,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 900,
          settings: {
            centerPadding: "13px",
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 650,
          settings: {
            centerPadding: "43px",
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 500,
          settings: {
            centerPadding: "0px",
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    return (
      <div className='instafeed' style={this.props.style}>
        <Slider {...settings}>
          <div>
            <img src={require('../../css/images/gfitinsta/insta1.jpg')} alt='InstagramPost'></img>
          </div>
          <div>
            <img src={require('../../css/images/gfitinsta/insta2.jpg')} alt='InstagramPost'></img>
          </div>
          <div>
            <img src={require('../../css/images/gfitinsta/insta3.jpg')} alt='InstagramPost'></img>
          </div>
          <div>
            <img src={require('../../css/images/gfitinsta/insta4.jpg')} alt='InstagramPost'></img>
          </div>
          <div>
            <img src={require('../../css/images/gfitinsta/insta5.jpg')} alt='InstagramPost'></img>
          </div>
          <div>
            <img src={require('../../css/images/gfitinsta/insta6.jpg')} alt='InstagramPost'></img>
          </div>
          <div>
            <img src={require('../../css/images/gfitinsta/insta7.jpg')} alt='InstagramPost'></img>
          </div>
          <div>
            <img src={require('../../css/images/gfitinsta/insta8.jpg')} alt='InstagramPost'></img>
          </div>
          <div>
            <img src={require('../../css/images/gfitinsta/insta9.jpg')} alt='InstagramPost'></img>
          </div>
          <div>
            <img src={require('../../css/images/gfitinsta/insta10.jpg')} alt='InstagramPost'></img>
          </div>
        </Slider>
      </div>
    );
  }
}

export default Instafeed