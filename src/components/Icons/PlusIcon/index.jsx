import React from 'react'

function PlusIcon(props) {
	return (
		<svg
			width={28}
			height={28}
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				d='M14.001.667C6.641.667.668 6.64.668 14s5.973 13.333 13.333 13.333S27.335 21.36 27.335 14 21.36.667 14 .667zm6.667 14.666h-5.333v5.334h-2.667v-5.334H7.335v-2.666h5.333V7.333h2.667v5.334h5.333v2.666z'
				fill='#7DACF9'
			/>
		</svg>
	)
}

export default PlusIcon
