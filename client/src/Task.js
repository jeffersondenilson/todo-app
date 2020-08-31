// render a task
// mark complete, delete and activate edit mode
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import {
  usePopupState,
  bindTrigger,
  bindMenu,
} from 'material-ui-popup-state/hooks';
import TaskEdit from './TaskEdit';
const axios = require('axios');

const useStyles = makeStyles( (theme) => ({
	task: {
		display: 'flex',
		alignItems: 'center',
		width: '96%',
		padding: '5px',
		[theme.breakpoints.up('sm')]: {
			width: '600px'
		},
		borderBottom: '1px solid gray',
		borderRadius: 0
	},
	checkedBox: {
		color: 'blue'
	},
	title: {
		fontWeight: 'bold'
	},
	completeTaskText: {
		textDecoration: 'line-through',
		color: 'gray'
	},
	actions: {
		display: 'flex',
		alignItems: 'flex-end',
		marginLeft: 'auto'
	}
}) );

function Task({ task, reloadData, handleError }){
	const classes = useStyles();
	const [editMode, setEditMode] = useState(false);
	const [deleteDialog, setDeleteDialog] = useState(false);
	const popupState = usePopupState({ variant: 'popover', popupId: 'task-options-menu' });

	const toggleEditMode = () => {
		setEditMode(!editMode);
	}

	const toggleDeleteDialog = () => {
		setDeleteDialog(!deleteDialog);
	}

	const updateComplete = async () => {
		try{
			await axios.put(`/api/updateTask/${task._id}`, 
				{...task, complete: !task.complete});
			reloadData();
		}catch(err){
      handleError(err, 'Could not update task');
		}
	}

	const deleteTask = async () => {
		setDeleteDialog(false);
		try{
			await axios.delete(`/api/deleteTask/${task._id}`);
			reloadData();
		}catch(err){
      handleError(err, 'Could not delete task');
		}
	}

	if(editMode){
		return <TaskEdit task={task} close={toggleEditMode} 
      reloadData={reloadData} handleError={handleError} />
	}

	return (
		<React.Fragment>
			<Paper className={classes.task}>
				<Checkbox
					checked={task.complete}
					onChange={updateComplete}
					inputProps={{ 'aria-label': 'mark complete checkbox' }}
					icon={<RadioButtonUncheckedIcon />} 
					checkedIcon={<CheckCircleIcon className={classes.checkedBox} />} 
					name="completeCheckbox"
				/>

				<div className={`${task.complete ? classes.completeTaskText : ''}`}>
					<div className={classes.title}>{task.title}</div>
					<small color="textSecondary">{task.details}</small>
				</div>

				<div className={classes.actions}>
					<IconButton 
						aria-label="task options" 
						aria-controls="task-options-menu"
	        	aria-haspopup="true"
	        	{...bindTrigger(popupState)}
	        >
						<MoreVertIcon />
					</IconButton>
				</div>

				<Menu {...bindMenu(popupState)} 
					id="task-options-menu" 
					anchorOrigin={{
	          vertical: 'top',
	          horizontal: 'right',
	        }}
	        transformOrigin={{
	          vertical: 'top',
	          horizontal: 'right',
	        }}
	      >
					<MenuItem onClick={ ()=>{popupState.close(); toggleEditMode(); } }>
						<ListItemIcon>
	            <EditIcon />
	          </ListItemIcon>
	          <Typography variant="inherit" noWrap>
	            Edit
	          </Typography>
					</MenuItem>
					<MenuItem onClick={ ()=>{popupState.close(); toggleDeleteDialog();} }>
						<ListItemIcon>
	            <DeleteIcon />
	          </ListItemIcon>
	          <Typography variant="inherit" noWrap>
	            Delete
	          </Typography>
					</MenuItem>
				</Menu>
			</Paper>
			<Dialog
			  open={deleteDialog}
			  onClose={toggleDeleteDialog}
			  aria-labelledby="delete-dialog"
			  aria-describedby="confirm deletion of task"
			>
			  <DialogTitle id="delete-dialog">Delete task "{task.title}"?</DialogTitle>
			  <DialogActions>
			    <Button onClick={toggleDeleteDialog} color="primary">
			      Cancel
			    </Button>
			    <Button onClick={deleteTask} color="primary" autoFocus>
			      Delete
			    </Button>
			  </DialogActions>
			</Dialog>
		</React.Fragment>
	);
}

export default Task;