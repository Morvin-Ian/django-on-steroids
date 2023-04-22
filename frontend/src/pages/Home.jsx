import React, { useEffect } from 'react'
import "../assets/sass/home.scss"
import SideBar from '../components/SideBar'
import Chat from '../components/Chat'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const redirect = useNavigate();

  const url = "http://127.0.0.1:8000/api/messages/list-create/";
  
  

  const fetchData = async() => {
    try {
     
      // Send a fetch request with the bearer token
      const fetchResponse = await fetch(url, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` },
      });
  
      // Get the response data
      const responseData = await fetchResponse.json();
    } 
    catch (error) 
    {
      console.error(error);
    }
  }


  useEffect(() => 
  {
    if(localStorage.getItem('access_token') === null)
    {    
      redirect('/sign-in');
    }

    fetchData()
  }, []);


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