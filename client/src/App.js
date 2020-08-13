import React from 'react';
//import logo from './logo.svg';
//import './App.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import AddIcon from '@material-ui/icons/Add';
import SortIcon from '@material-ui/icons/Sort';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
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
	},
	{
		_id: 3,
		title: 'Do something',
		details: '7:30pm at quisquam',
		complete: false
	},
];

const drawerWidth = 250
const styles = theme => ({
  /*
  root: {
		display: "flex",
		flexGrow: 1,
		margin: "10px 5px 0 5px",
		[theme.breakpoints.up('sm')]: {
			marginTop: "20px",
			marginLeft: "20px"
		}
  },
  appBar: {
  	color: "black",
		backgroundColor: "rgba(255, 255, 255, 0.7)",
		// marginBottom: theme.spacing(3),
		paddingLeft: theme.spacing(3)
	},
	drawer:{
		width: "200px"
	},
	toolbar: theme.mixins.toolbar,
  tasksContainer: {
		display: "flex",
		flexDirection: "column",
		marginLeft: theme.spacing(3)
  	// [theme.breakpoints.down('md')]: {
  	// 	flexDirection: "column"
  	// }
  }
  */
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
  	color: "black",
		backgroundColor: "rgba(255, 255, 255, 0.7)",
		// zIndex: theme.zIndex.drawer + 1,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: {
  	...theme.mixins.toolbar,
  	fontWeight: "bold", 
  	fontSize: "1.5rem",
  	color: "#4d4d4d",
  	display: "flex",
  	alignItems: "center",//vertical
  	justifyContent: "space-between"//horizontal
  },
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
   	padding: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  	justifyContent: "center",
  	[theme.breakpoints.up('sm')]: {
  		alignItems: "flex-start",
  		padding: theme.spacing(3),
  	}
  },
});

class App extends React.Component {
	constructor(props){
		super(props);
		this.state = { 
			tasks,
			drawerOpen: false
		};
	}

	handleChange = (event) => {
		console.log(event);
	}

	handleDrawerToggle = () => {
		this.setState( state => ({drawerOpen: !state.drawerOpen}) );
	}

  render (){
  	const { classes } = this.props;
		const { tasks, drawerOpen } = this.state;

    return(
    	<div className={classes.root}>
	      <AppBar className={classes.appBar} position="fixed">
	        <Toolbar>
		        <IconButton
	            color="inherit"
	            aria-label="open drawer"
	            edge="start"
	            onClick={this.handleDrawerToggle}
	            className={classes.menuButton}
	          >
	            <MenuIcon />
	          </IconButton>
	        </Toolbar>
	      </AppBar>
	      
				<nav className={classes.drawer}>
					{/*mobile drawer*/}
					<Hidden smUp implementation="css">
	          <Drawer
	            // container={container}
	            variant="temporary"
	            // anchor={theme.direction === 'rtl' ? 'right' : 'left'}
	            open={drawerOpen}
	            onClose={this.handleDrawerToggle}
	            classes={{
	              paper: classes.drawerPaper,
	            }}
	            ModalProps={{
	              keepMounted: true,
	            }}
	          >
	          	<div className={classes.toolbar}>
	          		<span style={{ marginLeft: 50 }}>To Do App</span>
	          		<IconButton
			            color="inherit"
			            aria-label="close drawer"
			            edge="start"
			            onClick={this.handleDrawerToggle}
			          >
			            <ChevronLeftIcon />
			          </IconButton>
	          	</div>
	          	<Divider />
	            <DrawerList />
	          </Drawer>
	        </Hidden>
	      	{/*desktop drawer*/}
	        <Hidden xsDown implementation="css">
	          <Drawer
	            classes={{
	              paper: classes.drawerPaper,
	            }}
	            variant="permanent"
	            open
	          >
	          	<div className={classes.toolbar}>To Do App</div>
	          	<Divider />
	            <DrawerList />
	          </Drawer>
	        </Hidden>
					</nav>

					<main className={classes.content}>
						<div className={classes.toolbar} />
	      		{ tasks.map( task => 
	      		<Task key={task._id} task={task} handleChange={this.handleChange} /> ) }
					</main>
			</div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);

function DrawerList(){
	return (
		<List>
	    <ListItem button>
	        <ListItemIcon><AddIcon /></ListItemIcon>
	        <ListItemText primary="Add" />
	     </ListItem>
	     <ListItem button>
	        <ListItemIcon><SortIcon /></ListItemIcon>
	        <ListItemText primary="Sort" />
	     </ListItem>
	     <ListItem button>
	        <ListItemIcon>
	        	{/*TODO: asc/desc*/}
	        	<SortIcon />
	        </ListItemIcon>
	        <ListItemText primary="Sort" />
	     </ListItem>
	  </List>
	);
}