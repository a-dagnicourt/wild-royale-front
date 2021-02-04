import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import IconButton from '@material-ui/core/IconButton';
import GroupIcon from '@material-ui/icons/Group';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Link from '@material-ui/core/Link';
import { Box } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

import useAuth from '../hooks/useAuth';

import logo from '../images/logo_royale.png';

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    marginLeft: theme.spacing(2),
  },
  appBar: {
    backgroundColor: grey[800],
    color: 'black',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    height: '55px',
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...theme.mixins.toolbar,
  },
  mainToolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
  },
  drawerBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
  icon: {
    color: grey[400],
    fontSize: '2em',
    textAlign: 'center',
  },
  nested: {
    backgroundColor: grey[800],
  },
  menuLabel: {
    color: grey[400],
    fontSize: '1em',
    marginTop: '1em',
  },
}));

export default function Layout({ ...props }) {
  const classes = useStyles();
  const { children } = props;
  const { signOut } = useAuth();
  const admin = useSelector((state) => state.role.isAdmin);
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [openCollapse, setOpenCollapse] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setOpenCollapse(false);
  };

  // eslint-disable-next-line no-unused-vars
  const handleClick = () => {
    setOpen(true);
    setOpenCollapse(!openCollapse);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="sticky"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          {admin ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
          ) : null}
          <Link component={RouterLink} to="/" underline="none">
            <img src={logo} alt="logo-royale" style={{ height: '32px' }} />
          </Link>
          <Typography variant="h5" className={classes.title}>
            Wild Royale
          </Typography>
          <IconButton
            color="inherit"
            aria-label="logout"
            edge="start"
            onClick={signOut}
          >
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {admin ? (
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <Typography
              variant="h6"
              color="textPrimary"
              style={{ marginLeft: '1em' }}
              noWrap
            >
              Admin Panel
            </Typography>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Box className={classes.drawerBox}>
            <List>
              <Link component={RouterLink} to="/adminFamily" underline="none">
                <ListItem button>
                  <ListItemIcon>
                    <HomeIcon className={classes.icon} />
                  </ListItemIcon>
                  <ListItemText className={classes.menuLabel}>
                    Users
                  </ListItemText>
                </ListItem>
              </Link>
              <Link component={RouterLink} to="/adminProperty" underline="none">
                <ListItem button>
                  <ListItemIcon>
                    <GroupIcon className={classes.icon} />
                  </ListItemIcon>
                  <ListItemText className={classes.menuLabel}>
                    Property
                  </ListItemText>
                </ListItem>
              </Link>
            </List>
          </Box>
        </Drawer>
      ) : null}
      <main className={classes.content}>{children}</main>
    </div>
  );
}
