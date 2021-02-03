/* eslint-disable camelcase */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import AddressCompany from './AddressCompany';
import UserRegister from './UserRegister';

import Review from './Review';
import wave from '../../images/wave.png';
import logo from '../../images/logo.png';
import useDataUser from '../../hooks/useDataUser';
import useDataCompany from '../../hooks/useDataCompany';
import DisabledButton from '../../hooks/useDisabledButton';

function Copyright() {
  return (
    <Typography
      style={{ color: 'grey' }}
      variant="body2"
      color="textSecondary"
      align="center"
    >
      {'Follow the market © '}
      <Link color="inherit" href="https://material-ui.com/">
        Our Website
      </Link>{' '}
      {new Date().getFullYear()}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    backgroundColor: 'black',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },

  stepper: {
    padding: theme.spacing(3, 0, 5),
  },

  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
    backgroundColor: '#84ffac',
    '&:hover': {
      backgroundColor: '#84ffac',
    },
  },

  submit: {
    margin: theme.spacing(3, 0, 2),
    borderRadius: 30,
    height: 47,
    backgroundColor: '#84ffac',
    color: 'black',
    '&:hover': {
      backgroundColor: '#84ffac',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#84ffac',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
  },
}));

const steps = [
  'Informations entreprise',
  'Informations administrateur',
  'Récapitulatif',
];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressCompany />;
    case 1:
      return <UserRegister />;
    case 2:
      return <Review />;
    default:
      throw new Error('Unknown step');
  }
}

function CompanySignUp() {
  const classes = useStyles();
  const { newData } = useDataCompany();
  const { newUser } = useDataUser();
  const [error, setError] = useState('');
  const [activeStep, setActiveStep] = React.useState(0);
  const isDisable = useSelector((state) => state.disabledButton.isDisable);
  const { disableButton } = DisabledButton();

  const handleNext = async (e) => {
    e.preventDefault();
    if (activeStep === steps.length - 1) {
      try {
        const { VAT_number, country } = newData;
        const VAT = country + VAT_number;
        await axios.post('http://localhost:5000/api/v0/companies', {
          ...newData,
          VAT_number: VAT,
        });
        const {
          password,
          firstname,
          lastname,
          email,
          phone_number,
          job_title,
          language,
        } = newUser;
        const companySIRET = newData.SIRET_number;
        await axios.post('http://localhost:5000/api/v0/users', {
          password,
          firstname,
          lastname,
          email,
          phone_number,
          job_title,
          language,
          companySIRET,
        });
        setActiveStep(activeStep + 1);
      } catch (err) {
        setError({ ...err });
      }
    } else {
      disableButton();
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <div
      style={{
        backgroundColor: 'Black',
        backgroundImage: `url(${wave})`,
        height: '100vh',
      }}
    >
      <CssBaseline />
      <AppBar
        style={{ color: 'white' }}
        position="absolute"
        color="default"
        className={classes.appBar}
      >
        <Toolbar>
          <Link component={RouterLink} to="/">
            <img src={logo} alt="logo-ftm" style={{ width: '70px' }} />
          </Link>
          <Typography variant="h6" color="inherit" noWrap>
            Enregistrement du compte
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography
            style={{ color: 'grey' }}
            component="h1"
            variant="h4"
            align="center"
          >
            Données personnelles
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <>
            {activeStep === steps.length ? (
              <>
                <Typography variant="h5" gutterBottom>
                  Merci pour votre enregistrement et bienvenue chez Follow the
                  market.
                </Typography>
                <Typography variant="subtitle1">
                  Merci de vérifier votre boite mail et de cliquer sur le lien
                  de confirmation avant de vous connecter.
                </Typography>
                <Button
                  component={RouterLink}
                  to="/login"
                  variant="contained"
                  type="button"
                  className={classes.submit}
                >
                  Se connecter
                </Button>
              </>
            ) : (
              <>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Retour
                    </Button>
                  )}
                  <Button
                    disabled={
                      (activeStep === 0 && isDisable) ||
                      (activeStep === 1 && isDisable)
                    }
                    variant="contained"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1
                      ? 'Terminer enregistrement'
                      : 'Suivant'}
                  </Button>
                  {error && (
                    <p style={{ color: 'red' }}>Oups there was an error</p>
                  )}
                </div>
              </>
            )}
          </>
        </Paper>
        <Copyright />
      </main>
    </div>
  );
}

export default CompanySignUp;
