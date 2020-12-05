import React from 'react';
import { Redirect, Route, useLocation, Switch } from 'react-router-dom';
import Pool from 'src/views/auth/cognitoClient';
import DashboardLayout from 'src/layouts/DashboardLayout';
import AccountView from 'src/views/account/AccountView';
import CustomerListView from 'src/views/customer/CustomerListView';
import DashboardView from 'src/views/reports/DashboardView';
import ProductListView from 'src/views/product/ProductListView';
import SettingsView from 'src/views/settings/SettingsView';

const PrivateRouteComponents = () => {
  return (
    <DashboardLayout>
      <Route path="/dashboard">
        <DashboardView />
      </Route>
      <Route path="/account">
        <AccountView />
      </Route>
      <Route path="/customers">
        <CustomerListView />
      </Route>
      <Route path="/products">
        <ProductListView />
      </Route>
      <Route path="/settings">
        <SettingsView />
      </Route>
    </DashboardLayout>
  );
};

export default PrivateRouteComponents;
