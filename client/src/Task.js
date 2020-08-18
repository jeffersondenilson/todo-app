import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  usePopupState,
  bindTrigger,
  bindMenu,
} from 'material-ui-popup-state/hooks';
import TaskEdit from './TaskEdit';

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

function Task(props){
	const classes = useStyles();
	const {task, handleChange} = props;
	const [editMode, setEditMode] = useState(false);

	const toggleEditMode = () => {
		setEditMode(!editMode);
	};

	const popupState = usePopupState({ variant: 'popover', popupId: 'task-options-menu' });
	
	if(editMode){
		return <TaskEdit task={task} close={toggleEditMode} />
	}

	return (
		<Paper className={classes.task}>
			<Checkbox
				checked={task.complete}
				onChange={handleChange}
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
				<MenuItem onClick={ ()=>{popupState.close(); toggleEditMode();} }>
					<ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <Typography variant="inherit" noWrap>
            Edit
          </Typography>
				</MenuItem>
				<MenuItem onClick={popupState.close}>
					<ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <Typography variant="inherit" noWrap>
            Delete
          </Typography>
				</MenuItem>
			</Menu>
		</Paper>
	);
}

export default Task;