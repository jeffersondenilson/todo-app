import React from 'react';
//import logo from './logo.svg';
//import './App.css';
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
  root: {
  	flexGrow: 1
  },
  button: {
    marginLeft: theme.spacing(3)
  },
  appBar: {
  	color: "black",
  	backgroundColor: "rgba(255, 255, 255, 0.7)"
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
    	<div className={classes.root}>
	      <AppBar className={classes.appBar} position="static">
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
	      {/*<div style={{width: 100, height: 100, backgroundImage: "linearGradient(to bottom right, darkblue, cyan)"}} />*/}
    	</div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
