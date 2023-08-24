import { Link } from "react-router-dom"
import image from "../assets/images/James.jpeg"
import '../assets/sass/users.scss'
import AddIcon from '@mui/icons-material/Add';
import {fetchUsers} from '../api/users'


const access_token = localStorage.getItem('access_token')
const chats = async () =>{
    const users = await fetchUsers(access_token)
    return users
}



const Users = () => {
  return (
    <>
  <div className="users">
      <div className='chats'>
        <h2 className="chats-heading">Add New Conversations</h2>
        {chats().length &&
          chats().map((chat) => (
            <Link
              style={{ textDecoration: 'none' }}
              key={chat.uuid}
              to={`/chat/${chat.uuid}`}
              className="user-chat"
            >
              <img src={image} alt={`Profile of ${chat.user}`} className="profile-image" />
              <div className="chat-info">
                <span>{chat.chat}</span>
                <small>last seen: 2205 hrs </small>
                <small className="add"><AddIcon/></small>
              </div>
            </Link>
          ))}
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