import React from 'react';
import './Modal.css';
import { RxCross2 } from 'react-icons/rx';
const Modal = ({ children, title, close, button, next }) => {
  return (
    <div className='modal-canter'>
      <div className='modal'>
        <div className='modal-header'>
          <div className='header-left'>
            <h3>{title}</h3>
          </div>
          <div className='header-right'>
            <button onClick={() => close(false)}>
              <RxCross2 />
            </button>
          </div>
        </div>
        <div className='modal-body'>{children}</div>
        <div className='modal-footer'>
          <div className='all-buttons'>
            <button onClick={() => close(false)}>Cancel</button>
            <button onClick={next}>{button}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
