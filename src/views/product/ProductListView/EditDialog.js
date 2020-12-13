import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  makeStyles,
  CardMedia,
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  IconButton,
  Input,
  InputLabel,
  Snackbar,
  CircularProgress
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DeleteIcon from '@material-ui/icons/Delete';
import Pool from '../../auth/cognitoClient';
import { MenuDB, FileUploadMicroservice } from '../../../server/links';
import MuiAlert from '@material-ui/lab/Alert';
import { set } from 'nprogress';
const axios = require('axios');
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  statsIcon: {
    marginRight: theme.spacing(1)
  },
  media: {
    height: 180
  },
  uploadDiv: { display: 'flex', flexDirection: 'row' },
  Button: { marginLeft: 10 },
  buttonProgress: {
    color: 'primary',
    position: 'absolute',
    top: '50%',
    left: '50%'
    // marginTop: -12,
    // marginLeft: -12
  }
}));

const EditDialog = ({ className, openDialog, handleClose, dish, ...rest }) => {
  const classes = useStyles();
  const [fileChosen, setFileChosen] = React.useState(false);
  const [file, setFile] = React.useState('');
  const [temp, setTemp] = React.useState(null);
  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [category, setCategory] = React.useState('');

  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState('');
  const [message, setMessage] = React.useState('');

  const [Loading, setLoading] = React.useState(false);

  //   const [open, setOpen] = React.useState(false);

  //   const handleClickOpen = () => {
  //     setOpen(true);
  //   };

  //   const handleClose = () => {
  //     setOpen(false);
  //   };

  useEffect(() => {
    setName(dish.name);
    setPrice(dish.price);
    setCategory(dish.category);
    setFile(dish.image);
  }, []);

  const handleSnackBarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleNameChange = event => {
    setName(event.target.value);
  };
  const handlePriceChange = event => {
    setPrice(event.target.value);
  };
  const handleCategoryChange = event => {
    setCategory(event.target.value);
  };

  const handleDishDelete = () => {
    fetch(
      MenuDB +
        '/delete-one' +
        '/' +
        '?dish=' +
        dish.dishId +
        '&hotel=' +
        Pool.getCurrentUser().username,
      {
        method: 'DELETE'
      }
    )
      .then(response => response.json())
      .then(response => {
        // console.log(response);
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
    handleClose();
    setLoading(false);
    return;
  };

  const updateDish = event => {
    event.preventDefault();
    setLoading(true);
    if (!temp) {
      //   console.log('its here');
      fetch(MenuDB + '/update-one' + '/' + dish.dishId, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          hotel: Pool.getCurrentUser().username,
          updates: [
            {
              query: 'name',
              value: name
            },
            {
              query: 'price',
              value: price
            },
            {
              query: 'category',
              value: category
            },
            {
              query: 'image',
              value: file
            }
          ]
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
      handleClose();
      setLoading(false);
      return;
    }
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };

    const formData = new FormData();
    formData.append('file', temp);
    axios
      .post(
        // 'http://localhost:4000' +
        FileUploadMicroservice +
          //FileUploadMicroservice +
          '/upload-delete' +
          `?imgName=${dish.dishId}`,
        formData,
        config
      )
      .then(res => {
        console.log(res);
        fetch(MenuDB + '/update-one' + '/' + dish.dishId, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify({
            hotel: Pool.getCurrentUser().username,
            updates: [
              {
                query: 'name',
                value: name
              },
              {
                query: 'price',
                value: price
              },
              {
                query: 'category',
                value: category
              },
              {
                query: 'image',
                value: res.data.file
              }
            ]
          })
        })
          .then(response => response.json())
          .then(response => {
            // console.log(response);
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
      })
      .catch(error => {
        setSeverity('error');
        setMessage(error.message);
        setOpen(true);
      });
    setLoading(false);
    handleClose();
  };

  const handleFileChoose = event => {
    setTemp(event.target.files[0]);
    setFileChosen(true);
  };
  //   const handleFileUpload = () => {};
  return (
    <>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Dish</DialogTitle>
        <DialogContent>
          {/* <Grid item md={6} xs={12}> */}
          <InputLabel>Dish Image</InputLabel>
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
                filename={temp}
              />
            </Button>
            {/* {fileChosen ? (
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
            ) : null} */}
          </Box>

          <InputLabel fullwidth color="primary" shrink>
            <a href={file}>{file}</a>
          </InputLabel>
          {/* </Grid> */}
          {/* <Button
          variant="contained"
          color="primary"
          className={classes.button}
          endIcon={<CloudUploadIcon />}
        >
          Upload New Image
        </Button> */}
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Edit Name"
            type="text"
            name="name"
            fullWidth
            value={name}
            onChange={handleNameChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="price"
            label="Edit Price"
            type="number"
            name="price"
            fullWidth
            value={price}
            onChange={handlePriceChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="category"
            label="Edit Category"
            type="text"
            name="category"
            fullWidth
            value={category}
            onChange={handleCategoryChange}
          />
        </DialogContent>
        <DialogActions>
          <Button
            startIcon={<DeleteIcon />}
            color="secondary"
            style={{ left: 15, position: 'absolute' }}
            onClick={handleDishDelete}
          >
            Delete
          </Button>
          {Loading ? (
            <CircularProgress size={24} className={classes.buttonProgress} />
          ) : null}
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={updateDish} color="primary">
            Done
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleSnackBarClose}
      >
        <Alert onClose={handleSnackBarClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default EditDialog;
