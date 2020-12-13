import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Container,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles,
  InputLabel,
  Snackbar,
  Input
} from '@material-ui/core';
//import { AccountContext } from 'src/views/auth/Account';
//import { Pool } from '@material-ui/icons';
import Pool from '../../auth/cognitoClient';
import getProfile from '../../../server/getProfile';
import { HotelDBAPI, FileUploadMicroservice } from '../../../server/links';
import MuiAlert from '@material-ui/lab/Alert';
const axios = require('axios');
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const states = [
  {
    value: 'alabama',
    label: 'Alabama'
  },
  {
    value: 'new-york',
    label: 'New York'
  },
  {
    value: 'san-francisco',
    label: 'San Francisco'
  }
];

const useStyles = makeStyles(theme => ({
  root: {},
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 150
  },
  Button: {
    left: 10
  },
  uploadDiv: { display: 'flex', flexDirection: 'row' }
}));

const ProfileDetails = ({ className, ...rest }) => {
  const classes = useStyles();

  const [values, setValues] = useState({
    hotelName: '',
    owner: '',
    address: '',
    phone: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
    licenseNumber: '',
    guestCapacity: ''
  });
  const [licenseDoc, setLicenseDoc] = useState([]);
  const [temp, setTemp] = useState('');
  const [File, setFile] = useState({});
  const [fileChosen, setFileChosen] = useState(false);

  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState('');
  const [message, setMessage] = React.useState('');
  useEffect(() => {
    getProfile().then(profile => {
      if (Object.keys(profile.data).length === 0) {
        return;
      }
      // console.log(profile.data);
      setValues({
        hotelName: profile.data.Item.hotelName || '',
        owner: profile.data.Item.owner || '',
        address: profile.data.Item.address || '',
        phone: profile.data.Item.phone || '',
        city: profile.data.Item.city || '',
        state: profile.data.Item.state || '',
        country: profile.data.Item.country || '',
        pincode: profile.data.Item.pincode || '',
        licenseNumber: profile.data.Item.licenseNumber || '',
        guestCapacity: profile.data.Item.guestCapacity || ''
      });
      setLicenseDoc(profile.data.Item.licenseDoc || '');
    });
  }, []);

  const handleSnackBarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleFileChoose = event => {
    console.log(event.target.files[0]);
    setFile(event.target.files[0]);
    setFileChosen(true);
  };

  const handleFileUpload = event => {
    event.preventDefault();
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };

    const formData = new FormData();
    formData.append('newFile', File);
    axios
      .post(
        //'http://localhost:4000' +
        FileUploadMicroservice +
          '/upload-doc' +
          `?hotelName=${values.hotelName}`,
        formData,
        config
      )
      .then(res => {
        // console.log(res.data.file);
        setTemp(res.data.file);
        setSeverity('success');
        setMessage('SUCCESS!');
        setOpen(true);
        // console.log(licenseDoc);
      })
      .catch(error => {
        setSeverity('error');
        setMessage(error.message);
        setOpen(true);
      });
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log('event:', event);
    fetch(HotelDBAPI + '/hotel', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        username: Pool.getCurrentUser().username,
        hotelName: values.hotelName,
        owner: values.owner,
        address: values.address,
        phone: values.phone,
        city: values.city,
        state: values.state,
        country: values.country,
        pincode: values.pincode,
        licenseNumber: values.licenseNumber,
        licenseDoc: temp,
        guestCapacity: values.guestCapacity,
        profile: 'Not approved'
      })
    })
      .then(response => response.json())
      .then(response => {
        //console.log(response);
        if (response.error) {
          setSeverity('error');
          setMessage(response.message);
          setOpen(true);
        }
        setSeverity('success');
        setMessage('SUCCESS!');
        setOpen(true);
      })
      .catch(err => {
        setSeverity('error');
        setMessage(err.message);
        setOpen(true);
      });
  };

  const onLogout = () => {
    Pool.getCurrentUser().signOut();
    navigate('/login', { replace: true });
  };

  // const handleOnClickLogout = LogOut => {
  //   LogOut();
  //   navigate('/login', { replace: true });
  // };
  // const { logout } = useContext(AccountContext);
  const navigate = useNavigate();
  return (
    <Box>
      <form
        autoComplete="off"
        noValidate
        className={clsx(classes.root, className)}
        {...rest}
        onSubmit={handleSubmit}
      >
        <Card>
          <CardHeader title="Hotel Details" />
          {/* subheader="The information can be edited" */}
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  helperText="Please specify the Hotel name"
                  label="Hotel Name"
                  name="hotelName"
                  onChange={handleChange}
                  required
                  value={values.hotelName}
                  placeholder="Hotel Name"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Owner"
                  name="owner"
                  onChange={handleChange}
                  required
                  value={values.owner}
                  placeholder="Owner Name/ Company"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  onChange={handleChange}
                  required
                  type="number"
                  value={values.phone}
                  placeholder="Mobile Name"
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  onChange={handleChange}
                  required
                  value={values.address}
                  placeholder="Email Id"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="City"
                  name="city"
                  onChange={handleChange}
                  required
                  value={values.city}
                  placeholder="City"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="State / Province"
                  name="state"
                  onChange={handleChange}
                  required
                  // select
                  // SelectProps={{ native: true }}
                  value={values.state}
                  placeholder="State"
                />
                {/* {states.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))} */}
                {/* </TextField> */}
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Country"
                  name="country"
                  onChange={handleChange}
                  required
                  value={values.country}
                  placeholder="Country"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Postal / Zip Code"
                  name="pincode"
                  onChange={handleChange}
                  required
                  value={values.pincode}
                  placeholder="pincode"
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Guest Capacity"
                  name="guestCapacity"
                  onChange={handleChange}
                  required
                  type="number"
                  value={values.guestCapacity}
                  placeholder="Guest Capacity"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="License Number"
                  name="licenseNumber"
                  onChange={handleChange}
                  required
                  value={values.licenseNumber}
                  placeholder="License Number"
                />
              </Grid>
              {/* <Grid item md={3} xs={6}>
              <TextField
                required
                id="time"
                label="Open From"
                type="time"
                defaultValue="07:30"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true
                }}
                inputProps={{
                  step: 300 // 5 min
                }}
              />
            </Grid>
            <Grid item md={3} xs={6}>
              <TextField
                required
                id="time"
                label="Open To"
                type="time"
                defaultValue="11:30"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true
                }}
                inputProps={{
                  step: 300 // 5 min
                }}
              />
            </Grid> */}

              <Grid item md={6} xs={12}>
                <InputLabel required>
                  Hotel Registration Document (pdf only)
                </InputLabel>
                <br />
                <Box classes={{ root: classes.uploadDiv }}>
                  <Button color="primary" variant="contained" component="label">
                    Choose
                    <Input
                      type="file"
                      name="file"
                      hidden
                      color="primary"
                      onChange={handleFileChoose}
                    />
                  </Button>
                  {fileChosen ? (
                    <Button
                      onClick={handleFileUpload}
                      color="primary"
                      variant="contained"
                      component="label"
                      classes={{ root: classes.Button }}
                      name="licenseDoc"
                    >
                      Upload
                    </Button>
                  ) : null}
                </Box>

                <InputLabel fullwidth color="primary" shrink>
                  <a href={licenseDoc}>{licenseDoc}</a>
                </InputLabel>
              </Grid>
              {/* <Grid item md={6} xs={12}>
              {Object.keys(File).length === 0 ? null : (
                
              )}
            </Grid> */}
            </Grid>
          </CardContent>
          <Divider />

          <Box display="inline" style={{ float: 'right' }} p={2}>
            <Button type="submit" color="primary" variant="contained">
              Save details
            </Button>
          </Box>
        </Card>
      </form>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleSnackBarClose}
      >
        <Alert onClose={handleSnackBarClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};

export default ProfileDetails;
