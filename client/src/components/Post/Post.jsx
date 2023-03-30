import React, { useState } from 'react';
import user_img from '../../assets/images/user.png';
import { BsThreeDots } from 'react-icons/bs';
import { AiOutlineLike } from 'react-icons/ai';
import { BiWorld } from 'react-icons/bi';
import Comments from '../Comments/Comments';
import './Post.css';

const Post = () => {
  const [option, setOptions] = useState(false);
  return (
    <div>
      <div className='user-post'>
        <div className='user-post-header'>
          <div className='post-info'>
            <img src={user_img} alt='' />
            <div className='user-details'>
              <a className='author' href='http'>
                Asraful Haque
              </a>
              <span>
                10m
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
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit
              optio necessitatibus id nemo iste quod?
            </p>
          </div>
        </div>
        <div className='post-media'>
          <img
            src='https://embedsocial.com/wp-content/uploads/2020/10/add-links-instagram-posts.jpg'
            alt=''
          />
        </div>
        <div className='post-comments'>
          <div className='comments-header'>
            <div className='reaction'>
              <AiOutlineLike />
              <a href='http'>Kajal Datta, Sufia Sepu and 550 others</a>
            </div>
            <div className='counts'>
              <a href='http'>95 Comments</a>
            </div>
          </div>
          <div className='comments-menu'>
            <button className='like-btn'>
              <span className='comment-icon'></span>
              <span>Like</span>
            </button>

            {/* Comment Box */}
            <Comments />

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
