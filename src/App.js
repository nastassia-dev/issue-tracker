import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AppContainer from './components/container/AppContainer';
import Main from './components/main/Main';

function App() {
  return (
    <AppContainer>
      <Switch>
        <Route exact path='/' component={Main}/>
      </Switch>
    </AppContainer>
  );
}

export default App;
