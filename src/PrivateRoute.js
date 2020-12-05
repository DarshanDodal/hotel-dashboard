import React from 'react';
import { Route, useLocation, useNavigate } from 'react-router-dom';
import Pool from 'src/views/auth/cognitoClient';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const location = useLocation();
  const Navigate = useNavigate();
  return (
    <Route {...rest}>
      {Pool.getCurrentUser() === true ? (
        <Component />
      ) : (
        <Navigate to={{ pathname: '/login', state: { from: location } }} />
      )}
    </Route>
  );
};

export default PrivateRoute;
