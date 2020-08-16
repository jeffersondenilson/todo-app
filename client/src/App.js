import React from 'react';
//import logo from './logo.svg';
//import './App.css';
import PropTypes from 'prop-types';
import { fade, withStyles } from '@material-ui/core/styles';
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
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import AddIcon from '@material-ui/icons/Add';
import SortIcon from '@material-ui/icons/Sort';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
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
const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
  	color: "black",
		backgroundColor: "rgba(255, 255, 255, 0.6)"
  },
  appTitle: {
  	marginRight: 40,
  	[theme.breakpoints.down('xs')]: {
  		display: 'none'	
  	}
  },
  button: {
    [theme.breakpoints.down('xs')]: {
    	transform: 'scale(0.8)'
    }
  },
  actions: {
  	[theme.breakpoints.down('xs')]: {
      display: 'flex',
	  	flexDirection: 'row',
	  	alignItems: 'center',
	  	justifyContent: 'space-between'
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    // marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      // marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 2, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      // width: '20ch',
    },
  },
  cleanSearch: {
  	height: '100%',
    position: 'absolute',
    top: 0,
    right: -15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    transform: 'scale(0.7)',
    '&:hover': {
      color: 'blue'
    },
  },
  toolbar: {...theme.mixins.toolbar},
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
  mobileHide: {
  	[theme.breakpoints.down('xs')]: {
  		display: 'none'
  	}
  }
});

class App extends React.Component {
	constructor(props){
		super(props);
		this.state = { 
			tasks,
			sort: 1,
			order: 'ASC',
			search: '',
			mobileSearchBar: true
		};
	}

	handleChange = (event) => {
		console.log(event);
	}

	toggleOrder = () => {
		this.setState( state => ({
			order: state.order === 'ASC' ? 'DESC' : 'ASC'
		}) );
	}

	toggleSearchBar = () => {
		this.setState(state => ({ mobileSearchBar: !state.mobileSearchBar }) );
	}

	handleSearch = event => {
		//TODO: search
		this.setState({search: event.target.value});
	}

	cleanSearch = () => {
		//TODO: reset search
		this.setState({search: ''});
	}

  render (){
  	const { classes } = this.props;
		const { tasks, sort, order, search, mobileSearchBar } = this.state;

    return(
    	<div className={classes.root}>
	      <AppBar className={classes.appBar} position="fixed">
	        <Toolbar className={classes.actions}>
	        	<Typography className={classes.appTitle} variant="h6" noWrap>
	        		To Do App
	        	</Typography>
	        	{ mobileSearchBar ? 
		        	<SearchBar 
		        		search={search}
		          	handleSearch={this.handleSearch} 
		          	cleanSearch={this.cleanSearch}
		          	classes={classes} 
	          	/> 
	          	: 
			        <IconButton
		            aria-label="add task"
			          edge="start"
				        color="inherit"
				        className={classes.button}
				      >
		            <AddIcon />
		          </IconButton>
	        	}

	        	{/*desktop*/}
	        	<Hidden xsDown>
		          <SearchBar 
		          	search={search}
		          	handleSearch={this.handleSearch} 
		          	cleanSearch={this.cleanSearch}
		          	classes={classes} 
		          />
	          </Hidden>

	          {/*<Button
	            // variant="outlined"
			        color="inherit"
			        className={classes.button}
			        startIcon={<SortIcon />}
	          >
	            {!mobileSearchBar && sortOptions[sort]}
	          </Button>*/}

	          <IconButton
	            color="inherit"
	            edge="start"
	            className={classes.button}
	          >
	            <SortIcon />
	          </IconButton>

          	<Button
	            // variant="outlined"
			        color="inherit"
			        className={classes.button}
			        startIcon={order === 'ASC' ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />} 
			        onClick={this.toggleOrder}
	          >
	            {order}
	          </Button>
	        	
	        	<Hidden smUp>
		          <IconButton
		            color="inherit"
		            aria-label="search task"
		            edge="start"
		            className={classes.button}
		            onClick={this.toggleSearchBar}
		          >
		            <SearchIcon />
		          </IconButton>
	          </Hidden>
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

function SearchBar(props){
	const { classes, search } = props

	return (
		<div className={classes.search}>
	    <div className={classes.searchIcon}>
	    	<SearchIcon />
	    </div>
	    <InputBase
	      placeholder="Search…"
	      classes={{
	      	root: classes.inputRoot,
	      	input: classes.inputInput,
	      }}
	      inputProps={{ 'aria-label': 'search' }}
	      value={search}
	      onChange={props.handleSearch}
	    />
	    { search && 
	    <IconButton 
	    	aria-label='clean search'
	    	className={classes.cleanSearch} 
	    	color="inherit" 
	    	onClick={props.cleanSearch}>
	    	<CloseIcon />
	    </IconButton>
	  	}
	  </div>
	);
}

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

/*
value         |0px     600px    960px    1280px   1920px
key           |xs      sm       md       lg       xl
screen width  |--------|--------|--------|--------|-------->
range         |   xs   |   sm   |   md   |   lg   |   xl
*/