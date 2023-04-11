import React, { useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { AiOutlineLike } from 'react-icons/ai';
import { BiWorld } from 'react-icons/bi';
import Comments from '../Comments/Comments';
import avatar from '../../assets/images/profile_avatar.png';
import './Post.css';
import timeAgo from '../../utility/timeAgo/timeAgo';
import { ReactComponent as Like } from '../../assets/svg/like.svg';
import { useDispatch, useSelector } from 'react-redux';
import findId from '../../utility/findId/findId';
import { addRemoveLike } from '../../redux/post/action';
import toaster from '../../utility/toaster';

const Post = ({ post }) => {
  const { _id } = useSelector((state) => state.user);
  // const _id = '63ab1f73e6710db2c607cb47';
  const dispatch = useDispatch();
  const { userId, comments, text, images, createdAt, likes } = post;

  const [option, setOptions] = useState(false);
  const photos = images.length;

  const [show, setShow] = useState(false);

  const handleWidth = (number) => {
    if (photos % 2 !== 0) {
      if (number === 0) {
        return 'full';
      } else {
        return 'half';
      }
    } else {
      return 'half';
    }
  };

  const handleLike = (e) => {
    const { classList } = e.target;
    const check = classList.contains('active');
    dispatch(addRemoveLike(post._id, _id, check ? 'patch' : 'post'));
  };

  const handleCopy = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(`http://localhost:3000/post/${post._id}`);
    toaster('Link copied to clipboard', 'success');
  };

  return (
    <div>
      <div className='user-post'>
        <div className='user-post-header'>
          <div className='post-info'>
            <img
              src={userId.photo ? `/profile_photos/${userId.photo}` : avatar}
              alt=''
            />
            <div className='user-details'>
              <a className='author' href='http'>
                {`${userId.fs_name} ${userId.sur_name}`}
              </a>
              <span>
                {timeAgo(createdAt)}
                <BiWorld />
              </span>
            </div>
          </div>
          <div className='post-menu'>
            {option && (
              <div className='post-dropdown-menu'>
                <ul>
                  <li>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a href='#' onClick={handleCopy}>
                      <div className='menu-icon'></div>
                      <span>Copy link</span>
                    </a>
                  </li>
                  <li className='divide'></li>
                  <li>
                    <a href='http'>
                      <div className='menu-icon'></div>
                      <span>Edit post</span>
                    </a>
                  </li>
                  <li className='divide'></li>
                  <li>
                    <a href='http'>
                      <div className='menu-icon'></div>
                      <span>Delete Post</span>
                    </a>
                  </li>
                </ul>
              </div>
            )}
            <button onClick={() => setOptions(!option)}>
              <BsThreeDots />
            </button>
          </div>
        </div>
        <div className='post-body'>
          <div className='post-content'>
            <p>{text}</p>
          </div>
        </div>
        <div className='allImg'>
          {images.map((img, index) => (
            <img
              className={`${handleWidth(index)}`}
              src={img}
              alt=''
              key={index}
            />
          ))}
          {/* https://i.pinimg.com/474x/30/5c/5a/305c5a457807ba421ed67495c93198d3--cover-pics-cover-art.jpg */}
        </div>
        <div className='post-comments'>
          <div className='comments-header'>
            <div className='reaction'>
              <AiOutlineLike />
              <a href='http'>Kajal Datta, Sufia Sepu and 550 others</a>
            </div>
            <div className='counts'>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <button onClick={() => setShow(true)}>
                {comments && `${comments.length} Comments`}
              </button>
            </div>
          </div>
          <div className='comments-menu'>
            <div className='like-div'>
              {findId(_id, likes) ? (
                <button className='like-btn active' onClick={handleLike}>
                  <Like />
                  <span>Like</span>
                </button>
              ) : (
                <button className='like-btn' onClick={handleLike}>
                  <span className='comment-icon'></span>
                  <span>Like</span>
                </button>
              )}
            </div>

            {/* Comment Box */}
            <button className='comment-btn'>
              <span className='comment-icon'></span>
              <span>Comment</span>
            </button>
            {show && <Comments post={post} setShow={setShow} />}

            <button className='share-btn'>
              <span className='comment-icon'></span>
              <span>Share</span>
            </button>
          </div>
          <div className='comments-area'></div>
        </div>
      </div>
    </div>
  );
};

export default Post;
