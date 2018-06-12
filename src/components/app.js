import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import DevTools from 'mobx-react-devtools';

import main from './main';
import ScrollToTop from './scrollToTop';
import Header from './Header.Component';
import Footer from './Footer.Component';
import Paths from '../services/Paths';

import '../styles/App.css';
import 'antd/dist/antd.css';
import '../styles/Overwrite.css';

const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div className="S-container">
          <DevTools />
          <ScrollToTop>
            <Header />
            <div className="S-body">
              <Switch>
                <Route exact path={Paths.home} component={main} />
                <Route exact path={Paths.topModels} component={main} />
                <Route exact path={Paths.newModels} component={main} />
                <Route exact path={Paths.about} component={main} />
                <Route exact path={Paths.categories} component={main} />
                <Route component={NoMatch} />
              </Switch>
            </div>
            <Footer />
          </ScrollToTop>
        </div>
      </Router>
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
