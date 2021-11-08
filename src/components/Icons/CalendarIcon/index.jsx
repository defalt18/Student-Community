import React from 'react'

function CalendarIcon(props) {
	return (
		<svg
			width={12}
			height={14}
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				d='M4 6.26H2.667v1.392H4V6.261zm2.667 0H5.333v1.392h1.334V6.261zm2.666 0H8v1.392h1.333V6.261zm1.334-4.869H10V0H8.667v1.391H3.333V0H2v1.391h-.667c-.74 0-1.326.626-1.326 1.392L0 12.522c0 .765.593 1.391 1.333 1.391h9.334c.733 0 1.333-.626 1.333-1.391v-9.74c0-.765-.6-1.39-1.333-1.39zm0 11.13H1.333V4.87h9.334v7.652z'
				fill='#E8F0FD'
			/>
		</svg>
	)
}

export default CalendarIcon
