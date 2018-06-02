import React from 'react';

import Button from './button';
import TodoLink from './todo-link';

const noop = () => {};

/**
 * Prop Types
 * @private
 */
const propTypes = {
  filtered: React.PropTypes.bool,
  onClickDelete: React.PropTypes.func,
  onClickTodo: React.PropTypes.func,
  status: React.PropTypes.string,
  text: React.PropTypes.string,
};

/**
 * Default Props
 * @private
 */
const defaultProps = {
  filtered: false,
  onClickDelete: noop,
  onClickTodo: noop,
  status: '',
  text: '',
};

/**
 * Todo component
 * @returns {ReactElement}
 */
const Todo = ({ filtered, onClickDelete, onClickTodo, status, text, archived, error }) => {
  /**
   * Base CSS class

   */
  const baseCls = 'todo';
  const renderError = error === undefined ? "" : error;

  const todoCls = baseCls
    + (status === 'complete' ? ' todo--status-complete' : '')
    + (filtered ? ' todo--filtered' : '');

  return (
    <li className={todoCls} >
      <p>{renderError}</p>
      <TodoLink text={text} onClick={(event) => onClickTodo('complete')} />
      <Button text="Delete" onClick={onClickDelete} />
      <Button text='Archive' onClick={(event) => onClickTodo('archive')} />
    </li>
  );
};

Todo.propTypes = propTypes;
Todo.defaultProps = defaultProps;

export default Todo;
