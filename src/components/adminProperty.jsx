import { Grid, Paper } from '@material-ui/core';
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
    paddingLeft: theme.spacing(10),
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '50vw',
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
    width: '50vw',
    marginRight: '3%',
    textTransform: 'capitalize',
  },
  picPreviewPaper: {
    marginTop: '1em',
    marginBottom: '1em',
    width: '250px',
  },
  picPreview: {
    height: '150px',
  },
}));

const AdminProperty = () => {
  const classes = useStyles();
  const [error, setError] = useState('');
  const [property, setProperty] = useState([]);
  const [newProperty, setNewProperty] = useState({});
  const [id, setId] = useState('');
  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setIsSelected] = useState(false);
  const [uploaded, setUploaded] = useState('');
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
    const { label, lat, long, reservation } = newProperty;
    try {
      await axios.post(
        'http://localhost:5000/api/v0/properties',
        {
          label,
          lat,
          long,
          pictureUrl: uploaded.path,
          pictureAlt: label,
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
    const { label, lat, long, reservation } = newProperty;
    try {
      await axios.put(
        `http://localhost:5000/api/v0/properties/${id.id}`,
        {
          label,
          lat,
          long,
          pictureUrl: uploaded.path,
          pictureAlt: label,
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

  const handleUpload = (e) => {
    setSelectedFile(e.target.files[0]);
    setIsSelected(true);
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', selectedFile);
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/v0/pictures/upload`,
        formData,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      setUploaded(data);
    } catch (err) {
      setError({ ...err });
    }
  };

  useEffect(() => {
    fetchAllProperties();
  }, []);

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <Grid container>
        <Grid item xs={3}>
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
            // value={field()}
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
            // value={id !== '' ? property[id.id - 1].lat : null}
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
            // value={id !== '' ? property[id.id - 1].long : null}
            onChange={(e) =>
              setNewProperty({ ...newProperty, long: e.target.value })
            }
            variant="outlined"
            size="small"
          />
          {id !== '' ? (
            <Paper className={classes.picPreviewPaper}>
              <img
                src={property[id.id - 1].picture[0].url}
                alt="Preview"
                className={classes.picPreview}
              />
            </Paper>
          ) : null}
          <Button
            variant="outlined"
            component="label"
            className={classes.ButtonValForm}
          >
            Upload Picture
            <input type="file" hidden name="file" onChange={handleUpload} />
          </Button>
          {isSelected ? (
            <div>
              <Paper className={classes.picPreviewPaper}>
                <img
                  src={uploaded.path}
                  alt="Preview"
                  className={classes.picPreview}
                />
              </Paper>
            </div>
          ) : (
            <p>File preview</p>
          )}
          <div>
            <Button
              variant="outlined"
              component="label"
              type="submit"
              onClick={handleUploadSubmit}
              className={classes.ButtonValForm}
            >
              Submit
            </Button>
          </div>
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
