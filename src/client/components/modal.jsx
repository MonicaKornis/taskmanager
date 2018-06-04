import React from 'react';
import { Link } from 'react-router';

const noop = () => {};


 const propTypes = {
   closeModal: React.PropTypes.func,
   todos: React.PropTypes.object,
 };


 const defaultProps = {
   closeModal: noop,
   todos: []
 };


const Modal = ({ toggleModal, todos }) => {
  let activeTodos = todos.filter((obj,i) => obj.status === 'active');
  let completedTodos = todos.filter(obj => obj.status === 'complete' && obj.archive !== true);
  let numCompleted = completedTodos.length;
  completedTodos = completedTodos.map(obj =>
                      <div className='completed-item'><h4>{obj.text}</h4></div>);
  activeTodos = activeTodos.map((obj,i) =>
                      <div key={i} className='completed-item'><h4>{obj.text}</h4></div>);
  let total = todos.filter(obj => obj.archive !== true).length;
  let percentCompleted = (numCompleted/total) * 100;

  let styles = {
    width: `${percentCompleted}%`
  };

  debugger

    return (
      <div className='modalBackground' onClick={toggleModal}>
        <div className='modal'>

        <div className="progressContainer">
            <h1 className="text-center">Your Progress</h1>

            <div className="completeProgressBar">
              <div className="progressBars">
                <div className="progress-bar" style={styles}></div>
                <div className="progress-background"></div>
              </div>
              <div className="progress-shadow"></div>
            </div>

          </div>

          <section className='textContainer'>
            <div className='activeList'>
              {activeTodos}
            </div>
            <div className='completedList'>
              {completedTodos}
            </div>
          </section>

        </div>
      </div>
    );

};

export default Modal;
