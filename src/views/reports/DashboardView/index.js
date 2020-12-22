import React, { useContext, useEffect, useState } from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Budget from './Budget';
import LatestOrders from './LatestOrders';
import LatestProducts from './LatestProducts';
import Sales from './Sales';
import TasksProgress from './TablesVacant';
import TotalCustomers from './OrdersToday';
import TotalProfit from './EarningsToday';
import TrafficByDevice from './TrafficByDevice';
import Pool from '../../auth/cognitoClient';
// import { AccountContext } from '../../auth/Account';
import getProfile from '../../../server/getProfile';
import EmptyProfile from '../../errors/EmptyProfile';
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Dashboard = ({ navigation }) => {
  const classes = useStyles();
  // console.log(Pool.getCurrentUser().username);

  return (
    <Page className={classes.root} title="Dashboard">
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={12} md={12} xl={12} xs={12}>
            <EmptyProfile navigation={navigation}>
              <Grid container spacing={3}>
                <Grid item lg={3} sm={6} xl={3} xs={12}>
                  <TotalCustomers />
                </Grid>
                <Grid item lg={3} sm={6} xl={3} xs={12}>
                  <TotalProfit />
                </Grid>
                <Grid item lg={3} sm={6} xl={3} xs={12}>
                  <Budget />
                </Grid>

                <Grid item lg={3} sm={6} xl={3} xs={12}>
                  <TasksProgress />
                </Grid>

                <Grid item lg={12} md={12} xl={12} xs={12}>
                  <LatestOrders />
                </Grid>
                {/* <Grid item lg={4} md={6} xl={3} xs={12}>
                  <LatestProducts />
                </Grid> */}
                <Grid item lg={8} md={12} xl={9} xs={12}>
                  <Sales />
                </Grid>
                <Grid item lg={4} md={6} xl={3} xs={12}>
                  <TrafficByDevice />
                </Grid>
              </Grid>
            </EmptyProfile>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
