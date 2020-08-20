import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Form, Button, Col } from 'react-bootstrap'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

// ALERTS
import EmailError from '../../components/alerts/EmailError';
import PasswordError from '../../components/alerts/PasswordError';
import PhoneError from '../../components/alerts/PhoneError'
import UpdateUserPersonalInfoSuccess from '../../components/alerts/UpdateUserPersonalInfoSuccess'
import UpdateUserPersonalInfoError from '../../components/alerts/UpdateUserPersonalInfoError'
import UpdateUserPreferencesSuccess from '../../components/alerts/UpdateUserPreferencesSuccess'
import UpdateUserPreferencesError from '../../components/alerts/UpdateUserPreferencesError'
import UpdateUserPasswordSuccess from '../../components/alerts/UpdateUserPasswordSuccess'
import UpdateUserPasswordError from '../../components/alerts/UpdateUserPasswordError'
import UpdateUserPasswordServerError from '../../components/alerts/UpdateUserPasswordServerError'
import UpdateUserPasswordMatchError from '../../components/alerts/UpdateUserPasswordMatchError'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

export default function ControlledAccordions(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      <Accordion className='userProfileAccordion' expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          className='userProfileAccordionSummary'
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>Personal Info</Typography>
          <Typography className={classes.secondaryHeading}>Name, email, phone number</Typography>
        </AccordionSummary>
        <AccordionDetails className='userProfileAccordionDetails'>
          <Form className='editUserForm'>
              <Form.Row>
                <Form.Group className='userEditProfileFormCol' as={Col} sm='12' controlId="formGridFirstName">
                  <Form.Label className='userEditProfileLabel'>First Name</Form.Label>
                  <Form.Control 
                      value={props.firstName || ''}
                      onChange={props.handleChange}
                      name="firstName"
                      placeholder="First Name" 
                  />
                </Form.Group>

                <Form.Group className='userEditProfileFormCol' as={Col} sm='12' controlId="formGridLastName">
                  <Form.Label className='userEditProfileLabel'>Last Name</Form.Label>
                  <Form.Control 
                      value={props.lastName || ''}
                      onChange={props.handleChange}
                      name="lastName"
                      placeholder="Last Name" 
                  />
                </Form.Group>
              {/* </Form.Row> */}

              {/* <Form.Row> */}
                <Form.Group className='userEditProfileFormCol' as={Col} sm='12' controlId="formGridEmail">
                    <Form.Label className='userEditProfileLabel'>Email</Form.Label>
                    <Form.Control
                        value={props.email || ''}
                        name="email"
                        onChange={props.checkEmail}
                        type="email" 
                        placeholder="Email" 
                    />
                    <EmailError 
                        emailError={props.emailError}
                    />
                </Form.Group>

                <Form.Group className='userEditProfileFormCol' as={Col} sm='12' controlId="formGridPhoneNumber">
                    <Form.Label className='userEditProfileLabel'>Phone Number</Form.Label>
                    <Form.Control 
                        value={props.phoneNumber || ''}
                        name="phoneNumber"
                        onChange={props.handlePhoneChange}
                        placeholder="(___) ___-____" 
                    />
                    <PhoneError 
                        phoneError={props.phoneError}
                    />
                </Form.Group>

                <Button onClick={props.handleUserPersonalInfoChange} variant="success" type="submit" className="submitEditProfile">
                    Submit Changes
                </Button>
                <UpdateUserPersonalInfoSuccess
                  updateUserInfoSuccess={props.updateUserInfoSuccess}
                />
                <UpdateUserPersonalInfoError
                  updateUserInfoError={props.updateUserInfoError}
                />
              </Form.Row>
          </Form>
          
        </AccordionDetails>
      </Accordion>
      <Accordion className='userProfileAccordion' expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          className='userProfileAccordionSummary'
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography className={classes.heading}>Subscription</Typography>
          <Typography className={classes.secondaryHeading}>
            Manage your subscription
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Form className='editSubscriptionForm'>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridSubscriptionStatus">
                  <Form.Label className='subscriptionDetails'>Subscription status:</Form.Label>
                  <Form.Control 
                      value={props.subscriptionStatus ? 'ACTIVE' : 'INACTIVE'}
                      name="subscriptionStatus"
                      disabled={true}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridLastPaymentDate">
                  <Form.Label className='subscriptionDetails'>Last payment date:</Form.Label>
                  <Form.Control 
                      value={props.lastPaymentDate}
                      name="lastPaymentDate"
                      disabled={true} 
                  />
                </Form.Group>
                
              </Form.Row>
              <Form.Row className='subscriptionSubmitRow'>
                {
                  props.subscriptionStatus ? 
                  
                  <small className='subscriptionRenewDetails'>Subscription will auto-renew on {props.autoRenewDate}</small> :

                  <div></div>

                }

                <Button onClick={props.handleUserManageSubscription} variant="success" type="submit" className="submitEditProfile">
                    Manage Subscription
                </Button>
              </Form.Row>
          </Form>
        </AccordionDetails>
      </Accordion>
      <Accordion className='userProfileAccordion' expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          className='userProfileAccordionSummary'
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography className={classes.heading}>Preferences</Typography>
          <Typography className={classes.secondaryHeading}>
            Personalize your G-Fit experience!
          </Typography>
        </AccordionSummary>
        <AccordionDetails className='userProfileAccordionDetails'>
          <FormControl component="fieldset">
            <FormLabel className='userEditPreferencesTitle' component="legend">Set Filter Preferences</FormLabel>
                
                {/* Equipment Preference */}
                    <FormLabel 
                        className='filterTitle' 
                        component="legend">Equipment
                    </FormLabel>
                        <RadioGroup 
                            row 
                            onChange={props.handleRadioChange} 
                            aria-label="position" 
                            name="equipmentNeeded" 
                            value={props.equipmentNeeded}
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
                        onChange={props.handleRadioChange} 
                        aria-label="position" 
                        name="fitnessLevel" 
                        value={props.fitnessLevel}
                        defaultValue="top" 
                        className=" userRadiosfitnessLevelRadios"
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
                        onChange={props.handleRadioChange} 
                        aria-label="position" 
                        name="workoutCategory"
                        value={props.workoutCategory} 
                        defaultValue="top" 
                        className="workoutCategoryRadios"
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
                    <Button
                      className="userSetFilterLibraryButton"
                      onClick={props.handleSetPreferences}
                    >
                      Set Preferences
                    </Button>

                    <Button
                      className="userResetLibraryButton"
                      onClick={props.handleFilterReset}
                    >
                      Reset
                    </Button>
                    <UpdateUserPreferencesSuccess
                      updateUserPreferencesSuccess={props.updateUserPreferencesSuccess}
                    />
                    <UpdateUserPreferencesError
                      updateUserPreferencesError={props.updateUserPreferencesError}
                    />
                
            </FormControl>
        </AccordionDetails>
      </Accordion>
      <Accordion className='userProfileAccordion' expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary
          className='userProfileAccordionSummary'
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography className={classes.heading}>Change Password</Typography>
        </AccordionSummary>
        <AccordionDetails className='userProfileAccordionDetails'>
        <Form className='editUserForm'>
              <Form.Row>
                <Form.Group as={Col} sm='12' controlId="formGridOldPassword">
                    <Form.Label className='userEditProfileLabel'>Old Password</Form.Label>
                    <Form.Control 
                        value={props.oldPassword}
                        name="oldPassword"
                        onChange={props.handleOldPasswordChange}
                        type="password" 
                        placeholder="Old Password" 
                    />
                </Form.Group>

                <Form.Group as={Col} sm='12' controlId="formGridNewPassword">
                    <Form.Label className='userEditProfileLabel'>New Password</Form.Label>
                    <Form.Control 
                        value={props.newPassword}
                        name="newPassword"
                        onChange={props.handlePasswordChange}
                        type="password" 
                        placeholder="New Password" 
                    />
                </Form.Group>

                <Form.Group as={Col} sm='12' controlId="formGridConfirmPassword">
                    <Form.Label className='userEditProfileLabel'>Confirm New Password</Form.Label>
                    <Form.Control
                        value={props.confirmNewPassword}
                        name="confirmNewPassword"
                        onChange={props.checkNewPassword}
                        type="password" 
                        placeholder="Confirm New Password" 
                    />
                    <PasswordError 
                        passwordError={props.passwordError}
                    />
                </Form.Group>

                <Button onClick={props.handleUpdatePassword} variant="success" type="submit" className="submitEditProfile">
                    Change Password
                </Button>
                <UpdateUserPasswordSuccess
                  updateUserPasswordSuccess={props.updateUserPasswordSuccess}
                />
                <UpdateUserPasswordError
                  updateUserPasswordError={props.updateUserPasswordError}
                />
                <UpdateUserPasswordServerError
                  updateUserPasswordServerError={props.updateUserPasswordServerError}
                />
                <UpdateUserPasswordMatchError
                  updateUserPasswordMatchError={props.updateUserPasswordMatchError}
                />
              </Form.Row>
          </Form>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
