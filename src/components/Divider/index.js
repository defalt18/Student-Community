import React from 'react'
import c from 'classnames'

function CustomDivider(props) {
	const { className } = props
	return (
		<div
			className={c(
				'w-full border border-b-1 border-component_blue_full',
				className
			)}
		/>
	)
}

export default CustomDivider
