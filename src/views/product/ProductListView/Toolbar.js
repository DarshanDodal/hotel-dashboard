import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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
  Menu,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  Snackbar,
  Tooltip,
  Input,
  InputLabel,
  CircularProgress
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { MenuDB, FileUploadMicroservice } from '../../../server/links';
import MuiAlert from '@material-ui/lab/Alert';
import SyncIcon from '@material-ui/icons/Sync';
import Pool from '../../auth/cognitoClient';
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

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5'
  }
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center'
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white
      }
    }
  }
}))(MenuItem);

const Toolbar = ({ className, onSync, ...rest }) => {
  const classes = useStyles();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

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

  const handleSnackBarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setFile('');
    setTemp(null);
    setName('');
    setPrice('');
    setCategory('');
  };

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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

  const handleFileChoose = event => {
    setTemp(event.target.files[0]);
  };

  const handleNewDish = event => {
    event.preventDefault();
    fetch(MenuDB + '/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        HotelId: Pool.getCurrentUser().username,
        name: name,
        price: price,
        category: category,
        image: '-'
      })
    })
      .then(response => response.json())
      .then(response => {
        // console.log(response);
        if (response.error) {
          setSeverity('error');
          setMessage(response.message);
          setOpen(true);
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
            FileUploadMicroservice +
              //FileUploadMicroservice +
              '/upload-dish-img' +
              `?imgName=${response.data}`,
            formData,
            config
          )
          .then(res => {
            // console.log(res);
            fetch(MenuDB + '/update-one' + '/' + response.data, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: JSON.stringify({
                hotel: Pool.getCurrentUser().username,
                updates: [
                  {
                    query: 'image',
                    value: res.data.file
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
          })
          .catch(error => {
            setSeverity('error');
            setMessage(error.message);
            setOpen(true);
          });
        setSeverity('success');
        setMessage('SUCCESS!');
        setOpen(true);
      })
      .catch(err => {
        setSeverity('error');
        setMessage(err.message);
        setOpen(true);
      });

    setLoading(false);
    handleClose();
  };

  // const handleFileUpload = () => {};

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box>
        <Card>
          <CardContent>
            <Box style={{ display: 'inline-block', width: '70%' }}>
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
                placeholder="Search Dish"
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
                Add Dish
              </Fab>

              <Dialog
                open={dialogOpen}
                onClose={handleDialogClose}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">New Dish</DialogTitle>
                <DialogContent>
                  <InputLabel>Dish Image</InputLabel>
                  <br />
                  <Box classes={{ root: classes.uploadDiv }}>
                    <Button
                      color="primary"
                      variant="contained"
                      component="label"
                    >
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
                    label="Dish Name"
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
                    label="Price"
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
                    label="Category"
                    type="text"
                    name="category"
                    fullWidth
                    value={category}
                    onChange={handleCategoryChange}
                  />
                </DialogContent>
                <DialogActions>
                  {Loading ? (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  ) : null}
                  <Button onClick={handleDialogClose} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={handleNewDish} color="primary">
                    Add Dish
                  </Button>
                </DialogActions>
              </Dialog>

              <IconButton aria-label="delete" onClick={handleClick}>
                <ImportExportIcon color="primary" fontSize="large" />
              </IconButton>

              <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <StyledMenuItem>
                  <ListItemIcon>
                    <FavoriteBorderIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Most Liked" />
                </StyledMenuItem>
                <StyledMenuItem>
                  <ListItemIcon>
                    <ArrowUpwardIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Ascending" />
                </StyledMenuItem>
                <StyledMenuItem>
                  <ListItemIcon>
                    <ArrowDownwardIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Descending" />
                </StyledMenuItem>
              </StyledMenu>
            </Box>
            <Box
              style={{ display: 'inline-block', float: 'right', marginTop: 5 }}
            >
              <Tooltip title="Refresh">
                <IconButton size="large" onClick={onSync} aria-label="delete">
                  <SyncIcon size="large" color="primary" />
                </IconButton>
              </Tooltip>
            </Box>
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
