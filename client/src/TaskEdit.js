import React, { useState } from 'react';
import { makeStyles, useStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles( (theme) => ({
	//
}) );

function TaskEdit(props){
	const classes = useStyles();
	const { task, close } = props;
	const [title, setTitle] = useState(task.title || '');
	const [details, setDetails] = useState(task.details || '');

	const handleChange = (event) => {
		event.target.id === 'title' ? 
		setTitle(event.target.value) : 
		setDetails(event.target.value);
  };

  const submit = () => {
  	//
  };

  const close = () => props.close();
	
	return (
		<Paper>
			<form {/*noValidate*/} autoComplete="off">
				<div>
					<IconButton
            aria-label="save"
		        onClick={submit}
		      >
            <SaveIcon />
          </IconButton>
		      <IconButton
            aria-label="close"
		        onClick={close}
		      >
            <CloseIcon />
          </IconButton>
				</div>

	      <TextField id="title" label="task title" variant="outlined" required
	      	color="blue" value={title} onChange={handleChange} />

	      <TextField id="details" label="task details" variant="outlined"
	      	color="blue" value={details} onChange={handleChange} />
    	</form>
		</Paper>
	);
}

export default TaskEdit;

/*
-outlined
-required
-error+helperText
-autoComplete="off" (form)
-color
*/