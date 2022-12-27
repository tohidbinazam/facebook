import React from 'react'
import StoryReels from '../../components/StoryReels/StoryReels';
import CreatePost from '../../components/CreatePost/CreatePost';
import Post from '../../components/Post/Post';
import Header from '../../components/Header/Header';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import avatar from '../../assets/images/profile_avatar.png'

const Home = () => {

  const { fs_name, sur_name, photo } = useSelector(state => state.auth.user)
  const name = fs_name + ' ' + sur_name

  return (
    <div>
      {/* Main Header */}
      <Header name={ name } photo={ photo } />
      
      <div className="fb-home-body">
        <div className="fb-home-body-sidebar">
          <ul>
            <li>
              <Link to="/profile">
                <div className="body-icon">
                  <img src={ photo ?? avatar } alt="" />
                </div>
                <span>{ name }</span>
              </Link>
            </li>

            <li>
              <a href="http">
                <div className="body-icon"></div>
                <span>Friends</span>
              </a>
            </li>

            <li>
              <a href="http">
                <div className="body-icon"></div>
                <span>Groups</span>
              </a>
            </li>

            <li>
              <a href="http">
                <div className="body-icon"></div>
                <span>Marketplace</span>
              </a>
            </li>

            <li>
              <a href="http">
                <div className="body-icon"></div>
                <span>Watch</span>
              </a>
            </li>

            <li>
              <a href="http">
                <div className="body-icon"></div>
                <span>Watch</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="fb-home-timeline-area">
          <div className="fb-home-timeline">
            {/* Story Box */}
            <StoryReels />

            {/* Create Post Box */}
            <CreatePost />

            {/* User Post */}
            <Post />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home