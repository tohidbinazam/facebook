import React from 'react';
import './AddFriend.css';
import avatar from '../../../assets/images/profile_avatar.png';
import { useDispatch } from 'react-redux';
import { addFriend, removeFriend } from '../../../redux/friend/actions';

const AddFriend = ({ friend }) => {
  const dispatch = useDispatch();

  const handleFriend = (id) => {
    dispatch(addFriend(id));
  };

  const handleRemove = (id) => {
    dispatch(removeFriend(id));
  };

  return (
    <>
      {friend.map((data, index) => (
        <div className='friend' key={index}>
          <img
            src={data.photo ? `/profile_photos/${data.photo}` : avatar}
            alt=''
          />
          <div className='info'>
            <h3>{`${data.fs_name} ${data.sur_name}`}</h3>
            <h5>10 mutual friends </h5>
            <button
              className='friend-btn'
              onClick={() => handleFriend(data._id)}
            >
              Add Friend
            </button>
            <button
              className='delete-btn'
              onClick={() => handleRemove(data._id)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AddFriend;
