import React from 'react';
import ShowProfile from '../ShowProfile/ShowProfile';

const CreatePost = () => {
  return (
    <div>
      <div className='create-post'>
        <div className='create-post-header'>
          <ShowProfile />
          <button>Whats on your mind ?</button>
        </div>
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
