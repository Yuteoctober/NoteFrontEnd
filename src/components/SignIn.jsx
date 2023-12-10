import { useState } from 'react';
import axios from 'axios'
import './css/signIn.css';
import { Link, useNavigate } from 'react-router-dom';

function Signin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  axios.defaults.withCredentials = true;

  function handleSubmit(e) {
    e.preventDefault();

    axios.post('https://notebackend-qr35.onrender.com/auth/login', { username, password }, {
    headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*",
    },
  })

    .then(result =>  { 
      alert(result.data.message);
      if (result.data.message === 'User not found' || result.data.message === 'wrong credentials') {
        return;
      }
      window.localStorage.setItem('id', result.data.id)
      navigate('/')
     
    })
    .catch(err => console.log(err))
  }
  return (
    <>
      <div className="login_container">
        <form onSubmit={handleSubmit}>
          <div className="login">
            <h1>Sign in</h1>
            <p>Stay up to date with your daily schedule</p>
            <input
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Sign in</button>
            <p>
              Do not have an account? <Link to='/auth/register'>Sign up</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

export default Signin;