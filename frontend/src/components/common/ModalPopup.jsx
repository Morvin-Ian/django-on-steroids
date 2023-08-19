import  { useState } from 'react'
import Modal from '@mui/material/Modal';

const ModalPopup = () => {

	const [open, setOpen] = useState(false);

	const handleClose = () => {
		setOpen(false);
	};

	const handleOpen = () => {
		setOpen(true);
	};


  return (
	<div style={{ display: 'block', padding: 30 }}>
			<h4>How to use Modal Component in ReactJS?</h4>
			<button type="button"
				onClick={handleOpen}>
				Click Me to Open Modal
			</button>
			<Modal
				onClose={handleClose}
				open={open}
				style={{
					position: 'absolute',
					border: '2px solid #000',
					backgroundColor: 'gray',
					boxShadow: '2px solid black',
					height: 80,
					width: 240,
					margin: 'auto'
				}}
			>
				<h2>How are you?</h2>
			</Modal>
		</div>
  )
}

export default ModalPopup