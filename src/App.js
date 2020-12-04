import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
import { useRoutes, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import { RoutesView } from 'src/routes';
import { Account } from 'src/views/auth/Account';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Account>
        <RoutesView />
      </Account>
    </ThemeProvider>
  );
};

export default App;
