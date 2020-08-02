import React from 'react';
//import logo from './logo.svg';
//import './App.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import Task from './Task';

let tasks = [
	{
		_id: 1,
		title: 'Lorem ipsum dolor sit amet.',
		details: 'Labore blanditiis, voluptatum praesentium quisquam porro',
		complete: false
	},
	{
		_id: 2,
		title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
		details: 'Debitis, iste? Iste labore mollitia facere veritatis aspernatur numquam sapiente corrupti, minus amet! Amet porro harum quos sed eveniet magnam et labore.',
		complete: true
	}
];

const styles = theme => ({
  root: {
		flexGrow: 1,
		margin: "10px 5px 0 5px",
		[theme.breakpoints.up('sm')]: {
			marginTop: "20px",
			marginLeft: "20px"
		}
  },
  button: {
    marginLeft: theme.spacing(3)
  },
  appBar: {
  	color: "black",
		backgroundColor: "rgba(255, 255, 255, 0.7)",//220
		marginBottom: theme.spacing(3)
  }
});

class App extends React.Component {
	constructor(props){
		super(props);
		this.state = { tasks };
	}

	handleChange = (event) => {
		console.log(event);
	}

  render (){
  	const { classes } = this.props;
		const { tasks } = this.state;

    return(
    	<div className={classes.root}>
	      <AppBar className={classes.appBar} position="fixed">
	        <Toolbar>
	        	<Typography variant="h6" noWrap>
	            To Do App
	          </Typography>
	        	<Button
			        color="inherit"
			        variant="outlined"
			        className={classes.button}
			        startIcon={<AddIcon />}
		      	>
		        	Add
		      	</Button>
	        </Toolbar>
	      </AppBar>
	      <Toolbar />
	      { tasks.map( task => <Task key={task._id} task={task} handleChange={this.handleChange} /> ) }
    	</div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
