import { useState } from "react";
import avatar from "../assets/images/octo.jpg"
import Modal from '@mui/material/Modal';
import '../assets/sass/modal.scss'


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
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

	const handleClose = () => {
		setOpen(false);
	};

	const handleOpen = () => {
		setOpen(true);
	};

  const handleSubmit = () => {

  }

  return (
    <div className='navbar'>
        <span className="logo">Brace Converse</span>
        <div className="user">
            <img 		
            		onClick={handleOpen}
                style={{ cursor:"pointer"}}
                src={avatar} alt=""/>
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
                      src={avatar}
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
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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