import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';
//import { AccountContext } from 'src/views/auth/Account';
//import { Pool } from '@material-ui/icons';
import Pool from '../../auth/cognitoClient';
//

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
  }
}));

const ProfileDetails = ({ className, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    hotelName: 'Katarina',
    ownerName: 'Smith',
    email: 'demo@devias.io',
    phone: '',
    state: 'Alabama',
    country: 'USA'
  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
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
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Please specify the Hotel name"
                label="Hotel Name"
                name="hoteltName"
                onChange={handleChange}
                required
                value={values.hotelName}
                placeholder="Hotel Name"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Owner Name"
                name="ownerName"
                onChange={handleChange}
                required
                value={values.ownerName}
                placeholder="Owner Name"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
                placeholder="Email Id"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                onChange={handleChange}
                type="number"
                value={values.phone}
                placeholder="Mobile Name"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="License Number"
                name="number"
                onChange={handleChange}
                required
                value={values.liscense}
                placeholder="License Number"
              />
            </Grid>
            <Grid item md={3} xs={6}>
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
                label="Select State"
                name="state"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.state}
                placeholder="State"
              >
                {states.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item md={6} xs={12}>
              <Button color="primary">Upload Proof</Button>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box display="inline" style={{ float: 'left' }} p={2}>
          <Button
            color="primary"
            variant="contained"
            onClick={onLogout}
            to="/login"
          >
            Log Out
          </Button>
        </Box>
        <Box display="inline" style={{ float: 'right' }} p={2}>
          <Button color="primary" variant="contained">
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};

export default ProfileDetails;
