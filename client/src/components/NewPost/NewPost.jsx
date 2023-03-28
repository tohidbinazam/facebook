import React, { useState } from 'react';
import PostModal from '../PostModal/PostModal';
import ShowProfile from '../ShowProfile/ShowProfile';
import { BiCaretDown, BiWorld } from 'react-icons/bi';
import { FcPicture } from 'react-icons/fc';
import './NewPost.css';

const NewPost = () => {
  const [show, setShow] = useState(false);

  const createPost = () => {
    console.log('create post');
  };
  const hideModal = () => {
    setShow(false);
  };

  return (
    <>
      <div className='create-post-header'>
        <ShowProfile />
        <button onClick={() => setShow(true)}>Whats on your mind ?</button>
      </div>
      {show && (
        <PostModal
          title='Create Post'
          close={hideModal}
          button='Post'
          next={createPost}
        >
          <div className='create-header'>
            <div className='create-left'>
              <ShowProfile />
            </div>
            <div className='create-center'>
              <h5>Tohid Bin Azam</h5>
              <button>
                <BiWorld /> public <BiCaretDown />
              </button>
            </div>
          </div>
          <div className='all-content'>
            <div className='text-content'>
              <textarea
                name=''
                id=''
                placeholder="What's on your mind?"
              ></textarea>
            </div>
            <div className='allImg'>
              <img
                className='full'
                src='https://i.pinimg.com/474x/30/5c/5a/305c5a457807ba421ed67495c93198d3--cover-pics-cover-art.jpg'
                alt=''
              />
              <img
                className='half'
                src='https://i.pinimg.com/474x/30/5c/5a/305c5a457807ba421ed67495c93198d3--cover-pics-cover-art.jpg'
                alt=''
              />
              <img
                className='half'
                src='https://i.pinimg.com/474x/30/5c/5a/305c5a457807ba421ed67495c93198d3--cover-pics-cover-art.jpg'
                alt=''
              />
            </div>
          </div>
          <div className='create-bottom'>
            <div className='addImg-left'>
              <h4>Add to your post</h4>
            </div>
            <div className='addImg-right'>
              <FcPicture onClick={() => alert('Hello')} />
            </div>
          </div>
        </PostModal>
      )}
    </>
  );
};

export default NewPost;
