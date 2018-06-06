import React from 'react';
import { Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/app';
import TodosPage from './components/todos-page';
import Todo from './components/todo';

const routes = (
  <Route path="/" history={browserHistory} component={App}>
      <IndexRoute component={TodosPage} />
      <Route path="archived" component={TodosPage}/>
      <Route path="active" component={TodosPage}/>
      <Route path="completed" component={TodosPage}/>
  </Route>
);

export default routes;

