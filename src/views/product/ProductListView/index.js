import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, makeStyles } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import ProductCard from './ProductCard';
import data from './data';
import EmptyProfile from '../../errors/EmptyProfile';
import Pool from '../../auth/cognitoClient';
import { MenuDB } from '../../../server/links';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  productCard: {
    height: '100%'
  }
}));

const ProductList = () => {
  const classes = useStyles();
  const [dishes, setDishes] = useState([]);
  const [Refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetch(MenuDB + '?hotel=' + Pool.getCurrentUser().username)
      .then(response => response.json())
      .then(data => {
        setDishes(data.data.Items);
      })
      .catch(err => {});
  }, [Refresh]);

  const handleRefresh = () => {
    setRefresh(true);
  };
  return (
    <Page className={classes.root} title="Products">
      <Container maxWidth={false}>
        <EmptyProfile>
          <Toolbar onSync={handleRefresh} />
          <Box mt={3}>
            <Grid container spacing={3}>
              {dishes.map(dish => (
                <Grid item key={dish.dishId} lg={3} md={6} xs={12}>
                  <ProductCard className={classes.productCard} dish={dish} />
                </Grid>
              ))}
            </Grid>
          </Box>
          {/* <Box mt={3} display="flex" justifyContent="center">
            <Pagination color="primary" count={3} size="small" />
          </Box> */}
        </EmptyProfile>
      </Container>
    </Page>
  );
};

export default ProductList;
