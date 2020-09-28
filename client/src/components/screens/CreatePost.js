import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import postData from '../postData';
import ImageUpload from '../ImageUpload';
import uploadImage from '../uploadPic';
import Button from '../Button';

const CreatePost = () => {
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (url) {
      const headers = { "Authorization": "Bearer " + localStorage.getItem("jwt") };
      const action = { type: 'CREATE_POST', body: { title, body, photo: url }, headers, url: '/', message: 'Created post successfully' };
      postData(action, history);
    }
  }, [url])

  const handleCreatePost = async () => {
    const data = await uploadImage(image);
    setUrl(data.url);
  }

  return (
    <div className='card input-field create-post-card'>
      <input type='text' placeholder='title' value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type='text' placeholder='body' value={body} onChange={(e) => setBody(e.target.value)} />
      <ImageUpload text='UPLOAD IMAGE' onChange={setImage} />
      <Button text="SUBMIT POST" onClick={handleCreatePost} />
    </div>
  );
}

export default CreatePost;