import React from 'react';
import NewPost from '../NewPost/NewPost';

const CreatePost = () => {
  return (
    <div>
      <div className='create-post'>
        <NewPost />
        <div className='divider-0'></div>
        <div className='create-post-footer'>
          <ul>
            <li>
              <div className='post-icon'></div>
              <span>Live Video</span>
            </li>
            <li>
              <div className='post-icon'></div>
              Photo/video
            </li>
            <li>
              <div className='post-icon'></div>
              Feeling/Activity
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
