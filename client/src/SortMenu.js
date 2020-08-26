import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SortIcon from '@material-ui/icons/Sort';
import {
  usePopupState,
  bindTrigger,
  bindMenu,
} from 'material-ui-popup-state/hooks';

export default function SortMenu({ sort, handleSort }){
	const popupState = usePopupState({ variant: 'popover', popupId: 'sort-menu' });

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
}