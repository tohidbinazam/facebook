import React from 'react';
import { RxCross2 } from 'react-icons/rx';
import Post from '../Post/Post';
import { MdSend } from 'react-icons/md';
import './Comments.css';
import ShowProfile from '../ShowProfile/ShowProfile';

const Comments = ({ post, setShow }) => {
  const { fs_name } = post.userId;
  return (
    <>
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
            <Post post={post} />
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
          <div className='send-comment'>
            <div className='comment-profile'>
              <ShowProfile />
            </div>
            <input type='text' name='text' placeholder='Write a comment...' />
            <button>
              <MdSend />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Comments;
