import React from 'react'

function FileIcon(props) {
	return (
		<svg
			width={14}
			height={18}
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				d='M1.999.667C1.082.667.34 1.417.34 2.333L.332 15.667c0 .916.742 1.666 1.658 1.666H12c.916 0 1.666-.75 1.666-1.666v-10l-5-5H2zM7.832 6.5V1.917L12.415 6.5H7.832z'
				fill='#7DACF9'
			/>
		</svg>
	)
}

export default FileIcon
