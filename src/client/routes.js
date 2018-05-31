import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import TodosPage from './components/todos-page';
import Todo from './components/todo';

const routes = (
  <Route path="/" component={App}>
      <IndexRoute component={TodosPage} />
      // <Route path='/todos/:id' component={Todo}/>
  </Route>
);

export default routes;
// <IndexRoute component={TodosPage} />
// <Route path='/todos/:id' component={Todo}/>
