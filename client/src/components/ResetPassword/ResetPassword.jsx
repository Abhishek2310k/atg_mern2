import {React,useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import Axios from 'axios'
import {useNavigate} from 'react-router-dom'
const ResetPassword = () => {

    const [password,setPassword] = useState('');
    const {token} = useParams();
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        Axios.post('http://localhost:4500/auth/reset_password/' + token,{password
      }).then(response => {
        if(response.data.status) {
          navigate('/login');
        }
        console.log(response.data);
      }).catch(error=>{
        console.log(error);
      });
      }

  return (
    <div className='forgot_password'>
        <h2>Reset Password</h2>
        <form className='sign-up-form' onSubmit={handleSubmit}>
            
            <label htmlFor="password">Reset Password:</label>
            <input type='password' id='password' placeholder='password' onChange={(e) => setPassword(e.target.value)} value={password}/>
            
            <button type='submit'>Set Password</button>
        </form>
    </div>
  )
}

export default ResetPassword