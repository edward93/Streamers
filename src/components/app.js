import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from "mobx-react";

import createBrowserHistory from 'history/createBrowserHistory';
import DevTools from 'mobx-react-devtools';
import '../styles/Overwrite.css';
import 'antd/dist/antd.css';

import empty from './empty';
import ScrollToTop from './scrollToTop';
import Header from './Header.Component';
import Footer from './Footer.Component';
import Room from './RoomComponents/Room.Component';
import Signin from './SigninComponents/Signin.Cmb.Component';
import Profile from './ProfileComponent/Publisher.Profile.Component';
import { getAccessToken } from '../services/Utilities';

import Paths from '../services/Paths';
import RoomGrid from './RoomComponents/Room.Grid.Component';
import RoomStore from '../store/Room.Store';
import UserSession from '../store/User.Session.Store';
import not_found from '../images/404.jpg';

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
    RoomStore.recoverFromStorage();
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
                  <PrivateRoute exact path={Paths.topModels} component={empty} />
                  <PrivateRoute exact path={Paths.newModels} component={empty} />
                  <PrivateRoute exact path={Paths.about} component={empty} />
                  <PrivateRoute exact path={Paths.categories} component={empty} />
                  <PrivateRoute exact path={Paths.profile} component={Profile} />
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
      <div className="not_found">
          <img src={not_found} alt=""/>
          <p>
              <b>Come back, you're wandering too far!</b> <br/>
              We couldn't find the page you're looking for. Try searching or go back to the <a href={Paths.home}>Home</a>
          </p>
      </div>
    </div>
  )
}

export default App;
