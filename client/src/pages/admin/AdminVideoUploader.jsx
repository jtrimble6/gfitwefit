import React, { Component } from 'react'
import '../../css/admin.css'


class AdminVideoUploader extends Component {
    constructor(props) {
        super(props)
        this.state = {
          equipmentNeeded: '',
          fitnessLevel: '',
          workoutCategory: ''
          }

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
  
    }

    

    componentDidMount() {

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

    render() {
        return (
          <div id="videoUploadPage">
            <div className="row videoUploadFormRow">
              <div className="videoUploadFormContainer">    
                <h2 className="videoUploadForm-heading">Video Uploader</h2>
                  <form className="videoUploadForm" action="/upload" method="POST" encType="multipart/form-data">
                    <div className="videoUploadFormSelectors custom-file mb-3">
                    
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
                        <option value='abs/stretch'>Abs/stretch</option>
                      </select>

                      {/* SELECT FILE */}
                      <label className='fileSelectionLabel' htmlFor="fileSelection">File Selection</label>
                      <input type="file" name="file" id="file" className="videoUploadInput"/>

                    </div>
                    <input type="submit" value="Upload" className='adminSubmitButton submit' onClick={this.handleSubmit}/>
                  </form>
              </div>
            </div>
            {/* <h2 className="videoUploadForm-heading">Current Schedule</h2>
            <div className="row videoUploadRow">
              
            </div>
         */}
          </div>
        )
    };
};

export default AdminVideoUploader;