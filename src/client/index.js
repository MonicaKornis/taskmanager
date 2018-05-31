import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';

import 'stylesheets/style.scss';

import Routes from './routes';

const main = <Router history={browserHistory} routes={Routes} />;

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(main, document.getElementById('main'));
});
