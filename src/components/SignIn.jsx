import { useState, useEffect } from 'react';
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

    axios.post('https://notebackend4.onrender.com/auth/login', { username, password }, {
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

  function handleOnchange(e) {
    const { name, value } = e.target;

    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  }

  useEffect(() => {
    setUsername('test')
    setPassword('1234')
  },[])
  return (
    <>
      <div className="login_container">
        <form onSubmit={handleSubmit}>
          <div className="login">
            <h1>Sign in</h1>
            <p>Stay up to date with your daily schedule</p>
            <input
                type="text"
                name="username"
                placeholder="Username"
                value={username}
                onChange={(e) => handleOnchange(e)}
            />
            <br />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => handleOnchange(e)}
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