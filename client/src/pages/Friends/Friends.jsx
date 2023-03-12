import React, { useEffect } from 'react';
import Header from '../../components/Header/Header';
import { AiTwotoneSetting } from 'react-icons/ai';
import { FaUserFriends } from 'react-icons/fa';
import './Friends.css';
import AddFriend from '../../components/Friend/AddFriend/AddFriend';
import ConfirmFriend from '../../components/Friend/ConfirmFriend/ConfirmFriend';
import { useDispatch, useSelector } from 'react-redux';
import { findFriend, friendRequest } from '../../redux/friend/actions';

const Friends = () => {
  const dispatch = useDispatch();
  const { follower, find_friend } = useSelector((state) => state.friend);

  const handleTabs = (e) => {
    // now add active class to the clicked tab
    const tabs = document.querySelectorAll('.tabs-option');
    tabs.forEach((tab) => {
      tab.classList.remove('active');
    });
    e.target.classList.add('active');
  };

  useEffect(() => {
    dispatch(friendRequest());
    dispatch(findFriend());
  }, [dispatch]);

  return (
    <div>
      {/* Main Header */}
      <Header />
      <div className='main-friend'>
        <div className='left-colum'>
          <div className='left-header'>
            <h2>Friends</h2>
            <button>
              <AiTwotoneSetting />
            </button>
          </div>
          <div className='left-body'>
            <div onClick={handleTabs} className='tabs-option active'>
              <button>
                <FaUserFriends />
              </button>
              <h4>Home</h4>
            </div>
            <div onClick={handleTabs} className='tabs-option'>
              <button>
                <FaUserFriends />
              </button>
              <h4>Friend Request</h4>
            </div>
            <div onClick={handleTabs} className='tabs-option'>
              <button>
                <FaUserFriends />
              </button>
              <h4>All Friend</h4>
            </div>
          </div>
        </div>
        <div className='right-colum'>
          <div>
            <div className='right-header'>
              <h3>Friend Requests</h3>
              <a href='http'>See All</a>
            </div>
            <div className='all-friend'>
              {/* Confirm Friend */}
              {follower ? <ConfirmFriend friend={follower} /> : null}
            </div>
          </div>
          <div className='find-friend'>
            <hr />
            <div className='right-header'>
              <h3>People You May Know</h3>
              <a href='http'>See All</a>
            </div>
            <div className='all-friend'>
              {/* Add Friend */}
              {find_friend ? <AddFriend friend={find_friend} /> : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Friends;
