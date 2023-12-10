import { useState } from 'react';
import axios from 'axios'
import './css/signUp.css';
import { Link, useNavigate } from 'react-router-dom';

function Signin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault();
    console.log(`Username: ${username} Password: ${password}`);
  
    axios.post('https://notebackend-qr35.onrender.com/auth/register', {username, password }, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(result => {
        alert(result.data.message);
        navigate('/auth/login')
      })
      .catch(err => {
        console.error(err);
      });
  }

  return (
    <>
      <div className="signup_container">
        <form onSubmit={handleSubmit}>
          <div className="login">
            <h1>Sign up</h1>
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
            <button type="submit">Sign up</button>
            <p>
              Already have an account? <Link to='/auth/login'>Sign in</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

export default Signin;