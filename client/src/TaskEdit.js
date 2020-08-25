import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
const axios = require('axios');

const useStyles = makeStyles( (theme) => ({
	root: {
		width: '96%',
		padding: '5px',
		marginTop: '10px',
		marginBottom: '10px',
		[theme.breakpoints.up('sm')]: {
			width: '600px'
		}
	},
	form: {
		width: '100%',
		display: 'flex',
		flexDirection: 'column'
	},
	actions: {
		marginLeft: 'auto'
	},
	fields: {
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'column',
		paddingLeft: '5px',
		paddingRight: '5px'
	},
	field: {
		marginBottom: 15
	}
}) );

function TaskEdit({ close, reloadData, handleError, ...props }){
	const classes = useStyles();
	const [task, setTask] = useState(props.task || {title: '', details: ''});
	const [titleError, setTitleError] = useState(false);

	const handleChange = (event) => {
		const { id, value } = event.target;

		setTask({ ...task, [id]: value });

		if(id === 'title'){//test for empty string
			setTitleError(!/([^\s])/.test(value));
		}
  };

  const submit = async () => {
  	if(!/([^\s])/.test(task.title)){//test for empty string 
  		setTitleError(true);
  	}else{
  		try{
	  		if(task._id){
	  			await axios.put(`/api/updateTask/${task._id}`, task);
	  		}else{
	  			await axios.post(`/api/createTask/`, task);
	  		}
	  		close();
	  		reloadData();
  		}catch(err){
  			console.log(err);
        handleError(err);
  		}
  	}
  };
  
	return (
		<Paper className={classes.root}>
			<form className={classes.form} autoComplete="off">
				<div className={classes.actions}>
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

				<div className={classes.fields}>
		      <TextField id="title" label="Title" variant="outlined" required 
		      	error={titleError} 
		      	helperText={titleError ? 'At least one character' : ''}
		      	color="primary" className={classes.field} 
		      	value={task.title} onChange={handleChange} 
		      />
		      <TextField id="details" label="Details" variant="outlined"
		      	color="primary" className={classes.field} multiline rows={2} 
		      	value={task.details} onChange={handleChange} 
		      />
	      </div>
    	</form>
		</Paper>
	);
}

export default TaskEdit;