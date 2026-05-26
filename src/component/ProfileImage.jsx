import React from 'react';
import { CgProfile } from 'react-icons/cg';

const ProfileImage = ({ profileUrl, alt, className = '', size = 'h-10 w-10' }) => {
  if (profileUrl) {
    return (
      <img 
        src={profileUrl}
        className={`${size} rounded-md ${className}`}
        alt={alt || 'Profile'}
      />
    );
  }

  return (
    <div className={`${size} rounded-md bg-purple-600 flex items-center justify-center ${className}`}>
      <CgProfile className='h-6 w-6 text-white' />
    </div>
  );
};

export default ProfileImage;
