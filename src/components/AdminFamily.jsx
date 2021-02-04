import { Divider, Grid } from '@material-ui/core';
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
  const [newFamily, setNewFamily] = useState({});
  const [id, setId] = useState('');
  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setIsSelected] = useState(false);
  const [uploaded, setUploaded] = useState('');
  const token = useSelector((state) => state.jwtAUth.token);

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
            type="input"
            id="firstname"
            label="Firstname"
            // value={id !== '' ? family[id.id - 1].firstname : null}
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
            // value={id !== '' ? family[id.id - 1].lastname : null}
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
            // value={id !== '' ? family[id.id - 1].linkedin : null}
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
            // value={id !== '' ? family[id.id - 1].github : null}
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
            // value={id !== '' ? family[id.id - 1].zone : null}
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
            value={uploaded.path !== '' ? uploaded.path : null}
            onChange={(e) =>
              setNewFamily({ ...newFamily, picture: e.target.value })
            }
            variant="outlined"
            size="small"
          />
          <Divider style={{ margin: '1em' }} />
          <Button variant="outlined" component="label">
            Upload Picture
            <input type="file" hidden name="file" onChange={handleUpload} />
          </Button>
          {isSelected ? (
            <div>
              <p>Filename: {selectedFile.name}</p>
            </div>
          ) : (
            <p>Select a file to show details</p>
          )}
          <div>
            <Button
              variant="outlined"
              component="label"
              type="submit"
              onClick={handleUploadSubmit}
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
