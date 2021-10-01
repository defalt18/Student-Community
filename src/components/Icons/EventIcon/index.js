import * as React from 'react'

function EventIcon(props) {
	return (
		<svg
			width={18}
			height={17}
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				d='M9 1.5l2.318 4.695 5.182.757-3.75 3.653.885 5.16L9 13.327l-4.635 2.438.885-5.16L1.5 6.952l5.183-.757L9 1.5z'
				stroke='#fff'
				strokeWidth={2}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	)
}

export default EventIcon
