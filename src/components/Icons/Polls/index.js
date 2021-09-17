import * as React from 'react'

function PollsIcon(props) {
	return (
		<svg
			width={18}
			height={18}
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M16 0H2C.9 0 0 .9 0 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2zm0 16H2V2h14v14zM4 7h2v7H4V7zm4-3h2v10H8V4zm4 6h2v4h-2v-4z'
				fill='#fff'
			/>
		</svg>
	)
}

export default PollsIcon
