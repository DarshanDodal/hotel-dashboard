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
  Container
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EventSeatIcon from '@material-ui/icons/EventSeat';
import CenterFocusWeakIcon from '@material-ui/icons/CenterFocusWeak';
import QRModal from './QRDialog';
import { getTables } from '../../../server/getTables';
import TableCard from './TableCard';
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
  tCard: {
    width: '100'
  }
}));

const Results = ({ className, product, newT, ...rest }) => {
  const classes = useStyles();
  const [openQrScaner, setOpenQrScaner] = React.useState(false);
  const [tables, setTables] = React.useState([]);
  const [reload, setReload] = React.useState(false);

  useEffect(() => {
    getTables().then(tables => {
      //console.log(tables.data.Items);
      if (tables.data.Items.length > 0) {
        setTables(tables.data.Items);
      }
      // if (Object.keys(profile.data).length === 0) {
      //   setProfileEmpty(true);
      // }
    });
  }, [newT]);
  const TableCards = () => {
    return tables.map(table => {
      return (
        <Grid item lg={4} md={6} xs={12}>
          <TableCard
            key={table.tableId}
            // onTableDelete={() => {
            //   setReload(true);
            // }}
            classes={{ root: classes.tCard }}
            tableData={table}
          />
        </Grid>
      );
    });
  };

  return (
    <Container>
      <Box mt={3}>
        <Grid container spacing={3}>
          <TableCards />
        </Grid>
      </Box>
    </Container>
  );
  // <TableCard />;
};

Results.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array.isRequired
};

export default Results;
