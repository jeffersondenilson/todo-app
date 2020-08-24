import React/*, { useState }*/ from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/core/Alert';


function Feedback(props){
	const { open, message, severity, close } = props;
	// const [open, setOpen] = useState(props.open);
	// const close = () => setOpen(false);

	return (
		<Snackbar open={open} autoHideDuration={6000} onClose={close}>
		  <Alert onClose={close} severity={severity}>
		    {severity === 'error' ? `ERROR: ${message}` : message}
		  </Alert>
		</Snackbar>
	);
}