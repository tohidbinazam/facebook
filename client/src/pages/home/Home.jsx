import React, { useEffect } from 'react';
import StoryReels from '../../components/StoryReels/StoryReels';
import CreatePost from '../../components/CreatePost/CreatePost';
import Post from '../../components/Post/Post';
import Header from '../../components/Header/Header';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ShowProfile from '../../components/ShowProfile/ShowProfile';
import { getFriendPost } from '../../redux/post/action';

const Home = () => {
  const { user, post } = useSelector((state) => state);
  const dispatch = useDispatch();

  const { _id, fs_name, sur_name } = user;
  const name = fs_name + ' ' + sur_name;

  useEffect(() => {
    dispatch(getFriendPost(_id));
  }, [_id, dispatch]);

  return (
    <div>
      {/* Main Header */}
      <Header />

      <div className='fb-home-body'>
        <div className='fb-home-body-sidebar'>
          <ul>
            <li>
              <Link to='/profile'>
                <div className='body-icon'>
                  <ShowProfile />
                </div>
                <span>{name}</span>
              </Link>
            </li>

            <li>
              <Link to='/friends'>
                <div className='body-icon'></div>
                <span>Friends</span>
              </Link>
            </li>

            <li>
              <a href='http'>
                <div className='body-icon'></div>
                <span>Groups</span>
              </a>
            </li>

            <li>
              <a href='http'>
                <div className='body-icon'></div>
                <span>Marketplace</span>
              </a>
            </li>

            <li>
              <a href='http'>
                <div className='body-icon'></div>
                <span>Watch</span>
              </a>
            </li>

            <li>
              <a href='http'>
                <div className='body-icon'></div>
                <span>Watch</span>
              </a>
            </li>
          </ul>
        </div>

        <div className='fb-home-timeline-area'>
          <div className='fb-home-timeline'>
            {/* Story Box */}
            <StoryReels />

            {/* Create Post Box */}
            <CreatePost />

            {/* User Post */}
            {post.friends_post &&
              post.friends_post.map((post, index) => (
                <Post post={post} key={index} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
