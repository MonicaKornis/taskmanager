import React from 'react';
import { Link } from 'react-router';

import { api, getApiPromise } from '../helpers/api';
import Button from './button';
import Navbar from './navbar';
import TodoForm from './todo-form';
import TodoLink from './todo-link';
import Todos from './todos';
import Modal from './modal';

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
      complete: 0,
      modalOpen: false
    };

    this.addTodo = this.addTodo.bind(this);
    this.postTodo = this.postTodo.bind(this);
    this.setFilterBy = this.setFilterBy.bind(this);
    this.updateTodos = this.updateTodos.bind(this);
    this.completeAll = this.completeAll.bind(this);
    this.handleError = this.handleError.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
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
    }, 3000);
  }


  toggleModal() {
    this.setState( prevState => {
          console.log(prevState.modalOpen);
      return (
        { modalOpen: !prevState.modalOpen}
      )
    });
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
      const archived = [...json].filter(obj => obj.archive === true);
      return {
        todos: [...json],
        active: active,
        complete: complete,
        archived: archived
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
      const archived = todos.filter(obj => obj.archive === true);
      return {
        todos: todos,
        active: active,
        complete: complete,
        archived: archived
      }
    });
  }

  /**
   * Render
   * @returns {ReactElement}
   */
  render() {
    let modal = this.state.modalOpen ? <Modal toggleModal={this.toggleModal} todos={this.state.todos} active={this.state.active}
                completed={this.state.completed} archived={this.state.archived}/> : <div></div>;

    return (
      <div className={this.baseCls}>
        <Navbar filterBy={this.state.filterBy} onClickFilter={this.setFilterBy} active={this.state.active}
        complete={this.state.complete} completeAll={this.completeAll} toggleModal={this.toggleModal}/>

        <TodoForm onSubmit={this.addTodo} />
        
        {modal}
        
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
