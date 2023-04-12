import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header/Header';
import './profile.css';
import Post from '../../components/Post/Post';
import CreatePost from '../../components/CreatePost/CreatePost';
import FBCRUD from '../../utility/design/FBCRUD';
import ProfileIntroBtn from '../../utility/design/ProfileIntroBtn';
import FbBio from '../../components/FbBio/FbBio';
import Featured from '../../components/featured/Featured';
import UploadProfile from '../../components/UploadProfile/UploadProfile';
import { profileFriend } from '../../redux/friend/actions';
import Details from '../../components/Details/Details';
import CoverPhoto from '../../components/CoverPhoto/CoverPhoto';
import { getMyPost, postPhotos } from '../../redux/post/action';
import avatar from '../../assets/images/profile_avatar.png';

const Profile = () => {
  const dispatch = useDispatch();

  const { user, post, friend } = useSelector((state) => state);
  const { friend_list, follower, following } = friend;
  const { my_post, post_photos } = post;

  const {
    _id,
    fs_name,
    sur_name,
    photo,
    company,
    position,
    college,
    subject,
    school,
    city,
    hometown,
    relationship,
  } = user;
  const name = fs_name + ' ' + sur_name;

  useEffect(() => {
    dispatch(postPhotos(_id));
    dispatch(profileFriend(_id));
    dispatch(getMyPost(_id));
  }, [_id, dispatch]);

  return (
    <div>
      <Header name={name} photo={photo} />

      {/* Cover Photo   */}
      <div className='fb-profile-header'>
        <CoverPhoto />
        <div className='fb-profile-details'>
          <div className='profile-info'>
            <UploadProfile />
            <div className='profile-desc'>
              <h1>{name}</h1>
              <div className='profile-follow-details'>
                <span className='profile-followers'>
                  {follower && follower.length} follower
                </span>
                <span className='profile-following'>
                  {following && following.length} following
                </span>
              </div>
              {/* https://unitedthemes.com/wp-content/uploads/2018/09/team4.jpg */}
              <div className='profile-friends-list'>
                <ul>
                  {follower &&
                    follower.map((follower) => (
                      <li>
                        <img
                          src={
                            follower.photo
                              ? `/profile_photos/${follower.photo}`
                              : avatar
                          }
                          alt=''
                        />
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
          <div className='profile-action'>
            {/* <button>
              <span className='follow-icon'></span> <span>Follow</span>
            </button> */}
            <button>
              <span className='message-icon'></span> <span>Message</span>
            </button>
            <button>
              <span className='add-friend-icon'></span> <span>Add friend</span>
            </button>
          </div>
        </div>
        <div className='fb-profile-menu'>
          <ul>
            <li>
              <a href='http'>Posts</a>
            </li>
            <li>
              <a href='http'>About</a>
            </li>
            <li>
              <a href='http'>Followers</a>
            </li>
            <li>
              <a href='http'>Photos</a>
            </li>
            <li>
              <a href='http'>Videos</a>
            </li>
            <li>
              <a href='http'>Articlse</a>
            </li>
            <li>
              <a href='http'>More</a>
            </li>
          </ul>
        </div>
      </div>

      <div className='main-bg'>
        <div className='main-section'>
          <div className='main-left'>
            <FBCRUD>
              {/* FB Bio part */}
              <FbBio />
              <div className='bio-list'>
                <ul>
                  {company && (
                    <li>
                      <img
                        src='https://static.xx.fbcdn.net/rsrc.php/v3/yp/r/Q9Qu4uLgzdm.png'
                        alt=''
                      />
                      <p>
                        {position} at
                        <b> {company}</b>
                      </p>
                    </li>
                  )}

                  {college && (
                    <li>
                      <img
                        src='https://static.xx.fbcdn.net/rsrc.php/v3/yS/r/jV4o8nAgIEh.png'
                        alt=''
                      />
                      <p>
                        Studies {subject} at
                        <b> {college}</b>
                      </p>
                    </li>
                  )}
                  {school && (
                    <li>
                      <img
                        src='https://static.xx.fbcdn.net/rsrc.php/v3/yS/r/jV4o8nAgIEh.png'
                        alt=''
                      />
                      <p>
                        Went to <b>{school}</b>
                      </p>
                    </li>
                  )}
                  {city && (
                    <li>
                      <img
                        src='https://static.xx.fbcdn.net/rsrc.php/v3/y5/r/VMZOiSIJIwn.png'
                        alt=''
                      />
                      <p>
                        Lives in <b>{city}</b>
                      </p>
                    </li>
                  )}
                  {hometown && (
                    <li>
                      <img
                        src='https://static.xx.fbcdn.net/rsrc.php/v3/yc/r/-e1Al38ZrZL.png'
                        alt=''
                      />
                      <p>
                        From <b>{hometown}</b>
                      </p>
                    </li>
                  )}
                  {relationship && (
                    <li>
                      <img
                        src='https://static.xx.fbcdn.net/rsrc.php/v3/yq/r/S0aTxIHuoYO.png'
                        alt=''
                      />
                      <p>{relationship}</p>
                    </li>
                  )}
                  {follower && (
                    <li>
                      <img
                        src='https://static.xx.fbcdn.net/rsrc.php/v3/yJ/r/OyWm6cSjuMt.png'
                        alt=''
                      />
                      <p>
                        Followed by <b>{follower.length} people</b>
                      </p>
                    </li>
                  )}
                </ul>
                {/* Edit Details */}
                <Details />

                <div className='hobbies-section'>
                  <button className='Hobbies-btn'>
                    <img
                      src='https://icons.iconarchive.com/icons/treetog/junior/128/earth-icon.png'
                      alt=''
                    />
                    Traveling
                  </button>
                  <button className='Hobbies-btn'>
                    <img
                      src='https://icons.iconarchive.com/icons/treetog/junior/128/earth-icon.png'
                      alt=''
                    />
                    Traveling
                  </button>
                  <button className='Hobbies-btn'>
                    <img
                      src='https://icons.iconarchive.com/icons/treetog/junior/128/earth-icon.png'
                      alt=''
                    />
                    Traveling
                  </button>
                </div>
                <ProfileIntroBtn> Edit hobbies </ProfileIntroBtn>
              </div>

              {/* All Feature Option */}
              <Featured />
            </FBCRUD>
            <FBCRUD>
              <div className='fb-photo'>
                <div className='photo-header'>
                  <h3>Photos</h3>
                  <button>See All Photos</button>
                </div>
                <div className='photo-body'>
                  {post_photos &&
                    post_photos.map((image, index) => (
                      <img src={image} key={index} alt='' />
                    ))}
                </div>
              </div>
            </FBCRUD>
            <FBCRUD>
              <div className='fb-friend'>
                <div className='fb-friend-header'>
                  <div className='friend-left-part'>
                    <h3>Friends</h3>
                    <span>{friend_list && friend_list.length} friends</span>
                  </div>
                  <div className='friend-right-part'>
                    <button>See all friends</button>
                  </div>
                </div>
                <div className='fb-friend-body'>
                  {friend_list &&
                    friend_list.map((friend, index) => (
                      <div className='fb-friend-block' key={index}>
                        <img
                          src={
                            friend.photo
                              ? `/profile_photos/${friend.photo}`
                              : avatar
                          }
                          alt=''
                        />
                        <div className='fb-friend-name'>
                          <h5>{`${friend.fs_name} ${friend.sur_name}`}</h5>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </FBCRUD>
          </div>
          <div className='main-right'>
            <CreatePost />

            {/* User all post */}
            {my_post &&
              [...my_post]
                .reverse()
                .map((post, index) => <Post post={post} key={index} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
