import React from 'react';
//import logo from './logo.svg';
//import './App.css';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const styles = theme => ({
  button: {
    marginLeft: theme.spacing(2)
  }
});

class App extends React.Component {
	constructor(props){
		super(props);
		this.state = {};
	}

  render (){
  	const { classes } = this.props;

    return(
    	<div>
	      <AppBar color="white" position="fixed">
	        <Toolbar>
	        	<Typography variant="h6" noWrap>
	            To Do App
	          </Typography>
	        	<Button
			        color="inherit"
			        className={classes.button}
			        startIcon={<AddCircleIcon />}
		      	>
		        	Add
		      	</Button>
	        </Toolbar>
	      </AppBar>
    	</div>
    );
  }
}

export default withStyles(styles)(App);
