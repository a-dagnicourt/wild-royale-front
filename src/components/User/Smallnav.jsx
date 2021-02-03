/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useState } from 'react';
import { grey } from '@material-ui/core/colors';
import { useTranslation } from 'react-i18next';
import Griddatausers from './DataUser';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  label: {
    textTransform: 'capitalize',
  },
  overrides: {
    '&.MuiAppBar-colorPrimary': {
      backgroundColor: grey[900],
    },
  },
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const { t } = useTranslation();
  const [value, setValue] = useState(0);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab
            className={classes.label}
            label={t('SmallNav.1')}
            {...a11yProps(0)}
          />
          <Tab
            className={classes.label}
            label={t('SmallNav.2')}
            {...a11yProps(1)}
          />
          <Tab
            className={classes.label}
            label={t('SmallNav.3')}
            {...a11yProps(2)}
          />
          <Tab
            className={classes.label}
            label={t('SmallNav.4')}
            {...a11yProps(3)}
          />
          <Tab
            className={classes.label}
            label={t('SmallNav.5')}
            {...a11yProps(4)}
          />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Griddatausers />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </div>
  );
}
