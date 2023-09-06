import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import avatar from "../assets/images/default.webp"
import '../assets/sass/users.scss'
import AddIcon from '@mui/icons-material/Add';
import {fetchUsers} from '../api/users'
import Modal from '@mui/material/Modal';


const modalStyle = {
  position: 'absolute',
  backgroundColor: 'transparent',
  height: 80,
  width: 300,
  top:"10%",
  left:"40%"
}


const Users = () => {
  const [users, setUsers] = useState('');
  const [open, setOpen] = useState(false);
  
	const handleClose = () => {
		setOpen(false);
	};

	const handleOpen = () => {
		setOpen(true);
	};

  const handleSubmit = () => {

  }


  useEffect(() => {
    const access_token = localStorage.getItem('access_token');
    
    const fetchUsersData = async () => {
      const fetchedUsers = await fetchUsers(access_token);
      setUsers(fetchedUsers);
    };

    if (access_token) {
      fetchUsersData();
    }
  }, []); 

  return (
    <>
  <div className="users">
      <div className='chats'>
        <h2 className="chats-heading">Create New Conversations</h2>
        {users.length &&
          users.map((chat) => (
            <Link
              onClick={handleOpen}
              style={{ textDecoration: 'none' }}
              key={chat.uuid}
              className="user-chat"
            >
              
              <img src={chat.profile ? `http://127.0.0.1:8000${chat.profile}`: avatar} alt={`Profile of ${chat.username}`} className="profile-image" />
              <div className="chat-info">
                <span>{chat.username}</span>
                <small>last seen: 2205 hrs </small>
                <small className="add"><AddIcon/></small>
              </div>
            </Link>
          ))}

               
        <Modal
          onClose={handleClose}
          open={open}
          style={modalStyle}
        >
          <div className="modal-content">
            <form onSubmit={(e) => handleSubmit(e)}>
              <button className="sign-up-button">START CONVERSATION</button>
            </form>
          </div>
        </Modal>
      </div>

      <div className="left-sidebar">
        <div className="top">
          <h3 className="sidebar-heading">Your Reminders</h3>
          <ul>
            <li>Web Development</li>
            <li>Attend Flutter Conference</li>
            <li>Android Development</li>
          </ul>
          <button className="btn">RE-SCHEDULE</button>
        </div>

        <div className="bottom mt-3">
          <h3 className="sidebar-heading">Brace Blogs</h3>
          <ul>
            <li><small>Titanic Ship</small></li>
            <li><small>Fifa 23 Release</small></li>
            <li><small>Economic Recession</small></li>
            <li><small>Labour Day (Kenya)</small></li>
          </ul>
        </div>
      </div>
      
    </div>

    </>
  )
}

export default Users