import './App.css';
import {useState} from 'react';
import authService from './services/auth.service';
import {BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

import Login from './Login';
import Account from './Account';

function App() {

  return(
    <div>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/account' element={<Account/>}></Route>
      </Routes>
    </div>
  )
}

export default App;
