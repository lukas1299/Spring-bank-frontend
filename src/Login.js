import './App.css';
import {useState} from 'react';
import authService from './services/auth.service';
import { useNavigate } from 'react-router-dom';
import account from './Account';

const Login = () => {

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const [username, setUsername] = useState("");
  const [surname, setSurname] = useState("");
  const [roles, setRoles] = useState([]);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    try{
      await authService.login(login, password).then((response) => {
        localStorage.setItem("accessToken", response.data.accessToken);
        
        navigate("/account");
      })
    } catch(err){
      console.log(err);
    }
  }

  const handleRegister = async (e) => {
    try{
      await authService.register(username, surname, password, roles).then((response) => {
        console.log(response);
      })
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className="App">
      
      <h2>Login</h2>
      <input id="login" onChange={e => {setLogin(e.target.value)}} type="text"></input>
      <input id="password" onChange={e => {setPassword(e.target. value)}} type="text"></input>
      <button type="button" onClick={handleLogin}>
        Login
      </button>
      <h2>Register</h2>
      <input id="username" onChange={e => {setUsername(e.target.value)}} type="text"></input>
      <input id="surname" onChange={e => {setSurname(e.target.value)}} type="text"></input>
      <input id="registerPassword" onChange={e => {setPassword(e.target. value)}} type="text"></input>
      <input id="roles" onChange={e => {setRoles([e.target. value])}} type="text"></input>
      <button type="button" onClick={handleRegister}>
        Register
      </button>
      
     
        
    </div>
  );
}

export default Login;
