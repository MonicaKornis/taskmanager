import React from 'react';
import { Link } from 'react-router';
import { ApprovalIcon, HeartOutlineIcon } from 'mdi-react';

const noop = () => {};


 const propTypes = {
   closeModal: React.PropTypes.func,
   todos: React.PropTypes.object,
 };


 const defaultProps = {
   closeModal: noop,
   todos: []
 };

const getDateString = (dateObj) => {
   let month = dateObj.getUTCMonth() + 1; //months from 1-12
   let day = dateObj.getUTCDate();
   let year = dateObj.getUTCFullYear();
   return year + "/" + month + "/" + day;
 };


const Modal = ({ toggleModal, todos }) => {
  let today = getDateString(new Date());

  let activeTodos = todos.filter(obj => obj.status === 'active').slice(0,7);

  let completedTodos = todos.filter(obj => obj.status === 'complete' && obj.archive !== true &&
                      obj.dateCompleted === today).slice(0,7);

  let numCompleted = completedTodos.length;

  completedTodos =   completedTodos.length === 0 ? [<div key={79}>Nothing completed today! </div>] : completedTodos.map((todo,i) =>
                      <div key={todo.id} className='completed-item'><ApprovalIcon />
                      <h4>{todo.text}</h4></div>);

  activeTodos = activeTodos.length === 0 ? [<div key={77}>You've completed all your tasks :) </div>] : activeTodos.map((todo,i) =>
                      <div key={todo.id} className='active-item'><HeartOutlineIcon key={todo.id}/><h4>{todo.text}</h4></div>);

  let total = todos.filter(obj => obj.archive !== true).length;



  let percentCompleted = total !== 0 ? Math.round(numCompleted/total * 100) : 100;

  let styles = {
    width: `${percentCompleted}%`
  };


    return (
      <div className='modalBackground' onClick={toggleModal}>
        <div className='modal'>

        <div className="progressContainer">
            <h1 className="progressText">Your Progress: {styles.width}
            </h1>

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
              <h2 className='activeHeader'>Active Todos</h2>
              <div className='activeItems'>
                {activeTodos}
              </div>
            </div>

            <div className='completedList'>
              <h2 className='completedTodayHeader'>Completed Today</h2>
              <div className='completedTodayItems'>
                {completedTodos}
              </div>
            </div>


          </section>

        </div>
      </div>
    );

};

export default Modal;
