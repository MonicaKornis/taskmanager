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
const Todo = ({ filtered, onClickDelete, onClickTodo, status, text, archive, error }) => {
  /**
   * Base CSS class

   */
  const baseCls = 'todo';
  const renderError = error === undefined ? "" : error;

  const todoCls = baseCls
    + (archive === true ? ' todo--archieved' : (status === 'complete' ? ' todo--status-complete' : ''))
    + (filtered ? ' todo--filtered' : '');
    debugger
  return (
    <li className={todoCls} >
      <div className='todo-info'>
        <TodoLink className='todoLink' text={text} onClick={(event) => onClickTodo('complete')} />
        <p className='error'>{renderError}</p>
        <Button text="Delete" onClick={onClickDelete} />
        <Button text='Archive' onClick={(event) => onClickTodo('archive')} />
      </div>
    </li>
  );
};

Todo.propTypes = propTypes;
Todo.defaultProps = defaultProps;

export default Todo;
