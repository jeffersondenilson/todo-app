import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
  task: {
  	display: "flex",
  	alignItems: "center",
		width: "96%",
		padding: "5px",
		[theme.breakpoints.up('md')]: {
			width: "800px"
		},
		borderBottom: "1px solid gray",
		borderRadius: 0
	},
	title: {
		fontWeight: "bold"
	},
	checkedBox: {
		color: "blue"
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

function Task(props){
	const {task, handleChange} = props;
	const {classes} = props;

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

			<div>
				<div className={classes.title}>{task.title}</div>
				<small color="textSecondary">{task.details}</small>
			</div>

			<div className={classes.actions}>
				<IconButton aria-label="edit">
					<EditIcon />
				</IconButton>
				<IconButton>
					<DeleteIcon aria-label="delete" />
				</IconButton>
			</div>
		</Paper>
	);
}

Task.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Task);

/*
<Checkbox
	checked={checked}
	onChange={handleChange}
	inputProps={{ 'aria-label': 'primary checkbox' }}
/>
<FormControlLabel
  control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="checkedH" />}
  label="Custom icon"
/>
*/