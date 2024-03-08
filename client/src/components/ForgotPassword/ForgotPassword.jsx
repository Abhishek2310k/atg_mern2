import {React,useState} from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import {useNavigate} from 'react-router-dom'
const ForgotPassword = () => {

    const [email,setEmail] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        Axios.post('http://localhost:4500/auth/forgot_password',{email
      }).then(response => {
        if(response.data.status) {
          alert("check your email for reset password link");
          navigate('/login');
        }
      }).catch(error=>{
        console.log(error);
      });
      }

  return (
    <div className='forgot_password'>
        <h2>Forgot Password</h2>
        <form className='sign-up-form' onSubmit={handleSubmit}>
            
            <label htmlFor="email">Email:</label>
            <input type='email' id='email' placeholder='email' onChange={(e) => setEmail(e.target.value)} value={email}/>
            
            <button type='submit'>Send</button>
        </form>
    </div>
  )
}

export default ForgotPassword