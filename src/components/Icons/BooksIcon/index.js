import React from 'react'

function SvgComponent(props) {
	return (
		<svg
			width={20}
			height={20}
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				d='M3.333 5H1.666v11.667c0 .916.75 1.666 1.667 1.666H15v-1.666H3.333V5z'
				fill='#E8F0FD'
			/>
			<path
				d='M16.667 1.667h-10C5.75 1.667 5 2.417 5 3.333v10C5 14.25 5.75 15 6.667 15h10c.916 0 1.666-.75 1.666-1.667v-10c0-.916-.75-1.666-1.666-1.666zm0 8.333l-2.084-1.25L12.5 10V3.333h4.167V10z'
				fill='#E8F0FD'
			/>
		</svg>
	)
}

export default SvgComponent
