import React/*, { useState }*/ from 'react';
import Snackbar from '@material-ui/core/Snackbar';

export default function Feedback({ open, message, type, close }){

	return (
		<Snackbar 
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }} 
      open={open} 
      autoHideDuration={6000} 
      onClose={close} 
      message={ type==='error' ? `ERROR: ${message}` : message }
    />
	);
}