import React from 'react'

function SvgComponent(props) {
	return (
		<svg
			width={18}
			height={18}
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				d='M9 .667A8.336 8.336 0 00.667 9c0 4.6 3.733 8.333 8.333 8.333S17.333 13.6 17.333 9 13.6.667 9 .667zm0 2.5c1.383 0 2.5 1.116 2.5 2.5 0 1.383-1.117 2.5-2.5 2.5a2.497 2.497 0 01-2.5-2.5c0-1.384 1.117-2.5 2.5-2.5zM9 15a6 6 0 01-5-2.683c.025-1.659 3.333-2.567 5-2.567 1.658 0 4.975.908 5 2.567A6 6 0 019 15z'
				fill='#E8F0FD'
			/>
		</svg>
	)
}

export default SvgComponent
