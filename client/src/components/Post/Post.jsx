import React, { useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { AiOutlineLike } from 'react-icons/ai';
import { BiWorld } from 'react-icons/bi';
import Comments from '../Comments/Comments';
import avatar from '../../assets/images/profile_avatar.png';
import './Post.css';
import timeAgo from '../../utility/timeAgo/timeAgo';

const Post = ({ post }) => {
  const [option, setOptions] = useState(false);
  const images = post.images.length;

  const [show, setShow] = useState(false);

  const handleWidth = (number) => {
    if (images % 2 !== 0) {
      if (number === 0) {
        return 'full';
      } else {
        return 'half';
      }
    } else {
      return 'half';
    }
  };

  return (
    <div>
      <div className='user-post'>
        <div className='user-post-header'>
          <div className='post-info'>
            <img
              src={
                post.userId.photo
                  ? `/profile_photos/${post.userId.photo}`
                  : avatar
              }
              alt=''
            />
            <div className='user-details'>
              <a className='author' href='http'>
                {`${post.userId.fs_name} ${post.userId.sur_name}`}
              </a>
              <span>
                {timeAgo(post.createdAt)}
                <BiWorld />
              </span>
            </div>
          </div>
          <div className='post-menu'>
            {option && (
              <div className='post-dropdown-menu'>
                <ul>
                  <li>
                    <a href='http'>
                      <div className='menu-icon'></div>
                      <span>Save post</span>
                    </a>
                  </li>
                  <li className='divid'></li>
                  <li>
                    <a href='http'>
                      <div className='menu-icon'></div>
                      <span>Embed</span>
                    </a>
                  </li>
                  <li>
                    <a href='http'>
                      <div className='menu-icon'></div>
                      <span>Who can comment on this post ?</span>
                    </a>
                  </li>
                  <li>
                    <a href='http'>
                      <div className='menu-icon'></div>
                      <span>Edit view history</span>
                    </a>
                  </li>
                  <li>
                    <a href='http'>
                      <div className='menu-icon'></div>
                      <span>Turn off notification</span>
                    </a>
                  </li>
                  <li>
                    <a href='http'>
                      <div className='menu-icon'></div>
                      <span>turn off translation</span>
                    </a>
                  </li>
                  <li>
                    <a href='http'>
                      <div className='menu-icon'></div>
                      <span>Copy link</span>
                    </a>
                  </li>
                  <li>
                    <a href='http'>
                      <div className='menu-icon'></div>
                      <span>Edit post</span>
                    </a>
                  </li>
                  <li className='divid'></li>
                  <li>
                    <a href='http'>
                      <div className='menu-icon'></div>
                      <span>Move trash</span>
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
            <p>{post.text}</p>
          </div>
        </div>
        <div className='allImg'>
          {post.images.map((img, index) => (
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
              <button onClick={() => setShow(true)}>95 Comments</button>
            </div>
          </div>
          <div className='comments-menu'>
            <button className='like-btn'>
              <span className='comment-icon'></span>
              <span>Like</span>
            </button>

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
