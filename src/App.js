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
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify';
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import awsconfig from './aws-exports';
import { myAppConfig } from './aws-configs';
Amplify.configure(myAppConfig);

const client = new AWSAppSyncClient({
  url: awsconfig.aws_appsync_graphqlEndpoint,
  region: awsconfig.aws_appsync_region,
  auth: {
    type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
    jwtToken: async () =>
      (await Auth.currentSession()).getIdToken().getJwtToken()
  }
});

const App = () => {
  const routing = useRoutes(Routes);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Account>
        {/* <RoutesView /> */}
        {routing}
      </Account>
      {/* <PublicRouteComponents path="/" />
      <PrivateRoute path="/app" components={PrivateRouteComponents} /> */}
    </ThemeProvider>
  );
};

export default App;
