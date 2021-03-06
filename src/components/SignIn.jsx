/* eslint-disable camelcase */
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { yellow } from '@material-ui/core/colors';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { LOGIN } from '../store/reducers/jwtAuth';
import logo_royale from '../images/logo_royale.png';
// import { CHANGE_DATA_USER } from '../store/reducers/dataUser';
import { CHANGE_USER_ROLE } from '../store/reducers/role';

const useStyles = makeStyles((theme) => ({
  background: {
    backgroundColor: yellow[700],
    height: '100vh',
  },
  root: {
    '& label.Mui-focused': {
      color: 'black',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'black',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
      },
      '&:hover fieldset': {
        borderColor: 'black',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',
      },
      backgroundColor: 'white',
    },
  },
  paper: {
    marginTop: theme.spacing(0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),

    color: 'black',
    '&:hover': {
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
  },
}));

function LoginForm() {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const connected = useSelector((state) => state.auth.isAuth);

  useEffect(() => {
    if (connected) {
      history.push('/');
    }
  }, [connected]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      const { data } = await axios.post(
        'http://localhost:5000/api/v0/auth/login',
        {
          email,
          password,
        }
      );
      dispatch({
        type: LOGIN,
        payload: {
          token: data.token,
        },
      });
      dispatch({
        type: CHANGE_USER_ROLE,
        payload: {
          isAdmin: data.user.isAdmin,
        },
      });

      delete data.user.isAdmin;

      // dispatch({
      //   type: CHANGE_DATA_USER,
      //   payload: {
      //     user: data.user,
      //   },
      // });

      localStorage.setItem('TOKEN', data.token);
      if (data) {
        dispatch({ type: 'SET_IS_AUTH', payload: true });
      }
    } catch (err) {
      setError({ ...err });
    }
  };

  return (
    <div className={classes.background}>
      <Container className={classes.contain} component="main" maxWidth="xs">
        <CssBaseline style={{ backgroundColor: 'black' }} />
        <div className={classes.paper}>
          <img
            src={logo_royale}
            alt="logo"
            style={{ width: '70px', marginTop: '100px' }}
          />
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <form onSubmit={onSubmit} className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              error={error && error.response.status === 404}
              helperText={
                error &&
                error.response.status === 404 &&
                'User not found or email is invalid'
              }
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Identifiant client"
              name="email"
              autoFocus
              className={classes.root}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              error={error && error.response.status === 401}
              helperText={
                error &&
                error.response.status === 401 &&
                'Password incorrect, please try again'
              }
              name="password"
              placeholder="Mot de passe"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={classes.root}
            />

            <Button
              variant="contained"
              type="submit"
              fullWidth
              className={classes.submit}
            >
              Connexion
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default LoginForm;
