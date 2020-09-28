import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FormWithInputField from '../FormWithInputField';
import apiCall from '../apiCall';

const Comments = () => {
  const [post, setPost] = useState('');
  const { postId } = useParams();

  useEffect(() => {
    const headers = { "Authorization": "Bearer " + localStorage.getItem("jwt") };
    apiCall({ type: 'ALL_COMMENTS', postId, headers })
      .then(({ details }) => {
        setPost(details);
      });
  }, [])

  const postDetails = async (action) => {
    const headers = { "Authorization": "Bearer " + localStorage.getItem("jwt") };
    const result = await apiCall({ ...action, headers })
    setPost(result);
  }

  const makeComment = (text) => postDetails({ type: 'COMMENT', body: { text, postId: post._id } });

  return (
    <>
      {post ?
        <div className="comments">
          <h5>Comments</h5>
          {
            post.comments.map((record, index) => (
              <div className='comment' key={record.text + index}>
                <h6 className='postedBy'>{record.postedBy.name}</h6>
                <p>{record.text}</p>
              </div>
            ))
          }
          <FormWithInputField onSubmit={makeComment} />
        </div> : <h2>Loading...</h2>
      }
    </>
  );
}

export default Comments;