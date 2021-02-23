import React, { Component } from 'react'
import axios from 'axios'
import API from '../../utils/API'
// import { Player, BigPlayButton } from 'video-react';
// import { Row, Button } from 'react-bootstrap'
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
// import backgroundImg from "../../css/images/GOUVEIA-FITNESS_Mark_White.png";

// CSS
import '../../../../node_modules/video-react/dist/video-react.css'; // import video-react css
import '../../css/general/videoLibrary.css'
import '../../css/user/user.css'

// COMPONENTS
// import UserVideoPreferences from './UserVideoPreferences.jsx'
// import { useRadioGroup } from '@material-ui/core';


class UserVideoLibrary extends Component {
    constructor(props) {
        super(props)
        this.state = {
          subscriptionStatus: true,
          equipmentNeeded: null,
          fitnessLevel: null,
          workoutCategory: null,
          videoLibrary: [],
          videoLibraryFiltered: [],
          filterShowing: false
        }

        // this.handleFilter = this.handleFilter.bind(this)
        this.handleFilterReset = this.handleFilterReset.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.toggleFilter = this.toggleFilter.bind(this)
        this.getUserData = this.getUserData.bind(this)
        this.getCollections = this.getCollections.bind(this)
        this.getVideos = this.getVideos.bind(this)
    }

    

    componentDidMount() {
        this.getUserData()
        this.getCollections()
        this.getVideos()
      }

    getUserData = () => {
        let userId = localStorage.getItem('user');
        console.log('USER ID: ', userId)
        API.getUser(userId)
            .then(res => {
                // console.log(res.data[0])
                let user = res.data[0]
                console.log('USER: ', user)
                //CHECK USER PREFERENCES
                let userPreferences = user.videoFilterPreferences
                let workoutCategory = null
                let fitnessLevel = null
                let equipmentNeeded = null
                if (userPreferences) {
                    if (userPreferences.workoutCategory.length) {
                        workoutCategory = userPreferences.workoutCategory
                    }
                    if (userPreferences.fitnessLevel.length) {
                        fitnessLevel = userPreferences.fitnessLevel
                    }
                    if (userPreferences.equipmentNeeded.length) {
                        equipmentNeeded = userPreferences.equipmentNeeded
                    }
                }
                

                this.setState({
                  workoutCategory: workoutCategory,
                  fitnessLevel: fitnessLevel,
                  equipmentNeeded: equipmentNeeded,
                //   subscriptionStatus: user.paymentComplete
                }, () => {
                    this.getVideos(this.state.subscriptionStatus)
                })

                
            })
            .catch(err => {
                console.log(err)
            })
      }

    getCollections = () => {
        axios.get("/collections").then(res => {
          let files = JSON.parse(res.data)
          console.log('VIDEO COLLECTIONS: ', files)
          this.setState({
            videoLibraryCollections: files
          })
        //   let videoLibrary = files.filter(file => {
        //       return file.contentType === "video/quicktime" || file.contentType === "video/mp4"
        //   })
        //   console.log("ADMIN VIDEOS: ", videoLibrary)
        //   this.setState({
        //       videoLibrary: videoLibrary,
        //       videoLibraryFiltered: videoLibrary
        //   }, () => {
        //     console.log(this.state.videoLibrary);
        //   })
        });
      }

    getVideos = (subscriptionStatus) => {
        axios.get("/videos").then(res => {
            let files = JSON.parse(res.data)
            console.log('VIDEO FILES: ', files)
            this.setState({
              videoLibrary: files,
              videoLibraryFiltered: files
            })
        })
        
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

    // handleFilter = () => {
    //     console.log('Equipment needed: ', this.state.equipmentNeeded)
    //     console.log('Fitness level: ', this.state.fitnessLevel)
    //     console.log('Workout category: ', this.state.workoutCategory)
        
    //     let files = this.state.videoLibrary
    //     let equipmentNeeded = this.state.equipmentNeeded
    //     let fitnessLevel = this.state.fitnessLevel
    //     let workoutCategory = this.state.workoutCategory

    //     if (equipmentNeeded && fitnessLevel && workoutCategory) {
    //         let videoLibraryFiltered = files.filter(file => {
    //             return file.contentType === "video/quicktime" || file.contentType === "video/mp4" 
    //             && file.equipmentNeeded === this.state.equipmentNeeded 
    //             && file.fitnessLevel === this.state.fitnessLevel
    //             && file.workoutCategory === this.state.workoutCategory
    //         })
    //         this.setState({
    //             videoLibraryFiltered: videoLibraryFiltered
    //         }, () => {
    //             console.log(this.state.videoLibraryFiltered);
    //         })
    //     } else if (equipmentNeeded && !fitnessLevel && !workoutCategory) {
    //         let videoLibraryFiltered = files.filter(file => {
    //             return file.contentType === "video/quicktime" || file.contentType === "video/mp4" 
    //             && file.equipmentNeeded === this.state.equipmentNeeded 
    //         })
    //         this.setState({
    //             videoLibraryFiltered: videoLibraryFiltered
    //         }, () => {
    //             console.log(this.state.videoLibraryFiltered);
    //         })
    //     } else if (equipmentNeeded && fitnessLevel && !workoutCategory) {
    //         let videoLibraryFiltered = files.filter(file => {
    //             return file.contentType === "video/quicktime" || file.contentType === "video/mp4" 
    //             && file.equipmentNeeded === this.state.equipmentNeeded 
    //             && file.fitnessLevel === this.state.fitnessLevel
    //         })
    //         this.setState({
    //             videoLibraryFiltered: videoLibraryFiltered
    //         }, () => {
    //             console.log(this.state.videoLibraryFiltered);
    //         })
    //     } else if (!equipmentNeeded && fitnessLevel && workoutCategory) {
    //         let videoLibraryFiltered = files.filter(file => {
    //             return file.contentType === "video/quicktime" || file.contentType === "video/mp4" 
    //             && file.fitnessLevel === this.state.fitnessLevel
    //             && file.workoutCategory === this.state.workoutCategory
    //         })
    //         this.setState({
    //             videoLibraryFiltered: videoLibraryFiltered
    //         }, () => {
    //             console.log(this.state.videoLibraryFiltered);
    //         })
    //     } else if (!equipmentNeeded && !fitnessLevel && workoutCategory) {
    //         let videoLibraryFiltered = files.filter(file => {
    //             return file.contentType === "video/quicktime" || file.contentType === "video/mp4" 
    //             && file.workoutCategory === this.state.workoutCategory
    //         })
    //         this.setState({
    //             videoLibraryFiltered: videoLibraryFiltered
    //         }, () => {
    //             console.log(this.state.videoLibraryFiltered);
    //         })
    //     } else if (!equipmentNeeded && fitnessLevel && !workoutCategory) {
    //         let videoLibraryFiltered = files.filter(file => {
    //             return file.contentType === "video/quicktime" || file.contentType === "video/mp4" 
    //             && file.fitnessLevel === this.state.fitnessLevel
    //         })
    //         this.setState({
    //             videoLibraryFiltered: videoLibraryFiltered
    //         }, () => {
    //             console.log(this.state.videoLibraryFiltered);
    //         })
    //     } else {
    //         this.setState({
    //             videoLibraryFiltered: files
    //         }, () => {
    //             console.log(this.state.videoLibraryFiltered);
    //         })
    //     }

    //     // let videoLibraryFiltered = files.filter(file => {
    //     //     return file.contentType === "video/quicktime" || file.contentType === "video/mp4" 
    //     //     && file.equipmentNeeded === this.state.equipmentNeeded 
    //     //     && file.fitnessLevel === this.state.fitnessLevel
    //     //     && file.workoutCategory === this.state.workoutCategory
    //     // })
    //     // this.setState({
    //     //     videoLibraryFiltered: videoLibraryFiltered
    //     // }, () => {
    //     //     console.log(this.state.videoLibraryFiltered);
    //     // })
         
    //   }

    handleFilterReset = (event) => {
        event.preventDefault()
        this.setState({
            equipmentNeeded: null,
            fitnessLevel: null, 
            workoutCategory: null,
            videoLibraryFiltered: this.state.videoLibrary
        })
      }

    render() {
        return (
          <div id="videoLibraryPage">
            <div className="row videoLibraryFormRow">
              <div className="videoLibraryFormContainer">    
                <h2 className="videoLibraryForm-heading">Video Library</h2>
                  <div className="row videoLibraryRow">
                    {/* FILTER FORM */}
                    {/* <div className="col-sm-12 col-lg-3 filterColumn">
                        <Button
                            id="showHideFilterButton"
                            className="userFilterLibraryButton"
                            onClick={this.toggleFilter}
                        >
                            Show Filters
                        </Button>

                        
                        <UserVideoPreferences 
                            handleChange={this.handleChange}
                            handleFilter={this.handleFilter}
                            handleFilterReset={this.handleFilterReset}
                            equipmentNeeded={this.state.equipmentNeeded}
                            fitnessLevel={this.state.fitnessLevel}
                            workoutCategory={this.state.workoutCategory}
                        />
                    </div> */}

                    <div className="col-sm-12 col-lg-8 videoColumn">
                        {/* VIDEO PLAYER */}

                        <h2 className='noVideosTitle' id='noVideosTitle'> </h2>

                        {
                          (this.state.videoLibraryFiltered.length > 0) ? 
                          
                          <div className="videoLibraryDiv">
                            {this.state.videoLibraryFiltered.map((video, index) => (
                              <div key={video.fid} className="videoLibraryCardDiv">
                                  <Card className="card card-body mb-3 mx-auto videoLibraryCard">
                                    <iframe
                                      title={video.svid}
                                      src={"https://muse.ai/embed/" + video.svid + "?search=0&links=0&logo=0"} 
                                      width="100%" 
                                      height="324" 
                                      frameBorder="0" 
                                      allowFullScreen
                                    >
                                    </iframe>
                                    <CardBody>
                                      <CardTitle className="videoLibraryCardTitle">{video.title}</CardTitle>
                                      <CardText className="videoLibraryCardText">{video.description}</CardText>
                                      <CardText>
                                          {/* <small className="text-muted videoLibraryCardSubtitle">Last updated 3 mins ago</small> */}
                                      </CardText>
                                    </CardBody>
                                  </Card> 
                                
                              </div> 
                            ))}
                          </div>

                          : 

                          <h2 className="noVideosTitle">There are no videos to display.</h2>
                        }

                        {/* BACK TO HOME */}
                        {/* <Button
                        href="/userHomePage"
                        className="userExitLibraryButton"
                        >
                        Exit Library
                        </Button> */}
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

export default UserVideoLibrary;