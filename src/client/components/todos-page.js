import React from 'react';
import { Link } from 'react-router';

import { api, getApiPromise } from '../helpers/api';
import Button from './button';
import Navbar from './navbar';
import TodoForm from './todo-form';
import TodoLink from './todo-link';
import Todos from './todos';

/**
 * TodosPage component
 * @class
 */
class TodosPage extends React.Component {
  /**
   * Base CSS class
   * @static
   */
  static baseCls = 'todos-page';

  /**
   * Prop types
   * @static
   */
  static propTypes = {
    params: React.PropTypes.object,
  };

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  /**
   * Constructor
   * @constructor
   *
   * @param  {object} props - Props
   */
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      filterBy: props.params.filter,
      active: 0,
      complete: 0
    };

    this.addTodo = this.addTodo.bind(this);
    this.postTodo = this.postTodo.bind(this);
    this.setFilterBy = this.setFilterBy.bind(this);
    this.updateTodos = this.updateTodos.bind(this);
    this.completeAll = this.completeAll.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    api('GET', null, this.updateTodos);
  }

  handleError(message,id) {
    const index = this.state.todos.findIndex(function(currentTodo) {
      return currentTodo.id === id;
    });

    let newTodos = Object.assign([],this.state.todos);
    newTodos[index].error = message;
    this.setState({todos: newTodos});

    setTimeout(() => {
      newTodos[index].error = '';
      this.setState({todos: newTodos});
    }, 5000);
  }



  /**
   * Add todo
   *
   * @param  {string} text - Todo text
   */
  addTodo(text) {
    if (!text) {
      return;
    }

    api('POST', { text }, this.postTodo);
  }

  completeAll() {
    let newTodos = this.state.todos;
    for (let i = 0; i < newTodos.length; i++) {
      newTodos[i].status = 'completed';
    }
    api('PUT', newTodos, this.updateTodos);
  }
  /**
   * Posts new todo to the todos collection
   *
   * @param  {object} json - Resulting JSON from fetch
   */
  postTodo(json) {
    this.setState((prevState) => {
      const active = [...json].filter(obj => (obj.status === 'active' || obj.status === undefined)
                      && obj.archive !== true).length;
      const complete = [...json].filter(obj => obj.status === 'complete' && obj.archive !== true).length;

      return {
        todos: [...json],
        active: active,
        complete: complete
      }
    });
  }

  /**
   * Set filterBy state
   *
   * @param {string} filterBy - filterBy state
   */
  setFilterBy(filterBy) {
    this.context.router.push(`/${filterBy}`);
    this.setState({ filterBy });
  }

  /**
   * Update todos array state
   *
   * @param  {Array} todos - Array of todo objects
   */
  updateTodos(todos) {
    this.setState((prevState) => {
      const active = todos.filter(obj => (obj.archive !== true) &&
                      (obj.status === 'active' || obj.status === undefined)).length;

      const complete = todos.filter(obj => obj.status === 'complete'
                        && obj.archive !== true).length;
      return {
        todos: todos,
        active: active,
        complete: complete
      }
    });
  }

  /**
   * Render
   * @returns {ReactElement}
   */
  render() {
    return (
      <div className={this.baseCls}>
        <Navbar filterBy={this.state.filterBy} onClickFilter={this.setFilterBy} active={this.state.active}
        complete={this.state.complete} completeAll={this.completeAll}/>

        <TodoForm onSubmit={this.addTodo} />

        <Todos
          filterBy={this.state.filterBy}
          todos={this.state.todos}
          updateTodos={this.updateTodos}
          handleError={this.handleError}
        />
      </div>
    );
  }
}

export default TodosPage;
