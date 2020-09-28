import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { UserContext } from '../App.js';

const NavBar = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);

  const homeBarBeforeLogin = () => {
    return (
      <ul id="nav-mobile" className="right">
        <li><NavLink activeClassName='active' to="/signin">Signin</NavLink></li>,
        <li><NavLink activeClassName='active' to="/signup">Signup</NavLink></li>
      </ul>
    );
  }

  const homeBarAfterLogin = () => {
    return (
      <ul id="nav-mobile" className="right">
        <li><NavLink activeClassName='active' to="/profile">Profile</NavLink></li>,
        <li><NavLink activeClassName='active' to="/createPost">Create Post</NavLink></li>,
        <li><NavLink activeClassName='active' to="/followingPosts">My Following Posts</NavLink></li>,
        <li>
          <button
            className="btn #e64a19 deep-orange darken-2"
            onClick={() => {
              localStorage.clear();
              dispatch({ type: "CLEAR" });
              history.push('/signin');
            }}>LOGOUT</button>
        </li>
      </ul>
    );
  }

  return (
    <nav>
      <div className="nav-wrapper white">
        <NavLink activeClassName='active' to={state ? '/' : '/signin'} className="brand-logo left">Instagram</NavLink>
        {state ? homeBarAfterLogin() : homeBarBeforeLogin()}
      </div>
    </nav>
  );
}

export default NavBar;