import {React,useEffect,useState} from 'react'
import {useNavigate} from 'react-router-dom';
import Axios from 'axios'

const Add_Post = () => {

  const navigate = useNavigate();
  Axios.defaults.withCredentials = true;
  let username = '';
  const [fixedusername,setFixedusername] = useState('');

  const [message,setMessage] = useState('');

  useEffect(()=>{
    Axios.get('http://localhost:4500/auth/verify')
    .then (res=>{
      if(res.data.status) {
        // console.log(res.data.info.username);
        username = res.data.info.username;
        setFixedusername(username);
      }
      else {
        alert('pease login or register');
        navigate('/login');
      }
    })
  },[])

  console.log(fixedusername);

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post('http://localhost:4500/post/add',{message,creater:fixedusername
  }).then(response => {
    if(response.data.status) {
      navigate('/');
      alert("Post Added");
    }
  }).catch(error=>{
    console.log(error);
  });
  }

  return (
    <div className='add_post'>
        <h2>Add post as {fixedusername}</h2>
        <form className='insert-post-form' onSubmit={handleSubmit}>
            <label htmlFor='message'>Enter message:</label>
            <input id='message' type='text' onChange = {(e)=>setMessage(e.target.value)}/>
            <button type='submit'>Add Post</button>
        </form>
    </div>
  )
}

export default Add_Post