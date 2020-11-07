import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import './App.css';
import Chat from './components/Chat/Chat';

import Sidebar from './components/Sidebar/Sidebar';
import Login from './components/Login/Login';

import {selectUser, login, logout} from './features/userSlice';
import { auth } from './firebase';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if(user){
        const logedUser = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photo: user.photoURL
        }
        dispatch(login(logedUser));
      }else{
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <div className="app">
        {user? 
        <>
          <Sidebar/>
          <Chat />
        </> : (
          <Login />
        )}
    </div>
  );
}

export default App;
