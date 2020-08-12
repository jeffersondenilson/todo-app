import React from 'react';
// import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
	task: {
		display: "flex",
		alignItems: "center",
		// flexDirection: "column",
		width: "96%",
		// margin: "auto",
		padding: "5px",
		[theme.breakpoints.up('md')]: {
			width: "800px"
			// width: "250px",
			// margin: "10px"
		},
		borderBottom: "1px solid gray",
		borderRadius: 0
	},
	checkedBox: {
		color: "blue"
	},
	title: {
		fontWeight: "bold"
	},
	completeTaskText: {
		textDecoration: "line-through",
		color: "gray"
	},
	actions: {
		display: "flex",
		alignItems: "center",
		marginLeft: "auto",
		[theme.breakpoints.down('xs')]: {
			flexDirection: "column"
		}
	}
}));
/*
const styles = theme => ({
  task: {
  	display: "flex",
  	alignItems: "center",
  	// flexDirection: "column",
		width: "96%",
		margin: "auto",
		padding: "5px",
		[theme.breakpoints.up('md')]: {
			width: "800px"
			// width: "250px",
			// margin: "10px"
		},
		borderBottom: "1px solid gray",
		borderRadius: 0
	},
	checkedBox: {
		color: "blue"
	},
	title: {
		fontWeight: "bold"
	},
	completeTaskText: {
		textDecoration: "line-through",
		color: "gray"
	},
	actions: {
		display: "flex",
		alignItems: "center",
		marginLeft: "auto",
		[theme.breakpoints.down('xs')]: {
			flexDirection: "column"
		}
	}
});
*/
function Task(props){
	const {task, handleChange} = props;
	//const {classes} = props;
	const classes = useStyles();
	const taskText = task.complete ? classes.completeTaskText : '';
	
	//ACTIONS AT END
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

			<div className={taskText}>
				<div className={classes.title}>{task.title}</div>
				<small color="textSecondary">{task.details}</small>
			</div>

			<div className={classes.actions}>
				<IconButton aria-label="edit">
					<EditIcon />
				</IconButton>
				<IconButton aria-label="delete">
					<DeleteIcon />
				</IconButton>
			</div>
		</Paper>
	);
	
	/*
	//ACTIONS AT FIRST
	return (
		<Paper className={classes.task}>
			<div className={classes.actions}>
				<Checkbox
					checked={task.complete}
					onChange={handleChange}
					inputProps={{ 'aria-label': 'mark complete checkbox' }}
					icon={<RadioButtonUncheckedIcon />} 
					checkedIcon={<CheckCircleIcon className={classes.checkedBox} />} 
					name="completeCheckbox"
				/>
				<IconButton aria-label="edit">
					<EditIcon />
				</IconButton>
				<IconButton>
					<DeleteIcon aria-label="delete" />
				</IconButton>
			</div>
			<div className={taskText}>
				<div className={classes.title}>{task.title}</div>
				<small color="textSecondary">{task.details}</small>
			</div>
			
		</Paper>
	);
	*/
	//ACTIONS AT TOP
	/*return (
		<Paper className={classes.task}>
			<div className={classes.actions}>
				<Checkbox
					checked={task.complete}
					onChange={handleChange}
					inputProps={{ 'aria-label': 'mark complete checkbox' }}
					icon={<RadioButtonUncheckedIcon />} 
					checkedIcon={<CheckCircleIcon className={classes.checkedBox} />} 
					name="completeCheckbox"
				/>
				<IconButton aria-label="edit">
					<EditIcon />
				</IconButton>
				<IconButton>
					<DeleteIcon aria-label="delete" />
				</IconButton>
			</div>
			<div className={taskText}>
				<div className={classes.title}>{task.title}</div>
				<small color="textSecondary">{task.details}</small>
			</div>
		</Paper>
	);*/
}

export default Task;//withStyles(styles)(Task);