import React, { useEffect } from 'react';
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
  Snackbar
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EventSeatIcon from '@material-ui/icons/EventSeat';
import DoneIcon from '@material-ui/icons/Done';
import CenterFocusWeakIcon from '@material-ui/icons/CenterFocusWeak';
import CheckIcon from '@material-ui/icons/CheckCircle';
import SendIcon from '@material-ui/icons/Send';
import QRModal from './QRDialog';
import DeleteConfirmDialog from './DeleteConfirmDialog';
import Tooltip from '@material-ui/core/Tooltip';
import { getTableById, TableDB } from '../../../server/getTables';
import MuiAlert from '@material-ui/lab/Alert';
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
  chairSave: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

const Results = ({ className, tableData, onTableDelete, product, ...rest }) => {
  const classes = useStyles();
  const [openQrScaner, setOpenQrScaner] = React.useState(false);
  const [openDialogScaner, setOpenDialogScaner] = React.useState(false);
  const [state, setState] = React.useState({
    tableNumber: '',
    tableId: '',
    chairs: '',
    HotelId: '',
    status: ''
  });
  const [chairs, setChairs] = React.useState('');
  const [changed, setChanged] = React.useState(false);
  const [uploaded, setUploaded] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState('');
  const [message, setMessage] = React.useState('');

  const handleQrOpen = () => {
    setOpenQrScaner(true);
  };
  const handleQrClose = () => {
    setOpenQrScaner(false);
  };

  const handleDialogOpen = () => {
    setOpenDialogScaner(true);
  };
  const handleDialogClose = () => {
    setOpenDialogScaner(false);
  };

  const handleChairChange = event => {
    //console.log(event.target.value);
    setChairs(event.target.value);
    setChanged(true);
  };

  const handleChairUpdate = () => {
    fetch(
      TableDB +
        '/update-one/' +
        tableData.tableId +
        `?update=chairs&value=${chairs}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        }
      }
    )
      .then(response => response.json())
      .then(response => {
        //console.log(response);
        setChanged(false);
        setUploaded(true);
        setChairs(chairs);
      });
  };

  const handleSnackBarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    getTableById(tableData.tableId).then(table => {
      //   console.log(table.data.Item);

      setState({
        tableNumber: table.data.Item.tableNumber,
        tableId: table.data.Item.tableId,
        HotelId: table.data.Item.HotelId,
        status: table.data.Item.status
      });
      setChairs(table.data.Item.chairs);
      // if (tables.data.Items.length > 0) {
      //   setTables(tables.data.Items);
      // }
      // if (Object.keys(profile.data).length === 0) {
      //   setProfileEmpty(true);
      // }
    });
  }, [uploaded]);

  const ChairComp = () => {
    return Array(parseInt(tableData.chairs)).fill(
      <EventSeatIcon style={{ marginLeft: 3, marginRight: 3 }} />
    );
  };

  return (
    <>
      <Card className={clsx(classes.root, className)} {...rest}>
        <CardContent style={{ textAlign: 'center' }}>
          <Typography align="center" gutterBottom variant="h4">
            Table {tableData.tableNumber}
            {/* {product.title} */}
          </Typography>
          <Box m={2}>
            {/* <chairIcons /> */}
            {/* <EventSeatIcon style={{ marginLeft: 3, marginRight: 3 }} />
            <EventSeatIcon style={{ marginLeft: 3, marginRight: 3 }} /> */}
            <ChairComp />
          </Box>
          <Box m={2} classes={{ root: classes.chairSave }}>
            <TextField
              id="filled-number"
              label=""
              name="chairs"
              type="number"
              InputProps={{ inputProps: { min: 0, max: 50 } }}
              InputLabelProps={{
                shrink: true
              }}
              placeholder="No. of Chair"
              value={chairs}
              onChange={handleChairChange}
            />
            {changed ? (
              <Tooltip title="Save">
                <IconButton onClick={handleChairUpdate} aria-label="delete">
                  <SendIcon color="secondary" />
                </IconButton>
              </Tooltip>
            ) : null}
          </Box>
        </CardContent>
        <Box flexGrow={1} />
        <Divider />
        <Box p={2}>
          <Grid container justify="space-between" spacing={2}>
            <Grid className={classes.statsItem} item>
              <IconButton onClick={handleDialogOpen} aria-label="delete">
                <DeleteIcon color="secondary" />
              </IconButton>
              <IconButton aria-label="qr" onClick={handleQrOpen}>
                <CenterFocusWeakIcon color="action" />
              </IconButton>
              {/* MOdal here */}
              <QRModal
                qrModal={openQrScaner}
                tableId={tableData.tableId}
                tableNumber={tableData.tableNumber}
                handleQrClose={handleQrClose}
              />

              <DeleteConfirmDialog
                dialogModal={openDialogScaner}
                tableId={tableData.tableId}
                tableNumber={tableData.tableNumber}
                handleDialogClose={handleDialogClose}
                onDelete={() => {
                  setSeverity('success');
                  setMessage('SUCCESS!');
                  setOpen(true);
                  setOpenDialogScaner(false);
                  //onTableDelete();
                }}
              />
            </Grid>
            <Grid className={classes.statsItem} item>
              <Typography
                color="textSecondary"
                display="inline"
                variant="body2"
              >
                Id: {tableData.tableId}{' '}
              </Typography>
            </Grid>
          </Grid>
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
    </>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array
};

export default Results;
