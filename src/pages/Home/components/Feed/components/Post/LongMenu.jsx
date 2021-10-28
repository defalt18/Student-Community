import React from 'react';
import Button from 'components/Button'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { deletePostByID } from '../../../../utils/home-utils';

const ITEM_HEIGHT = 48;

export default function LongMenu({ postID }) {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const options = [
		<DeletePost postID={postID} />,
		'Option 2',
		'Option 3',
		'Option 4'
	];

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
					},
				}}
			>
				{options.map((option) => (
					<MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
						{option}
					</MenuItem>
				))}
			</Menu>
		</div>
	);
}

function DeletePost({ postID }) {
	const handleDelete = async () => {
		await deletePostByID(postID);
		console.log("done");
	}

	return (
		<Button className="text-red-500" onClick={handleDelete} >
			Delete
		</Button>
	)
}