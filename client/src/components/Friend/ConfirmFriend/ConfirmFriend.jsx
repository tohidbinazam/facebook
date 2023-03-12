import React from 'react';
import './ConfirmFriend.css';
import avatar from '../../../assets/images/profile_avatar.png';

const ConfirmFriend = ({ friend }) => {
  return (
    <>
      {friend.map((data) => (
        <div className='friend'>
          <img
            src={data.photo ? `/profile_photos/${data.photo}` : avatar}
            alt=''
          />
          <div className='info'>
            <h3>{`${data.fs_name} ${data.sur_name}`}</h3>
            <h5>10 mutual friends</h5>
            <button className='confirm-btn'>Confirm</button>
            <button className='delete-btn'>Delete</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default ConfirmFriend;