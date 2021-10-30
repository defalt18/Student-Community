import React from 'react';
import Button from 'components/Button'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const ITEM_HEIGHT = 48;

export default function LongMenu({ options }) {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};


	return (
		<div>
			<Button
				aria-label="more"
				aria-controls="long-menu"
				aria-haspopup="true"
				onClick={handleClick}
			>
				<MoreVertIcon />
			</Button>
			<Menu
				id="long-menu"
				anchorEl={anchorEl}
				keepMounted
				open={open}
				onClose={handleClose}
				PaperProps={{
					style: {
						maxHeight: ITEM_HEIGHT * 4.5,
						width: '20ch',
						color: 'white',
						backgroundColor: "#001439",
					},
				}}
			>
				{options.map((option, index) => (
					<MenuItem key={index} onClick={handleClose} >
						{option}
					</MenuItem>
				))}
			</Menu>
		</div>
	);
}
