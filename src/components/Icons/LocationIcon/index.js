import React from 'react'

function SvgComponent(props) {
	return (
		<svg
			width={12}
			height={18}
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				d='M6 .667A5.83 5.83 0 00.167 6.5C.167 10.875 6 17.333 6 17.333s5.833-6.458 5.833-10.833A5.83 5.83 0 006 .667zm0 7.916A2.084 2.084 0 116 4.415 2.084 2.084 0 016 8.583z'
				fill='#E8F0FD'
			/>
		</svg>
	)
}

export default SvgComponent
