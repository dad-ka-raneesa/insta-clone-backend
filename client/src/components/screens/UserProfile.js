import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import Gallery from '../Gallery';
import Button from '../Button';
import ProfileDetails from '../ProfileDetails';
import apiCall from '../apiCall';

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const { state, dispatch } = useContext(UserContext);
  const { userId } = useParams();
  const [showFollow, setShowFollow] = useState(state ? !state.following.includes(userId) : true);

  useEffect(() => {
    const headers = { "Authorization": "Bearer " + localStorage.getItem("jwt") };
    apiCall({ type: 'USER_PROFILE', userId, headers })
      .then(data => {
        setUserProfile(data);
      });
  }, [])

  const updateDetails = (loggedInUser, otherUser) => {
    dispatch({ type: 'UPDATE', payload: { following: loggedInUser.following, followers: loggedInUser.followers } });
    localStorage.setItem('user', JSON.stringify(loggedInUser));
    setUserProfile(prevState => {
      return {
        ...prevState,
        user: otherUser
      }
    })
  }

  const followUser = () => {
    const headers = { "Authorization": "Bearer " + localStorage.getItem("jwt") };
    apiCall({ type: 'FOLLOW', body: { followId: userId }, headers })
      .then(({ followedUser, followingUser }) => {
        updateDetails(followingUser, followedUser);
        setShowFollow(false);
      });
  }

  const unFollowUser = () => {
    const headers = { "Authorization": "Bearer " + localStorage.getItem("jwt") };
    apiCall({ type: 'UN_FOLLOW', body: { unFollowId: userId }, headers })
      .then(({ unFollowedUser, unFollowingUser }) => {
        updateDetails(unFollowingUser, unFollowedUser);
        setShowFollow(true);
      });
  }


  return (
    <>
      {userProfile ?
        <div className='profile'>
          <div className='user-profile'>
            <div>
              <img src={userProfile.user.image} alt='profile' />
            </div>
            <div>
              <ProfileDetails user={userProfile.user} posts={userProfile.posts} />
              {showFollow ? <Button text="FOLLOW" onClick={followUser} /> : <Button text="UN FOLLOW" onClick={unFollowUser} />}
            </div>
          </div>
          <Gallery posts={userProfile.posts} />
        </div>
        : <h2>Loading...</h2>
      }
    </>
  );
}

export default UserProfile;