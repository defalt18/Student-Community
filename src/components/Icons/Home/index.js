import * as React from 'react'

function HomeIcon(props) {
	return (
		<svg
			width={14}
			height={16}
			fill='#fff'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				d='M12.813 15.125H9.437a.937.937 0 01-.937-.938v-3.374a.75.75 0 00-.75-.75h-1.5a.75.75 0 00-.75.75v3.374c0 .518-.42.938-.938.938H1.188a.937.937 0 01-.937-.938V7.03c0-.862.395-1.677 1.072-2.21l5.33-4.2a.564.564 0 01.696 0l5.33 4.2a2.812 2.812 0 011.072 2.21v7.157c0 .518-.42.938-.938.938z'
				fill='#fff'
			/>
		</svg>
	)
}

export default HomeIcon
