import React from 'react';
//import logo from './logo.svg';
//import './App.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import AddIcon from '@material-ui/icons/Add';
import SortIcon from '@material-ui/icons/Sort';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import SearchIcon from '@material-ui/icons/Search';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
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

const sortOptions = ['title', 'completed', 'modified'];
// const drawerWidth = 250;
const styles = theme => ({
  root: {
    display: 'flex',
  },
  // drawer: {
  //   [theme.breakpoints.up('sm')]: {
  //     width: drawerWidth,
  //     flexShrink: 0,
  //   },
  // },
  appBar: {
  	color: "black",
		backgroundColor: "rgba(255, 255, 255, 0.6)"
		// zIndex: theme.zIndex.drawer + 1,
    // [theme.breakpoints.up('sm')]: {
    //   width: `calc(100% - ${drawerWidth}px)`,
    //   marginLeft: drawerWidth,
    // },
  },
  appTitle: {
  	marginRight: 40,
  	[theme.breakpoints.down('xs')]: {
  		display: 'none'	
  	}
  },
  button: {
    // margin: theme.spacing(1)
    // marginLeft: '2px',
    // marginRight: '2px'
  },
  actions: {
  	[theme.breakpoints.down('xs')]: {
      display: 'flex',
	  	flexDirection: 'row',
	  	alignItems: 'center',
	  	justifyContent: 'space-between'
    },
  	
  },
  // menuButton: {
  //   marginRight: theme.spacing(2),
  //   [theme.breakpoints.up('sm')]: {
  //     display: 'none',
  //   },
  // },
  // necessary for content to be below app bar
  toolbar: {
  	...theme.mixins.toolbar,
  	// fontWeight: "bold", 
  	// fontSize: "1.5rem",
  	// color: "#4d4d4d",
  	// display: "flex",
  	// alignItems: "center",//vertical
  	// justifyContent: "space-between",//horizontal,
  	// marginLeft: 50
  },
  // drawerPaper: {
  //   width: drawerWidth
  // },
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
			sort: 1,
			ascendingOrder: true
		};
	}

	handleChange = (event) => {
		console.log(event);
	}

	handleDrawerToggle = () => {
		this.setState( state => ({drawerOpen: !state.drawerOpen}) );
	}

	toggleAscendingOrder = () => {
		this.setState( state => ({ascendingOrder: !state.ascendingOrder}) );
	}

  render (){
  	const { classes } = this.props;
		const { tasks, sort, ascendingOrder } = this.state;

    return(
    	<div className={classes.root}>
	      <AppBar className={classes.appBar} position="fixed">
	        <Toolbar className={classes.actions}>
	        	<Typography className={classes.appTitle} variant="h6" noWrap>
	        		To Do App
	        	</Typography>
	        	{/*<span className={classes.buttons}>*/}
		        <IconButton
	            aria-label="add task"
		          edge="start"
			        color="inherit"
			        className={classes.button}
			      >
	            <AddIcon />
	          </IconButton>

	          {/*<Button
	            // variant="outlined"
			        color="inherit"
			        className={classes.button}
			        startIcon={<AddIcon />}
	          >
	            Add
	          </Button>*/}

	          <Button
	            // variant="outlined"
			        color="inherit"
			        className={classes.button}
			        startIcon={<SortIcon />}
	          >
	            {sortOptions[sort]}
	          </Button>

	          { 
	          	ascendingOrder ? 
	          	<Button
		            // variant="outlined"
				        color="inherit"
				        className={classes.button}
				        startIcon={<ArrowDropUpIcon />}
		          >
		            ASC
		          </Button>
		          :
		          <Button
		            variant="outlined"
				        color="inherit"
				        className={classes.button}
				        startIcon={<ArrowDropDownIcon />}
		          >
		            DESC
		          </Button>
	        	}
	        	
	        	<Hidden smUp>
		          <IconButton
		            color="inherit"
		            aria-label="search task"
		            edge="start"
		            // onClick={this.handleDrawerToggle}
		            className={classes.button}
		            // style={{ marginLeft: 'auto' }}
		          >
		            <SearchIcon />
		          </IconButton>
	          </Hidden>
	          {/*</span>*/}
	        </Toolbar>
	      </AppBar>

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

function DrawerList(props){
	const {sort, ascendingOrder, toggleAscendingOrder} = props;

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

			{ ascendingOrder ? 
			<ListItem button onClick={toggleAscendingOrder}>
				<ListItemIcon> <ArrowDropUpIcon /> </ListItemIcon>
				<ListItemText primary="Ascending" />
			</ListItem>
			:
			<ListItem button onClick={toggleAscendingOrder}>
				<ListItemIcon> <ArrowDropDownIcon /> </ListItemIcon>
				<ListItemText primary="Descending" />
			</ListItem> }
		</List>
	);
}

/*
<PopupState variant="popover" popupId="demo-popup-menu">
  {(popupState) => (
    <React.Fragment>
      <Button variant="contained" color="primary" {...bindTrigger(popupState)}>
        Open Menu
      </Button>
      <Menu {...bindMenu(popupState)}>
        <MenuItem onClick={popupState.close}>Cake</MenuItem>
        <MenuItem onClick={popupState.close}>Death</MenuItem>
      </Menu>
    </React.Fragment>
  )}
</PopupState>
*/