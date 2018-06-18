import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from "mobx-react";

import createBrowserHistory from 'history/createBrowserHistory';
import DevTools from 'mobx-react-devtools';
import '../styles/Overwrite.css';
import 'antd/dist/antd.css';

import main from './main';
import ScrollToTop from './scrollToTop';
import Header from './Header.Component';
import Footer from './Footer.Component';
import Room from './RoomComponents/Room.Component';
import Signin from './SigninComponents/Signin.Cmb.Component';
import { getAccessToken } from '../services/Utilities';

import Paths from '../services/Paths';
import RoomGrid from './RoomComponents/Room.Grid.Component';
import RoomStore from '../store/Room.Store';
import UserSession from '../store/User.Session.Store';

import '../styles/App.css';

const history = createBrowserHistory();

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
      isAuthenticated() ? (
          <Component {...props} />
      ) : (
              <Redirect to={{
                  pathname: Paths.signin,
                  state: { from: props.location }
              }} />
          )
  )} />
);

function isAuthenticated() {
  const token = getAccessToken();
  let isLoggedIn = false;
  if (!token) {
      isLoggedIn = false;
  } else {
      isLoggedIn = true;
  }
  return isLoggedIn;
}

class App extends Component {
  componentWillMount() {
    UserSession.recoverFromStorage();
  }

  render() {
    return (
      <Provider roomStore={RoomStore} session={UserSession}>
        <Router history={history}>
          <div className="S-container">
            <DevTools />
            <ScrollToTop>
              <Header />
              <div className="S-body">
                <Switch>
                  <PrivateRoute exact path={Paths.home} component={RoomGrid} />
                  <PrivateRoute exact path={Paths.topModels} component={main} />
                  <PrivateRoute exact path={Paths.newModels} component={main} />
                  <PrivateRoute exact path={Paths.about} component={main} />
                  <PrivateRoute exact path={Paths.categories} component={main} />
                  <Route exact path={Paths.signin} component={Signin} />
                  <PrivateRoute path={Paths.room} component={Room} />
                  <Route component={NoMatch} />
                </Switch>
              </div>
              <Footer />
            </ScrollToTop>
          </div>
        </Router>
      </Provider>
    );
  }
}

const NoMatch = () => {
  return (
    <div>
      <p>Page was not found</p>
    </div>
  )
}

export default App;
