import React, { useEffect } from 'react'
import "../assets/sass/home.scss"
import SideBar from '../components/SideBar'
import Chat from '../components/Chat'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const redirect = useNavigate();
  useEffect(() => {
    if(localStorage.getItem('access_token') === null){    
      redirect('/sign-in');
    }

    const url = "http://127.0.0.1:8000/api/messages/list-create";

    fetch(url, {
      headers: {Authentication: `Bearer ${localStorage.getItem('access_token')}`}
    })
       .then(response => response.json())
       
       .then(data => console.log(data))

  }, [])

 


  return (
    <div className="home">
        <div className="cont">
            <SideBar/>
            <Chat/>
        </div>

    </div>
  )
}

export default Home