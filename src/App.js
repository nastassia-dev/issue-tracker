import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AppContainer from './components/container/AppContainer';
import Main from './components/main/Main';
import DashboardsPage from './components/dashboards/DashboardsPage';
import DashboardPage from './components/dashboards/DashboardPage';
import ManageDashboardPage from './components/dashboards/ManageDashboardPage';

function App() {
  return (
    <AppContainer>
      <Switch>
        <Route exact path='/' component={Main}/>
        <Route path='/dashboards' component={DashboardsPage}/>
        <Route path='/dashboard/:slug' component={DashboardPage}/>
        <Route path='/dashboard' component={ManageDashboardPage}/>
      </Switch>
    </AppContainer>
  );
}

export default App;
