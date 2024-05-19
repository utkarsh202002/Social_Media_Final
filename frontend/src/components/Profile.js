import React, { useEffect, useState } from 'react'
import './Profile.css'
import PostDetail from './PostDetail';
import ProfilePic from './ProfilePic';


export default function Profile() {

  const [pic, setPic] = useState([]);
  const [show, setShow] = useState(false);
  const [posts, setPosts] = useState([]);

  const [changePic , setChangePic] = useState(false);

  const [user, setUser] = useState([]);


  const toggleDetails = (posts) => {
    if (show) {
      setShow(false)
    } else {
      setShow(true)
      setPosts(posts)
      
    }
  }

  const changeProfile = () => {
    if(changePic){
      setChangePic(false);
    }else{
      setChangePic(true);
    }
  }

  useEffect(() => {
    fetch("http://localhost:5000/myposts", {
      headers: {
        Authorization : "Bearer " + localStorage.getItem("jwt")
      },

    })
      .then((res)=> res.json())
      .then((result) => {
        setPic(result)
        // setPosts(result)
        console.log(pic)
      });



      fetch("http://localhost:5000/profiledata", {
      headers: {
        Authorization : "Bearer " + localStorage.getItem("jwt")
      },

    })
      .then((res)=> res.json())
      .then((result) => {
        setUser(result)
        console.log("user==>", result);
      });

          
  }, []);



  const chk = () =>{
    console.log(user.user.Photo);
  }

  return (
    <div className='profile'>
      {/* Profile Frame */}
      <div className="profile-frame">
        {/* profile pic */}
        <div onClick={() => {
          changeProfile()
        }} className="profile-pic">
          <img src={user?.user?.Photo ? user?.user?.Photo : "https://img.freepik.com/free-icon/user_318-159711.jpg"} alt="" />
        </div>

        {/* profile data */}
        <div className="profile-data">
          <h1>{JSON.parse(localStorage.getItem("user")).name}</h1>
          <div className="profile-info" style={{ display: "flex" }}>
            <p>{user?.post?.length} posts</p>
            <p>{user?.user?.followers ? (user?.user?.followers?.length)- Math.floor((user?.user?.followers?.length)/2) : "0"} follwers</p>
            <p>{user?.user?.following ? (user?.user?.following?.length)- Math.floor((user?.user?.following?.length)/2)  : "0"} following</p>
          </div>
        </div>
      </div>


      {/* Gallery */}

      <div className="gallery">
        {
          pic.map((pics) => {
            return <img key={pics._id} src={pics.photo} className='item'
            onClick={() => {toggleDetails(pics)}}></img>
          })
        }
      </div>
      {/* <button onClick={() => {chk()}}>check</button> */}
        {show && 
      <PostDetail item={posts} toggleDetails = {toggleDetails}/>
        }

        {
          changePic && 
          <ProfilePic changeProfile={changeProfile}/>
        }
    </div>
  )
}
