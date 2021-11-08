import React from 'react'

function ClockIcon(props) {
	return (
		<svg
			width={16}
			height={16}
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				d='M7.992 1.333A6.663 6.663 0 001.332 8c0 3.68 2.98 6.667 6.66 6.667A6.67 6.67 0 0014.665 8a6.67 6.67 0 00-6.673-6.667zm.007 12A5.332 5.332 0 012.665 8 5.332 5.332 0 018 2.667 5.332 5.332 0 0113.332 8a5.332 5.332 0 01-5.333 5.333z'
				fill='#E8F0FD'
			/>
			<path d='M8.332 4.667h-1v4l3.5 2.1.5-.82-3-1.78v-3.5z' fill='#E8F0FD' />
		</svg>
	)
}

export default ClockIcon
