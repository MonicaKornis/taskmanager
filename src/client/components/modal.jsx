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


const Modal = ({ closeModal, todos }) => {
  let numActive = todos.filter(obj => obj.status === 'active');
  let total = todos.filter(obj => obj.status === 'active');
  let percentCompleted;

    return (
      <div className='modalBackground' onClick={closeModal}>
        <div className='modal'>
          MODAL
        </div>
      </div>
    );

};

export default Modal;
