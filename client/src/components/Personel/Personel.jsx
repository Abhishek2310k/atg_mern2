import {React,useEffect,useState} from 'react'
import {useNavigate} from 'react-router-dom';
import Axios from 'axios'
import './Personel.scss'

const Personel = () => {

  const navigate = useNavigate();
  Axios.defaults.withCredentials = true;
  let username = '';
  let temp_posts = [];
  const [fixedusername,setFixedusername] = useState('');
  const [posts,setPosts] = useState([]);
  const [modified_post,setModifiedPost] = useState('');
  const [delete_post,setDeletePost] = useState(false);

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


        Axios.get('http://localhost:4500/post/get')
    .then (res=>{
      if(res.data.status) {
        temp_posts = res.data.posts;
        setPosts(temp_posts);
      }
      else {
        console.log("failed to get all of the posts")
      }
    })
    },[])

    const handleSubmit = (e,itemId) => {
        e.preventDefault();
        Axios.post('http://localhost:4500/post/modify',{itemId,modified_post,delete_post
  }).then(response => {
    if(response.data.status) {
      alert("changes made");
    }
    else {
        alert("some error occured");
    }
  }).catch(error=>{
    console.log(error);
  });
    }

  return (
    <div className='personel'>
        <h2>Posts created by {fixedusername}</h2>
        {posts.map((item,index)=>item.creater === fixedusername ? 
        <form className='individual_post_form' onSubmit={(e)=>handleSubmit(e,item._id)}>
            <h5>{item.message}</h5>
            <div className='modify post'>
            <label htmlFor='modified_post'>Edit Post</label>
            <input type='text' placeholder='modified_post' onChange={(e)=>setModifiedPost(e.target.value)} value={modified_post} id='modified_post'/>
            </div>
            <div className='delete_set'>
            <label htmlFor='delete'>Delete Post</label>
            <input type='checkbox' id='delete' onClick={()=>setDeletePost(!delete_post)}/> 
            </div>
            <button type='submit'>Modify</button>
        </form> 
        : <></>)}
    </div>
  )
}

export default Personel