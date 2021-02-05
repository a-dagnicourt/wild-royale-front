/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
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
import { grey, yellow } from '@material-ui/core/colors';
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
    backgroundColor: grey[300],
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
    backgroundColor: yellow[700],
  },
  hero: {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.25) 75%, rgba(224,224,224,1) 100%),url(${hero})`,
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
    color: yellow[700],
  },
  cta: {
    marginTop: '20vh',
    color: yellow[700],
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    margin: theme.spacing(5),
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
  pin: {
    width: 200,
    height: 250,
  },
  pinMedia: {
    height: 100,
  },
  footer: {
    backgroundColor: grey[800],
    color: 'white',
    marginTop: theme.spacing(10),
  },
}));

const Home = (props) => {
  const dispatch = useDispatch();
  useEffect(() => dispatch({ type: HOME }, []));

  const classes = useStyles();

  const token = useSelector((state) => state.jwtAUth.token);
  const [error, setError] = useState('');
  const [families, setFamilies] = useState([]);
  const [properties, setProperties] = useState([]);

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
    const fetchAllProperties = async () => {
      try {
        setError(null);
        const { data } = await axios.get(
          `http://localhost:5000/api/v0/properties`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        setProperties(data);
      } catch (err) {
        setError({ ...err });
      }
    };

    fetchAllFamilies();
    fetchAllProperties();
  }, []);

  return (
    <Grid container className={classes.container}>
      <Grid item xs={12} className={classes.hero}>
        <p className={classes.subTitleHero}>Welcome to</p>
        <h1 className={classes.titleHero}>Wild Royale</h1>
        <h2 className={classes.subTitleHero}>
          Home of the Royal Wild Family !
        </h2>
        <HashLink to="#family" underline="none" smooth>
          <IconButton
            color="inherit"
            aria-label="cta-down"
            edge="start"
            className={classes.cta}
          >
            <ArrowDropDownCircleOutlinedIcon fontSize="large" />
          </IconButton>
        </HashLink>
      </Grid>
      <Grid item xs={12} id="family">
        <Typography variant="h3" className={classes.title}>
          Family Royale
        </Typography>
        <Grid item xs={12} className={classes.carousel}>
          <Carousel>
            {families.map((item, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <Item key={i} item={item} />
            ))}
          </Carousel>
        </Grid>
        <Divider style={{ margin: '3em' }} />
        <Typography variant="h3" className={classes.title}>
          Castle Royale
        </Typography>
        <Grid item xs={12} className={classes.flexCenter}>
          <MapContainer
            center={[43.3872, -1.2996]}
            zoom={10}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {properties.map((item, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <Pin key={i} item={item} />
            ))}
          </MapContainer>
        </Grid>
      </Grid>
      <Grid xs="12" className={classes.footer}>
        <Typography variant="body2" className={classes.title}>
          Made with lov.. SWEAT - 02/2021
        </Typography>
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
        <Button size="small" color="primary" href={linkedin}>
          <LinkedInIcon />
        </Button>
        <Button size="small" color="primary" href={github}>
          <GitHubIcon />
        </Button>
        <Button size="small" color="primary">
          {zone}
        </Button>
      </CardActions>
    </Card>
  );
}

function Pin(props) {
  const { label, lat, long, picture, reservation } = props.item;
  const classes = useStyles();
  const position = [lat, long];
  const pic = picture[picture.length - 1];
  return (
    <Marker position={position}>
      <Popup>
        <Card className={classes.pin}>
          <CardActionArea>
            <CardMedia
              className={classes.pinMedia}
              image={pic.url}
              title={pic.alt}
            />
            <CardContent>
              <Typography gutterBottom variant="body1" component="h3">
                {label}
              </Typography>
              <Typography variant="body3" color="textSecondary" component="p">
                {pic.alt}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Popup>
    </Marker>
  );
}

export default Home;
