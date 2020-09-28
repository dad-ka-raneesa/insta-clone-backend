import React, { useState, useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { UserContext } from '../../App';
import Button from '../Button';
import apiCall from '../apiCall';
import M from 'materialize-css';

const Signin = (props) => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignin = async () => {
    const action = { type: 'SIGNIN', body: { email, password } };
    const data = await apiCall(action);

    if (data.error) {
      M.toast({ html: data.error, classes: '#e64a19 deep-orange darken-2' });
    }
    else {
      localStorage.setItem('jwt', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      dispatch({ type: 'USER', payload: data.user });
      M.toast({ html: 'Signed in successfully', classes: '#388e3c green darken-2' });
      history.push('/');
    }
  };

  return (
    <div className="basic-card">
      <div className="card auth-card input-field">
        <h2>Instagram</h2>
        <input type='text' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button text="SIGNIN" onClick={handleSignin} />
        <h5>
          <NavLink activeClassName='active' to='/signup'>Dont have an account ?</NavLink>
        </h5>
      </div>
    </div>
  );
}

export default Signin;