import 'react-perfect-scrollbar/dist/css/styles.css';
import React, { useEffect } from 'react';
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
import Amplify, { Auth } from 'aws-amplify';
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import awsconfig from './aws-exports';
import { ApolloProvider } from 'react-apollo';
import { Rehydrated } from 'aws-appsync-react';
import Pool from 'src/views/auth/cognitoClient';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from './reducer/reducer.js';
// import gql from 'graphql-tag';
Amplify.configure(awsconfig);

const client = new AWSAppSyncClient({
  url: awsconfig.aws_appsync_graphqlEndpoint,
  region: awsconfig.aws_appsync_region,
  auth: {
    type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
    jwtToken: async () =>
      (await Auth.currentSession()).getIdToken().getJwtToken()
  }
});
const store = createStore(reducer);
const App = () => {
  useEffect(() => {
    Auth.currentSession().then(session => {
      // console.log(session);
    });
    // console.log(Pool.getCurrentUser().username);
  }, []);
  const routing = useRoutes(Routes);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Provider store={store}>
        <Account>
          {/* <RoutesView /> */}
          <ApolloProvider client={client}>
            <Rehydrated>{routing}</Rehydrated>
          </ApolloProvider>
        </Account>
      </Provider>
      {/* <PublicRouteComponents path="/" />
      <PrivateRoute path="/app" components={PrivateRouteComponents} /> */}
    </ThemeProvider>
  );
};

export default App;
