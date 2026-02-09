import './App.css';
import {Routes, Route } from 'react-router-dom';

import Login from './Login';
import Account from './components/Account';
import Transaction from './Transaction';
import CreditCard from './components/CreditCard';

function App() {

  return(
    <div>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/account' element={<Account/>}></Route>
        <Route path='/transactions' element={<Transaction/>}></Route>
        <Route path='/cards' element={<CreditCard/>}></Route>
      </Routes>
    </div>
  )
}

export default App;
