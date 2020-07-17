import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as ReactRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';

import App from './App';
import configureStore from './redux/store';
import './index.css';

const store = configureStore();

ReactDOM.render(
  <ReduxProvider store={store}>
    <ReactRouter>
      <App />
    </ReactRouter>
  </ReduxProvider>,
  document.getElementById('root')
);
