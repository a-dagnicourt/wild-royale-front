/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  IconButton,
  Link,
  ListItem,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import ArrowDropDownCircleOutlinedIcon from '@material-ui/icons/ArrowDropDownCircleOutlined';
import Carousel from 'react-material-ui-carousel';
import axios from 'axios';

import { HOME } from '../store/actionTypes/pageTitle';
import hero from '../images/hero.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    padding: theme.spacing(0),
  },
  flexCenter: {
    display: 'flex',
    justifyContent: 'center',
  },
  flexColCenter: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hero: {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.25) 75%, rgba(255,255,255,1) 100%),url(${hero})`,
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
  title: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: theme.spacing(3),
  },
  carousel: {
    display: 'flex',
    justifyContent: 'center',
  },
  media: {
    height: 300,
    width: '75vh',
  },
  paper: {
    margin: theme.spacing(1),
    padding: theme.spacing(0.5),
    textAlign: 'center',
    justifyContent: 'center',
    color: theme.palette.text.secondary,
  },
}));

const Home = (props) => {
  const dispatch = useDispatch();
  useEffect(() => dispatch({ type: HOME }, []));

  const classes = useStyles();

  const token = useSelector((state) => state.jwtAUth.token);
  const [error, setError] = useState('');
  const [families, setFamilies] = useState([]);
  useEffect(() => {
    const fetchAllFamilies = async () => {
      try {
        setError(null);
        const { data } = await axios.get(
          `http://localhost:5000/api/v0/families`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        setFamilies(data);
      } catch (err) {
        setError({ ...err });
      }
    };

    fetchAllFamilies();
  }, []);

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
      <Grid item xs={12}>
        <Typography variant="h5" className={classes.title}>
          1. Family Royale
        </Typography>
        <Divider style={{ margin: '3em' }} />
        <Grid item xs={12} className={classes.carousel}>
          <Carousel>
            {families.map((item, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <Item key={i} item={item} />
            ))}
          </Carousel>
        </Grid>
        <Divider style={{ margin: '3em' }} />
        <Typography variant="h5" className={classes.title}>
          2. Castle Royale
        </Typography>
        <Divider style={{ margin: '3em' }} />
        <Grid item xs={12} className={classes.flexCenter}>
          <MapContainer
            center={[43.4833, -1.4833]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[43.4984, -1.4731]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
        </Grid>
        <Divider style={{ margin: '3em' }} />
      </Grid>
    </Grid>
  );
};

function Item(props) {
  const { firstname, lastname, linkedin, github, zone, picture } = props.item;
  const classes = useStyles();
  return (
    <Card className={classes.flexColCenter}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={picture}
          title={`${firstname} ${lastname}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {`${firstname} ${lastname}`}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link component={RouterLink} to={linkedin} underline="none">
          <Button size="small" color="primary">
            <LinkedInIcon />
          </Button>
        </Link>
        <Link component={RouterLink} to={github} underline="none">
          <Button size="small" color="primary">
            <GitHubIcon />
          </Button>
        </Link>
        <Button size="small" color="primary">
          {zone}
        </Button>
      </CardActions>
    </Card>
  );
}

export default Home;
