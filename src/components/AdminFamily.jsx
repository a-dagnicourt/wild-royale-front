import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';

import axios from 'axios';
import { useSelector } from 'react-redux';
import { blue, green, red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '80vw',
    marginLeft: theme.spacing(15),
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

const AdminFamily = () => {
  const classes = useStyles();
  const [error, setError] = useState('');
  const [family, setFamily] = useState([]);
  const [id, setId] = useState('');
  const token = useSelector((state) => state.jwtAUth.token);

  const [newFamily, setNewFamily] = useState({});

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
      setFamily(data);
    } catch (err) {
      setError({ ...err });
    }
  };

  const deleteFamily = async () => {
    try {
      setError(null);
      await axios.delete(`http://localhost:5000/api/v0/families/${id.id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      setError({ ...err });
    }
    fetchAllFamilies();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstname, lastname, linkedin, github, zone, picture } = newFamily;
    try {
      await axios.post(
        'http://localhost:5000/api/v0/families',
        {
          firstname,
          lastname,
          linkedin,
          github,
          zone,
          picture,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      setError({ ...err });
    }
    fetchAllFamilies();
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const { firstname, lastname, linkedin, github, zone, picture } = newFamily;
    try {
      await axios.put(
        `http://localhost:5000/api/v0/families/${id.id}`,
        {
          firstname,
          lastname,
          linkedin,
          github,
          zone,
          picture,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      setError({ ...err });
    }
    fetchAllFamilies();
  };

  useEffect(() => {
    fetchAllFamilies();
  }, []);

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            type="text"
            id="list"
            select
            label="Family list"
            variant="outlined"
            size="small"
            onChange={(e) => setId({ ...id, id: e.target.value })}
          >
            {family.map((item) => (
              // eslint-disable-next-line react/jsx-props-no-spreading
              <MenuItem {...item} key={item.id} value={item.id}>
                {`${item.id} - ${item.lastname} ${item.firstname}`}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            type="text"
            id="firstname"
            label="Firstname"
            value={newFamily.firstname}
            onChange={(e) =>
              setNewFamily({ ...newFamily, firstname: e.target.value })
            }
            variant="outlined"
            size="small"
          />
          <TextField
            type="text"
            id="lastname"
            label="Lastname"
            value={newFamily.lastname}
            onChange={(e) =>
              setNewFamily({ ...newFamily, lastname: e.target.value })
            }
            variant="outlined"
            size="small"
          />

          <TextField
            type="text"
            id="linkedin"
            label="LinkedIn"
            value={newFamily.linkedin}
            onChange={(e) =>
              setNewFamily({ ...newFamily, linkedin: e.target.value })
            }
            variant="outlined"
            size="small"
          />

          <TextField
            type="text"
            id="github"
            label="GitHub"
            value={newFamily.github}
            onChange={(e) =>
              setNewFamily({ ...newFamily, github: e.target.value })
            }
            variant="outlined"
            size="small"
          />
          <TextField
            type="text"
            id="zone"
            label="Zone"
            value={newFamily.zone}
            onChange={(e) =>
              setNewFamily({ ...newFamily, zone: e.target.value })
            }
            variant="outlined"
            size="small"
          />
          <TextField
            type="text"
            id="picture"
            label="Picture"
            value={newFamily.picture}
            onChange={(e) =>
              setNewFamily({ ...newFamily, picture: e.target.value })
            }
            variant="outlined"
            size="small"
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            className={classes.ButtonValForm}
            variant="contained"
            style={{ backgroundColor: red[300] }}
            onClick={deleteFamily}
          >
            Delete User
          </Button>
          <Button
            className={classes.ButtonValForm}
            variant="contained"
            style={{ backgroundColor: blue[400] }}
            onClick={handleUpdateSubmit}
          >
            Update User
          </Button>
          <Button
            className={classes.ButtonValForm}
            variant="contained"
            style={{ backgroundColor: green[400] }}
            onClick={handleSubmit}
          >
            Add User
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

export default AdminFamily;
