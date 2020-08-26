import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import SearchBar from './SearchBar';
import SortMenu from './SortMenu';
import Task from './Task';
import TaskEdit from './TaskEdit';
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
  actions: {
  	[theme.breakpoints.down('xs')]: {
	  	display: 'inline-grid',
	  	gridTemplateColumns: 'auto auto auto auto',
	  	paddingLeft: 10,
	  	paddingRight: 10
    }
  },
  onSearchBarOpen: {
  	// show two items per row when mobile search bar is opened
  	gridTemplateColumns: 'auto auto'
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
  },
  snackbarContent: {
    backgroundColor: 'red'
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
			errorMessage: '',
      showError: false
		};
	}

	componentDidMount(){
		this.getTasks();
	}

	getTasks = () => {
		this.setState( async (state) => {
			try{
				const { search, sort, order } = state;
				const url = search ? 
				`/api/searchTasks?search=${search}&sort=${sort}&order=${order}` : 
				`/api/getAllTasks?sort=${sort}&order=${order}`
				const res = await axios.get(url);
				this.setState({tasks: res.data});
			}catch(err){
				this.handleError(err, 'Could not get tasks:');
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
		// search only after user typed
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
		// toggle between 1 and -1
		this.setState( state => ({ order: -(state.order) }) );
		this.getTasks();
	}

	handleError = (err, customMsg = '') => {
		console.error(err.response.data);
    this.setState({ 
      errorMessage: `${customMsg} ${err.response.status} ${err.response.statusText}`,
      showError: true
    });
	}

  closeError = () => {
    this.setState({ showError: false });
  }

  render (){
  	const { classes } = this.props;
		const { tasks, sort, order, search,
			 mobileSearchBar, addTask, errorMessage, showError } = this.state;
		
    return(
    	<div className={classes.root}>
	      <AppBar className={classes.appBar} position="fixed">
	        <Toolbar className={`${classes.actions} 
	        	${mobileSearchBar ? classes.onSearchBarOpen : ''}`}>
	        	<Typography className={classes.appTitle} variant="h6" noWrap>
	        		To Do App
	        	</Typography>
	        	{ mobileSearchBar ? 
	        		/*hide the add icon to have more space for search bar on mobile*/
		        	<SearchBar 
		        		search={search}
		          	handleSearch={this.handleSearch} 
		          	cleanSearch={this.cleanSearch}
	          	/>
	          	: 
			        <IconButton
		            aria-label="add task"
				        color="inherit"
				        onClick={this.toggleAddTask}
				      >
		            <AddIcon />
		          </IconButton>
	        	}

	        	{/*desktop search bar, hidden on mobile*/}
	        	<Hidden xsDown>
		          <SearchBar 
		          	search={search}
		          	handleSearch={this.handleSearch} 
		          	cleanSearch={this.cleanSearch}
		          />
	          </Hidden>

	        	{/*hidden on desktop, so mobile search bar can't be opened*/}
	          <Hidden smUp>
		          { mobileSearchBar ? 
			          <IconButton
			            color="inherit"
			            aria-label="toggle search task"
			            onClick={this.toggleSearchBar}
			            style={{ marginLeft: 15 }}
			          >
			          	<CloseIcon />
			          </IconButton>
			          :
			          <IconButton
			            color="inherit"
			            aria-label="toggle search task"
			            onClick={this.toggleSearchBar}
			          >
			          	<SearchIcon />
			          </IconButton>
		        	}
	          </Hidden>

						<SortMenu sort={sort} handleSort={this.handleSort} />

          	<Button
			        color="inherit"
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

					{/*add extra space when mobile search bar is opened*/}
					{ mobileSearchBar && 
						<div className={classes.toolbar} style={{ marginTop: -25 }} /> 
					}
					
					{/*input to create a new task*/}
					{ addTask && 
						<React.Fragment>
							<TaskEdit close={this.toggleAddTask} 
                reloadData={this.getTasks} handleError={this.handleError} />
							<div className={classes.divider} />
						</React.Fragment>
					}

      		{ tasks.map( task => 
      			<Task key={task._id} task={task} 
              reloadData={this.getTasks} handleError={this.handleError} /> 
      		) }
				</main>

        <Snackbar 
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }} 
          open={showError} 
          autoHideDuration={6000} 
          onClose={this.closeError} 

        >
          <SnackbarContent  
          	className={classes.snackbarContent} 
          	message={errorMessage} 
          	action={
	            <IconButton size="small" aria-label="close" color="inherit" onClick={this.closeError}>
	              <CloseIcon fontSize="small" />
	            </IconButton>
        		}
          />
        </Snackbar>
			</div>
    );
  }
}

// App.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(App);

/*function SearchBar(props){
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
}*/

/*function SortMenu(props){
	const { popupState, sort, handleSort } = props;

	return (
		<React.Fragment>
      <Button {...bindTrigger(popupState)} 
      	aria-label="sort options" 
				aria-controls="sort-options-menu" 
      	aria-haspopup="true" 
        color="inherit"
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
}*/