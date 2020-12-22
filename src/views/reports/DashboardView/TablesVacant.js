import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Typography,
  makeStyles,
  colors
} from '@material-ui/core';
import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';
import { getTables } from '../../../server/getTables';
import { useDispatch, useSelector } from 'react-redux';
import { FetchOrder, FetchTable } from './Helper/FetchTodaysOrder';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.orange[600],
    height: 56,
    width: 56
  },
  tablesBox: {
    display: 'flex',
    flexDirection: 'row'
  },
  tables: {
    margin: 10
  },
  CardHead: {
    display: 'flex',
    flexDirection: 'row'
  }
}));

const TasksProgress = ({ className, ...rest }) => {
  const classes = useStyles();
  // const [table, setTable] = useState([]);
  const [TotalTables, setTotalTables] = useState(0);
  const [tables, setTables] = useState(0);
  const [tablePercent, setTablePercent] = useState(0);
  const { refresh } = useSelector(state => {
    return state;
  });

  // var table = [];
  useEffect(() => {
    getTables().then(table => {
      //console.log(tables.data.Items);
      //  tables.data.Items.length
      setTotalTables(table.data.Items.length);
      FetchTable(orderTables => {
        // console.log('Tables', orderTables);
        // console.log('Orders', orders);
        setTables(orderTables);
        // console.log('Table Length', table.length);
        const mul = orderTables * 100;
        const div = mul / table.data.Items.length;
        // console.log(div, mul);
        setTablePercent(div.toFixed(2));
      });
      // setTables();

      // if (Object.keys(profile.data).length === 0) {
      //   setProfileEmpty(true);
      // }
    });
  }, [refresh]);

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid container justify="space-between" spacing={3}>
          <Grid item>
            <Box className={classes.CardHead}>
              <Typography color="textSecondary" gutterBottom variant="h6">
                TABLE OCCUPANCY
              </Typography>
              {/* <Typography
                color={tablePercent === 100 ? 'primary' : 'failure'}
                variant="h6"
              >
                {tablePercent === 100 ? 'Full' : 'Vacant'}
              </Typography> */}
            </Box>
            <Box className={classes.tablesBox}>
              <Typography
                className={classes.tables}
                color="textPrimary"
                variant="h3"
              >
                {tables || 0}/{TotalTables}
              </Typography>
              {/* <Typography
                className={classes.tables}
                color="textPrimary"
                variant="h5"
              >
                occupied
              </Typography> */}
            </Box>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <InsertChartIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box mt={3}>
          <LinearProgress value={tablePercent} variant="determinate" />
        </Box>
      </CardContent>
    </Card>
  );
};

TasksProgress.propTypes = {
  className: PropTypes.string
};

export default TasksProgress;
