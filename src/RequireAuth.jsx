import React from 'react';
import { Redirect } from 'react-router-dom';
import Dashboard from './Dashboard';

function RequireAuth (Component) {
const isAuthenticated = localStorage.getItem('access_token');
console.log(isAuthenticated);
  return isAuthenticated ? (
    <Dashboard />
  ) : (
    <Redirect to={{ pathname: '/login' }} />
  );
};

export default RequireAuth;
