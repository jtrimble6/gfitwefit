import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

// CSS
import '../../css/general/videoLibrary.css'
import '../../css/user/user.css'



class UserVideoPreferences extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }        
    }

    render() {
        return (
          <div id="userVideoPreferences">
            <FormControl component="fieldset">
                {/* <FormLabel className='videoLibraryPrefTitle' display='none' component="legend">Filter</FormLabel> */}
                
                {/* Equipment Preference */}
                    <FormLabel 
                        className='filterTitle' 
                        component="legend">Equipment
                    </FormLabel>
                        <RadioGroup 
                            row 
                            onChange={this.props.handleChange} 
                            aria-label="position" 
                            name="equipmentNeeded" 
                            value={this.props.equipmentNeeded}
                            defaultValue="top" 
                            className="userRadios equipmentRadios"
                        >
                        <FormControlLabel 
                            value="bodyweight" 
                            className="videoControlLabel"
                            control={<Radio />} 
                            label="Bodyweight" 
                        />
                        <FormControlLabel 
                            value="light" 
                            control={<Radio />} 
                            label="Light" 
                        />
                        <FormControlLabel 
                            value="full" 
                            control={<Radio />} 
                            label="Full" 
                        />
                    </RadioGroup>

                {/* Fitness Level Preference */}
                    <FormLabel 
                        className='filterTitle' 
                        component="legend"
                    >
                    Fitness Level
                    </FormLabel>

                    <RadioGroup 
                        row 
                        onChange={this.props.handleChange} 
                        aria-label="position" 
                        name="fitnessLevel" 
                        value={this.props.fitnessLevel}
                        defaultValue="top" 
                        className="userRadios fitnessLevelRadios"
                        >
                        <FormControlLabel 
                        value="beginner" 
                        className="videoControlLabel"
                        control={<Radio />} 
                        label="Beginner" 
                        />
                        <FormControlLabel 
                        value="advanced" 
                        control={<Radio   />} 
                        label="Advanced" 
                        />
                    </RadioGroup>

                {/* Workout Preference */}
                    <FormLabel 
                        className='filterTitle' 
                        component="legend"
                    >
                        Workout Type
                    </FormLabel>
                    <RadioGroup 
                        row 
                        onChange={this.props.handleChange} 
                        aria-label="position" 
                        name="workoutCategory"
                        value={this.props.workoutCategory} 
                        defaultValue="top" 
                        className="userRadios workoutCategoryRadios"
                    >
                        <FormControlLabel 
                        value="strength" 
                        className="videoControlLabel"
                        control={<Radio />} 
                        label="Strength" 
                        />
                        <FormControlLabel 
                        value="hiit" 
                        control={<Radio />} 
                        label="H.I.I.T." 
                        />
                        <FormControlLabel 
                        value="boxing" 
                        control={<Radio />} 
                        label="Boxing" 
                        />
                        <FormControlLabel 
                        value="abs/stretch" 
                        control={<Radio />} 
                        label="Abs/Stretch" 
                        />
                    </RadioGroup>

                {/* FILTER */}
                <Button
                    className="userFilterLibraryButton"
                    onClick={this.props.handleFilter}
                >
                    Filter
                </Button>

                <Button
                    className="userResetLibraryButton videoLibraryResetButton"
                    onClick={this.props.handleFilterReset}
                >
                    Reset
                </Button>
            </FormControl>
          </div>
        )
    };
};

export default UserVideoPreferences;