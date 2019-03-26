import React, { Component } from "react";
import Slider from "react-slick";
// import "~slick-carousel/slick/slick.css"; 
// import "~slick-carousel/slick/slick-theme.css";
import '../../css/facebookfeed.css'

class Facebookfeed extends Component {
  render() {
    const settings = {
      className: "center",
      centerMode: true,
      infinite: true,
      centerPadding: "70px",
      slidesToShow: 3,
      autoplay: true,
      speed: 500,
      arrows: false,
      responsive: [
        {
          breakpoint: 1222,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            centerPadding: "30px",
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 1000,
          settings: {
            centerPadding: "20px",
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 700,
          settings: {
            centerPadding: "13px",
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 500,
          settings: {
            centerPadding: "3px",
            slidesToShow: 1,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 321,
          settings: {
            centerPadding: "-20px",
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    let fbFeedStyle = {
        border: 'none',
        overflow: 'hidden'
    }
    return (
      <div className='facebookFeed' style={this.props.style}>
        <Slider {...settings}>
          <div>
            <iframe title='fb1' src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpermalink.php%3Fstory_fbid%3D10215147614657144%26id%3D1035565751&width=350&show_text=true&height=232&appId" width="350" height="232" style={fbFeedStyle} scrolling="no"  frameBorder="0"   allow="encrypted-media"></iframe>
          </div>
          <div>
            <iframe title='fb2' src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fleanne.giambrone.3%2Fposts%2F10156278428993683&width=350&show_text=true&height=213&appId" width="350" height="213" style={fbFeedStyle} scrolling="no"  frameBorder="0"   allow="encrypted-media"></iframe>
          </div>
          <div>
            <iframe title='fb3' src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FCHASTYnDAVID%2Fposts%2F10217473718983382%3A0&width=350&show_text=true&height=450&appId" width="350" height="450" style={fbFeedStyle} scrolling="no"  frameBorder="0"   allow="encrypted-media"></iframe>
          </div>
          <div>
            <iframe title='fb4' src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fgregfro%2Fposts%2F10158422986837501&width=350&show_text=true&height=156&appId" width="350" height="156" style={fbFeedStyle} scrolling="no"  frameBorder="0"   allow="encrypted-media"></iframe>
          </div>
          <div>
            <iframe title='fb5' src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fsolena.m.helm%2Fposts%2F10100103814992241%3A0&width=350&show_text=true&height=444&appId" width="350" height="444" style={fbFeedStyle} scrolling="no"  frameBorder="0"   allow="encrypted-media"></iframe>
          </div>
          <div>
            <iframe title='fb6' src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Ftabithastricklin%2Fposts%2F10215509387941620%3A0&width=350&show_text=true&height=387&appId" width="350" height="387" style={fbFeedStyle} scrolling="no"  frameBorder="0"   allow="encrypted-media"></iframe>
          </div>
          <div>
            <iframe title='fb7' src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fmichelle.f.delossantos%2Fposts%2F10217665139526489%3A0&width=350&show_text=true&height=368&appId" width="350" height="368" style={fbFeedStyle} scrolling="no"  frameBorder="0"   allow="encrypted-media"></iframe>
          </div>
          <div>
            <iframe title='fb8' src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fcynthia.delay.9%2Fposts%2F10215251252408912%3A0&width=350&show_text=true&height=368&appId" width="350" height="368" style={fbFeedStyle} scrolling="no"  frameBorder="0"   allow="encrypted-media"></iframe>
          </div>
          <div>
            <iframe title='fb9' src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpenny.moore.7399%2Fposts%2F10156035049449635&width=350&show_text=true&height=251&appId" width="350" height="251" style={fbFeedStyle} scrolling="no"  frameBorder="0"   allow="encrypted-media"></iframe>
          </div>
          <div>
            <iframe title='fb10' src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FSkyeHGraham%2Fposts%2F10215063733014481%3A0&width=350&show_text=true&height=311&appId" width="350" height="311" style={fbFeedStyle} scrolling="no"  frameBorder="0"   allow="encrypted-media"></iframe>
          </div>
        </Slider>
      </div>
    );
  }
}

export default Facebookfeed