import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';
import App from '../containers/App';
import Login from '../containers/Login';
import Register from '../containers/Register';
import Main from '../containers/Main';
import About from '../containers/About';
import NotFound from '../containers/NotFound';
import { UserIsAuthenticated } from '../helpers/auth';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={UserIsAuthenticated(Main)} />
    <Route path="login" component={Login} />
    <Route path="register" component={Register} />
    <Route path="register" component={About} />

    <Route path="*" component={NotFound} />
    <Redirect from="*" to="404" />
  </Route>
)
