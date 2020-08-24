import React from 'react';
//import logo from './logo.svg';
//import './App.css';
import PropTypes from 'prop-types';
import { fade, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import AddIcon from '@material-ui/icons/Add';
import SortIcon from '@material-ui/icons/Sort';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import BackspaceIcon from '@material-ui/icons/Backspace';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import Task from './Task';
import TaskEdit from './TaskEdit';
import Feedback from './Feedback';
const axios = require('axios');

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
  	color: 'black',
		backgroundColor: 'rgba(255, 255, 255, 0.6)'
  },
  appTitle: {
  	marginRight: 40,
  	[theme.breakpoints.down('xs')]: {
  		display: 'none'	
  	}
  },
  button: {
    [theme.breakpoints.down('xs')]: {
    	// transform: 'scale(0.8)',
    	// marginLeft: '1px',
    	// marginRight: '1px'
    }
  },
  actions: {
  	[theme.breakpoints.down('xs')]: {
	  	display: 'inline-grid',
	  	gridTemplateColumns: 'auto auto auto auto',
	  	paddingLeft: 10,
	  	paddingRight: 10
    }
  },
  onSearchBarOpen: {
  	gridTemplateColumns: 'auto auto'
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
    padding: theme.spacing(1, 4, 1, 0),
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
    right: -10,
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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  	justifyContent: 'center',
  	[theme.breakpoints.up('sm')]: {
  		alignItems: 'flex-start',
  		padding: theme.spacing(3),
  	},
  },
  divider: {
  	width: '80%',
  	height: '3px',
  	margin: '0px 10% 10px 10%',
  	backgroundColor: 'cyan',
  	[theme.breakpoints.up('sm')]:{
  		width: '500px',
  		marginLeft: '50px',
  		marginRight: '50px',
  	}
  }
});

let delaySearch;

class App extends React.Component {
	constructor(props){
		super(props);
		this.state = { 
			tasks: [],
			sort: 'complete',
			order: 1,
			search: '',
			mobileSearchBar: false,
			addTask: false,
			errorMessage: { show: false }
		};
	}

	componentDidMount(){
		this.getTasks();
	}

	getTasks = () => {
		this.setState( async (state) => {
			try{
				let { search, sort, order } = state;
				const url = search ? 
				`/api/searchTasks?search=${search}&sort=${sort}&order=${order}` : 
				`/api/getAllTasks?sort=${sort}&order=${order}`
				const res = await axios.get(url);
				this.setState({tasks: res.data});
			}catch(err){
				this.setState({
					errorMessage: { message: err.message, severity: 'error', show: true };
				});
				console.log(err);
			}
		});
	}

	toggleAddTask = () => {
		this.setState( state => ({ addTask: !state.addTask }) );
		window.scrollTo(0, 0);
	}

	toggleSearchBar = () => {
		this.setState( state => ({ 
			mobileSearchBar: !state.mobileSearchBar, search: '', addTask: false 
		}) );
		this.getTasks();
	}

	handleSearch = (event) => {
		this.setState({search: event.target.value});
		// reset wait
		clearTimeout(delaySearch);
		// wait while user is typing
		delaySearch = setTimeout(this.getTasks, 500);
	}

	cleanSearch = () => {
		this.setState({search: ''});
		this.getTasks();
	}

	handleSort = (option) => {
		this.setState({sort: option});
		this.getTasks();
	}

	toggleOrder = () => {
		this.setState( state => ({
			order: -(state.order)
		}) );
		this.getTasks();
	}

	handleError = (show = false, err = {}) => {
		err = {message: err.message, severity: 'error', show};
		this.setState({ errorMessage: err });
	}

	// closeErrorMessage = () => {
	// 	this.setState({ errorMessage: {show: false} });
	// }

  render (){
  	const { classes } = this.props;
		const { tasks, sort, order, search,
			 mobileSearchBar, addTask, errorMessage } = this.state;
		
    return(
    	<div className={classes.root}>
	      <AppBar className={classes.appBar} position="fixed">
	        <Toolbar className={`${classes.actions} 
	        	${mobileSearchBar ? classes.onSearchBarOpen : ''}`}>
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
				        color="inherit"
				        className={classes.button} 
				        onClick={this.toggleAddTask}
				      >
		            <AddIcon />
		          </IconButton>
	        	}

	        	{/*desktop search bar*/}
	        	<Hidden xsDown>
		          <SearchBar 
		          	search={search}
		          	handleSearch={this.handleSearch} 
		          	cleanSearch={this.cleanSearch}
		          	classes={classes} 
		          />
	          </Hidden>

	          <Hidden smUp>
		          { mobileSearchBar ? 
			          <IconButton
			            color="inherit"
			            aria-label="toggle search task"
			            className={classes.button}
			            onClick={this.toggleSearchBar}
			            style={{ marginLeft: 15 }}
			          >
			          	<CloseIcon />
			          </IconButton>
			          :
			          <IconButton
			            color="inherit"
			            aria-label="toggle search task"
			            className={classes.button}
			            onClick={this.toggleSearchBar}
			          >
			          	<SearchIcon />
			          </IconButton>
		        	}
	          </Hidden>

	          <PopupState variant="popover" popupId="sort-menu">
						  {(popupState) => 
						  	<SortMenu 
							  	popupState={popupState} 
							  	sort={sort} 
							  	handleSort={this.handleSort} 
						  	/>
						  }
						</PopupState>

          	<Button
			        color="inherit"
			        className={classes.button}
			        startIcon={order === 1 ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />} 
			        onClick={this.toggleOrder}
	          >
	            {order === 1 ? 'ASC' : 'DESC'}
	          </Button>
	        </Toolbar>
	      </AppBar>

				<main className={classes.content}>
					{/*make content stay below app bar*/}
					<div className={classes.toolbar} />

					{/*add extra space when search bar is opened*/}
					{ mobileSearchBar && 
						<div className={classes.toolbar} style={{ marginTop: -25 }} /> 
					}

					{ addTask && 
						<React.Fragment>
							<TaskEdit reloadData={this.getTasks} close={this.toggleAddTask} />
							<div className={classes.divider} />
						</React.Fragment>
					}

      		{ tasks.map( task => 
      			<Task key={task._id} task={task} reloadData={this.getTasks} /> 
      		) }
				</main>

				<Feedback open={errorMessage.show} close={handleError} 
					message={errorMessage.message} severity={errorMessage.severity} />
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
	    	<BackspaceIcon />
	    </IconButton>
	  	}
	  </div>
	);
}

function SortMenu(props){
	const { popupState, sort, handleSort } = props;

	return (
		<React.Fragment>
      <Button {...bindTrigger(popupState)} 
      	aria-label="sort options" 
				aria-controls="sort-options-menu" 
      	aria-haspopup="true" 
        color="inherit"
        // className={classes.button}
        startIcon={<SortIcon />}
      >
        {sort}
      </Button>
      <Menu id="sort-options-menu" {...bindMenu(popupState)}>
      	{
      		['title', 'complete', 'modified'].map( option => 
      			<MenuItem key={option} selected={ option === sort }
      			 onClick={ ()=>{popupState.close(); handleSort(option);} }>
      				{option}
      			</MenuItem>
      		)
      	}
      </Menu>
    </React.Fragment>
	);
}

/*
value         |0px     600px    960px    1280px   1920px
key           |xs      sm       md       lg       xl
screen width  |--------|--------|--------|--------|-------->
range         |   xs   |   sm   |   md   |   lg   |   xl
*/