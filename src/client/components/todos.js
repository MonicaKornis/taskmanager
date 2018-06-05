import React from 'react';

import { api } from '../helpers/api';
import Todo from './todo';
// import ErrorHandler from './error-handler';

const noop = () => {};

/**
 * Prop Types
 * @private
 */
const propTypes = {
  filterBy: React.PropTypes.string,
  todos: React.PropTypes.arrayOf(React.PropTypes.object),
  updateTodos: React.PropTypes.func,
  handleError: React.PropTypes.func, 
};

/**
 * Default Props
 * @private
 */
const defaultProps = {
  filterBy: '',
  todos: [],
  updateTodos: noop,
};

/**
 * Todos component
 * @returns {ReactElement}
 */
const Todos = ({ filterBy, todos, updateTodos, handleError}) => {
  /**
   * Base CSS class
   */
  const baseCls = 'todos';

  /**
   * Callback function to delete todo from todos collection
   *
   * @param  {object} json - Resulting JSON from fetch
   */
  const deleteTodo = json => {
    const index = todos.findIndex(todo => {
      return todo.id === json.id;
    });

    updateTodos(
      [
        ...json
      ]
    );
  };

  /**
   * Callback function to replace todo with results of fetching the todo PUT endpoint
   *
   * @param  {object} json - Resulting JSON from fetch
   */
  const putTodo = json => {
    // 
    const index = todos.findIndex(todo => {
      return todo.id === json.id;
    });

    updateTodos(
      [
        ...todos.slice(0, index),
        json,
        ...todos.slice(index + 1),
      ]
    );
  };

  /**
   * Click handler for clicking on delete button
   * Deletes todo
   *
   * @param {object} todo - Todo object
   */
  const onClickDelete = (todo,event) => {
    event.stopPropagation();
    api('DELETE', todo, deleteTodo);
  };

  /**
   * Click handler for clicking on the todo
   * Toggles status state of Todo
   *
   * @param {object} todo - Todo object
   */
  const onClickTodo = (todo,action,event) => {
    
    event.stopPropagation();
    const newTodo = Object.assign({}, todo);
  
   if(action === 'complete') {
      newTodo.status = todo.status === 'complete' ? 'active' : 'complete';
      newTodo.archive = false;
      newTodo.method = 'status';
    } else if (action === 'archive') {
      newTodo.method = 'archive';
      let newStatus = newTodo.archive === undefined ? true : !newTodo.archive;
      newTodo.archive = newStatus;
    }
      api('PUT', newTodo, putTodo);
  };
  
  const onArchiveTodo = (todo,action,event) => {
    debugger
    event.stopPropagation();
    const newTodo = Object.assign({}, todo);
    if(todo.status !== 'complete' && action === 'archive'){
      handleError(`Ooops! You can't archive tasks that haven't been completed!`,todo.id,e);
    } else if (action === 'archive') {
      newTodo.method = 'archive';
      let newStatus = newTodo.archive === undefined ? true : !newTodo.archive;
      newTodo.archive = newStatus;
      api('PUT', newTodo, putTodo);
    }
  }


  /**
   * Renders All Todos
   *
   * @returns {Array} - Returns an array of Todo React Elements
   */

  const renderTodos = (handler) => {
    let active = todos.filter(obj => obj.status === 'active').reverse();
    let sortedTodos = active.concat(todos.filter(obj => obj.status !== 'active'));
    return sortedTodos.map(todo => {
      let filtered;
      let {  archive, category, dateAdded, dateCompleted } = todo; 
  
      switch (filterBy) {
        case 'archived':
          filtered = todo.archive !== true;
      
          break;
        case 'active':
          filtered = (todo.archive === true) || (todo.status === 'complete');

          break;
        case 'completed':
          filtered = (todo.archive === true) || todo.status !== 'complete';
    
          break;
        default:
          filtered = false;

      }
      
      // debugger

      let currentTodo = <Todo
        archive={archive}
        category={category}
        dateAdded={dateAdded}
        dateCompleted={dateCompleted}
        key={todo.id}
        filtered={filtered}
        onClickDelete={onClickDelete.bind(this, todo)}
        onClickTodo={onClickTodo.bind(this, todo)}
        status={todo.status}
        text={todo.text}
        error={todo.error}
        onArchiveTodo={onArchiveTodo.bind(this,todo)}
      />;

      return (
        currentTodo
      );
    });
  };

  return (
    <div className='items-grid'>
      <ul className={baseCls}>
        {renderTodos()}
      </ul>
    </div>
  );
};

Todos.propTypes = propTypes;
Todos.defaultProps = defaultProps;

export default Todos;
