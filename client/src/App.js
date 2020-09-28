import React, {createContext, useReducer } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './components/Navbar.js';
import Routing from './components/Routing';
import { reducer, initialState } from './reducers/userReducer';

const UserContext = createContext();

const App = () => {

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <NavBar />
        <Routing />
      </BrowserRouter >
    </UserContext.Provider>
  );
}

export default App;
export { UserContext };
