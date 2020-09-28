import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import Button from '../Button';
import ImageUpload from '../ImageUpload';
import uploadPic from '../uploadPic';
import postData from '../postData';

const Signup = (props) => {
  const history = useHistory();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState('');
  const [url, setUrl] = useState();

  useEffect(() => {
    if (url) {
      const action = { type: 'SIGNUP', body: { name, email, password, photo: url }, url: '/signin' };
      postData(action, history);
    }
  }, [url])

  const handleUploadProfile = async () => {
    const data = await uploadPic(image);
    setUrl(data.url);
  }

  const handleSignup = () => {
    if (image) {
      handleUploadProfile();
    } else {
      postData({ type: 'SIGNUP', body: { name, email, password }, url: '/signin' }, history);
    }
  }

  return (
    <div className="basic-card">
      <div className="card auth-card input-field">
        <h2>Instagram</h2>
        <input type='text' placeholder='name' value={name} onChange={(e) => setName(e.target.value)} />
        <input type='text' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <ImageUpload text='UPLOAD PROFILE' onClick={setImage} />
        <Button text="SIGNUP" onClick={handleSignup} />
        <h5>
          <NavLink activeClassName='active' to='/signin'>Already have an account ?</NavLink>
        </h5>
      </div>
    </div>
  );
}

export default Signup;