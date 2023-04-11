import React from 'react';
import { useSelector } from 'react-redux';
import avatar from '../../assets/images/profile_avatar.png';

const ShowProfile = () => {
  const { photo } = useSelector((state) => state.user);
  return (
    <img
      style={{ objectFit: 'cover' }}
      src={photo ? `/profile_photos/${photo}` : avatar}
      alt=''
    />
  );
};

export default ShowProfile;
