import React from 'react'
import user_img from '../../assets/images/user.png'
import StoryReels from '../../components/StoryReels/StoryReels';
import CreatePost from '../../components/CreatePost/CreatePost';
import Post from '../../components/Post/Post';
import Header from '../../components/Header/Header';

const Home = () => {


  return (
    <div>
      {/* Main Header */}
      <Header />
      
      <div className="fb-home-body">
        <div className="fb-home-body-sidebar">
          <ul>
            <li>
              <a href="http">
                <div className="body-icon">
                  <img src={ user_img } alt="" />
                </div>
                <span>Asraful Haque</span>
              </a>
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