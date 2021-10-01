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
				d='M8.992.667C4.392.667.667 4.4.667 9s3.724 8.333 8.325 8.333c4.608 0 8.341-3.733 8.341-8.333S13.6.667 8.992.667zM12.524 14L9 11.875 5.475 14l.933-4.008L3.3 7.3l4.1-.35L9 3.167l1.6 3.775 4.1.35-3.108 2.691.933 4.017z'
				fill='#E8F0FD'
			/>
		</svg>
	)
}

export default SvgComponent
