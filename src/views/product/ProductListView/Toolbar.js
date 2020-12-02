import React from 'react';
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
  Button
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

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

const Toolbar = ({ className, ...rest }) => {
  const classes = useStyles();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
                placeholder="Search product"
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
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<CloudUploadIcon />}
                  >
                    Upload New Image
                  </Button>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name of Dish"
                    type="text"
                    fullWidth
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="cost"
                    label="Cost of Dish"
                    type="number"
                    fullWidth
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleDialogClose} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={handleDialogClose} color="primary">
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
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
