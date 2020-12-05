import React from 'react';
import { Redirect, Route, useLocation, Switch } from 'react-router-dom';
import Pool from 'src/views/auth/cognitoClient';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import RegisterView from 'src/views/auth/RegisterView';
import MainLayout from 'src/layouts/MainLayout';

const PublicRouteComponents = ({ path }) => {
  return (
    <Route path={path}>
      <MainLayout>
        <Route path="login">
          <LoginView />
        </Route>
        <Route path="signup">
          <RegisterView />
        </Route>
        <Route path="*">
          <NotFoundView />
        </Route>
      </MainLayout>
    </Route>
  );
};

export default PublicRouteComponents;
