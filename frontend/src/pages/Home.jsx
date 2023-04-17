import React, { useEffect } from 'react'
import "../assets/sass/home.scss"
import SideBar from '../components/SideBar'
import Chat from '../components/Chat'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const redirect = useNavigate();
  // localStorage.clear()
  useEffect(() => {
    if(localStorage.getItem('access_token') === null){    
      redirect('/sign-in');
    }

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