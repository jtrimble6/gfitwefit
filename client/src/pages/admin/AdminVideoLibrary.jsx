import React, { Component } from 'react'
import axios from 'axios'
import { Button } from 'react-bootstrap'
import { Player, BigPlayButton } from 'video-react';
import { Row } from 'react-bootstrap'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import backgroundImg from "../../css/images/GOUVEIA-FITNESS_Mark_White.png";
import '../../../../node_modules/video-react/dist/video-react.css'; // import video-react css
import '../../css/videoLibrary.css'
import '../../css/admin.css'



class AdminVideoLibrary extends Component {
    constructor(props) {
        super(props)
        this.state = {
          equipmentNeeded: '',
          fitnessLevel: '',
          workoutCategory: '',
          videoLibrary: [],
          videoLibraryFiltered: []
        }

        this.handleFilter = this.handleFilter.bind(this)
        this.handleChange = this.handleChange.bind(this)

    }

    

    componentDidMount() {
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
         

    }

    render() {
        return (
          <div id="videoLibraryPage">
            <div className="row videoLibraryFormRow">
              <div className="videoLibraryFormContainer">    
                <h2 className="videoLibraryForm-heading">Video Library</h2>
                    <FormControl component="fieldset">
                      <FormLabel className='videoLibraryPrefTitle' component="legend">Preferences</FormLabel> <hr />
                      
                        {/* Equipment Preference */}
                        <FormLabel component="legend">Equipment</FormLabel>
                        <RadioGroup row onChange={this.handleChange} aria-label="position" name="equipmentNeeded" defaultValue="top" className="equipmentRadios">
                            <FormControlLabel 
                              value="bodyweight" 
                              className="videoControlLabel"
                              control={<Radio color="primary" />} 
                              label="Bodyweight" 
                            />
                            <FormControlLabel 
                              value="light" 
                              control={<Radio color="primary" />} 
                              label="Light" 
                            />
                            <FormControlLabel 
                              value="full" 
                              control={<Radio color="primary" />} 
                              label="Full" 
                            />
                        </RadioGroup>

                        {/* Fitness Level Preference */}
                        <FormLabel component="legend">Fitness Level</FormLabel>
                        <RadioGroup row onChange={this.handleChange} aria-label="position" name="fitnessLevel" defaultValue="top" className="fitnessLevelRadios">
                            <FormControlLabel 
                              value="beginner" 
                              className="videoControlLabel"
                              control={<Radio color="primary" />} 
                              label="Beginner" 
                            />
                            <FormControlLabel 
                              value="advanced" 
                              control={<Radio color="primary" />} 
                              label="Advanced" 
                            />
                        </RadioGroup>

                        {/* Workout Preference */}
                        <FormLabel component="legend">Workout Type</FormLabel>
                        <RadioGroup row onChange={this.handleChange} aria-label="position" name="workoutCategory" defaultValue="top" className="workoutTypeRadios">
                            <FormControlLabel 
                              value="strength" 
                              className="videoControlLabel"
                              control={<Radio color="primary" />} 
                              label="Strength" 
                            />
                            <FormControlLabel 
                              value="hiit" 
                              control={<Radio color="primary" />} 
                              label="H.I.I.T." 
                            />
                            <FormControlLabel 
                              value="boxing" 
                              control={<Radio color="primary" />} 
                              label="Boxing" 
                            />
                            <FormControlLabel 
                              value="abs/stretch" 
                              control={<Radio color="primary" />} 
                              label="Abs/Stretch" 
                            />
                        </RadioGroup>

                        {/* FILTER */}
                        <Button
                          className="adminFilterLibraryButton"
                          onClick={this.handleFilter}
                        >
                          Filter
                        </Button>
                    </FormControl> <hr />

                    {/* VIDEOS */}

                    {
                        (this.state.videoLibraryFiltered.length > 0) ? 
                        
                        <div className='videoLibraryDiv'>
                            {this.state.videoLibraryFiltered.map((video, index) => (
                              <div key={video.filename} className="card card-body mb-3 videoLibraryCard">
                                <Row className='videoPlayerTitle'>
                                  <h2 className='videoPlayerTitleLeft'>WORKOUT ONE/</h2><h2 className='videoPlayerTitleRight'>/WORK OUT NAME</h2>
                                </Row>
                                <Row className='videoPlayerRow'>
                                  <Player
                                    playsInline
                                    poster={backgroundImg}
                                    src={`video/${video.filename}`}
                                  > 
                                    <BigPlayButton position='center' />
                                  </Player>
                                </Row>
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

                        <p>There are no videos to display.</p>
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
            {/* <h2 className="videoLibraryForm-heading">Current Schedule</h2>
            <div className="row videoLibraryRow">
              
            </div>
         */}
          </div>
        )
    };
};

export default AdminVideoLibrary;