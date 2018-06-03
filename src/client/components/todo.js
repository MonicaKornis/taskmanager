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
  onArchiveTodo: React.PropTypes.func,
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
const Todo = ({ filtered, onClickDelete, onClickTodo, status, text, archive, error, onArchiveTodo }) => {
  /**
   * Base CSS class

   */
  const baseCls = 'todo';
  const renderError = error === undefined ? "" : error;

  const todoCls = baseCls
    + (archive === true ? ' todo--archieved' : (status === 'complete' ? ' todo--status-complete' : ''))
    + (filtered ? ' todo--filtered' : '');
  const archiveButtonText = archive === true ? 'Unarchive' : 'Archive'
  const toggleAction = archive === true  ? noop : onClickTodo;
  const archiveButton = status === 'active' ? <div></div> :  
                      <Button text={archiveButtonText} onClick={(event) => onArchiveTodo('archive',event)}/>;
  return (
    <li className={todoCls} onClick={(event) => toggleAction('complete',event)}>
      <div className='todo-info'>
        <TodoLink className='todoLink' text={text} onClick={(event) => onClickTodo('complete',event)}><p id='error' className='error'>{renderError}</p>
        </TodoLink>
        <Button text="Delete" onClick={onClickDelete} />
        {archiveButton}
      </div>
    </li>
  );
};

Todo.propTypes = propTypes;
Todo.defaultProps = defaultProps;

export default Todo;
