import React from 'react'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

// ADMIN ICON
import ScheduleIcon from '@material-ui/icons/Schedule';
import VideocamIcon from '@material-ui/icons/Videocam';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ChatIcon from '@material-ui/icons/Chat';

// ADMIN PAGES
import AdminScheduleEditor from './AdminScheduleEditor';
import AdminVideoUploader from './AdminVideoUploader';
import AdminSignUp from './AdminSignUp';
import MessageBoard from '../../components/MessageBoard';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function NavTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <LinkTab icon={<ScheduleIcon />} {...a11yProps(0)} /> 
          <LinkTab icon={<VideocamIcon />} {...a11yProps(1)} />
          <LinkTab icon={<PersonAddIcon />} {...a11yProps(2)} />
          <LinkTab icon={<ChatIcon />} {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <AdminScheduleEditor />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AdminVideoUploader />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <AdminSignUp />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <MessageBoard />
      </TabPanel>
    </div>
  );
}




       