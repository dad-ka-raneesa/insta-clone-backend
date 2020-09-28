import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../App';
import FormWithInputField from './FormWithInputField';

const Post = (props) => {
  const { item, likePost, unLikePost, makeComment, deletePost } = props;
  const { state, dispatch } = useContext(UserContext);

  const addComment = (value) => makeComment(value, item._id);

  return (
    <div className='card home-card'>
      <h5 className='username'><NavLink activeClassName='active' to={item.postedBy._id !== state._id ? '/userProfile/' + item.postedBy._id : '/profile'}>{item.postedBy.name}</NavLink>
        {item.postedBy._id === state._id &&
          <i className="material-icons delete_btn" onClick={() => deletePost(item._id)}> delete</i>}
      </h5>
      <div className='card-image'>
        <img src={item.photo} alt='Loading..' />
      </div>
      <div className='card-content'>
        <div className='bar'>
          {item.likes.includes(state._id) ?
            <i className="material-icons thumb_btn" onClick={() => unLikePost(item._id)}>thumb_down</i> :
            <i className="material-icons thumb_btn" onClick={() => likePost(item._id)}>thumb_up</i>
          }
          <span><NavLink activeClassName='active' to={'/allComments/' + item._id}>Comments</NavLink></span>
        </div>
        <h6>{item.likes.length} likes</h6>
        <h6>{item.title}</h6>
        <p>{item.body}</p>
        <FormWithInputField onSubmit={addComment} />
      </div>
    </div >
  );
}

export default Post;