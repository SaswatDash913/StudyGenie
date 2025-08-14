import React from 'react';
import '../style/Signin.css';
import useUsercred from '../Hooks/useUsercred.js'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const navigate = useNavigate()
  const {signup,Login} = useUsercred()
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const [email,setEmail] = useState("")
  const handleSubmit = (e) => {
    e.preventDefault();
    signup({username,email,password,navigate})
  };

  const handleSwitchToLogin = () => {
    navigate('/login')
  };

  return (
    <div className='signIn-main'>
      <form className='SignIn-inner' onSubmit={handleSubmit}>
        <div className='UserName-singin'>
          <input type='text' className='username-input-singin' placeholder='UserName' onChange={(e)=>setUsername(e.target.value)} />
        </div>
        <div className='email-singin'>
          <input type='email' className='email-input-signup' placeholder='Email' onChange={(e)=>setEmail(e.target.value)} />
        </div>
        <div className='password-signin'>
          <input type='password' className='password-input-singin' placeholder='Password' onChange={(e)=>setPassword(e.target.value)} />
        </div>
        <div className='submit-signin'>
          <button type='submit' className='submit-signin-btn'>SignUp</button>
        </div>
        <div className='already-signup'>
          <button type='button' className='switch-to-login-btn' onClick={handleSwitchToLogin}>
            Already have an account?
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
