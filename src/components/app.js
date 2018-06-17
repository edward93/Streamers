import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
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
import Paths from '../services/Paths';
import RoomGrid from './RoomComponents/Room.Grid.Component';
import RoomStore from '../store/Room.Store';
import UserSession from '../store/User.Session.Store';

import '../styles/App.css';

const history = createBrowserHistory();

class App extends Component {
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
                  <Route exact path={Paths.home} component={RoomGrid} />
                  <Route exact path={Paths.topModels} component={main} />
                  <Route exact path={Paths.newModels} component={main} />
                  <Route exact path={Paths.about} component={main} />
                  <Route exact path={Paths.categories} component={main} />
                  <Route path={Paths.room} component={Room} />
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
