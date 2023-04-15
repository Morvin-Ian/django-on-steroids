import React from 'react'
import "../assets/sass/home.scss"
import SideBar from '../components/SideBar'
import Chat from '../components/Chat'

const Home = () => {
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