import { connectedReduxRedirect } from 'redux-auth-wrapper/history3/redirect';
import { routerActions } from 'react-router-redux';

export const UserIsAuthenticated = connectedReduxRedirect({
  redirectPath: '/login',
  redirectAction: routerActions.replace, // the redux action to dispatch for redirect
  wrapperDisplayName: 'UserIsAuthenticated', // a nice name for this auth check
  authenticatedSelector: user => user.logged === true,
  authenticatingSelector: state => state.user.isLoging,
  //LoadingComponent: Preloader
});
