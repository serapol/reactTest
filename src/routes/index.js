import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';
import App from '../containers/App';
import LoginPage from '../containers/Login';
import RegisterPage from '../containers/Register';
import MapPage from '../containers/Map';
import AboutPage from '../containers/About';
import NotFoundPage from '../containers/NotFound';
import requireAuth from '../helpers/auth';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={requireAuth(MapPage)} />
    <Route path="login" component={LoginPage} />
    <Route path="register" component={RegisterPage} />
    <Route path="about" component={AboutPage} />

    <Route path="*" component={NotFoundPage} />
    <Redirect from="*" to="404" />
  </Route>
);
