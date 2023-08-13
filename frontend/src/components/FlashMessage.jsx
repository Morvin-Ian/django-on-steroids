import { Alert, Snackbar } from '@mui/material'
import React from 'react'
import { useState } from 'react'

const FlashMessage = (props) => {
    const [open, setOpen] = useState(true)

    const handleClose= (event, reason) => {
        if(reason === 'clickaway'){
            return;
        }
        setOpen(false)
    }

  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}     anchorOrigin={{ vertical: 'top', horizontal: 'center' }} >
        <Alert onClose={handleClose} severity={props.alertType} sx={{ width: '100%' }}>
          {props.message}
        </Alert>
      </Snackbar>

    </div>
  )
}

export default FlashMessage