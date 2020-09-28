import React, { useState, useEffect } from 'react';
import Posts from '../Posts';
import apiCall from '../apiCall';

const FollowingPosts = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const headers = { "Authorization": "Bearer " + localStorage.getItem("jwt") };
    apiCall({ type: 'FOLLOWING_POSTS', headers })
      .then(result => {
        setData(result.posts);
      })
  }, []);

  return (
    <Posts data={data} setData={setData} />
  )
}

export default FollowingPosts;