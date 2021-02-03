/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { IconButton, makeStyles, Paper } from '@material-ui/core';
import ArrowDropDownCircleOutlinedIcon from '@material-ui/icons/ArrowDropDownCircleOutlined';

import { HOME } from '../store/actionTypes/pageTitle';
import hero from '../images/hero.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    padding: theme.spacing(0),
  },
  hero: {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.25)),url(${hero})`,
    backgroundSize: 'cover',
    height: '100vh',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
  },
  subTitleHero: {
    fontSize: '1.5em',
    fontWeight: 'bold',
    lineHeight: theme.spacing(0),
  },
  titleHero: {
    fontSize: '3.5em',
    fontWeight: 'bold',
    lineHeight: theme.spacing(0),
  },
  cta: {
    marginTop: '20vh',
  },
  paper: {
    margin: theme.spacing(1),
    padding: theme.spacing(0.5),
    textAlign: 'center',
    justifyContent: 'center',
    color: theme.palette.text.secondary,
  },
}));

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => dispatch({ type: HOME }, []));

  const classes = useStyles();

  return (
    <Grid container className={classes.container}>
      <Grid item xs={12} className={classes.hero}>
        <p className={classes.subTitleHero}>Welcome to</p>
        <h1 className={classes.titleHero}>Wild Royale</h1>
        <h2 className={classes.subTitleHero}>
          Home of the Royal Wild Family !
        </h2>
        <IconButton
          color="inherit"
          aria-label="cta-down"
          edge="start"
          className={classes.cta}
        >
          <ArrowDropDownCircleOutlinedIcon fontSize="large" />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default Home;
