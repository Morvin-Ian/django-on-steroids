import { useState } from "react";
import avatar from "../../assets/images/default.webp"
import Modal from '@mui/material/Modal';
import '../../assets/sass/modal.scss'
import { Link } from "react-router-dom";


const modalStyle = {
  position: 'absolute',
  border: '2px solid #000',
  backgroundColor: 'white',
  boxShadow: '2px solid black',
  height: 80,
  width: 300,
  top:"10%",
  left:"40%"
}



const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [email, setEmail] = useState(localStorage.getItem('email'));
  let profile = localStorage.getItem('profile')
  

	const handleClose = () => {
		setOpen(false);
	};

	const handleOpen = () => {
		setOpen(true);
	};

  const handleSubmit = () => {

  }

  return (
    <div className='navbar' style={{padding:"10px 0px"}}>
      <Link 
        style={{
          textDecoration:"none", 
          fontSize:"large", 
          color:"white"}}
          to="/">
          <span className="logo" style={{marginLeft:"3px"}}>Brace</span>
      </Link>

        <div className="user">
          <img 		
              onClick={handleOpen}
              style={{ cursor:"pointer"}}
              src={profile != null ?  `http://127.0.0.1:8000${profile}`: avatar } alt=""/>
        </div>
        
        <Modal
          onClose={handleClose}
          open={open}
          style={modalStyle}
        >
          <div className="modal-content">
            <form onSubmit={(e) => handleSubmit(e)}>
            <input 
                  style={{display:"none"}}  
                  type="file" 
                  id='media' 
                  accept='image/*'
            />
            <label htmlFor="media">
            <div className="user">
                    <img 		
                      src={profile ?  `http://127.0.0.1:8000${profile}`: avatar}
                      width="100px"
                      height="100px"
                      style={{borderRadius:"50%", cursor:"pointer"}}
                      alt=""/>
                </div>
            </label>
              <input
                type="text"
                placeholder="Perfect Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
             
              <button className="sign-up-button">Edit</button>
            </form>
          </div>
        </Modal>

    </div>


  )
}

export default Navbar