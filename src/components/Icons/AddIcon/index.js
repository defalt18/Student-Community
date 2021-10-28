import * as React from 'react'

function AddIcon(props) {
	return (
		<svg
			width={22}
			height={21}
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				d='M11.16.013C5.305.013.553 4.67.553 10.408c0 5.738 4.752 10.395 10.607 10.395 5.856 0 10.608-4.657 10.608-10.395C21.768 4.67 17.016.013 11.16.013zm5.304 11.434h-4.243v4.158H10.1v-4.158H5.857V9.368H10.1V5.21h2.121v4.158h4.243v2.08z'
				fill='#fff'
			/>
		</svg>
	)
}

export default AddIcon
