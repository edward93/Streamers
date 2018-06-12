import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import DevTools from 'mobx-react-devtools';

import main from './main';
import ScrollToTop from './scrollToTop';
import '../styles/App.css';

const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <DevTools />
          <ScrollToTop>
            <Switch>
              <Route exact path='/' component={main} />
              <Route component={NoMatch} />
            </Switch>
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
