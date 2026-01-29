import './App.css';
import {Routes, Route } from 'react-router-dom';

import Login from './Login';
import Account from './Account';
import Transaction from './Transaction';


function App() {

  return(
    <div>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/account' element={<Account/>}></Route>
        <Route path='/transactions' element={<Transaction/>}></Route>
      </Routes>
    </div>
  )
}

export default App;
