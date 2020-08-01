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
		title: 'Lorem ipsum dolor sit amet.',
		details: 'Labore blanditiis, voluptatum praesentium quisquam porro',
		done: false
	},
	{
		title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
		details: 'Debitis, iste? Iste labore mollitia facere veritatis aspernatur numquam sapiente corrupti, minus amet! Amet porro harum quos sed eveniet magnam et labore.',
		done: true
	}
];

const styles = theme => ({
  root: {
		flexGrow: 1,
		marginLeft: "10px"
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
	      { tasks.map( task => <Task task={task} /> ) }
    	</div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
