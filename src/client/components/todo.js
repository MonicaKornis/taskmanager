import React from 'react';

import Button from './button';
import TodoLink from './todo-link';
import { HeartOutlineIcon } from 'mdi-react';

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
  category: React.PropTypes.string,
  dateAdded: React.PropTypes.string,
  dateCompleted: React.PropTypes.string
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
 


const Todo = ({ category, dateAdded, dateCompleted,filtered, onClickDelete, onClickTodo, status, text, archive, error, onArchiveTodo }) => {
  /**
   * Base CSS class
   
   */
   
   const iconComponent = {
     Work: <HeartOutlineIcon className='categoryIcon'/>,
     Personal: <HeartOutlineIcon className='categoryIcon'/>,
     Important: <HeartOutlineIcon className='categoryIcon'/>
   }
   

  const baseCls = 'todo';
  const renderError = error === undefined ? "" : error;

  const todoCls = baseCls
    + (archive === true ? ' todo--archieved' : (status === 'complete' ? ' todo--status-complete' : ''))
    + (filtered ? ' todo--filtered' : '');
    
  const todoLink = status === 'complete' ? `-line` : ``;
  const archiveButtonText = archive === true ? 'Unarchive' : 'Archive'
  const toggleAction = archive === true  ? noop : onClickTodo;
  const archiveButton = status === 'active' ? <div></div> : <Button text={archiveButtonText} onClick={(event) => onArchiveTodo('archive',event)}/>;
  
  const date = status === 'active' ? `Added: ${dateAdded}` : `Completed: ${dateCompleted}`;
  const categoryComponent = iconComponent[category] !== undefined ? iconComponent[category] : <HeartOutlineIcon className='categoryIcon'/>;
  
  debugger
  
  return (
    <li className={todoCls} onClick={(event) => toggleAction('complete',event)}>
      <div className='todo-info'>
        <TodoLink  text={text} onClick={(event) => onClickTodo('complete',event)} className={todoLink} line={todoLink}><p id='error' className='error'>{renderError}</p>
        </TodoLink>
        <Button text="Delete" onClick={onClickDelete} />
        {archiveButton}
        <div className='todoFooter'>{categoryComponent}<div id='date' className='date'>{date}</div></div>
      </div>
    </li>
  );
};

Todo.propTypes = propTypes;
Todo.defaultProps = defaultProps;

export default Todo;
