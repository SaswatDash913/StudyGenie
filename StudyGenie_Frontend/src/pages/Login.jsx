import React from 'react';
import '../style/Login.css';
import { useState } from 'react';
import useUsercred from '../Hooks/useUsercred';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate()
  const {Login} = useUsercred()
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const [email,setEmail] = useState("")
  const handleSubmit = (e) => {
    e.preventDefault();
    Login({username,email,password,navigate})
  };

  return (
    <div className='login-main'>
      <form className='login-inner' onSubmit={handleSubmit}>
        <div className='username-login'>
          <input type='text' className='username-input-login' placeholder='Username' onChange={(e)=>setUsername(e.target.value)}/>
        </div>
        <div className='email-login'>
          <input type='email' className='email-input-login' placeholder='Email' onChange={(e)=>setEmail(e.target.value)} />
        </div>
        <div className='password-login'>
          <input type='password' className='password-input-login' placeholder='Password' onChange={(e)=>setPassword(e.target.value)} />
        </div>
        <div className='submit-login'>
          <button className='submit-login-btn'>Login</button>
        </div> 
      </form>
    </div>
  );
}

export default Login;
