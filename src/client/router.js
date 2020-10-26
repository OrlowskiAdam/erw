import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import AppLayout from 'containers/AppLayout';
import LoginForm from 'containers/LoginForm';
import NotFound from 'containers/NotFound';

export default function() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact name="login" component={LoginForm} />
        <Route path="/" exact name="home" component={AppLayout} />
        <Route path="" exact name="not-found" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}
