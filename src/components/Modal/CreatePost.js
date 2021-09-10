import React, { Fragment, useState } from 'react'
import Model from './Model';
import PostMaker from "./PostMaker"

function CreatePost() {
	const [open, setOpen] = useState(false);

	const handleClose = () => { setOpen(false) };
	const handleOpen = () => { setOpen(true) };

	return (
		<Fragment>
			<button
				className="btn"
				onClick={handleOpen} >
				Create Post
			</button>
			<Model open={open} close_callback={handleClose}>
				<PostMaker handleClose={handleClose} />
			</Model>
		</Fragment>
	)
}

export default CreatePost
