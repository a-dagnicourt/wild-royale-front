import { Container, Grid } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import { useEffect, useState } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { blue } from '@material-ui/core/colors';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

import axios from 'axios';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '40ch',
    },
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  Buttonspace: {
    marginBottom: '5px',
    marginTop: '5px',
    marginRight: '3%',
    textTransform: 'capitalize',
  },
  ButtonValForm: {
    marginTop: '5ch',
    width: '20ch',
    marginRight: '3%',
    textTransform: 'capitalize',
  },
}));

const BlueCheckbox = withStyles({
  root: {
    color: blue[400],
    '&$checked': {
      color: blue[600],
    },
  },
  checked: {},
  // eslint-disable-next-line react/jsx-props-no-spreading
})((props) => <Checkbox color="default" {...props} />);

const Griddatausers = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [error, setError] = useState('');
  const [usersCompany, setusersCompany] = useState([]);
  const [post, setPost] = useState(false);
  const id = useSelector((state) => state.company.company[0].id);
  const token = useSelector((state) => state.jwtAUth.token);
  const SIRET = useSelector((state) => state.company.company[0].SIRET_number);

  const [newUser, setNewUser] = useState({
    password: '',
    email: '',
    lastname: '',
    firstname: '',
    phone_number: '+33600000000',
    job_title: 'à renseigner',
    language: 'French',
    companySIRET: SIRET,
  });

  const handleChange = (event) => {
    setNewUser(event.target.value);
  };

  const [checked, setChecked] = useState(true);

  const handleChangeCheckbox = (event) => {
    setChecked(event.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      password,
      firstname,
      lastname,
      email,
      // eslint-disable-next-line camelcase
      phone_number,
      // eslint-disable-next-line camelcase
      job_title,
      language,
      companySIRET,
    } = newUser;
    try {
      await axios.post('http://localhost:5000/api/v0/users', {
        password,
        email,
        lastname,
        firstname,
        phone_number,
        job_title,
        language,
        companySIRET,
      });
      setPost(!post);
      setNewUser({
        ...newUser,
        firstname: '',
        lastname: '',
        email: '',
        password: '',
      });
    } catch (err) {
      setError({ ...err });
    }
  };

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        setError(null);
        const { data } = await axios.get(
          `http://localhost:5000/api/v0/companies/${id}/users`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        setusersCompany(data);
      } catch (err) {
        setError({ ...err });
      }
    };

    fetchAllUsers();
  }, [post]);

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            type="text"
            id="list"
            select
            label={t('UserPage.1')}
            variant="outlined"
            size="small"
          >
            {usersCompany.map((item) => (
              // eslint-disable-next-line react/jsx-props-no-spreading
              <MenuItem {...item} key={item.id} value={item.id}>
                {item.lastname} {item.firstname} ({item.role[0].label})
              </MenuItem>
            ))}
          </TextField>

          <TextField
            type="text"
            id="usercode"
            label={t('UserPage.2')}
            onChange={handleChange}
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            type="text"
            id="apikey"
            label={t('UserPage.3')}
            onChange={handleChange}
            variant="outlined"
            size="small"
            defaultValue={t('UserPage.18')}
            disabled
          />
          <Container>
            <FormControlLabel
              control={
                <BlueCheckbox
                  checked={checked}
                  onChange={handleChangeCheckbox}
                  name="checkedA"
                />
              }
              label={t('UserPage.4')}
            />
          </Container>
          <Container>
            <Button
              className={classes.Buttonspace}
              variant="contained"
              style={{ backgroundColor: 'aquamarine' }}
            >
              {t('UserPage.5')}
            </Button>

            <Button className={classes.Buttonspace} variant="contained">
              {t('UserPage.6')}
            </Button>

            <Button
              className={classes.Buttonspace}
              variant="contained"
              color="secondary"
            >
              {t('UserPage.7')}
            </Button>
          </Container>
        </Grid>
      </Grid>

      <Divider variant="middle" />

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            type="text"
            id="firstname"
            label={t('UserPage.8')}
            value={newUser.firstname}
            onChange={(e) =>
              setNewUser({ ...newUser, firstname: e.target.value })
            }
            variant="outlined"
            size="small"
          />
          <TextField
            type="text"
            id="lastname"
            label={t('UserPage.9')}
            value={newUser.lastname}
            onChange={(e) =>
              setNewUser({ ...newUser, lastname: e.target.value })
            }
            variant="outlined"
            size="small"
          />

          <TextField
            type="text"
            id="email"
            label={t('UserPage.10')}
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            variant="outlined"
            size="small"
          />

          <TextField
            type="password"
            id="password"
            label={t('UserPage.11')}
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
            autoComplete="current-password"
            variant="outlined"
            size="small"
          />
          <Container>
            <Button className={classes.Buttonspace} variant="contained">
              {t('UserPage.15')}
            </Button>
          </Container>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControlLabel
            control={
              <BlueCheckbox
                style={{ marginLeft: '6px' }}
                checked={checked}
                onChange={handleChangeCheckbox}
                name="checkedB"
              />
            }
            label={t('UserPage.12')}
          />

          <FormControlLabel
            control={
              <BlueCheckbox
                checked={checked}
                onChange={handleChangeCheckbox}
                name="checkedC"
              />
            }
            label={t('UserPage.13')}
          />

          <FormControlLabel
            control={
              <BlueCheckbox
                checked={checked}
                onChange={handleChangeCheckbox}
                name="checkedD"
              />
            }
            label={t('UserPage.14')}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            className={classes.ButtonValForm}
            variant="contained"
            color="secondary"
          >
            {t('UserPage.16')}
          </Button>

          <Button
            className={classes.ButtonValForm}
            variant="contained"
            style={{ backgroundColor: 'limegreen' }}
            onClick={handleSubmit}
          >
            {t('UserPage.17')}
          </Button>
          {error && (
            <p style={{ color: 'red' }}>
              Oups there was an error, datas entered are invalid
            </p>
          )}
        </Grid>
      </Grid>
    </form>
  );
};

export default Griddatausers;
