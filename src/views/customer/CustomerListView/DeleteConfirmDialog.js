import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  makeStyles,
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  IconButton,
  DialogContentText
} from '@material-ui/core';
import { getTableById, TableDB } from '../../../server/getTables';

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
  }
}));

const QRModal = ({
  className,
  dialogModal,
  handleDialogClose,
  tableId,
  tableNumber,
  onDelete,
  ...rest
}) => {
  const classes = useStyles();
  const [openQrScaner, setOpenQrScaner] = React.useState(false);
  const [state, setState] = React.useState({
    chair: '',
    name: 'hai'
  });
  //   const handleQrOpen = () => {
  //     setOpenQrScaner(true);
  //   };
  // const handleQrClose = () => {
  //   setOpenQrScaner(false);
  // };

  const handleDelete = () => {
    fetch(TableDB + '/delete-one/' + tableId, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(response => {
        //console.log(response);
        onDelete();
      });
  };

  return (
    <Dialog
      open={dialogModal}
      onClose={handleDialogClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">DELETE</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Do you really want to delete Table Number :'{tableNumber}' with ID: '
          {tableId}' ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleDelete} color="primary">
          ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default QRModal;
