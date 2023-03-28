import React from 'react';
import { RxCross2 } from 'react-icons/rx';
import './PostModal.css';

const PostModal = ({ children, title, close, button, next }) => {
  return (
    <div className='modal-canter'>
      <div className='modal'>
        <div className='modal-header'>
          <div className='header-left'>
            <h3>{title}</h3>
          </div>
          <div className='header-right'>
            <button onClick={close}>
              <RxCross2 />
            </button>
          </div>
        </div>
        <div className='post-modal-body'>{children}</div>

        <div className='button'>
          <button onClick={next}>{button}</button>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
