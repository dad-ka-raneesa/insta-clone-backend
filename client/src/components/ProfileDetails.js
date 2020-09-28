import React from 'react';

const ProfileDetails = (props) => {
  const { user, posts } = props;
  return (
    <>
      <h4>{user.name}</h4>
      <h6>{user.email}</h6>
      <div className='info-tab'>
        <h6>{posts.length} Posts</h6>
        <h6>{user.followers.length} Followers</h6>
        <h6>{user.following.length} Following</h6>
      </div>
    </>
  );
}

export default ProfileDetails;