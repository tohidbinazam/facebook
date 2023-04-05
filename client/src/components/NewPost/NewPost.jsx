import React, { useState } from 'react';
import PostModal from '../PostModal/PostModal';
import ShowProfile from '../ShowProfile/ShowProfile';
import { BiCaretDown, BiWorld } from 'react-icons/bi';
import { FcPicture } from 'react-icons/fc';
import './NewPost.css';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../redux/post/action';

const NewPost = () => {
  const { _id, fs_name, sur_name } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [input, setInput] = useState({
    text: '',
    file: '',
  });

  const hideModal = () => {
    setShow(false);
    setInput({
      text: '',
      file: '',
    });
  };

  const handleFile = (e) => {
    const pre_file = input.file;
    const new_file = e.target.files;
    const file = [...pre_file, ...new_file];
    setInput((prev) => ({ ...prev, file }));
  };

  const handleWidth = (number) => {
    if (input.file.length % 2 !== 0) {
      if (number === 0) {
        return 'full';
      } else {
        return 'half';
      }
    } else {
      return 'half';
    }
  };

  const postCreate = () => {
    const data = new FormData();
    data.append('text', input.text);
    input.file && input.file.map((file) => data.append('file', file));
    dispatch(createPost(_id, data));
    hideModal();
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
          next={postCreate}
        >
          <div className='create-header'>
            <div className='create-left'>
              <ShowProfile />
            </div>
            <div className='create-center'>
              <h5>{`${fs_name} ${sur_name}`}</h5>
              <button>
                <BiWorld /> public <BiCaretDown />
              </button>
            </div>
          </div>
          <div className='all-content'>
            <div className='text-content'>
              <textarea
                name='text'
                placeholder="What's on your mind?"
                onChange={(e) =>
                  setInput((prev) => ({ ...prev, text: e.target.value }))
                }
              ></textarea>
            </div>
            <div className='allImg round'>
              {input.file &&
                Array.from(input.file).map((file, index) => (
                  <img
                    className={`${handleWidth(index)}`}
                    src={URL.createObjectURL(file)}
                    alt=''
                    key={index}
                  />
                ))}
            </div>
          </div>
          <div className='create-bottom'>
            <div className='addImg-left'>
              <h4>Add to your post</h4>
            </div>
            <div className='addImg-right'>
              <input
                type='file'
                name='file'
                id='photo'
                multiple
                onChange={handleFile}
              />
              <label htmlFor='photo'>
                <FcPicture />
              </label>
            </div>
          </div>
        </PostModal>
      )}
    </>
  );
};

export default NewPost;
