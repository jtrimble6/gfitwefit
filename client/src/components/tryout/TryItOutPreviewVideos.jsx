import React, { Component } from 'react';
import { Player, BigPlayButton } from 'video-react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';

// CSS
import backgroundImg from "../../css/images/GOUVEIA-FITNESS_Mark_White.png";
import '../../css/tryout/tryItOutVideosPreview.css'
import '../../../../node_modules/video-react/dist/video-react.css'; // import video-react css
import '../../css/general/videoLibrary.css'

class TryItOutPreviewVideos extends Component {

    render() {                                                                  
        return (
            <div className='tryItOutPreviewVideosSection'>
              
              { (this.props.videoLibraryFiltered.length > 0) ? 
                <div className='videoLibraryDiv'>
                  {this.props.videoLibraryFiltered.map((video, index) => (
                    <div key={video._id} className='videoLibraryCardDiv'>
                        <Card className="card card-body mb-3 mx-auto videoLibraryCard">
                            <Player
                                playsInline
                                poster={backgroundImg}
                                src={`video/${video.filename}`}
                            > 
                                <BigPlayButton position='center' />
                            </Player>
                            <CardBody>
                            <CardTitle className='videoLibraryCardTitle'>Video Title</CardTitle>
                            <CardText className='videoLibraryCardText'>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
                            <CardText>
                                <small className="text-muted videoLibraryCardSubtitle">Last updated 3 mins ago</small>
                            </CardText>
                            </CardBody>
                        </Card> 
                        {/* <form method="POST" className="videoLikeForm" action={`/videos/${video._id}?_method=POST`}> 
                        
                            <input 
                            type="submit" 
                            value="Like Video" 
                            className='userLikeButton like' 
                            />
                        </form> */}
                    </div> 
                    ))}
                </div>

                : 
                <div className='videoLibraryDiv'>
                  <h2 className='noVideosTitle'>There are no videos to display.</h2>
                </div>

                }
                {/* <Row className='tryItOutPreviewTitle'>
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
                </Row> */}
            </div>
        )
    }
}

export default TryItOutPreviewVideos