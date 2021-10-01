import * as React from 'react'

function BackIcon(props) {
	return (
		<svg
			width={23}
			height={16}
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				d='M7.78 2.58L6.6 1.4 0 8l6.6 6.6 1.18-1.18L2.36 8l5.42-5.42z'
				fill='#7DACF9'
			/>
			<path
				d='M14.78 2.58L13.6 1.4 7 8l6.6 6.6 1.18-1.18L9.36 8l5.42-5.42z'
				fill='#7DACF9'
			/>
		</svg>
	)
}

export default BackIcon
