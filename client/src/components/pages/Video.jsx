import React, { Component } from 'react';
import '../../css/video.css'
// import YouTube from 'react-youtube'

class Video extends Component {

    constructor(props) {
        super(props);
        this.state = {
          
        }
        this._onReady = this._onReady.bind(this)
      }

    _onReady(event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
      }

    render() {          
    //   const opts = {
    //       height: '390',
    //       width: '640',
    //       playerVars: { // https://www.youtube.com/watch?v=pbplrlsWLXI&feature=youtu.be
    //         autoplay: 0     
    //     }
    //   }                                                        
        return (
            <div className='videoPage embedresize'>
              <div>
              <iframe 
                title='Gfit Video'
                width="560" 
                height="315" 
                src="https://www.youtube.com/embed/pbplrlsWLXI" 
                frameborder="0" 
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
              </iframe>
                {/* <YouTube
                  videoId='pbplrlsWLXI'
                  opts={opts}
                  onReady={this._onReady}
                  class='embedresize'
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%"
                  }}
                /> */}
              </div>
            </div>
        )
    }
}

export default Video