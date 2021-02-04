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

const AdminProperty = () => {
  const classes = useStyles();
  const [error, setError] = useState('');
  const [property, setProperty] = useState([]);
  const [newProperty, setNewProperty] = useState({});
  const [id, setId] = useState('');
  const token = useSelector((state) => state.jwtAUth.token);

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
      setProperty(data);
    } catch (err) {
      setError({ ...err });
    }
  };

  const deleteProperty = async () => {
    try {
      setError(null);
      await axios.delete(`http://localhost:5000/api/v0/properties/${id.id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      setError({ ...err });
    }
    fetchAllProperties();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      label,
      lat,
      long,
      pictureUrl,
      pictureAlt,
      reservation,
    } = newProperty;
    try {
      await axios.post(
        'http://localhost:5000/api/v0/properties',
        {
          label,
          lat,
          long,
          pictureUrl,
          pictureAlt,
          reservation,
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
    fetchAllProperties();
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const {
      label,
      lat,
      long,
      pictureUrl,
      pictureAlt,
      reservation,
    } = newProperty;
    try {
      await axios.put(
        `http://localhost:5000/api/v0/properties/${id.id}`,
        {
          label,
          lat,
          long,
          pictureUrl,
          pictureAlt,
          reservation,
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
    fetchAllProperties();
  };

  useEffect(() => {
    fetchAllProperties();
  }, []);

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            type="text"
            id="list"
            select
            label="Property list"
            variant="outlined"
            size="small"
            onChange={(e) => setId({ ...id, id: e.target.value })}
          >
            {property.map((item) => (
              // eslint-disable-next-line react/jsx-props-no-spreading
              <MenuItem {...item} key={item.id} value={item.id}>
                {`${item.id} - ${item.label}`}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            type="text"
            id="label"
            label="Label"
            value={id !== '' ? property[id.id - 1].label : 'label'}
            onChange={(e) =>
              setNewProperty({ ...newProperty, label: e.target.value })
            }
            variant="outlined"
            size="small"
          />
          <TextField
            type="text"
            id="lat"
            label="Latitude"
            value={id !== '' ? property[id.id - 1].lat : 'lat'}
            onChange={(e) =>
              setNewProperty({ ...newProperty, lat: e.target.value })
            }
            variant="outlined"
            size="small"
          />

          <TextField
            type="text"
            id="long"
            label="Longitude"
            value={id !== '' ? property[id.id - 1].long : 'long'}
            onChange={(e) =>
              setNewProperty({ ...newProperty, long: e.target.value })
            }
            variant="outlined"
            size="small"
          />

          <TextField
            type="text"
            id="pictureUrl"
            label="Picture Url"
            value={
              id !== '' ? property[id.id - 1].picture[0].url : 'pictureUrl'
            }
            onChange={(e) =>
              setNewProperty({ ...newProperty, pictureUrl: e.target.value })
            }
            variant="outlined"
            size="small"
          />
          <TextField
            type="text"
            id="pictureAlt"
            label="Picture Alt"
            value={
              id !== '' ? property[id.id - 1].picture[0].alt : 'pictureAlt'
            }
            onChange={(e) =>
              setNewProperty({ ...newProperty, pictureAlt: e.target.value })
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
            onClick={deleteProperty}
          >
            Delete Property
          </Button>
          <Button
            className={classes.ButtonValForm}
            variant="contained"
            style={{ backgroundColor: blue[400] }}
            onClick={handleUpdateSubmit}
          >
            Update Property
          </Button>
          <Button
            className={classes.ButtonValForm}
            variant="contained"
            style={{ backgroundColor: green[400] }}
            onClick={handleSubmit}
          >
            Add Property
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

export default AdminProperty;
