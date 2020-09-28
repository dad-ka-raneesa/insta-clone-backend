import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../App';
import Gallery from '../Gallery';
import ProfileDetails from '../ProfileDetails';
import Button from '../Button';
import apiCall from '../apiCall';

const Profile = () => {
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    const headers = { "Authorization": "Bearer " + localStorage.getItem("jwt") };
    apiCall({ type: 'MY_POSTS', headers })
      .then(result => {
        setData(result.myPosts);
      });
  }, [])

  return (
    <>
      {state ?
        <div className='profile'>
          <div className='profile-container'>
            <div className='profile-details'>
              <div>
                <img src={state.image} alt='profile' />
              </div>
              <div>
                <ProfileDetails user={state} posts={data} />
              </div>
            </div>
            <Button text='UPDATE PROFILE'/>
          </div>
          <Gallery posts={data} />
        </div>
        : <h2>Loading...</h2>
      }
    </>

  );
}

export default Profile;