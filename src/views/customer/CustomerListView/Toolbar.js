import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles,
  Fab,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  FormControl,
  InputLabel,
  Button,
  NativeSelect,
  FormHelperText,
  Snackbar,
  Tooltip
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import { TableDB } from '../../../server/links';
import Pool from '../../auth/cognitoClient';
import MuiAlert from '@material-ui/lab/Alert';
import SyncIcon from '@material-ui/icons/Sync';
const axios = require('axios');
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

const Toolbar = ({ className, onNewTable, ...rest }) => {
  const classes = useStyles();

  const [openDialog, setOpenDialog] = React.useState(false);
  const [state, setState] = React.useState({
    chairs: '',
    tableNumber: ''
  });
  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState('');
  const [message, setMessage] = React.useState('');
  const handleChange = event => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value
    });
  };
  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleCreateTable = () => {
    fetch(TableDB, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        hotel: Pool.getCurrentUser().username,
        tNumber: state.tableNumber,
        chairs: state.chairs
      })
    })
      .then(response => response.json())
      .then(response => {
        //console.log(response);
        handleDialogClose();
        setSeverity('success');
        setMessage('SUCCESS!');
        setOpen(true);
        onNewTable();
      });
  };

  const handleSnackBarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box>
        <Card>
          <CardContent>
            <Box style={{ width: '70%', display: 'inline-block' }}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon fontSize="small" color="action">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search Table"
                variant="outlined"
              />
            </Box>

            <Box style={{ display: 'inline-block', float: 'right' }}>
              <Fab
                variant="extended"
                color="primary"
                onClick={handleDialogOpen}
              >
                <AddCircleIcon className={classes.extendedIcon} />
                Add Table
              </Fab>
              {/* <IconButton aria-label="delete" >
                <DeleteIcon color= 'secondary' fontSize="large"  />
              </IconButton> */}
            </Box>
            <Box style={{ display: 'inline-block', float: 'right' }}>
              <Tooltip title="Refresh">
                <IconButton
                  size="large"
                  onClick={onNewTable}
                  aria-label="delete"
                >
                  <SyncIcon size="large" color="primary" />
                </IconButton>
              </Tooltip>
            </Box>

            <Dialog
              open={openDialog}
              onClose={handleDialogClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Add New table</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  name="tableNumber"
                  label="Table Number"
                  type="text"
                  fullWidth
                  onChange={handleChange}
                  value={state.tableNumber}
                />
                <FormControl className={classes.formControl}>
                  {/* <InputLabel htmlFor="chair-native-helper">
                    Number of Chair
                  </InputLabel> */}
                  <TextField
                    autoFocus
                    margin="normal"
                    name="chairs"
                    id="numberofchairs"
                    label="Number of Chairs"
                    type="number"
                    fullWidth
                    onChange={handleChange}
                    value={state.chairs}
                  />
                  {/* <NativeSelect
                    value={state.chair}
                    onChange={handleChange}
                    inputProps={{
                      name: 'chair',
                      id: 'chair-native-helper'
                    }}
                  >
                    <option aria-label="None" value="" />
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                    <option value={8}>8</option>
                    <option value={9}>9</option>
                    <option value={10}>10</option>
                    <option value={11}>11</option>
                    <option value={12}>12</option>
                  </NativeSelect> */}
                  <FormHelperText>Select the Number of Chair.</FormHelperText>
                </FormControl>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleDialogClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleCreateTable} color="primary">
                  Add
                </Button>
              </DialogActions>
            </Dialog>
          </CardContent>
        </Card>
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
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
