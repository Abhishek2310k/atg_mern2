import {React,useState} from 'react'
import './Signup.scss'
import Axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
const Signup = () => {

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [email,setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post('http://localhost:4500/auth/signup',{username,email,password
  }).then(response => {
    if(response.data.status) {
      alert("user registered");
      navigate('/login');
    }
  }).catch(error=>{
    console.log(error);
  });
  }

  return (
    <div className='signup'>
        <h2>Signup</h2>
        <form className='sign-up-form' onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input type='text' id='username' placeholder='username' onChange={(e) => setUsername(e.target.value)} 
            value={username}/>
            <label htmlFor="email">Email:</label>
            <input type='email' id='email' placeholder='email' onChange={(e) => setEmail(e.target.value)} value={email}/>
            <label htmlFor="password">password:</label>
            <input type='password' id='password' placeholder='password' onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <button type='submit'>Signup</button>
            <p>Already have an acount</p>
            <Link to='/login'>login</Link>
        </form>
    </div>
  )
}

export default Signup