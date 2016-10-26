import React from 'react';
import { Provider } from 'react-redux';

import { BrowserRouter, Match, Link } from 'react-router';

import store from './store';

import Demo from './Demo';

export default () => (
  <Provider store={store}>
    <BrowserRouter>
      <main>
        <h1>src/App.jsx</h1>

        <Link to="/demo">Go to /demo →</Link>
        <Match pattern="/demo" component={Demo} />
      </main>
    </BrowserRouter>
  </Provider>
);
