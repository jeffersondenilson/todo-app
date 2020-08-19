import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles( (theme) => ({
	root: {
		width: '96%',
		padding: '5px',
		marginTop: '10px',
		marginBottom: '10px',
		borderRadius: 0,
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
		marginLeft: 'auto',
		[theme.breakpoints.up('sm')]: {
			// display: 'flex',
			// justifyContent: 'space-between',
			marginRight: '12px'
		}
	},
	endActions: {
		// marginLeft: 'auto',
		[theme.breakpoints.up('sm')]: {
			// display: 'flex',
			// justifyContent: 'flex-start',
			margin: '10px 0px 10px 25px'
		}
	},
	fields: {
		display: 'flex',
		justifyContent: 'space-around',
		// marginBottom: '10px',
		[theme.breakpoints.down('xs')]: {
			flexDirection: 'column',
			paddingLeft: '5px',
			paddingRight: '5px'
		}
	},
	field: {
		marginBottom: 15
	}
}) );

function TaskEdit(props){
	const classes = useStyles();
	const [task, setTask] = useState(props.task || {title: '', details: ''});
	const [titleError, setTitleError] = useState(false);

	const handleChange = (event) => {
		const { id, value } = event.target;

		setTask({ ...task, [id]: value });

		if(id === 'title'){
			setTitleError(!/([^\s])/.test(value));
		}
  };

  const submit = (event) => {
  	// event.preventDefault();
  	if(!/([^\s])/.test(task.title)){
  		setTitleError(true);
  	}else{
  		// TODO: close
  		console.log('submit');
  	}
  };
  //TODO: insert add/edit
	return (
		<Paper className={classes.root}>
			<form className={classes.form} id="form" 
				onSubmit={submit} autoComplete="off">{/*noValidate*/}
				<div className={classes.actions}>
					<IconButton
            aria-label="save"
		        onClick={submit}
		      >
            <SaveIcon />
          </IconButton>
		      <IconButton
            aria-label="close"
		        onClick={props.close}
		      >
            <CloseIcon />
          </IconButton>
				</div>

				<div className={classes.fields}>
		      <TextField id="title" label="Title" variant="outlined" required 
		      	error={titleError} 
		      	helperText={titleError ? 'At least one character' : ''}
		      	color="primary" className={classes.field} 
		      	value={task.title} onChange={handleChange} />
	      	{/*TODO: change to text area*/}
		      <TextField id="details" label="Details" variant="outlined"
		      	color="primary" className={classes.field} 
		      	value={task.details} onChange={handleChange} />
	      </div>

{/*	      <div className={classes.endActions}>
	      	<Button color="inherit" variant="outlined" 
	      		startIcon={<CloseIcon />}
	      	>
	      		Cancel
	      	</Button>

	      	<Button type="submit" form="form" variant="outlined" color="primary"
	      		startIcon={<SaveIcon color="inherit" />}
	      	>
	      		Save
	      	</Button>
	      </div>*/}
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