import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { HomePageContainer } from './pages/homePage';
import { SearchPageContainer } from './pages/searchPage';

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route exact={true} path="/" component={HomePageContainer} />
      <Route path="/search" component={SearchPageContainer} />
    </Switch>
  </HashRouter>
  , document.getElementById('app')
);
