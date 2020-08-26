import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import BackspaceIcon from '@material-ui/icons/Backspace';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles( (theme) => ({
	search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
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
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%'
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
  }
}) );

export default function SearchBar({ search, handleSearch, cleanSearch }){
	const classes = useStyles();

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
	      onChange={handleSearch}
	    />
	    { search && 
	    <IconButton 
	    	aria-label='clean search'
	    	className={classes.cleanSearch} 
	    	color="inherit" 
	    	onClick={cleanSearch}>
	    	<BackspaceIcon />
	    </IconButton>
	  	}
	  </div>
	);
}