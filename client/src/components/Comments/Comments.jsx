import React, { useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import Post from '../Post/Post';
import './Comments.css';

const Comments = (post) => {
  const { fs_name } = post;
  const [show, setShow] = useState(false);
  return (
    <>
      <button className='comment-btn' onClick={() => setShow(true)}>
        <span className='comment-icon'></span>
        <span>Comment</span>
      </button>

      {show && (
        <div className='modal-canter'>
          <div className='modal'>
            <div className='modal-header'>
              <div className='header-left'>
                <h3>{fs_name}'s Post</h3>
              </div>
              <div className='header-right'>
                <button onClick={() => setShow(false)}>
                  <RxCross2 />
                </button>
              </div>
            </div>
            <div className='modal-body'>
              <Post />
              <div className='comments'>
                <div className='comment'>
                  <div className='comment-left'>
                    <img
                      src='https://www.w3schools.com/howto/img_avatar.png'
                      alt='Avatar'
                    />
                  </div>
                  <div className='comment-right'>
                    <div className='commenter-name'>
                      <h5>Tohid Bin Azam</h5>
                      <p>Hello World How are you ?</p>
                    </div>
                    <div className='comment-time'>
                      <h6 className='like'>Like</h6>
                      <h6 className='time'>1 min ago</h6>
                    </div>
                  </div>
                </div>
                <div className='comment'>
                  <div className='comment-left'>
                    <img
                      src='https://www.w3schools.com/howto/img_avatar.png'
                      alt='Avatar'
                    />
                  </div>
                  <div className='comment-right'>
                    <div className='commenter-name'>
                      <h5>Tohid Bin Azam</h5>
                      <p>Hello World How are you ?</p>
                    </div>
                    <div className='comment-time'>
                      <h6 className='like'>Like</h6>
                      <h6 className='time'>1 min ago</h6>
                    </div>
                  </div>
                </div>
                <div className='comment'>
                  <div className='comment-left'>
                    <img
                      src='https://www.w3schools.com/howto/img_avatar.png'
                      alt='Avatar'
                    />
                  </div>
                  <div className='comment-right'>
                    <div className='commenter-name'>
                      <h5>Tohid Bin Azam</h5>
                      <p>Hello World How are you ?</p>
                    </div>
                    <div className='comment-time'>
                      <h6 className='like'>Like</h6>
                      <h6 className='time'>1 min ago</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='modal-footer'></div>
          </div>
        </div>
      )}
    </>
  );
};

export default Comments;
