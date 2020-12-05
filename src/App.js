import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
import { useRoutes, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import Routes from 'src/routes';
import { Account } from 'src/views/auth/Account';
import PrivateRoute from 'src/PrivateRoute';
import PrivateRouteComponents from 'src/PrivateRouteComponents';
import PublicRouteComponents from 'src/PublicRouteComponents';

const App = () => {
  const routing = useRoutes(Routes);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {/* <Account>
        <RoutesView />
      </Account> */}
      {/* {routing} */}
      <PublicRouteComponents path="/" />
      <PrivateRoute path="/app" components={PrivateRouteComponents} />
    </ThemeProvider>
  );
};

export default App;
