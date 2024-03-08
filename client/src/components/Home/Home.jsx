import {React,useEffect,useState} from 'react'
import {useNavigate} from 'react-router-dom';
import axios from 'axios'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const Home = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  let username = '';
  let temp_posts = [];
  const [fixedusername,setFixedusername] = useState('');
  const [posts,setPosts] = useState([]);
  const [comment,setComment] = useState('');
  const [email,setEmail] = useState('');
  useEffect(()=>{
    axios.get('http://localhost:4500/auth/verify')
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

    axios.get('http://localhost:4500/post/get')
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
    axios.post('http://localhost:4500/post/comment',{itemId,comment
  }).then(response => {
    if(response.data.status) {
      alert("comment added");
    }
  }).catch(error=>{
    console.log(error);
  });
  }

  const handleLike = (e,itemId) => {
    e.preventDefault();
    axios.post('http://localhost:4500/auth/like',{itemId,fixedusername
  }).then(response=>{
    if(response.data.status) {
      alert("post added to likes");
    }
  }).catch(error=>{
    console.log(error);
  })
  }

  console.log(posts);
  console.log(email);

  return (
    <div className='home'>
      <p>Welcome Home {fixedusername}</p>
      {posts.map((item,index)=> 
      <div className='post'>
        <p>{item.message} made by {item.creater}</p>
        <button type='button' onClick={(e)=>handleLike(e,item._id)}><FavoriteBorderIcon/></button>
        <div className='comments'>
          {item.comments.map((comment,index)=><p>{comment}</p>)}
        </div>
        <form onSubmit={(e)=>handleSubmit(e,item._id)}>
          <label htmlFor='add_comment'>Add comment: </label>
          <input type='text' placeholder='add comment to post' id='add_comment' onChange={(e)=>setComment(e.target.value)}/>
          <button type='submit'>Add Comment</button>
        </form>
      </div>
      )}
      
    </div>
  )
}

export default Home