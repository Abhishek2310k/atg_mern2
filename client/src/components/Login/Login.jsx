import {React,useState} from 'react'
import './Login.scss'
import Axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
const Login = () => {

  const [password,setPassword] = useState("");
  const [email,setEmail] = useState("");
  const navigate = useNavigate();

  Axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post('http://localhost:4500/auth/login',{email,password
  }).then(response => {
    if(response.data.status) {
      navigate('/');
      alert("Welcome");
    }
  }).catch(error=>{
    console.log(error);
  });
  }

  return (
    <div className='login'>
        <h2>Login</h2>
        <form className='login-form' onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <label htmlFor="email">Email:</label>
            <input type='email' id='email' placeholder='email' onChange={(e) => setEmail(e.target.value)} value={email}/>
            <label htmlFor="password">password:</label>
            <input type='password' id='password' placeholder='password' onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <button type='submit'>Login</button>
            <p>Don't have an acount</p>
            <Link to='/signup'>Sign Up</Link>
            <Link to='/forgot_password'>Forgot Password?</Link>
        </form>
    </div>
  )
}

export default Login