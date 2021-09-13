import React from 'react'
import { createPortal } from 'react-dom'
import CloseIcon from '@material-ui/icons/Close'

import './Model.css'

// @params close_callback accept close_handler and pass false as argument when model will close

function Model({ children, open, close_callback }) {
	return createPortal(
		open ? (
			<div className='model grid-center'>
				<button
					className='btn-icon btn-close-corner'
					onClick={() => {
						close_callback(false)
					}}
				>
					<CloseIcon />
				</button>
				{children}
			</div>
		) : null,
		document.getElementById('root-model')
	)
}

export default Model
