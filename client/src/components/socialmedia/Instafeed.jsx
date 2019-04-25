import React, { Component } from "react";
import Slider from "react-slick";
// import "~slick-carousel/slick/slick.css"; 
// import "~slick-carousel/slick/slick-theme.css";
import '../../css/instafeed.css'

class Instafeed extends Component {
  render() {
    const instagrams = [
      '../../css/images/gfitinsta0419/insta1.jpg',
      '../../css/images/gfitinsta0419/insta2.jpg',
      '../../css/images/gfitinsta0419/insta3.jpg',
      '../../css/images/gfitinsta0419/insta4.jpg',
      '../../css/images/gfitinsta0419/insta5.jpg',
      '../../css/images/gfitinsta0419/insta6.jpg',
      '../../css/images/gfitinsta0419/insta7.jpg',
      '../../css/images/gfitinsta0419/insta8.jpg',
      '../../css/images/gfitinsta0419/insta9.jpg',
      '../../css/images/gfitinsta0419/insta10.jpg',
      '../../css/images/gfitinsta0419/insta11.jpg',
      '../../css/images/gfitinsta0419/insta12.jpg',
      '../../css/images/gfitinsta0419/insta13.jpg',
      '../../css/images/gfitinsta0419/insta14.jpg',
      '../../css/images/gfitinsta0419/insta15.jpg',
      '../../css/images/gfitinsta0419/insta16.jpg',
      '../../css/images/gfitinsta0419/insta17.jpg',
      '../../css/images/gfitinsta0419/insta18.jpg',
      '../../css/images/gfitinsta0419/insta19.jpg',
      '../../css/images/gfitinsta0419/insta20.jpg',
      '../../css/images/gfitinsta0419/insta21.jpg',
      '../../css/images/gfitinsta0419/insta22.jpg',
      '../../css/images/gfitinsta0419/insta23.jpg',
      '../../css/images/gfitinsta0419/insta24.jpg',
      '../../css/images/gfitinsta0419/insta25.jpg',
      '../../css/images/gfitinsta0419/insta26.jpg',
      '../../css/images/gfitinsta0419/insta27.jpg',
      '../../css/images/gfitinsta0419/insta28.jpg',
      '../../css/images/gfitinsta0419/insta29.jpg',
      '../../css/images/gfitinsta0419/insta30.jpg',
      '../../css/images/gfitinsta0419/insta31.jpg',
      '../../css/images/gfitinsta0419/insta32.jpg',
      '../../css/images/gfitinsta0419/insta33.jpg',
      '../../css/images/gfitinsta0419/insta34.jpg',
      '../../css/images/gfitinsta0419/insta35.jpg',
      '../../css/images/gfitinsta0419/insta36.jpg',
      '../../css/images/gfitinsta0419/insta37.jpg',
      '../../css/images/gfitinsta0419/insta38.jpg',
      '../../css/images/gfitinsta0419/insta39.jpg',
      '../../css/images/gfitinsta0419/insta40.jpg',
      '../../css/images/gfitinsta0419/insta41.jpg',
      '../../css/images/gfitinsta0419/insta42.jpg',
      '../../css/images/gfitinsta0419/insta43.jpg',
      '../../css/images/gfitinsta0419/insta44.jpg',
      '../../css/images/gfitinsta0419/insta45.jpg',
      '../../css/images/gfitinsta0419/insta46.jpg',
      '../../css/images/gfitinsta0419/insta47.jpg',
      '../../css/images/gfitinsta0419/insta48.jpg',
      '../../css/images/gfitinsta0419/insta49.jpg',
      '../../css/images/gfitinsta0419/insta50.jpg',
    ]
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
          
          {


          }


          <div>
            <img src={require('../../css/images/gfitinsta0419/insta41.jpg')} alt='InstagramPost'></img>
          </div>
          <div>
            <img src={require('../../css/images/gfitinsta0419/insta44.jpg')} alt='InstagramPost'></img>
          </div>
          <div>
            <img src={require('../../css/images/gfitinsta0419/insta18.jpg')} alt='InstagramPost'></img>
          </div>
          <div>
            <img src={require('../../css/images/gfitinsta0419/insta49.jpg')} alt='InstagramPost'></img>
          </div>
          <div>
            <img src={require('../../css/images/gfitinsta0419/insta38.jpg')} alt='InstagramPost'></img>
          </div>
          <div>
            <img src={require('../../css/images/gfitinsta0419/insta1.jpg')} alt='InstagramPost'></img>
          </div>
          <div>
            <img src={require('../../css/images/gfitinsta0419/insta3.jpg')} alt='InstagramPost'></img>
          </div>
          <div>
            <img src={require('../../css/images/gfitinsta0419/insta25.jpg')} alt='InstagramPost'></img>
          </div>
          <div>
            <img src={require('../../css/images/gfitinsta0419/insta5.jpg')} alt='InstagramPost'></img>
          </div>
          <div>
            <img src={require('../../css/images/gfitinsta0419/insta45.jpg')} alt='InstagramPost'></img>
          </div>
          <div>
            <img src={require('../../css/images/gfitinsta0419/insta48.jpg')} alt='InstagramPost'></img>
          </div>
          <div>
            <img src={require('../../css/images/gfitinsta0419/insta6.jpg')} alt='InstagramPost'></img>
          </div>
          <div>
            <img src={require('../../css/images/gfitinsta0419/insta15.jpg')} alt='InstagramPost'></img>
          </div>
          <div>
            <img src={require('../../css/images/gfitinsta0419/insta7.jpg')} alt='InstagramPost'></img>
          </div>
          <div>
            <img src={require('../../css/images/gfitinsta0419/insta50.jpg')} alt='InstagramPost'></img>
          </div>
          <div>
            <img src={require('../../css/images/gfitinsta0419/insta9.jpg')} alt='InstagramPost'></img>
          </div>
          <div>
            <img src={require('../../css/images/gfitinsta0419/insta34.jpg')} alt='InstagramPost'></img>
          </div>
          <div>
            <img src={require('../../css/images/gfitinsta0419/insta10.jpg')} alt='InstagramPost'></img>
          </div>
          <div>
            <img src={require('../../css/images/gfitinsta0419/insta47.jpg')} alt='InstagramPost'></img>
          </div>
          <div>
            <img src={require('../../css/images/gfitinsta0419/insta12.jpg')} alt='InstagramPost'></img>
          </div>
          <div>
            <img src={require('../../css/images/gfitinsta0419/insta13.jpg')} alt='InstagramPost'></img>
          </div>
          <div>
            <img src={require('../../css/images/gfitinsta0419/insta4.jpg')} alt='InstagramPost'></img>
          </div>
          <div>
            <img src={require('../../css/images/gfitinsta0419/insta14.jpg')} alt='InstagramPost'></img>
          </div>
          
          <div>
            <img src={require('../../css/images/gfitinsta0419/insta2.jpg')} alt='InstagramPost'></img>
          </div>
          <div>
            <img src={require('../../css/images/gfitinsta0419/insta46.jpg')} alt='InstagramPost'></img>
          </div>
          <div>
            <img src={require('../../css/images/gfitinsta0419/insta17.jpg')} alt='InstagramPost'></img>
          </div>

          <div>
            <img src={require('../../css/images/gfitinsta0419/insta43.jpg')} alt='InstagramPost'></img>
          </div>
          <div>
            <img src={require('../../css/images/gfitinsta0419/insta30.jpg')} alt='InstagramPost'></img>
          </div>
          <div>
            <img src={require('../../css/images/gfitinsta0419/insta19.jpg')} alt='InstagramPost'></img>
          </div>
          
          <div>
            <img src={require('../../css/images/gfitinsta0419/insta21.jpg')} alt='InstagramPost'></img>
          </div>
          <div>
            <img src={require('../../css/images/gfitinsta0419/insta39.jpg')} alt='InstagramPost'></img>
          </div>
          <div>
            <img src={require('../../css/images/gfitinsta0419/insta33.jpg')} alt='InstagramPost'></img>
          </div>
          <div>
            <img src={require('../../css/images/gfitinsta0419/insta22.jpg')} alt='InstagramPost'></img>
          </div>
          
          <div>
            <img src={require('../../css/images/gfitinsta0419/insta24.jpg')} alt='InstagramPost'></img>
          </div>
          
          <div>
            <img src={require('../../css/images/gfitinsta0419/insta26.jpg')} alt='InstagramPost'></img>
          </div>
          <div>
            <img src={require('../../css/images/gfitinsta0419/insta27.jpg')} alt='InstagramPost'></img>
          </div>
          <div>
            <img src={require('../../css/images/gfitinsta0419/insta40.jpg')} alt='InstagramPost'></img>
          </div>
          <div>
            <img src={require('../../css/images/gfitinsta0419/insta28.jpg')} alt='InstagramPost'></img>
          </div>
          <div>
            <img src={require('../../css/images/gfitinsta0419/insta20.jpg')} alt='InstagramPost'></img>
          </div>
          <div>
            <img src={require('../../css/images/gfitinsta0419/insta29.jpg')} alt='InstagramPost'></img>
          </div>
          
          <div>
            <img src={require('../../css/images/gfitinsta0419/insta42.jpg')} alt='InstagramPost'></img>
          </div>
          <div>
            <img src={require('../../css/images/gfitinsta0419/insta35.jpg')} alt='InstagramPost'></img>
          </div>
          <div>
            <img src={require('../../css/images/gfitinsta0419/insta16.jpg')} alt='InstagramPost'></img>
          </div>
          <div>
            <img src={require('../../css/images/gfitinsta0419/insta8.jpg')} alt='InstagramPost'></img>
          </div>
          
          <div>
            <img src={require('../../css/images/gfitinsta0419/insta31.jpg')} alt='InstagramPost'></img>
          </div>
          <div>
            <img src={require('../../css/images/gfitinsta0419/insta32.jpg')} alt='InstagramPost'></img>
          </div>
          
          
         
          <div>
            <img src={require('../../css/images/gfitinsta0419/insta11.jpg')} alt='InstagramPost'></img>
          </div>
          <div>
            <img src={require('../../css/images/gfitinsta0419/insta37.jpg')} alt='InstagramPost'></img>
          </div>
          <div>
            <img src={require('../../css/images/gfitinsta0419/insta23.jpg')} alt='InstagramPost'></img>
          </div>
          
          <div>
            <img src={require('../../css/images/gfitinsta0419/insta36.jpg')} alt='InstagramPost'></img>
          </div>
          {/* <div>
            <img src={require('../../css/images/gfitinsta0419/insta40.jpg')} alt='InstagramPost'></img>
          </div>
          <div>
            <img src={require('../../css/images/gfitinsta0419/insta41.jpg')} alt='InstagramPost'></img>
          </div>
          <div>
            <img src={require('../../css/images/gfitinsta0419/insta42.jpg')} alt='InstagramPost'></img>
          </div>
          <div>
            <img src={require('../../css/images/gfitinsta0419/insta43.jpg')} alt='InstagramPost'></img>
          </div>
          <div>
            <img src={require('../../css/images/gfitinsta0419/insta44.jpg')} alt='InstagramPost'></img>
          </div>
          <div>
            <img src={require('../../css/images/gfitinsta0419/insta45.jpg')} alt='InstagramPost'></img>
          </div> */}
        </Slider>
      </div>
    );
  }
}

export default Instafeed