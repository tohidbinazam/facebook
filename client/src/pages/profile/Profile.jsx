import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '../../components/Header/Header';
import avatar from '../../assets/images/profile_avatar.png';
import './profile.css';
import Post from '../../components/Post/Post';
import CreatePost from '../../components/CreatePost/CreatePost';
import FBCRUD from '../../utility/design/FBCRUD';
import ProfileIntroBtn from '../../utility/design/ProfileIntroBtn';
import Modal from '../../components/Modal/Modal';
import { BiAddToQueue } from 'react-icons/bi';
import PopUp from '../../components/Popup/PopUp';
import { features } from '../../components/Popup/array';
import FbBio from '../../components/FbBio/FbBio';

const Profile = () => {
  const { fs_name, sur_name, photo } = useSelector((state) => state.auth.user);
  const name = fs_name + ' ' + sur_name;

  // Add Feature
  const [featureAdd, setFeatureAdd] = useState(false);
  const [featureUpload, setFeatureUpload] = useState(false);
  const [featurePhoto, setFeaturePhoto] = useState([]);
  const [checkedPhoto, setCheckedPhoto] = useState([]);

  // Show Feature
  const [showFeature, setShowFeature] = useState(false);

  const handleUpload = (e) => {
    const files = Array.from(e.target.files);
    setFeaturePhoto((prev) => [...prev, ...files]);
    setCheckedPhoto((prev) => [...prev, ...files]);
  };

  const handleChecked = (e) => {
    const photo = featurePhoto.find((item) => item.name === e.target.value);

    if (checkedPhoto.includes(photo)) {
      setCheckedPhoto(checkedPhoto.filter((item) => item !== photo));
    } else {
      setCheckedPhoto((prev) => [...prev, photo]);
    }
  };

  const handleFeatureTitle = () => {
    setFeatureAdd(false);
    setFeatureUpload(true);
  };

  const handleReUpload = () => {
    setFeatureUpload(false);
    setFeatureAdd(true);
  };

  return (
    <div>
      <Header name={name} photo={photo} />

      {/* Cover Photo   */}
      <div className='fb-profile-header'>
        <div className='fb-header-shad'></div>
        <div className='fb-cover-photo'>
          <img
            src='https://images.pexels.com/photos/1323206/pexels-photo-1323206.jpeg?cs=srgb&dl=pexels-mixu-1323206.jpg&fm=jpg'
            alt=''
          />
          <button>
            <span className='camera-icon'></span> Edit cover photo
          </button>
        </div>
        <div className='fb-profile-details'>
          <div className='profile-info'>
            <div className='profile-photo'>
              <img src={photo ?? avatar} alt='' />
            </div>
            <div className='profile-desc'>
              <h1>
                Asraful Haque <span>( neooo inc )</span>
              </h1>
              <div className='profile-follow-details'>
                <span className='profile-followers'>15k follower</span>
                <span className='profile-following'>1k following</span>
              </div>
              <div className='profile-friends-list'>
                <ul>
                  <li>
                    <img
                      src='https://unitedthemes.com/wp-content/uploads/2018/09/team4.jpg'
                      alt=''
                    />
                  </li>
                  <li>
                    <img
                      src='https://unitedthemes.com/wp-content/uploads/2018/09/team4.jpg'
                      alt=''
                    />
                  </li>
                  <li>
                    <img
                      src='https://unitedthemes.com/wp-content/uploads/2018/09/team4.jpg'
                      alt=''
                    />
                  </li>
                  <li>
                    <img
                      src='https://unitedthemes.com/wp-content/uploads/2018/09/team3.jpg'
                      alt=''
                    />
                  </li>
                  <li>
                    <img
                      src='https://unitedthemes.com/wp-content/uploads/2018/09/team3.jpg'
                      alt=''
                    />
                  </li>
                  <li>
                    <img
                      src='https://unitedthemes.com/wp-content/uploads/2018/09/team3.jpg'
                      alt=''
                    />
                  </li>
                  <li>
                    <img
                      src='https://unitedthemes.com/wp-content/uploads/2018/09/team3.jpg'
                      alt=''
                    />
                  </li>
                  <li>
                    <img
                      src='https://unitedthemes.com/wp-content/uploads/2018/09/team3.jpg'
                      alt=''
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className='profile-action'>
            <button>
              <span className='follow-icon'></span> <span>Follow</span>
            </button>
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
                  <li>
                    <img
                      src='https://static.xx.fbcdn.net/rsrc.php/v3/yS/r/jV4o8nAgIEh.png'
                      alt=''
                    />
                    <p>
                      Studies Computer Science and Technology at
                      <b>Khulna Polytechnic Institute, Khulna</b>
                    </p>
                  </li>
                  <li>
                    <img
                      src='https://static.xx.fbcdn.net/rsrc.php/v3/yS/r/jV4o8nAgIEh.png'
                      alt=''
                    />
                    <p>
                      Went to <b>Govt. Model High School, Khulna</b>
                    </p>
                  </li>
                  <li>
                    <img
                      src='https://static.xx.fbcdn.net/rsrc.php/v3/y5/r/VMZOiSIJIwn.png'
                      alt=''
                    />
                    <p>
                      Lives in <b>Khulna</b>
                    </p>
                  </li>
                  <li>
                    <img
                      src='https://static.xx.fbcdn.net/rsrc.php/v3/yc/r/-e1Al38ZrZL.png'
                      alt=''
                    />
                    <p>
                      From <b>Khulna</b>
                    </p>
                  </li>
                </ul>
                <ProfileIntroBtn> Edit details </ProfileIntroBtn>
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

              <div className='all-feature'>
                <div className='fb-feature'>
                  <div className='feature' onClick={() => setShowFeature(true)}>
                    <img
                      src='https://unitedthemes.com/wp-content/uploads/2018/09/team4.jpg'
                      alt=''
                    />
                  </div>
                  <div className='feature'>
                    <img
                      src='https://unitedthemes.com/wp-content/uploads/2018/09/team2.jpg'
                      alt=''
                    />
                  </div>
                  <div className='feature'>
                    <img
                      src='https://unitedthemes.com/wp-content/uploads/2018/09/team3.jpg'
                      alt=''
                    />
                  </div>
                </div>
                {/* Feature Button */}
                <ProfileIntroBtn open={setFeatureAdd}>
                  Edit featured
                </ProfileIntroBtn>

                {/* View Feature */}
                {showFeature && (
                  <PopUp features={features} hide={setShowFeature} />
                )}

                {/* Feature Modal */}
                {featureAdd && (
                  <Modal
                    title='Add Featured Collection'
                    close={setFeatureAdd}
                    button='Next'
                    next={handleFeatureTitle}
                  >
                    <div className='featured-main-section'>
                      <input
                        type='file'
                        id='upload-photo'
                        onChange={handleUpload}
                        multiple
                      />
                      <label className='upload-button' htmlFor='upload-photo'>
                        Uploads Photos
                      </label>

                      <div className='All-image'>
                        {featurePhoto.map((photo, index) => {
                          const item = URL.createObjectURL(photo);
                          return (
                            <div className='upload-img' key={index}>
                              <label
                                className='single-ing'
                                htmlFor={`checkbox-${index}`}
                              >
                                <img src={item} alt='' />
                                <input
                                  checked={checkedPhoto.includes(photo)}
                                  type='checkbox'
                                  className='checkbox-design'
                                  id={`checkbox-${index}`}
                                  value={photo.name}
                                  onChange={handleChecked}
                                />
                                <span className='new-checkbox'></span>
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </Modal>
                )}

                {featureUpload && (
                  <Modal
                    title='Add Featured Collection'
                    close={setFeatureUpload}
                    button='Save'
                    next={''}
                  >
                    <div className='feature-title'>
                      <label htmlFor='title'>Feature Title</label>
                      <input type='text' id='title' />
                    </div>

                    <div className='All-image'>
                      <div className='upload-img' onClick={handleReUpload}>
                        <div className='add-more'>
                          <div className='just'>
                            <BiAddToQueue />
                            <h5>Add More</h5>
                          </div>
                        </div>
                      </div>
                      {featurePhoto.map((photo, index) => {
                        const item = URL.createObjectURL(photo);
                        return (
                          <div className='upload-img' key={index}>
                            <label
                              className='single-ing'
                              htmlFor={`checkbox-${index}`}
                            >
                              <img src={item} alt='' />
                              <input
                                checked={checkedPhoto.includes(photo)}
                                type='checkbox'
                                className='checkbox-design'
                                id={`checkbox-${index}`}
                                value={photo.name}
                                onChange={handleChecked}
                              />
                              <span className='new-checkbox'></span>
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </Modal>
                )}
              </div>
            </FBCRUD>
            <FBCRUD>
              <div className='fb-photo'>
                <div className='photo-header'>
                  <h3>Photos</h3>
                  <button>See All Photos</button>
                </div>
                <div className='photo-body'>
                  <img
                    src='https://unitedthemes.com/wp-content/uploads/2018/09/team3.jpg'
                    alt=''
                  />
                  <img
                    src='https://unitedthemes.com/wp-content/uploads/2018/09/team2.jpg'
                    alt=''
                  />
                  <img
                    src='https://unitedthemes.com/wp-content/uploads/2018/09/team4.jpg'
                    alt=''
                  />
                  <img
                    src='https://unitedthemes.com/wp-content/uploads/2018/09/team1.jpg'
                    alt=''
                  />
                  <img
                    src='https://unitedthemes.com/wp-content/uploads/2018/09/team2.jpg'
                    alt=''
                  />
                  <img
                    src='https://unitedthemes.com/wp-content/uploads/2018/09/team3.jpg'
                    alt=''
                  />
                  <img
                    src='https://unitedthemes.com/wp-content/uploads/2018/09/team1.jpg'
                    alt=''
                  />
                  <img
                    src='https://unitedthemes.com/wp-content/uploads/2018/09/team2.jpg'
                    alt=''
                  />
                  <img
                    src='https://unitedthemes.com/wp-content/uploads/2018/09/team4.jpg'
                    alt=''
                  />
                </div>
              </div>
            </FBCRUD>
            <FBCRUD>
              <div className='fb-friend'>
                <div className='fb-friend-header'>
                  <div className='friend-left-part'>
                    <h3>Friends</h3>
                    <span>2804 friends</span>
                  </div>
                  <div className='friend-right-part'>
                    <button>See all friends</button>
                  </div>
                </div>
                <div className='fb-friend-body'>
                  <div className='fb-friend-block'>
                    {/* <img
                      src='https://unitedthemes.com/wp-content/uploads/2018/09/team4.jpg'
                      alt=''
                    /> */}
                    <div className='fb-friend-name'>
                      <h4>John Doe</h4>
                    </div>
                  </div>
                </div>
              </div>
            </FBCRUD>
          </div>
          <div className='main-right'>
            <CreatePost />
            <Post />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
