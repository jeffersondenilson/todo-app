import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
  task: {
		width: "96%",
		margin: "5px",
		[theme.breakpoints.up('sm')]: {
			width: "600px"
		}
	},
	title: {
		fontWeight: "bold"
	}
});

function Task(props){
	const {task} = props;
	const {classes} = props;

	return (
		<Paper className={classes.task}>
			<div className={classes.title}>{task.title}</div>
			<Typography color="textSecondary">{task.details}</Typography>
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