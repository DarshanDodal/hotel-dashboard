import React, { useEffect, useState, useContext } from 'react';
import { useRoutes, Switch, Route } from 'react-router-dom';
import { Navigate, useNavigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import AccountView from 'src/views/account/AccountView';
import CustomerListView from 'src/views/customer/CustomerListView';
import DashboardView from 'src/views/reports/DashboardView';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import ProductListView from 'src/views/product/ProductListView';
import RegisterView from 'src/views/auth/RegisterView';
import SettingsView from 'src/views/settings/SettingsView';
import AccountConfirmationView from 'src/views/auth/AccountConfirmationView';
import { Account, AccountContext } from 'src/views/auth/Account';
import Pool from 'src/views/auth/cognitoClient';

const routes = [
  {
    path: 'app',
    element: Pool.getCurrentUser() ? (
      <DashboardLayout />
    ) : (
      <Navigate to="/login" />
    ),
    children: [
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'account', element: <AccountView /> },
      { path: 'customers', element: <CustomerListView /> },
      { path: 'products', element: <ProductListView /> },
      { path: 'settings', element: <SettingsView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <LoginView /> },
      { path: 'register', element: <RegisterView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  { path: 'confirm-account/:id', element: <AccountConfirmationView /> }
];
// const RoutesView = props => {
//   const [User, setUser] = useState([]);

//   const { getSession, logout, logedIn } = useContext(AccountContext);

//   useEffect(() => {}, []);

//   //const { getSession, logout } = useContext(AccountContext);
//   const routing = useRoutes(routes(Pool.getCurrentUser()));
//   //console.log(Pool.getCurrentUser());
//   return routing;
// };
export default routes;
