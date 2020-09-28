import React, { useState, useEffect } from 'react';
import Posts from '../Posts';
import apiCall from '../apiCall';

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const headers = { "Authorization": "Bearer " + localStorage.getItem("jwt") };
    apiCall({ type: 'ALL_POSTS', headers })
      .then(result => {
        setData(result.posts);
      })
  }, []);

  return (
    <Posts data={data} setData={setData} />
  )
}

export default Home;