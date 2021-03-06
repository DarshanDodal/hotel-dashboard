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
  makeStyles,
  InputLabel
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
    firstName: 'Katarina',
    lastName: 'Smith',
    email: 'demo@devias.io',
    phone: ''
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
        <CardHeader title="User Details" />
        {/* subheader="The information can be edited" */}
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Please specify the Hotel name"
                label="First Name"
                name="firstName"
                onChange={handleChange}
                required
                value={values.firstName}
                placeholder="First Name"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                onChange={handleChange}
                required
                value={values.lastName}
                placeholder="Last Name"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email"
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
                required
                type="number"
                value={values.phone}
                placeholder="Phone Number"
              />
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
