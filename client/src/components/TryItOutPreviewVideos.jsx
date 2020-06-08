import React, { Component } from 'react';
import { Player, BigPlayButton } from 'video-react';
import { Row } from 'react-bootstrap'
import "../../node_modules/video-react/dist/video-react.css"; // import video-react css
import '../css/tryItOutVideosPreview.css'


class TryItOutPreviewVideos extends Component {

    render() {                                                                  
        return (
            <div className='tryItOutPreviewVideosSection'>
                <Row className='tryItOutPreviewTitle'>
                    <h2 className='tryItOutPreviewTitleLeft'>DAY ONE/</h2><h2 className='tryItOutPreviewTitleRight'>/WORK OUT NAME</h2>
                </Row>
                <Row className='tryItOutVideoRow'>
                  <Player
                    playsInline
                    poster="/assets/poster.png"
                    src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                  > 
                    <BigPlayButton position='center' />
                  </Player>
                </Row>

                <Row className='tryItOutPreviewTitle'>
                    <h2 className='tryItOutPreviewTitleLeft'>DAY TWO/</h2><h2 className='tryItOutPreviewTitleRight'>/WORK OUT NAME</h2>
                </Row>
                <Row className='tryItOutVideoRow'>
                  <Player
                    playsInline
                    poster="/assets/poster.png"
                    src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                  > 
                    <BigPlayButton position='center' />
                  </Player>
                </Row>

                <Row className='tryItOutPreviewTitle'>
                    <h2 className='tryItOutPreviewTitleLeft'>DAY THREE/</h2><h2 className='tryItOutPreviewTitleRight'>/WORK OUT NAME</h2>
                </Row>
                <Row className='tryItOutVideoRow'>
                  <Player
                    playsInline
                    poster="/assets/poster.png"
                    src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                  > 
                    <BigPlayButton position='center' />
                  </Player>
                </Row>
            </div>
        )
    }
}

export default TryItOutPreviewVideos