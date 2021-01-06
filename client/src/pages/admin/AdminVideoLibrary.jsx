import React, { Component } from 'react'
import axios from 'axios'
import ReactPlayer from 'react-player'
import { Player, BigPlayButton } from 'video-react';
import { Card, CardBody, Button, CardTitle, CardText } from 'reactstrap';
import {isMobile} from 'react-device-detect';
import API from '../../utils/API'

// CSS
import backgroundImg from "../../css/images/GOUVEIA-FITNESS_Mark_White.png";
import '../../../../node_modules/video-react/dist/video-react.css'; // import video-react css
import '../../css/general/videoLibrary.css'
import '../../css/admin/admin.css'

// COMPONENTS
import AdminVideoPreferences from './AdminVideoPreferences.jsx'


class AdminVideoLibrary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      equipmentNeeded: null,
      fitnessLevel: null,
      workoutCategory: null,
      videoLibrary: [],
      videoLibraryFiltered: [],
      filterShowing: false
    }

    this.handleFilter = this.handleFilter.bind(this)
    this.handleFilterReset = this.handleFilterReset.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.toggleFilter = this.toggleFilter.bind(this)
    this.getUserData = this.getUserData.bind(this)
    this.getVideos = this.getVideos.bind(this)
  }



  componentDidMount() {
    this.getUserData()
    this.getVideos()
  }

  getUserData = () => {
    let userId = localStorage.getItem('user');
    console.log('USER ID: ', userId)
    API.getUser(userId)
        .then(res => {
            // console.log(res.data[0])
            let user = res.data[0]

            //CHECK USER PREFERENCES
            let userPreferences = user.videoFilterPreferences
            let workoutCategory = null
            let fitnessLevel = null
            let equipmentNeeded = null

            if (userPreferences.workoutCategory.length) {
              workoutCategory = userPreferences.workoutCategory
            }
            if (userPreferences.fitnessLevel.length) {
              fitnessLevel = userPreferences.fitnessLevel
            }
            if (userPreferences.equipmentNeeded.length) {
              equipmentNeeded = userPreferences.equipmentNeeded
            }

            this.setState({
              workoutCategory: workoutCategory,
              fitnessLevel: fitnessLevel,
              equipmentNeeded: equipmentNeeded,
            })
        })
        .catch(err => {
            console.log(err)
        })
  }

  getVideos = () => {
    axios.get('/videos').then(res => {
        let files = res.data
        let videoLibrary = files.filter(file => {
            return file.contentType === 'video/quicktime'
        })
        this.setState({
            videoLibrary: videoLibrary,
            videoLibraryFiltered: videoLibrary
        }, () => {
          console.log(this.state.videoLibrary);
        })
      });
    }

  toggleFilter = (event) => {
    event.preventDefault()
    let filterShowing = this.state.filterShowing
    if(filterShowing) {
        // console.log('HIDING FILTER')
        document.getElementById('userVideoPreferences').style.display = 'none'    
        document.getElementById('showHideFilterButton').innerHTML = 'Show Filters'     
        this.setState({
            filterShowing: false
        })
    } else {
        // console.log('SHOWING FILTER')
        document.getElementById('userVideoPreferences').style.display = 'block'   
        document.getElementById('showHideFilterButton').innerHTML = 'Hide Filters' 
        this.setState({
            filterShowing: true
        })
    }
        
  }

  handleChange = ev => {
    const { name, value } = ev.target
    this.setState({
        [name]: value
    })
  };

  handleFilter = () => {
    console.log('Equipment needed: ', this.state.equipmentNeeded)
    console.log('Fitness level: ', this.state.fitnessLevel)
    console.log('Workout category: ', this.state.workoutCategory)
    
    let files = this.state.videoLibrary
    let equipmentNeeded = this.state.equipmentNeeded
    let fitnessLevel = this.state.fitnessLevel
    let workoutCategory = this.state.workoutCategory

    if (equipmentNeeded && fitnessLevel && workoutCategory) {
        let videoLibraryFiltered = files.filter(file => {
            return file.contentType === 'video/quicktime' 
            && file.equipmentNeeded === this.state.equipmentNeeded 
            && file.fitnessLevel === this.state.fitnessLevel
            && file.workoutCategory === this.state.workoutCategory
        })
        this.setState({
            videoLibraryFiltered: videoLibraryFiltered
        }, () => {
            console.log(this.state.videoLibraryFiltered);
        })
    } else if (equipmentNeeded && !fitnessLevel && !workoutCategory) {
        let videoLibraryFiltered = files.filter(file => {
            return file.contentType === 'video/quicktime' 
            && file.equipmentNeeded === this.state.equipmentNeeded 
        })
        this.setState({
            videoLibraryFiltered: videoLibraryFiltered
        }, () => {
            console.log(this.state.videoLibraryFiltered);
        })
    } else if (equipmentNeeded && fitnessLevel && !workoutCategory) {
        let videoLibraryFiltered = files.filter(file => {
            return file.contentType === 'video/quicktime' 
            && file.equipmentNeeded === this.state.equipmentNeeded 
            && file.fitnessLevel === this.state.fitnessLevel
        })
        this.setState({
            videoLibraryFiltered: videoLibraryFiltered
        }, () => {
            console.log(this.state.videoLibraryFiltered);
        })
    } else if (!equipmentNeeded && fitnessLevel && workoutCategory) {
        let videoLibraryFiltered = files.filter(file => {
            return file.contentType === 'video/quicktime' 
            && file.fitnessLevel === this.state.fitnessLevel
            && file.workoutCategory === this.state.workoutCategory
        })
        this.setState({
            videoLibraryFiltered: videoLibraryFiltered
        }, () => {
            console.log(this.state.videoLibraryFiltered);
        })
    } else if (!equipmentNeeded && !fitnessLevel && workoutCategory) {
        let videoLibraryFiltered = files.filter(file => {
            return file.contentType === 'video/quicktime' 
            && file.workoutCategory === this.state.workoutCategory
        })
        this.setState({
            videoLibraryFiltered: videoLibraryFiltered
        }, () => {
            console.log(this.state.videoLibraryFiltered);
        })
    } else if (!equipmentNeeded && fitnessLevel && !workoutCategory) {
        let videoLibraryFiltered = files.filter(file => {
            return file.contentType === 'video/quicktime' 
            && file.fitnessLevel === this.state.fitnessLevel
        })
        this.setState({
            videoLibraryFiltered: videoLibraryFiltered
        }, () => {
            console.log(this.state.videoLibraryFiltered);
        })
    } else {
        this.setState({
            videoLibraryFiltered: files
        }, () => {
            console.log(this.state.videoLibraryFiltered);
        })
    }

    // let videoLibraryFiltered = files.filter(file => {
    //     return file.contentType === 'video/quicktime' 
    //     && file.equipmentNeeded === this.state.equipmentNeeded 
    //     && file.fitnessLevel === this.state.fitnessLevel
    //     && file.workoutCategory === this.state.workoutCategory
    // })
    // this.setState({
    //     videoLibraryFiltered: videoLibraryFiltered
    // }, () => {
    //     console.log(this.state.videoLibraryFiltered);
    // })
     
  }

  handleFilterReset = (event) => {
    event.preventDefault()
    this.setState({
        equipmentNeeded: null,
        fitnessLevel: null, 
        workoutCategory: null
    })
  }

    render() {
        return (
          <div id="videoLibraryPage">
            <div className="row videoLibraryFormRow">
              <div className="videoLibraryFormContainer">    
                <h2 className="videoLibraryForm-heading">Video Library</h2>
                    
                    <div className="row videoLibraryRow">
                      <div className="col-sm-3 filterColumn">
                          <Button
                              id="showHideFilterButton"
                              className="userFilterLibraryButton"
                              onClick={this.toggleFilter}
                          >
                              Show Filters
                          </Button>

                          {/* FILTER FORM */}
                          <AdminVideoPreferences 
                              handleChange={this.handleChange}
                              handleFilter={this.handleFilter}
                              handleFilterReset={this.handleFilterReset}
                              equipmentNeeded={this.state.equipmentNeeded}
                              fitnessLevel={this.state.fitnessLevel}
                              workoutCategory={this.state.workoutCategory}
                          />
                      </div>

                      <div className="col-sm-8 videoColumn">
                          
                        {
                          (this.state.videoLibraryFiltered.length > 0) ? 
                          
                          <div className='videoLibraryDiv'>
                            {this.state.videoLibraryFiltered.map((video, index) => (
                              <div key={video._id} className='videoLibraryCardDiv'>
                                  <Card className="card card-body mb-3 mx-auto videoLibraryCard">
                                    <Player
                                      playsInline={true}
                                      poster={backgroundImg}
                                      muted={isMobile}
                                      src={`video/${video.filename}`}
                                      
                                    > 
                                      <BigPlayButton position='center' />
                                    </Player>
                                    {/* <ReactPlayer
                                      playsinline
                                      muted={isMobile}
                                      url={`video/${video.filename}`}
                                    > 
                                    </ReactPlayer> */}
                                    <CardBody>
                                      <CardTitle className='videoLibraryCardTitle'>Video Title</CardTitle>
                                      <CardText className='videoLibraryCardText'>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
                                      <CardText>
                                          <small className="text-muted videoLibraryCardSubtitle">Last updated 3 mins ago</small>
                                      </CardText>
                                    </CardBody>
                                  </Card> 
                                <form method="POST" className="videoDeleteForm" action={`/videos/${video._id}?_method=DELETE`}> 
                                  {/* Delete Video */}
                                  <input 
                                    type="submit" 
                                    value="Delete Video" 
                                    className='adminDeleteButton delete' 
                                  />
                                </form>
                              </div> 
                            ))}
                          </div>

                          : 

                          <h2 className='noVideosTitle'>There are no videos to display.</h2>
                      }

                      {/* View Video Library */}
                      <Button
                        href="/adminHome"
                        className="adminExitLibraryButton"
                      >
                        Exit Library
                      </Button>

                      </div>

                    </div>
                  
              </div>
            </div>
            {/* <h2 className="videoLibraryForm-heading">Current Schedule</h2>
            <div className="row videoLibraryRow">
              
            </div>
         */}
          </div>
        )
    };
};

export default AdminVideoLibrary;