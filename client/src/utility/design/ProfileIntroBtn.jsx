import React from 'react';

const ProfileIntroBtn = ({ children, open }) => {
  return (
    <div>
      <button onClick={() => open(true)} className='profile-intro-btn'>
        {children}
      </button>
    </div>
  );
};

export default ProfileIntroBtn;
