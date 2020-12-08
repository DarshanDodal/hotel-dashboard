import React, { useState } from 'react';
import { Box, Container, makeStyles, Grid } from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import data from './data';
import { result } from 'lodash';
import EmptyProfile from '../../errors/EmptyProfile';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const CustomerListView = () => {
  const classes = useStyles();
  const [customers] = useState(data);
  const [newTable, setNewTable] = useState(false);

  return (
    <Page className={classes.root} title="Customers">
      <Container maxWidth={false}>
        <EmptyProfile>
          <Toolbar
            onNewTable={() => {
              setNewTable(true);
            }}
          />
          <Box mt={3}>
            {/* <Grid item key={result.id} lg={3} md={4} xs={12}> */}
            <Results newT={newTable} customers={customers} />
            {/* </Grid> */}
          </Box>
        </EmptyProfile>
      </Container>
    </Page>
  );
};

export default CustomerListView;
