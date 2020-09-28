import React from 'react';

const Gallery = (props) => {
  return (
    <div className='gallery'>
      {props.posts.map(item => (
        <img key={item._id} className='item' src={item.photo} alt='Loading' />
      ))}
    </div>
  );
}

export default Gallery;