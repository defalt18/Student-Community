import React from 'react'

function SvgComponent(props) {
	return (
		<svg
			width={23}
			height={23}
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				d='M20.094.563H2.906A2.344 2.344 0 00.562 2.905v17.188a2.343 2.343 0 002.344 2.343h6.702V15H6.532v-3.5h3.076V8.832c0-3.035 1.807-4.71 4.574-4.71 1.325 0 2.71.235 2.71.235v2.979h-1.526c-1.505 0-1.974.934-1.974 1.891V11.5h3.358l-.537 3.5h-2.82v7.438h6.7a2.343 2.343 0 002.345-2.344V2.906A2.344 2.344 0 0020.093.562z'
				fill='#fff'
			/>
		</svg>
	)
}

export default SvgComponent
