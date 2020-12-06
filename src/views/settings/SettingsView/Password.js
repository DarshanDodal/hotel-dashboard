import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  makeStyles,
  Snackbar
} from '@material-ui/core';
import { CognitoUser } from 'amazon-cognito-identity-js';
import MuiAlert from '@material-ui/lab/Alert';
import Pool from '../../auth/cognitoClient';
import { PhotoSizeSelectLarge } from '@material-ui/icons';
import { AccountContext } from '../../auth/Account';
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles({
  root: {}
});

const Password = ({ className, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    password: '',
    newPassword: '',
    confirm: ''
  });
  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [error, setError] = React.useState(false);

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleSnackBarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const { getSession, authenticate } = useContext(AccountContext);
  const onChangePassword = () => {
    if (values.newPassword === values.confirm) {
      getSession()
        .then(({ user, email }) => {
          authenticate(email, values.password).then(() => {
            user.changePassword(
              values.password,
              values.confirm,
              (err, result) => {
                if (err) {
                  setSeverity('error');
                  setMessage(err.message);
                  setOpen(true);
                  return;
                }
                setSeverity('success');
                setMessage(result);
                setOpen(true);
              }
            );
          });
        })
        .catch(error => {
          setSeverity('error');
          setMessage(error.message);
          setOpen(true);
        });
    } else {
      setError(true);
    }
  };
  return (
    <form className={clsx(classes.root, className)} {...rest}>
      <Card>
        <CardHeader subheader="Update password" title="Password" />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="Older Password"
            margin="normal"
            name="password"
            onChange={handleChange}
            type="password"
            value={values.password}
            placeholder="Older Password"
          />
          <TextField
            fullWidth
            label="New password"
            margin="normal"
            name="newPassword"
            onChange={handleChange}
            type="password"
            value={values.newPassword}
            placeholder="New Password"
            helperText="It must be alphabet, @, number and greater than 8 character"
          />
          <TextField
            fullWidth
            error={error}
            helperText={
              error ? 'New password and Confirm password do not match' : null
            }
            label="Confirm password"
            margin="normal"
            name="confirm"
            onChange={handleChange}
            type="password"
            value={values.confirm}
            placeholder="Confirm Password"
          />
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button
            color="primary"
            variant="contained"
            onClick={onChangePassword}
            disabled={
              !values.confirm || !values.password || !values.newPassword
            }
          >
            Update Password
          </Button>
        </Box>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleSnackBarClose}
        >
          <Alert onClose={handleSnackBarClose} severity={severity}>
            {message}
          </Alert>
        </Snackbar>
      </Card>
    </form>
  );
};

Password.propTypes = {
  className: PropTypes.string
};

export default Password;
