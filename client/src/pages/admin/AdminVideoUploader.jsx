import React, { Component } from 'react'
import { Button, FormCheck } from 'react-bootstrap'

// CSS
import '../../css/admin/admin.css'


class AdminVideoUploader extends Component {
    constructor(props) {
        super(props)
        this.state = {
          equipmentNeeded: '',
          fitnessLevel: '',
          workoutCategory: '',
          sampleVideo: false
          }

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleFileSelection = this.handleFileSelection.bind(this)
        this.checkSampleVideo = this.checkSampleVideo.bind(this)
    }

    

    componentDidMount() {
      document.getElementById('fileUploadName').innerHTML = 'Choose File'
      }

    handleInputChange = event => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
      }
        
    handleSubmit = event => {
        event.preventDefault()
        console.log("Equipment needed: ", this.state.equipmentNeeded)
        console.log("Fitness level: ", this.state.fitnessLevel)
        console.log("Workout category: ", this.state.workoutCategory)
      }

    handleFileSelection = event => {
      event.preventDefault()
      console.log('HANDLING FILE SELECTION')
      let filename = event.target.files[0].name
      console.log('FILENAME: ', filename)
      document.getElementById('fileUploadName').innerHTML = filename
      }

    checkSampleVideo = () => {
      if (this.state.sampleVideo) {
          this.setState({
              sampleVideo: false
          }, () => {
              console.log('SAMPLE VIDEO? ', this.state.sampleVideo)
          })
          
      } else {
          this.setState({
              sampleVideo: true,
          }, () => {
              console.log('SAMPLE VIDEO? ', this.state.sampleVideo)
          })
          
      }
      
      }

    render() {
        return (
          <div id="videoUploadPage">
            <div className="row videoUploadFormRow">
              <div className="videoUploadFormContainer">    
                <h2 className="adminVideoUploadFormHeading">Video Uploader</h2>
                  <form className="videoUploadForm" action={`/upload/${this.state.equipmentNeeded}/${this.state.fitnessLevel}/${this.state.workoutCategory}/${this.state.sampleVideo}`} method="POST" encType="multipart/form-data">
                    <div className="videoUploadFormSelectors custom-file mb-3">

                      {/* SELECT FILE */}
                      {/* <label className='fileSelectionLabel' htmlFor="fileSelection">File Selection</label> */}
                      <div className="fileUploadSelection">
                        <input type="file" name="file" id="file" className="custom-file-input" onChange={this.handleFileSelection}/>
                        <label htmlFor='file' id='fileUploadName' className='custom-file-label'>Choose File</label>
                      </div>
                      
                    
                      {/* EQUIPMENT REQUIREMENTS */}
                      <label className='equipmentNeededLabel' htmlFor="equipmentNeeded">Equipment Needed</label>
                      <select
                            name="equipmentNeeded"
                            value={this.state.equipmentNeeded}
                            onChange={this.handleInputChange}
                            type="text"
                            className="form-control"
                            id="equipmentNeeded"                                       
                        >
                        <option value=''>Select One</option>
                        <option value='none'>None (bodyweight)</option>
                        <option value='light'>Light (dumbbells, resistance bands, loop bands, jumprope, gliders, stability ball)</option>
                        <option value='full'>Full (full gym access/most equipment)</option>
                      </select>

                      {/* FITNESS LEVEL */}
                      <label className='fitnessLevelLabel' htmlFor="fitnessLevel">Fitness Level</label>
                      <select
                            name="fitnessLevel"
                            value={this.state.fitnessLevel}
                            onChange={this.handleInputChange}
                            type="text"
                            className="form-control"
                            id="fitnessLevel"                                       
                        >
                        <option value=''>Select One</option>
                        <option value='beginner'>Beginner</option>
                        <option value='advanced'>Advanced</option>
                      </select>

                      {/* WORKOUT CATEGORY */}
                      <label className='workoutCategoryLabel' htmlFor="workoutCategory">Workout Category</label>
                      <select
                            name="workoutCategory"
                            value={this.state.workoutCategory}
                            onChange={this.handleInputChange}
                            type="text"
                            className="form-control"
                            id="workoutCategory"                                       
                        >
                        <option value=''>Select One</option>
                        <option value='strength'>Strength</option>
                        <option value='hiit'>H.I.I.T.</option>
                        <option value='boxing'>Boxing</option>
                        <option value='abs#stretch'>Abs/stretch</option>
                      </select>

                      {/* SAMPLE VIDEO CHECKBOX */}
                      <FormCheck
                        // isInvalid
                        type="checkbox" 
                        label="Try It Out Video?" 
                        className="sampleVideo"
                        onClick={this.checkSampleVideo}
                      />

                    </div>
                    
                    {/* Upload Video */}
                    <input 
                      type="submit" 
                      value="Upload" 
                      className='adminSubmitButton submit' 
                    />

                  </form>

                    {/* View Video Library */}
                    <Button
                      href="/adminVideoLibrary"
                      className="adminViewLibraryButton"
                    >
                      View Library
                    </Button>
              </div>
            </div>
          </div>
        )
    };
};

export default AdminVideoUploader;