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
  IconButton
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EventSeatIcon from '@material-ui/icons/EventSeat';
import CenterFocusWeakIcon from '@material-ui/icons/CenterFocusWeak';
import QRCode from 'qrcode.react';

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
  qrModal,
  handleQrClose,
  tableId,
  tableNumber,
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
  //   const handleQrClose = () => {
  //     setOpenQrScaner(false);
  //   };

  const downloadQR = () => {
    const canvas = document.getElementById(tableId);
    const pngUrl = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
    let downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = `${tableNumber}-${tableId}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <Dialog
      open={qrModal}
      onClose={handleQrClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">QR for table</DialogTitle>
      <DialogContent>
        {/* <img
          style={{ height: 200, width: 200 }}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png"
          alt="QR Code"
        /> */}
        <div>
          <QRCode
            id={tableId}
            value={tableId}
            size={290}
            level={'H'}
            includeMargin={true}
          />
        </div>
        <div style={{ textAlign: 'center' }}>
          <h3>Table {tableNumber} </h3>
          <h3>
            ID: <span>{tableId}</span>
          </h3>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleQrClose} color="primary">
          Cancel
        </Button>
        <Button onClick={downloadQR} color="primary">
          Download
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default QRModal;
